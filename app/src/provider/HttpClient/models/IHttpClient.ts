export interface HttpClientParams {
  url: string;
  body?: JSON;
  headers?: {
    [key: string]: string;
  };
}

export interface HttpClientResponse<IResposeData> {
  data: IResposeData;
  status: number;
  statusText: string;
  headers: any;
  request?: any;
}

export default interface IHttpClient {
  get: <IResposeData>(
    params: HttpClientParams,
  ) => Promise<HttpClientResponse<IResposeData> | Error>;
}
