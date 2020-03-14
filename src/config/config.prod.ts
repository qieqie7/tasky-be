const mysqlProdConfig = require('/root/config/mysql.config.json');
const xztqConfig = require('/root/config/xinzhitianqi.config.json');

export const mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: mysqlProdConfig.host,
    // 端口号
    port: mysqlProdConfig.port,
    // 用户名
    user: mysqlProdConfig.user,
    // 密码
    password: mysqlProdConfig.password,
    // 数据库名
    database: 'tasty-be',
  },
  // 是否加载到 app 上，默认开启
  // app: true,
  // 是否加载到 agent 上，默认关闭
  // agent: false,
};

// 心知天气
export const xztq = {
  privateKey: xztqConfig['private_key'],
};
