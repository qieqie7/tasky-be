import { provide, schedule, CommonSchedule } from 'midway';

@provide()
@schedule({
  cron: '0 30 8 * * ?',
  // interval: '20s',
  type: 'worker', // 指定某一个 worker 执行
})
export class DailyWeather implements CommonSchedule {
  async exec(ctx) {
    await ctx.curl('127.0.0.1:4771/api/housekeeper/sendWeatherToRooms', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: {
        cityName: '上海',
        targets: ['猫奴', '上海❤️美食外卖红包2群', '上海❤️美食外卖红包3群'],
      },
    });

    await ctx.curl('127.0.0.1:4771/api/housekeeper/sendWeatherToRooms', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: { cityName: '黄山', targets: ['无产阶级无所畏惧'] },
    });
  }
}
