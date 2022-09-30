import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
    coinId: string;
}

interface ChartData {

}

function Chart({coinId}:ChartProps) {
    const {isLoading, data} = useQuery(["chart", coinId], () => fetchCoinHistory(coinId));
    console.log(fetchCoinHistory(coinId));
    return (
        <h1>Chart</h1>
    )
}

export default Chart;