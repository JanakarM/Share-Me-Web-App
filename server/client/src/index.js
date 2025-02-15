import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import store from './state-management/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} React={React}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
