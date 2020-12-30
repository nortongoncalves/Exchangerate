import IHttpClient, {
  IHttpClientResponse,
} from "../provider/HttpClient/models/IHttpClient";

interface IResponseData {
  symbols: {
    [key: string]: {
      description: string;
      code: string;
    };
  };
}

class GetAllKindsOfMoneysService {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  public async execute(): Promise<IHttpClientResponse<IResponseData>> {
    const moneys = await this.httpClient.get<IResponseData>({
      url: "https://api.exchangerate.host/symbols",
    });

    if (moneys instanceof Error) {
      console.error("ocorreu um erro");
      return Promise.reject(moneys);
    }

    return moneys;
  }
}

export default GetAllKindsOfMoneysService;
