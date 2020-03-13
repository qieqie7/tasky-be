interface Response<T = any> {
  msg?: string;
  data?: T;
  status?: number;
}

export class Success<T = undefined> {
  status: number;
  msg: string;
  data?: T;

  constructor(params?: { status?: number; msg?: string; data?: T }) {
    const { status = 200, msg = 'ok', data } = params || {};
    this.status = status;
    this.msg = msg;
    this.data = data;
  }
}

export class HttpException<T = undefined> extends Error {
  public msg: string;
  public data?: T;
  public status: number;

  constructor({ msg = '服务异常', data, status = 400 }: Response) {
    super();
    this.msg = msg;
    this.data = data;
    this.status = status;
  }
}

export class ServerException extends HttpException {
  constructor(params?: Response) {
    const { msg = '服务端异常', status = 500 } = params;
    super({ msg, status });
  }
}

export class TimeoutException extends HttpException {
  constructor(params: Response) {
    const { msg = '服务器超时', status = 504 } = params;
    super({ msg, status });
  }
}
