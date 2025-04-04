import React, { useEffect, useState } from "react";
import fetchAPI from "../functions/fetchAPI";
import { toast } from "react-toastify";
import { Card, CardBody, CircularProgress, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Loader from "../commons/Loader";

const countriesFetcher = () => {
    const [data, setData] = useState([]);

    const fetch = async ({ isLoading, setIsLoading }) => {
        setIsLoading(true);
        try {
            const { data: countriesAPI } = await fetchAPI.get(
                "/get_available_countries"
            );
            console.log(countriesAPI);
            if (countriesAPI?.error) {
                setIsLoading(false);
                return toast.error("An error has ocurred");
            }
            const countriesData = countriesAPI?.data;
            setData(countriesData?.slice());
        } catch (error) {
            setData([]);
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

export default function CountryList() {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetch = async () => {
        setIsLoading(true);
        const { data: countriesAPI } = await fetchAPI.get(
            "/get_available_countries"
        );
        console.log(countriesAPI);
        if (countriesAPI.error) {
            setIsLoading(false);
            return toast.error("An error has ocurred");
        }
        setCountries(countriesAPI.data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);

    return isLoading ? (
        <Loader backRoute="" />
    ) : (
        <main>
            <Text fontSize={"3xl"} className="title">
                Country List
            </Text>
            <Flex className="countries-container">
                {countries?.map((country) => (
                    <Card
                        key={country.name}
                        onClick={() => {
                            navigate(`/${country.countryCode}`);
                        }}
                        style={{
                            width: "250px",
                            cursor: "pointer",
                        }}
                        transition={".3s all"}
                        background={"#ff5d00"}
                        border={"1px solid transparent"}
                        color={"white"}
                        _hover={{
                            color: "#ff5d00",
                            background: "white",
                            border: "1px solid #ff5d00",
                        }}
                    >
                        <CardBody>
                            <Text textAlign={"center"} fontSize={"xl"}>
                                {country.countryCode}
                            </Text>
                            <Text fontSize={"large"}>{country.name}</Text>
                        </CardBody>
                    </Card>
                ))}
            </Flex>
        </main>
    );
}
