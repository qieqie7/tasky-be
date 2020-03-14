import { Context } from 'midway';
import { HttpException, Success } from '../../lib/http-response';

export default () => async (ctx: Context, next: any) => {
  const requestUrl = `${ctx.method} ${ctx.path}`;
  try {
    const response: Success | undefined = await next();
    if (response) {
      ctx.status = response.status || 200;
      ctx.body = {
        msg: response.msg || 'ok',
        data: response.data,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        msg: 'we made a mistake O(∩_∩)O~',
        requestUrl,
      };
    }
  } catch (error) {
    console.log(error);
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
