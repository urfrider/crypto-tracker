import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";

interface priceProps {
    coinId: string;
}

const Overview = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 20px;
`;

const OverviewItem = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  font-size: 40px;
  padding: 10px;
  span:first-child {
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;
    color: ${(props) => props.theme.accentColor};
    margin-bottom: 5px;
  }
`;

function Price({ coinId }: priceProps) {
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  return <div>{isLoading ? <h3>Price loading...</h3> :
    <>
      <OverviewItem>
          <span>market cap</span>
          <span>${data?.quotes.USD.market_cap}</span>
      </OverviewItem>
      <Overview>
        <OverviewItem>
          <span>change in 1 year</span>
          <span>{data?.quotes.USD.percent_change_1y}%</span>
        </OverviewItem>
        <OverviewItem>
          <span>change in 30 days</span>
          <span>{data?.quotes.USD.percent_change_30d}%</span>
        </OverviewItem>
        <OverviewItem>
          <span>change in 7 days</span>
          <span>{data?.quotes.USD.percent_change_7d}%</span>
        </OverviewItem>
        <OverviewItem>
          <span>change in 24 hour</span>
          <span>{data?.quotes.USD.percent_change_24h}%</span>
        </OverviewItem>
        <OverviewItem>
          <span>change in 12 hour</span>
          <span>{data?.quotes.USD.percent_change_12h}%</span>
        </OverviewItem>
        <OverviewItem>
          <span>change in 1 hour</span>
          <span>{data?.quotes.USD.percent_change_1h}%</span>
        </OverviewItem>
      </Overview>
    </>

    }</div>;
}

export default Price;
