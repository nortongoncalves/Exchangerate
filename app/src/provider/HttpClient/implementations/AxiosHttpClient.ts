import axios, {AxiosResponse} from 'axios';
import IHttpClient, {
  IHttpClientParams,
  IHttpClientResponse,
} from '../models/IHttpClient';

export default class AxiosHttpClient implements IHttpClient {
  private axiosResponse: AxiosResponse = {} as AxiosResponse;

  public async get<IResponseData>({
    url,
    headers,
  }: IHttpClientParams): Promise<IHttpClientResponse<IResponseData> | Error> {
    try {
      this.axiosResponse = await axios.get(url, {
        headers,
      });
      if (!this.axiosResponse)
        throw Error('Erro ao realizar a chamada http get');
    } catch (error) {
      return error;
    }
    return this.axiosResponse;
  }
}
