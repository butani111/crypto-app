import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import bitcoinImg from "../assets/bitcoin.png";

const Home = () => {
  return (
    <Box w={"full"} h={"85vh"} bgColor={"blackAlpha.900"}>
      <Image src={bitcoinImg} w={"full"} h={"full"} objectFit={"contain"} />

      <Text
        color={"whiteAlpha.700"}
        fontSize={"6xl"}
        fontWeight={"thin"}
        textAlign={"center"}
        mt={"-20"}
      >
        SBcrypto
      </Text>
    </Box>
  );
};

export default Home;
