import React from "react";
import {
  Avatar,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
      color={"whiteAlpha.700"}
      bgColor={"blackAlpha.900"}
    >
      <Stack w={"full"} alignItems={"center"} direction={["column", "row"]}>
        <VStack w={"full"} py={"4"} alignItems={["center", "flex-start"]}>
          <Heading size={"md"}>SBcrypto</Heading>
          
          <Text
            fontSize={"small"}
            letterSpacing={"widest"}
            textAlign={["center", "flex-start"]}
          >
            We are best Crypto trading app in India. We provide consultancy at
            reasonable price.
          </Text>
        </VStack>

        <VStack w={"full"}>
          <Heading textTransform={"uppercase"} size={"md"}>
            Social Media
          </Heading>

          <Button variant={"link"} colorScheme={"white"}>
            <a
              href="https://linkedin.com/in/shyam-butani"
              target={"_blank"}
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </Button>
          <Button variant={"link"} colorScheme={"white"}>
            <a
              href="https://github.com/butani111"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
