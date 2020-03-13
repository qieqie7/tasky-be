import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = <DefaultConfig>{};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583562771108_9113';

  // add your config here
  // response 中间件必须放在最后，防止返回被没收啦
  config.middleware = ['response'];

  config.httpclient = {
    request: {
      // default timeout of request
      timeout: 30000,
    },
  };

  return config;
};
