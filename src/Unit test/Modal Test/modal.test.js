import React, { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal, { Open, Window } from "../../Modals/Modal";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../../Header/Form/mainFormSlice";
import { modalContext } from "../../Modals/Modal";

const initialState = {
  form: {
    curSelectInput: null,
    region: "all",
    selectedStartDate: null,
    selectedEndDate: null,
  },
};

const mockStore = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState: initialState,
});

describe("Modal Component", () => {
  it("Modal should render children correctly", () => {
    render(
      <Provider store={mockStore}>
        <Modal>
          <div>Modal content</div>
        </Modal>
      </Provider>
    );
    const button = screen.getByText("Modal content");
    expect(button).toBeInTheDocument();
  });

  describe("Open Component", () => {
    it("should call open function with correct window name on click", () => {
      const mockOpen = jest.fn();
      render(
        <Provider store={mockStore}>
          <modalContext.Provider value={{ open: mockOpen }}>
            <Open opens="checkIn">
              <button>Open Check-In Modal</button>
            </Open>
          </modalContext.Provider>
        </Provider>
      );
      fireEvent.click(screen.getByText("Open Check-In Modal"));
      expect(mockOpen).toHaveBeenCalledWith("checkIn");
    });
  });

  describe("Window Component", () => {
    it("should render children correctly when openName matches", () => {
      const mockModalRef = React.createRef();
      render(
        <Provider store={mockStore}>
          <modalContext.Provider value={{ openName: "checkIn" }}>
            <Window name="checkIn" modalRef={mockModalRef}>
              <div>Check-In Window Content</div>
            </Window>
          </modalContext.Provider>
        </Provider>
      );
      expect(screen.getByText("Check-In Window Content")).toBeInTheDocument();
      expect(mockModalRef.current).toBeInTheDocument();
    });

    it("should not render children when openName does not match", () => {
      const mockModalRef = React.createRef();
      render(
        <Provider store={mockStore}>
          <modalContext.Provider value={{ openName: "checkOut" }}>
            <Window name="checkIn" modalRef={mockModalRef}>
              <div>Check-In Window Content</div>
            </Window>
          </modalContext.Provider>
        </Provider>
      );
      expect(
        screen.queryByText("Check-In Window Content")
      ).not.toBeInTheDocument();
      expect(mockModalRef.current).not.toBeInTheDocument();
    });

    it("should call close function when clicked outside the modal", () => {
      const mockClose = jest.fn();
      const mockModalRef = React.createRef();

      render(
        <Provider store={mockStore}>
          <modalContext.Provider
            value={{ openName: "checkIn", close: mockClose }}
          >
            <Window name="checkIn" modalRef={mockModalRef}>
              <div> Check-In Window Content</div>
            </Window>
          </modalContext.Provider>
        </Provider>
      );
      fireEvent.click(document.body);
      expect(mockClose).toHaveBeenCalled();
    });

    it("should not call close function when clicked inside the modal", () => {
      const mockClose = jest.fn();
      const mockModalRef = React.createRef();
      render(
        <Provider store={mockStore}>
          <modalContext.Provider
            value={{ openName: "checkIn", close: mockClose }}
          >
            <Window name="checkIn" modalRef={mockModalRef}>
              <div>Check-In Window Content</div>
            </Window>
          </modalContext.Provider>
        </Provider>
      );
      fireEvent.click(mockModalRef.current);
      expect(mockClose).not.toHaveBeenCalled();
    });
  });
});
