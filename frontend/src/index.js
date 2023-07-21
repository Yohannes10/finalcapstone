// import necessary modules
import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import { Routes } from "react-router-dom/dist";



// create a root container

const rootElement = document.getElementById('root');

// render app component
const root = createRoot(rootElement);
root.render(
  <Router>
    <App />
    </Router>
);