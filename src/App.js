import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HouseDetail from "./House-detail/HouseDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/house",
    element: <HouseDetail></HouseDetail>,
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
