"use client";

import { useEffect } from "react";

export default function ClientHydrationSuppressor() {
    useEffect(() => {
        // Intercept console.error to suppress specific hydration warnings from extensions
        const originalError = console.error;
        console.error = (...args) => {
            if (
                typeof args[0] === "string" &&
                (args[0].includes("bis_skin_checked") ||
                    args[0].includes("Hydration failed") ||
                    args[0].includes("server rendered HTML"))
            ) {
                return;
            }
            originalError.apply(console, args);
        };
    }, []);

    return null;
}
