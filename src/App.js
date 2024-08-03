import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HouseDetail from "./House-detail/HouseDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({});

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
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      <RouterProvider router={router}></RouterProvider>;
    </QueryClientProvider>
  );
}
