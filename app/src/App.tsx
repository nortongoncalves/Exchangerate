import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./css/global.css";

import Select from "./components/Select";
import Chart from "./components/Chart";

import GetAllKindsOfMoneysService from "./service/ GetAllKindsOfMoneysService";
import IHttpClient from "./provider/HttpClient/models/IHttpClient";
import AxiosHttpClient from "./provider/HttpClient/implementations/AxiosHttpClient";
import GetExchangeRateThirtyDaysService from "./service/GetExchangeRateThirtyDaysService";
interface IOptionsProps {
  code: string;
  description: string;
}

const App: React.FC = () => {
  const [options, setOptions] = useState<IOptionsProps[]>([]);
  const [selectReady, setSelectReady] = useState(false);
  const [colorSelect, setColorSelect] = useState("#6d6d6d");
  const [dataChart, setDataChart] = useState<Array<[string, number | string]> | null>(null);

  useEffect(() => {
    const httpClient: IHttpClient = new AxiosHttpClient();
    const getAllKindsOfMoneys = new GetAllKindsOfMoneysService(httpClient);
    getAllKindsOfMoneys.execute().then(({ data: { symbols: currencies } }) => {
      const parsedCurrencies = Object.values(currencies);
      setOptions(parsedCurrencies);
      setSelectReady(true);
    });
  }, []);

  const handleChangeSelect = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setColorSelect("#3f51b5");
      const code = event.currentTarget.selectedOptions[0].value;

      const httpClient: IHttpClient = new AxiosHttpClient();
      const getExchangeRateThirtyDays = new GetExchangeRateThirtyDaysService(
        httpClient
      );
      getExchangeRateThirtyDays
        .execute({
          base: code,
          symbol: "BRL",
        })
        .then(({ data }) => {
          const datesRate = [];
          const auxDataChart: Array<[string, number | string]> = [];

          for(const property in data.rates) {
            datesRate.push(property);
          }

          const rates = datesRate.map(dateRate => {
            const [rate] = Object.values(data.rates[dateRate]);
            return rate;
          });

          auxDataChart.push(["x", code]);

          console.log('auxDataChart: ', auxDataChart);

          if (datesRate.length !== rates.length) console.error('(Erro) datesRate != rates');

          for (let index = 0; index < datesRate.length; index ++) {
            auxDataChart.push([datesRate[index],  rates[index]]);
          }

          setDataChart(auxDataChart);
        });
    },
    []
  );

  return (
    <div className="App">
      <div className="container">
        {selectReady && (
          <Select
            defaultValue="default"
            color={colorSelect}
            borderColor={colorSelect}
            onChange={handleChangeSelect}
          >
            <option value="default" disabled>
              Escolha a moeda
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.code}>
                ({option.code}) {option.description}
              </option>
            ))}
          </Select>
        )}
        {dataChart ? (<Chart data={dataChart}/> ) : (<div className="waiting">Esperando uma moeda 😆</div>)}
      </div>
    </div>
  );
};

export default App;
