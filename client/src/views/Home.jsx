// Home.js

import React from "react";
import ChatWindow from "../components/ChatWindow";

function Home() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
            <header className="mb-8">
                <h1 className="text-4xl">Esmeralda</h1>
            </header>
            <ChatWindow />
        </div>
    );
};

export default Home;
