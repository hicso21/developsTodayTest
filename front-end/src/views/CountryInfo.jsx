import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Card,
    CardBody,
    CardHeader,
    CircularProgress,
    Flex,
    Image,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import fetchAPI from "../functions/fetchAPI";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import useWindowWidth from "../hooks/useWindowWidth";
import Loader from "../commons/Loader";

const countryDataFetcher = ({ isLoading, setIsLoading }) => {
    const [data, setData] = useState({
        countryData: {},
        population: [],
    });

    const fetch = async () => {
        setIsLoading(true);
        try {
            const { data: countryDataAPI } = await fetchAPI.get(
                `/get_country_info/${country_code}`
            );
            console.log(countryDataAPI);
            if (countryDataAPI?.error) {
                setIsLoading(false);
                return toast.error("An error has ocurred");
            }
            const countryData = countryDataAPI?.data;
            const population = countryDataAPI?.data?.population_data;
            setData({ countryData, population });
        } catch (error) {
            setData({
                countryData: {},
                population: [],
            });
            toast.error("An error has ocurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return data;
};

export default function CountryInfo() {
    const { country_code } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(false);
    const windowWidth = useWindowWidth();
    const data = countryDataFetcher({ isLoading, setIsLoading });

    useEffect(() => {
        fetch();
    }, [country_code]);

    return isLoading ? (
        <Loader backRoute={"/"} />
    ) : Object.values(countryData).length == 0 ? (
        <main>
            <Flex
                position={"fixed"}
                top={"10px"}
                left={"10px"}
                cursor={"pointer"}
                alignItems={"center"}
                gap={"5px"}
                onClick={() => {
                    navigate("/");
                }}
            >
                <ArrowBackIcon />
                <Text>Back</Text>
            </Flex>
            <Flex
                height={"100dvh"}
                width="100dvw"
                justifyContent="center"
                alignItems="center"
            >
                <Text fontSize={"3xl"}>This country was not found </Text>
            </Flex>
        </main>
    ) : (
        <main>
            <Flex
                position={"fixed"}
                top={"10px"}
                left={"10px"}
                cursor={"pointer"}
                alignItems={"center"}
                gap={"5px"}
                onClick={() => {
                    navigate("/");
                }}
            >
                <ArrowBackIcon />
                <Text>Back</Text>
            </Flex>
            <Flex
                flexDirection={"column"}
                paddingTop={0}
                padding={"20px"}
                width={"100%"}
                height={"100%"}
            >
                <Text fontSize={"5xl"} className="title">
                    {data?.countryData.country_name}
                </Text>
                <Flex alignItems={"start"}>
                    <Image
                        src={data?.countryData.flag_url}
                        width={"40dvw"}
                        maxWidth={"450px"}
                        objectFit={"contain"}
                    />
                    <Box
                        flex={1}
                        display={"flex"}
                        justifyContent={"center"}
                        height={"100%"}
                    >
                        {data?.countryData?.border_countries.length == 0 ? (
                            <Text marginBlock={"auto"}>
                                No bordering countries
                            </Text>
                        ) : (
                            <Accordion allowToggle>
                                <AccordionItem
                                    border={"1px solid #ff5d00"}
                                    borderRadius={"5px"}
                                    onClick={() => {
                                        setAccordionOpen((curr) => !curr);
                                    }}
                                    background={"#ff5d00"}
                                    color={"white"}
                                    _hover={{
                                        background: "white",
                                        color: "#ff5d00",
                                    }}
                                    transition={".3s all"}
                                >
                                    <AccordionButton transition={".3s all"}>
                                        <Text>Bordering Countries</Text>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel>
                                        {data?.countryData?.border_countries?.map(
                                            (borderCountry) => (
                                                <Text
                                                    cursor={"pointer"}
                                                    marginBlock={"2px"}
                                                    onClick={() => {
                                                        navigate(
                                                            `/${borderCountry.countryCode}`
                                                        );
                                                    }}
                                                    key={
                                                        borderCountry.countryCode
                                                    }
                                                >{`(${borderCountry.countryCode}) ${borderCountry.commonName} - ${borderCountry.region}`}</Text>
                                            )
                                        )}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </Box>
                </Flex>
                <Flex justifyContent={"center"} paddingTop={"30px"} flex={1}>
                    <Card>
                        <CardHeader>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"600"}
                                textAlign={"center"}
                            >
                                Population Chart
                            </Text>
                        </CardHeader>
                        <CardBody paddingLeft={5}>
                            <LineChart
                                width={
                                    windowWidth <= 480 ? 350 : windowWidth - 100
                                }
                                height={windowWidth <= 480 ? 400 : 300}
                                data={data?.population}
                            >
                                <XAxis dataKey="year" />
                                <YAxis
                                    tickFormatter={(value) =>
                                        value % 1000000 == 0
                                            ? `${value / 1000000}M`
                                            : `${value / 1000}K`
                                    }
                                />
                                <Tooltip />
                                <Line
                                    type="basisOpen"
                                    dataKey="value"
                                    stroke="#ff5d00"
                                    strokeWidth={1}
                                />
                            </LineChart>
                        </CardBody>
                    </Card>
                </Flex>
            </Flex>
        </main>
    );
}
