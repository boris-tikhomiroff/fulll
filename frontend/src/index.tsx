import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./global.css";
import SearchProvider from "./context/search.context";
import EditContext from "./context/edit.context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <SearchProvider>
      <EditContext>
        <App />
      </EditContext>
    </SearchProvider>
  </React.StrictMode>
);

reportWebVitals();
