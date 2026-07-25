import { useEffect, useRef } from "react";

export default function useFocusTrap(aberto, onClose) {

    const modalRef = useRef(null);

    const ultimoElemento = useRef(null);

    const onCloseRef = useRef(onClose);

    useEffect(() => {

        onCloseRef.current = onClose;

    }, [onClose]);

    useEffect(() => {

        if (!aberto || !modalRef.current) return;

        // Guarda o elemento que possuía o foco antes do modal abrir
        ultimoElemento.current = document.activeElement;

        const modal = modalRef.current;

        // Coloca o foco no próprio diálogo
        modal.focus();

        function handleKeyDown(event) {

            if (event.key === "Escape") {

                event.preventDefault();

                onCloseRef.current();

                return;

            }

            if (event.key !== "Tab") return;

            // Recalcula os elementos focáveis sempre que Tab for pressionado
            const focaveis = Array.from(
                modal.querySelectorAll(
                    'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
                )
            ).filter(elemento => {

                const estilo = window.getComputedStyle(elemento);

                return (
                    estilo.display !== "none" &&
                    estilo.visibility !== "hidden"
                );

            }); console.table(

                    focaveis.map((el) => ({

                        texto: el.innerText,

                        classe: el.className,

                        disabled: el.disabled

                    }))

                );

            if (focaveis.length === 0) {

                event.preventDefault();

                return;

            }

            const primeiro = focaveis[0];

            const ultimo = focaveis[focaveis.length - 1];

            if (event.shiftKey) {

                if (
                    document.activeElement === primeiro ||
                    document.activeElement === modal
                ) {

                    event.preventDefault();

                    ultimo.focus();

                }

            } else {

                if (document.activeElement === ultimo) {

                    event.preventDefault();

                    primeiro.focus();

                }

            }

        }

        modal.addEventListener("keydown", handleKeyDown);

        return () => {

            modal.removeEventListener("keydown", handleKeyDown);

            if (ultimoElemento.current) {

                ultimoElemento.current.focus();

            }

        };

    }, [aberto]);

    return modalRef;

}