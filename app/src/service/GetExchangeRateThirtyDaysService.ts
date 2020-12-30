import { format, subDays } from "date-fns";
import IHttpClient, {
  IHttpClientResponse,
} from "../provider/HttpClient/models/IHttpClient";

interface IRatesProps {
  [key: string]: {
    [key: string]: number;
  };
}

interface IResponseData {
  base: string;
  start_date: string;
  end_date: string;
  rates: Array<IRatesProps>;
}

interface IRequest {
  base: string;
  symbol: string;
}

class GetExchangeRateThirtyDaysService {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  public async execute({ base, symbol }: IRequest): Promise<IHttpClientResponse<IResponseData>> {
    const dateNow = new Date();
    const thirtyDaysAgo = subDays(dateNow, 30);
    const formatedDateNow = format(dateNow, "yyy-MM-dd");
    const formatedThirtyDaysAgo = format(thirtyDaysAgo, "yyy-MM-dd");
    const parsedBase = String.prototype.toUpperCase.call(base);
    const parsedSymbol = String.prototype.toUpperCase.call(symbol);
    console.log("formatedDateNow: ", formatedDateNow);
    console.log("formatedThirtyDaysAgo: ", formatedThirtyDaysAgo);
    const url = `https://api.exchangerate.host/timeseries?start_date=${formatedThirtyDaysAgo}&end_date=${formatedDateNow}&base=${parsedBase}&symbols=${parsedSymbol}`;

    const timeSeries = await this.httpClient.get<IResponseData>({
      url,
    });

    if (timeSeries instanceof Error) {
      console.error("ocorreu um erro");
      return Promise.reject(timeSeries);
    }

    return timeSeries;
  }
}

export default GetExchangeRateThirtyDaysService;
