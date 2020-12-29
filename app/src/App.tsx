import React, { useEffect, useState } from "react";
import "./css/global.css";

import { Chart } from "react-google-charts";
import Select from "./components/Select";

import GetAllKindsOfMoneysService from "./service/ GetAllKindsOfMoneysService";
import IHttpClient from "./provider/HttpClient/models/IHttpClient";
import AxiosHttpClient from "./provider/HttpClient/implementations/AxiosHttpClient";

interface IOptionsProps {
  code: string;
  description: string;
}

const App: React.FC = () => {
  const [options, setOptions] = useState<IOptionsProps[]>([]);
  const [optionsReady, setOptionsReady] = useState(false);

  useEffect(() => {
    const httpClient: IHttpClient = new AxiosHttpClient();
    const getAllKindsOfMoneys = new GetAllKindsOfMoneysService(httpClient);
    console.log('realizou a requisição');
    getAllKindsOfMoneys.execute().then(({ data: { symbols: currencies } }) => {
      const parsedCurrencies = Object.values(currencies);
      setOptions(parsedCurrencies);
      setOptionsReady(true);
    });

  }, []);

  return (
    <div className="App">
      <div className="container">
        <Select defaultValue="default">
          <option value="default" disabled>
            Escolha a moeda
          </option>
          {optionsReady &&
            options.map((option, index) => (
              <option key={index} value={option.code}>
                ({option.code}) {option.description}
              </option>
            ))}
        </Select>
        <Chart
          width={"100%"}
          height={600}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            [
              { type: "number", label: "x" },
              { type: "number", label: "values" },
              { id: "i0", type: "number", role: "interval" },
              { id: "i1", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
            ],
            [1, 100, 90, 110, 85, 96, 104, 120],
            [2, 120, 95, 130, 90, 113, 124, 140],
            [3, 130, 105, 140, 100, 117, 133, 139],
            [4, 90, 85, 95, 85, 88, 92, 95],
            [5, 70, 74, 63, 67, 69, 70, 72],
            [6, 30, 39, 22, 21, 28, 34, 40],
            [7, 80, 77, 83, 70, 77, 85, 90],
            [8, 100, 90, 110, 85, 95, 102, 110],
          ]}
          options={{
            intervals: { style: "sticks" },
            legend: "none",
          }}
        />
      </div>
    </div>
  );
};

export default App;
