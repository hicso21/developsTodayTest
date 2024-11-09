import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <ChakraProvider>
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>
    </ChakraProvider>
);
