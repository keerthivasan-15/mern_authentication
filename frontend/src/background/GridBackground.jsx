import React from "react";

export function GridBackground({children}) {
    return (
        <div className="min-h-screen w-full overflow-hidden dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            {children}
        </div>
    );
}