import { Context } from 'midway';

export default () => async (ctx: Context, next: any) => {
  try {
    await next();
  } catch (error) {
    // TODO: 按错误返回详细报错信息
    console.log(error);
    ctx.status = 400;
    ctx.body = '未知异常';
  }
};
