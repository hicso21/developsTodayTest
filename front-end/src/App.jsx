import { Route, Routes } from "react-router-dom";
import "./App.css";
import CountryInfo from "./views/CountryInfo";
import CountryList from "./views/CountryList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/:country_code" element={<CountryInfo />} />
        </Routes>
    );
}

export default App;
