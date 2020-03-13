import { Context, inject, controller, get, provide } from 'midway';
import { HousekeeperService } from '../../service/housekeeper';
import { Success, ServerException } from '../../lib/http-exception';

@provide()
@controller('/api/housekeeper')
export class HousekeeperController {
  @inject()
  ctx: Context;

  @inject('housekeeperService')
  service: HousekeeperService;

  @get('/sendWeatherToMyWechat')
  async sendWeatherToMyWechat() {
    const id = this.ctx.query.id || '上海';
    const weather = await this.service.getTowDayWeather(id);
    const content = `早上好啊！
    今日天气预报：
    ${weather.city}今日天气：${weather.weather},  ${weather.temp},  ${weather.wind}
    明日天气：${weather.tomorrow.weather},  ${weather.tomorrow.temp},  ${weather.tomorrow.wind}`;
    const response = await this.ctx.curl('122.51.128.124:4770/api/v1/message/sendToContact', {
      method: 'POST',
      data: { name: '一颗赛艇🚤', content },
    });
    if (response.status === 200) {
      throw new Success('发送成功');
    }
    throw new ServerException({});
  }

  @get('/sendWeatherToCat')
  async sendWeatherToCat() {
    const id = this.ctx.query.id || '上海';
    const weather = await this.service.getTowDayWeather(id);
    const content = `早上好啊！
    今日天气预报：
    ${weather.city}今日天气：${weather.weather},  ${weather.temp},  ${weather.wind}
    明日天气：${weather.tomorrow.weather},  ${weather.tomorrow.temp},  ${weather.tomorrow.wind}`;
    const response = await this.ctx.curl('122.51.128.124:4770/api/v1/message/sendToRooms', {
      method: 'POST',
      // NOTE: 采坑，之前一直拿不到 targets
      headers: { 'content-type': 'application/json' },
      data: {
        targets: [{ name: '猫奴' }],
        content,
      },
    });
    if (response.status === 200) {
      throw new Success('发送成功');
    }
    throw new ServerException({ msg: response.data.toString() });
  }
}
