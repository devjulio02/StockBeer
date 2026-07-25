import { useState, useCallback } from "react";

export default function useLiveAnnouncement() {

    const [mensagem, setMensagem] = useState("");

    const anunciar = useCallback((texto) => {

        // Limpa primeiro para forçar o leitor de tela
        setMensagem("");

        requestAnimationFrame(() => {

            setMensagem(texto);

        });

    }, []);

    return {
        mensagem,
        anunciar
    };

}