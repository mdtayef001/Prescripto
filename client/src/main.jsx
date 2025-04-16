import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ToastContainer } from "react-toastify";
import AppContextProvider from "./context/AppContext.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
            <RouterProvider router={routes} />
            <ToastContainer autoClose={2000} position="top-right" />
          </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
