import React from "react";

export function GridBackground({children}) {
    return (
        <div className="min-h-screen w-full overflow-hidden dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {children}
        </div>
    );
}