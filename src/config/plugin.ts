import { EggPlugin } from 'midway';

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

export default {
  static: true, // default is true
} as EggPlugin;
