import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HouseDetail from "./House-detail/HouseDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import Wishlist from "./Main/Wishlist";
import StripePayment from "./CheckoutForm";

const queryClient = new QueryClient({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },

  {
    path: "/house/:id",
    element: <HouseDetail></HouseDetail>,
  },
  {
    path: "/wishlist",
    element: <Wishlist></Wishlist>,
  },
  {
    path: "/book",
    element: <StripePayment></StripePayment>,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}
