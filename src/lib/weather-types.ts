import * as Joi from '@hapi/joi';

export interface Weather {
  results: Result[];
}

interface Result {
  location: Location;
  daily: Daily[];
}

interface Daily {
  date: string;
  text_day: string;
  code_day?: string;
  text_night: string;
  code_night?: string;
  high: string;
  low: string;
  precip: string; // 降水概率
  wind_direction: string; // 风向文字
  wind_direction_degree?: string; //风向角度，范围0~360
  wind_speed: string;
  wind_scale: string; // 风力等级
  rainfall: string; // 降水量，单位mm
  humidity: string; //相对湿度，0~100，单位为百分比
}

interface Location {
  id?: string;
  name: string;
  country?: string;
  path?: string;
  timezone?: string;
  timezone_offset?: string;
}

export const weatherSchema = Joi.object({
  results: Joi.array()
    .required()
    .items(
      Joi.object({
        location: Joi.object({
          name: Joi.string().required(),
        }).required(),
        daily: Joi.array()
          .required()
          .items(
            Joi.object({
              date: Joi.string(),
              text_day: Joi.string(),
              text_night: Joi.string(),
              high: Joi.string(),
              low: Joi.string(),
              wind_direction: Joi.string().allow(''),
              wind_speed: Joi.string(),
              wind_scale: Joi.string(),
              rainfall: Joi.string(),
              humidity: Joi.string(),
            }),
          ),
      }),
    ),
});
