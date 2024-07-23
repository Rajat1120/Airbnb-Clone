import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
