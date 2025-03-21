import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { ToastContainer } from "react-toastify";
import AppContextProvider from "./context/AppContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={routes} />
          <ToastContainer autoClose={2000} />
        </HelmetProvider>
      </QueryClientProvider>
    </AppContextProvider>
  </StrictMode>
);
