import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from 'app/routes/AppRouter'
import './index.css';
import { getUserFx } from "@features/load-user";
const root = ReactDOM.createRoot(document.getElementById("root")!);
const token = localStorage.getItem('token');
if (token) {
  getUserFx(token);
}

root.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);
