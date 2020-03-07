/*
 * @Desc:
 * @Author: ykst
 * @Date: 2020-03-07 23:28:59
 * @LastEditors: ykst
 * @LastEditTime: 2020-03-08 00:35:14
 */
import { provide, inject, Context } from 'midway';

interface weather {
  status: string;
  city: string;
  aqi: string;
  pm25: string;
  temp: string;
  weather: string;
  wind: string;
  weatherimg: string;
  tomorrow: Tomorrow;
}

interface Tomorrow {
  temp: string;
  weather: string;
  wind: string;
  weatherimg: string;
}

@provide('housekeeperService')
export class HousekeeperService {
  @inject()
  ctx: Context;

  async getTowDayWeather(id: string): Promise<weather> {
    const response = await this.ctx.curl(`https://api.help.bj.cn/apis/weather2d/?id=${id}`);
    if (response.status == 200) {
      const { data } = response;
      const d: weather = JSON.parse(data.toString('utf8'));
      return d;
    } else {
      throw new Error('天气查询api网络障碍');
    }
  }
}
