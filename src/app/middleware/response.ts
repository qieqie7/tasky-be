import { Context } from 'midway';
import { HttpException, Success } from '../../lib/http-response';

export default () => async (ctx: Context, next: any) => {
  try {
    const response: Success | undefined = await next();
    if (response) {
      ctx.status = response.status || 200;
      ctx.body = {
        msg: response.msg || 'ok',
        data: response.data,
      };
    }
  } catch (error) {
    // 成功的请求
    console.log(error);
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
