import { provide, inject, Context } from 'midway';
import { Weather, weatherSchema } from '../lib/weather-types';
import { ServerException } from '../lib/http-response';

@provide('housekeeperService')
export class HousekeeperService {
  @inject()
  ctx: Context;

  async getDailyWeather(cityName: string): Promise<Weather> {
    const privateKey = this.ctx.app.config.xztq.privateKey;

    const response = await this.ctx.curl(
      `https://api.seniverse.com/v3/weather/daily.json?key=${privateKey}&location=${cityName}&language=zh-Hans&unit=c&start=0&days=5`,
    );
    if (response.status == 200) {
      const { data } = response;
      const d: Weather = JSON.parse(data.toString('utf8'));
      const v = weatherSchema.validate(d, { allowUnknown: true });
      if (v.error) {
        throw new Error(v.error.message || '天气查询异常');
      }
      return d;
    } else {
      const d: { status?: string; status_code?: string } = JSON.parse(response.data);
      throw new Error(d.status || '天气查询异常');
    }
  }

  getWeatherString(weatherDate: Weather): string {
    const { results } = weatherDate;
    if (!results[0]) {
      throw new ServerException();
    }
    const {
      daily,
      location: { name: city },
    } = results[0];
    let content = `${city}天气预报：\n`;
    daily.forEach(
      (
        { date, text_day, text_night, high, low, precip, rainfall, wind_direction, wind_scale },
        index,
      ) => {
        let day = date;
        if (index === 0) {
          day = '今日';
        } else if (index === 1) {
          day = '明日';
        }

        content += `${day} ${text_day}转${text_night}\n`;
        content += `${low}℃ ~ ${high}℃${+low < 10 ? '，注意保暖哦' : ''}\n`;
        content += `降雨概率${+precip}%${
          +precip > 30 ? `，降雨量约${rainfall}，外出备把伞吧` : ''
        }\n`;
        content += `${wind_direction || '无'}风${wind_scale ? `，风力为${wind_scale}级` : ''}\n\n`;
      },
    );

    return content;
  }
}
