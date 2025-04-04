import { ArrowBackIcon } from "@chakra-ui/icons";
import { CircularProgress, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Loader({ backRoute }) {
    const navigate = useNavigate();

    return (
        <main>
            {backRoute != "" && (
                <Flex
                    position={"fixed"}
                    top={"10px"}
                    left={"10px"}
                    cursor={"pointer"}
                    alignItems={"center"}
                    gap={"5px"}
                    onClick={() => {
                        navigate(backRoute);
                    }}
                >
                    <ArrowBackIcon />
                    <Text>Back</Text>
                </Flex>
            )}
            <Flex
                flexDirection={"column"}
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
            >
                <CircularProgress
                    color="#ff5d00"
                    isIndeterminate
                    size={"100px"}
                />
                <Text fontSize={"xl"} fontWeight={"bold"}>
                    Loading
                </Text>
            </Flex>
        </main>
    );
}
