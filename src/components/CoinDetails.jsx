import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import Chart from "./Chart";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchChartStats = (val) => {
    if (btns.includes(val) === false) val = "24h";
    setDays(val);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);

  if (error)
    return <ErrorComponent message="Error while fetching Coin details" />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={"1"}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={"4"} overflowX={"auto"}>
            {btns.map((i) => (
              <Button key={i} onClick={(e) => switchChartStats(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={["4", "16"]} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {coin.market_data.current_price[currency]}
              </StatNumber>

              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={"2xl"}
              color={"white"}
              bgColor={"blackAlpha.700"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              curr={coin.market_data.current_price[currency]}
              low={coin.market_data.low_24h[currency]}
              high={coin.market_data.high_24h[currency]}
              currencySymbol={currencySymbol}
            />

            <Box w={"full"} p={"4"}>
              <Item title="Max Supply" value={coin.market_data.max_supply} />
              <Item
                title="Circulating Supply"
                value={coin.market_data.circulating_supply}
              />
              <Item
                title="Market Cap"
                value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title="All Time Low"
                value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
              />
              <Item
                title="All Time High"
                value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ curr, low, high, currencySymbol }) => (
  <VStack w={"full"}>
    <Progress
      w={"full"}
      value={((curr - low) * 100) / (high - low)}
      colorScheme={"teal"}
    />

    <HStack w={"full"} justifyContent={"space-between"}>
      <Badge children={`${currencySymbol} ${low}`} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={`${currencySymbol} ${high}`} colorScheme={"green"} />
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack w={"full"} my={"4"} justifyContent={"space-between"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

export default CoinDetails;
