import { Context, inject, controller, get, provide } from 'midway';
import { HousekeeperService } from '../../service/housekeeper';

@provide()
@controller('/api/housekeeper')
export class HousekeeperController {
  @inject()
  ctx: Context;

  @inject('housekeeperService')
  service: HousekeeperService;

  @get('/sendWeatherToMyWechat')
  async sendWeatherToMyWechat() {
    console.log('sendWeatherToMyWechat start');
    const id = this.ctx.query.id || '上海';
    const weather = await this.service.getTowDayWeather(id);
    const content = `早上好啊！下面播报今日天气：
${weather.city}今日温度：${weather.temp}
${weather.wind}`;
    const response = await this.ctx.curl('127.0.0.1:4770/api/v1/message/sendToContact', {
      method: 'POST',
      data: { name: '一颗赛艇🚤', content },
    });
    if (response.status === 200) {
      this.ctx.status = 200;
      this.ctx.body = 'ok';
    } else {
      this.ctx.status = 500;
      this.ctx.body = 'not ok';
    }
  }

  @get('/weather/2day')
  async getTowDayWeather() {
    const id = this.ctx.query.id || '上海';
    const response = await this.ctx.curl(`http://api.help.bj.cn/apis/weather2d/?id=${id}`);
    if (response.status == 200) {
      const { data } = response;
      this.ctx.status = 200;
      this.ctx.body = data.toString('utf8');
    } else {
      throw new Error('天气查询api网络障碍');
    }
  }
}
