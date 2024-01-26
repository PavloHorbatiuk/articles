import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Routing } from "./routes/routing";
import { UIContextProvider } from "./common/UIContext";

function App() {
    return (
        <div className='App'>
            <UIContextProvider>
                <RouterProvider router={Routing} />
            </UIContextProvider>
        </div>
    );
}

export default App;
