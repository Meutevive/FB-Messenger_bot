import React from "react";

/**
 * Represents a navigation bar component.
 *
 * @return {JSX.Element} The rendered navigation bar component.
 */
function Navbar() {

    return (
        <section className="flex flex-auto items-center justify-evenly h-full pr-2 pl-5 sticky top-0 border border-black bg-black ">
                <h1 className="text-2xl text-white font-semibold">Esmeralda</h1>
        </section>
    );
};


export default Navbar;
