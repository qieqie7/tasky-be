import { Context, inject, controller, get, provide } from 'midway';
import * as nodejieba from 'nodejieba';
import { Success } from '../../lib/http-response';

@provide()
@controller('/')
export class HomeController {
  @inject()
  ctx: Context;

  @get('/')
  async index() {
    var result = nodejieba.cut('测试jieba分词，速度和效率我觉得都还可以');
    return new Success({ data: result.join(';') });
  }
}
