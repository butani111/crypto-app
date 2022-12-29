import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import bitcoinImg from "../assets/bitcoin.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box w={"full"} h={"85vh"} bgColor={"blackAlpha.900"}>
      <motion.div
        style={{ height: "80vh" }}
        animate={{ translateY: "20px" }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <Image src={bitcoinImg} w={"full"} h={"full"} objectFit={"contain"} />
      </motion.div>

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
