import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
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
    const [,description] = event.currentTarget.selectedOptions[0].innerHTML.split(') ');
    console.log(description);
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
