import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./common/ErrorBoundary/ErrorBoundary";
import StoreProvider from "./store/StoreProvider/StoreProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <ErrorBoundary>
        <StoreProvider>
            <App />
        </StoreProvider>
    </ErrorBoundary>
);
reportWebVitals();
