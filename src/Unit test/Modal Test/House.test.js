import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import House from "../../Main/House";
import configureMockStore from "redux-mock-store";
import { useInfiniteQuery } from "@tanstack/react-query";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Mock the react-query hook
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useInfiniteQuery: jest.fn(),
}));

// Mock the broadcast-channel library
jest.mock("broadcast-channel", () => {
  return {
    BroadcastChannel: jest.fn().mockImplementation(() => ({
      postMessage: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      close: jest.fn(),
    })),
  };
});

// Mock the redux store
const mockStore = configureMockStore([]);

describe("House Component Rendering", () => {
  let store;
  let queryClient;

  beforeEach(() => {
    store = mockStore({
      app: {
        selectedIcon: "Homes",
        hoveredItems: [],
        startScroll: true,
        userFavListing: [],
      },
    });

    queryClient = new QueryClient();
  });

  test("renders loading skeletons when data is pending", () => {
    useInfiniteQuery.mockReturnValue({
      status: "pending",
      data: null,
    });

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <House />
        </QueryClientProvider>
      </Provider>
    );

    const skeletons = screen.getAllByTestId("skeleton-loader");
    expect(skeletons).toHaveLength(50); // Assuming 50 skeleton loaders are rendered
  });
});
