import { Chart as ChartGoogle } from "react-google-charts";

interface IProps {
  data: Array<[string, number | string]>;
}

const Chart: React.FC<IProps> = ({data}) => {
  return (
    <ChartGoogle
      width={"100%"}
      height={600}
      chartType="LineChart"
      loader={<div className="loadingChart">Loading Chart...</div>}
      data={data}
      options={{
        hAxis: {
          title: "Dates",
        },
        vAxis: {
          title: "Rates",
        },
      }}
    />
  );
};

export default Chart;
