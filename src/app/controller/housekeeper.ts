import { Context, inject, controller, provide, post } from 'midway';
import { HousekeeperService } from '../../service/housekeeper';
import { ServerException, Success, HttpException } from '../../lib/http-response';
import * as Joi from '@hapi/joi';

@provide()
@controller('/api/housekeeper')
export class HousekeeperController {
  @inject()
  ctx: Context;

  @inject('housekeeperService')
  service: HousekeeperService;

  @post('/sendWeatherToFriends')
  async sendWeatherToFriends() {
    const body: {
      cityName: string;
      targets: { name?: string; alias?: string }[];
    } = this.ctx.request.body;
    const schema = Joi.object({
      cityName: Joi.string().required(),
      targets: Joi.array()
        .required()
        .min(1)
        .items(
          Joi.object({
            name: Joi.string(),
            alias: Joi.string(),
          }).or('name', 'alias'),
        ),
    }).required();

    const v = schema.validate(body);
    if (v.error) {
      throw new HttpException({ msg: `Joi error: ${v.error.message}` });
    }

    const { cityName, targets } = body;
    const weatherDate = await this.service.getDailyWeather(cityName);
    const content = this.service.getWeatherString(weatherDate);
    const response = await this.ctx.curl('122.51.128.124:4770/api/v1/message/sendToFriends', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: { targets, content },
    });

    if (response.status !== 200) {
      throw new ServerException();
    }
    return new Success();
  }

  @post('/sendWeatherToRooms')
  async sendWeatherToRoom() {
    const body: { cityName: string; targets: string[] } = this.ctx.request.body;
    const schema = Joi.object({
      cityName: Joi.string().required(),
      targets: Joi.array()
        .required()
        .min(1)
        .items(Joi.string().required()),
    }).required();

    const v = schema.validate(body);
    if (v.error) {
      throw new HttpException({ msg: `Joi error: ${v.error.message}` });
    }

    const { cityName, targets } = body;
    const weatherDate = await this.service.getDailyWeather(cityName);
    const content = this.service.getWeatherString(weatherDate);
    const response = await this.ctx.curl('122.51.128.124:4770/api/v1/message/sendToRooms', {
      method: 'POST',
      // NOTE: 踩坑，之前一直拿不到 targets
      headers: { 'content-type': 'application/json' },
      data: {
        targets: targets.map(name => ({ name })),
        content,
      },
    });
    if (response.status !== 200) {
      throw new ServerException({ msg: response.data.toString() });
    }
    return new Success();
  }
}
