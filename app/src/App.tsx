import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./css/global.css";

import { Chart } from "react-google-charts";
import Select from "./components/Select";

import GetAllKindsOfMoneysService from "./service/ GetAllKindsOfMoneysService";
import IHttpClient from "./provider/HttpClient/models/IHttpClient";
import AxiosHttpClient from "./provider/HttpClient/implementations/AxiosHttpClient";
import GetExchangeRateThirtyDaysService from './service/GetExchangeRateThirtyDaysService';

interface IOptionsProps {
  code: string;
  description: string;
}

const App: React.FC = () => {
  const [options, setOptions] = useState<IOptionsProps[]>([]);
  const [selectReady, setSelectReady] = useState(false);
  const [colorSelect, setColorSelect] = useState('#6d6d6d');

  useEffect(() => {
    const httpClient: IHttpClient = new AxiosHttpClient();
    const getAllKindsOfMoneys = new GetAllKindsOfMoneysService(httpClient);
    getAllKindsOfMoneys.execute().then(({ data: { symbols: currencies } }) => {
      const parsedCurrencies = Object.values(currencies);
      setOptions(parsedCurrencies);
      setSelectReady(true);
    });
  }, []);

  const handleChangeSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setColorSelect('#3f51b5');
    const code = event.currentTarget.selectedOptions[0].value;

    const httpClient: IHttpClient = new AxiosHttpClient();
    const getExchangeRateThirtyDays = new GetExchangeRateThirtyDaysService(httpClient);
    getExchangeRateThirtyDays.execute({
      base: 'BRL',
      symbol: code,
    }).then(({data}) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        {selectReady && (
          <Select defaultValue="default" color={colorSelect} borderColor={colorSelect} onChange={handleChangeSelect}>
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
        <Chart
          width={"100%"}
          height={600}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['x', 'dogs'],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
            [11, 35],
          ]}
          options={{
            hAxis: {
              title: 'Dates',
            },
            vAxis: {
              title: 'Rates',
            },
          }}
        />
      </div>
    </div>
  );
};

export default App;
