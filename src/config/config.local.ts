const mysqlDevConfig = require('../../config/mysql.config.json');
const xztqConfig = require('../../config/xinzhitianqi.config.json');

export const development = {
  watchDirs: ['app', 'lib', 'service', 'config', 'app.ts', 'agent.ts', 'interface.ts'],
  overrideDefault: true,
};

export const mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: mysqlDevConfig.host,
    // 端口号
    port: mysqlDevConfig.port,
    // 用户名
    user: mysqlDevConfig.user,
    // 密码
    password: mysqlDevConfig.password,
    // 数据库名
    database: 'tasty-be',
  },
  // 是否加载到 app 上，默认开启
  // app: true,
  // 是否加载到 agent 上，默认关闭
  // agent: false,
};

export const xztq = {
  privateKey: xztqConfig['private_key'],
};
