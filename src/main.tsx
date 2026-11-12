import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { CatalogProvider } from "./providers/catalog";
import "./index.css";
import "react-easy-crop/react-easy-crop.css";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <CatalogProvider>
      <App />
    </CatalogProvider>
  </StrictMode>
);

createRoot(elem).render(app);
