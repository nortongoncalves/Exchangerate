export interface IHttpClientParams {
  url: string;
  body?: JSON;
  headers?: {
    [key: string]: string;
  };
}

export interface IHttpClientResponse<IResposeData> {
  data: IResposeData;
  status: number;
  statusText: string;
  headers: any;
  request?: any;
}

export default interface IHttpClient {
  get: <IResposeData>(
    params: IHttpClientParams,
  ) => Promise<IHttpClientResponse<IResposeData> | Error>;
}
