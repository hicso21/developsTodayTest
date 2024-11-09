import { useState, useEffect } from "react";

const useWindowWidth = () => {
    // Inicializamos el estado con el ancho actual de la ventana
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
        // Función que actualiza el estado con el nuevo ancho
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Agregamos el event listener
        window.addEventListener("resize", handleResize);

        // Limpiamos el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Array vacío para que solo se ejecute una vez al montar el componente

    return windowWidth;
};

export default useWindowWidth;
