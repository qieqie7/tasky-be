import { Context } from 'midway';
import { HttpException } from '../../lib/http-exception';

export default () => async (ctx: Context, next: any) => {
  try {
    await next();
  } catch (error) {
    // 成功的请求
    const requestUrl = `${ctx.method} ${ctx.path}`;
    if (error instanceof HttpException) {
      ctx.status = error.status;
      ctx.body = {
        data: error.data,
        msg: error.msg,
        requestUrl,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        msg: error?.message || 'we made a mistake O(∩_∩)O~',
        requestUrl,
      };
    }
  }
};
