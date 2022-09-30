import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
}


interface ChartData {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({coinId}:ChartProps) {
    const {isLoading, data} = useQuery<ChartData>(["chart", coinId], () => fetchCoinHistory(coinId));
    console.log(fetchCoinHistory(coinId));
    return (
        <>
            {isLoading? <h3>Chart Loading...</h3> : <ApexChart />}
        </>
    )
}

export default Chart;