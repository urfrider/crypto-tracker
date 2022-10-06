import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChartProps {
  coinId: string;
}

interface ChartData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<ChartData[]>(
    ["chart", coinId],
    () => fetchCoinHistory(coinId)
);
  return (
    <div>
      {isLoading ? (
        <h3>Chart Loading...</h3>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map(price => ({
                x: new Date(parseInt(price.time_close)),
                y: [price.open, price.high, price.low, price.close],
              })) as unknown as number[],
            },
          ]}
        //   series={[
        //     {
        //       name: "Price",
        //       data: data?.map((price) => price.close) as number[],
        //     },
        //   ]}
          options={{
            theme: {
              mode: isDark? "dark": "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) =>
                new Date(parseInt(price.time_close) * 1000).toUTCString()
              ),
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            stroke: { curve: "smooth" },
            grid: { show: false },
            yaxis: {
              show: false,
              labels: { formatter: (value) => `$${value.toFixed(3)}` },
            },
            // fill: {
            //   type: "gradient",
            //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            // },
            // colors: ["#0fbcf9"],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
