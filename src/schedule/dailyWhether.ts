import { provide, schedule, CommonSchedule } from 'midway';

@provide()
@schedule({
  cron: '0 0 10 * * ?',
  // interval: '30s',
  type: 'worker', // 指定某一个 worker 执行
})
export class DailyWeather implements CommonSchedule {
  async exec(ctx) {
    console.log('DailyWeather start');
    try {
      await ctx.curl('127.0.0.1:4771/api/housekeeper/sendWeatherToMyWechat');
    } catch (error) {}
  }
}
