import axios from "axios";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
config();

const app = express();
const port = process.env.PORT;

app.use(cors());

const corsOptions = {
    origin: ["http://localhost:5173"], // Dominios permitidos
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
    exposedHeaders: ["Content-Range", "X-Content-Range"], // Headers expuestos al cliente
    credentials: true, // Permite credenciales (cookies, auth headers)
    maxAge: 86400, // Tiempo de cache preflight en segundos
};

app.get("/get_available_countries", async (req, res) => {
    try {
        const { data: countries } = await axios.get(
            `${process.env.DATE_NAGER_BASE_URL}/AvailableCountries`
        );
        res.status(200).send({ data: countries, error: false });
    } catch (error) {
        res.status(502).send({
            error: true,
            msg: "An error has ocurred on request",
            data: error,
        });
    }
});

app.get("/get_country_info/:country_code", async (req, res) => {
    try {
        const country_code = req.params.country_code;
        const { data: country_data } = await axios.get(
            `${process.env.DATE_NAGER_BASE_URL}/CountryInfo/${country_code}`
        );

        const border_countries = country_data?.borders;
        const country_name = country_data?.commonName;

        const { data: population_response } = await axios.post(
            `${process.env.COUNTRIESNOW_BASE_URL}/countries/population`,
            { country: country_name }
        );

        const population_data = population_response.data.populationCounts;

        const { data: iso_response } = await axios.post(
            `${process.env.COUNTRIESNOW_BASE_URL}/countries/iso`,
            { country: country_name }
        );

        const iso2 = iso_response.data.Iso2;

        const { data: flag_response } = await axios.post(
            `${process.env.COUNTRIESNOW_BASE_URL}/countries/flag/images`,
            { iso2 }
        );

        const flag_url = flag_response.data.flag;

        res.send({
            error: false,
            data: {
                border_countries,
                population_data,
                flag_url,
                country_name,
            },
        });
    } catch (error) {
        res.status(502).send({
            error: true,
            msg: "An error has ocurred on request",
            data: error,
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
