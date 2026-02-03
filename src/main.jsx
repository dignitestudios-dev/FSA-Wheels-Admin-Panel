import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
    <BrowserRouter>
      <ToasterContainer />
      <App />
      <ToasterContainer />
    </BrowserRouter>
    </AppContextProvider>
  </StrictMode>
);