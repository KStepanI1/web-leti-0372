import { useEffect, useState } from "react"


export const useInnerWidth = (): number => {
    const isBrowser = typeof window !== 'undefined';
    const currentWidth = isBrowser ? document.documentElement.clientWidth : 0;
    const [innerWidth, setInnerWidth] = useState<number>(currentWidth);

    useEffect(() => {
        const handleResize = () => {
            const currentInnerWidth = isBrowser ? document.documentElement.clientWidth : 0;
            setInnerWidth(currentInnerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return innerWidth;
}