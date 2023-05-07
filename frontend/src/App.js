
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Store from "./page/store";
import Store_add from "./page/store_add";
import Store_update from "./page/store_update";
import Attract from "./page/attraction";
import Attract_add from "./page/attraction_add";
import Attract_update from "./page/attraction_update";
import Show from "./page/show";
import Show_add from "./page/show_add";
import Show_update from "./page/show_update";
import "./style.css"

const router = createBrowserRouter([
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/store_add",
    element: <Store_add/>,
  },
  {
    path: "/store_update/:store_id",
    element: <Store_update/>,
  },
  {
    path: "/attraction",
    element: <Attract/>,
  },
  {
    path: "/attraction_add",
    element: <Attract_add/>,
  },
  {
    path: "/attraction_update/:attract_id",
    element: <Attract_update/>,
  },
  {
    path: "/show",
    element: <Show/>,
  },
  {
    path: "/show_add",
    element: <Show_add/>,
  },
  {
    path: "/show_update/:show_id",
    element: <Show_update/>,
  }
]);

function App() {

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
