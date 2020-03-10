interface Response<T = any> {
  msg?: string;
  data?: T;
  status?: number;
}

export class HttpException extends Error {
  public msg: string;
  public data: any;
  public status: number;

  constructor({ msg = '服务异常', data, status = 400 }: Response) {
    super();
    this.msg = msg;
    this.data = data;
    this.status = status;
  }
}

export class Success<T = any> extends HttpException {
  constructor(msg: string);
  constructor({ msg, data, status }: Response<T>);
  constructor(params: any) {
    if (typeof params === 'string') {
      super({ msg: params, status: 200 });
    } else {
      const { msg, data, status = 200 } = params as Response<T>;
      super({ msg, data, status });
    }
  }
}

export class ServerException extends HttpException {
  constructor({ msg = '服务端异常', status = 500 }: Response) {
    super({ msg, data: undefined, status });
  }
}

export class TimeoutException extends HttpException {
  constructor({ msg = '服务器超时', status = 504 }: Response) {
    super({ msg, data: undefined, status });
  }
}
