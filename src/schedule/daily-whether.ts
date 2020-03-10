import { provide, schedule, CommonSchedule } from 'midway';

@provide()
@schedule({
  cron: '0 30 8 * * ?',
  type: 'worker', // 指定某一个 worker 执行
})
export class DailyWeather implements CommonSchedule {
  async exec(ctx) {
    try {
      await ctx.curl('127.0.0.1:4771/api/housekeeper/sendWeatherToMyWechat');
    } catch (error) {}
  }
}
