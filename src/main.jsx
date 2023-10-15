import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout";
import NewClient, { action as addNewClient } from "./pages/NewClient";
import Index, { loader as clientsLoader } from "./pages/Index";
import ErrorPage from "./components/ErrorPage";
import EditClient, { loader as editClientLoader, action as editClientAction } from "./pages/EditClient";
import {action as deleteClientAction} from "./components/Client";



const router = createBrowserRouter([
  {
    path: "/crm-React/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientsLoader,
        errorElement: <ErrorPage />
      },
      {
        path: "/crm-React/clients/new",
        element: <NewClient />,
        action: addNewClient,
        errorElement: <ErrorPage />
      },
      {
        path: '/crm-React/clients/:clientId/edit',
        element: <EditClient />,
        loader: editClientLoader,
        action: editClientAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/crm-React/clients/:clientId/delete',
   /*      element: <DeleteClient />, */
        action: deleteClientAction,
        errorElement: <ErrorPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
