import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Artists from './pages/Artists';
import Studios from './pages/Studios';
import TattooStyles from './pages/TattooStyles';
import PrivatePageArtist from './pages/PrivatePageArtist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "artistes",
    element: <Artists />,
  },
  {
    path: "studios",
    element: <Studios />,
  },
  {
    path: "types-de-tatouage",
    element: <TattooStyles />,
  },
  {
    path: "ma-page-artiste",
    element: <PrivatePageArtist />,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
