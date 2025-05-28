import { HeroUIProvider } from "@heroui/react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store";

const ToastConfig = () => {
  const savedConfig = useSelector((state) => state.toast);

  return <ToastContainer {...savedConfig} />;
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HeroUIProvider>
      <main>
        <App />
        <ToastConfig />
      </main>
    </HeroUIProvider>
  </Provider>
);
