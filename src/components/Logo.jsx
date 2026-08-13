// src/components/Logo.jsx
import React from "react";

/**
 * Prajyot Infotech Logo Component
 * Uses the SingleLogo.png image with brand name text
 */
export default function Logo({
    size = 36,
    showText = true,
    className = ""
}) {
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <img
                src="/videos/SingleLogo.png"
                alt="Prajyot Infotech"
                width={size}
                height={size}
                className="flex-shrink-0 object-contain"
                style={{ width: size, height: size }}
            />
            {showText && (
                <span className="font-bold text-lg tracking-tight">
                    <span className="text-brand-700">Prajyot</span>
                    <span className="text-navy-800"> Infotech</span>
                </span>
            )}
        </div>
    );
}
