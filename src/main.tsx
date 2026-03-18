import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initTextSize } from "./hooks/useTextSize";

initTextSize();
createRoot(document.getElementById("root")!).render(<App />);
