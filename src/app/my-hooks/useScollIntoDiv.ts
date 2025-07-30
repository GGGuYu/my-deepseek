import { useEffect, useRef } from "react";


export function useScollIntoDiv(monitorValues:any[]) {

    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(endRef.current) {
            endRef.current?.scrollIntoView({behavior:'smooth'});
        }
    } , monitorValues)

    return endRef;
}