import { provide, schedule, CommonSchedule } from 'midway';

@provide()
@schedule({
  // cron: '0 30 8 * * ?',
  interval: '10s',
  type: 'worker', // 指定某一个 worker 执行
})
export class DailyWeather implements CommonSchedule {
  async exec(ctx) {
    await ctx.curl('127.0.0.1:4771/api/housekeeper/sendWeatherToMyWechat');
    await ctx.curl('127.0.0.1:4771/api/housekeeper/sendWeatherToCat');
  }
}
