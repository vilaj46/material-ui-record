import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
// import jest from "@testing-library/jest-dom";

import Header from "./Header";
import FileProvider, { useFile, useFileUpdate } from "../Context/FileProvider";
import ModalProvider from "../Context/ModalProvider";

const getFindByTextHeader = () => {
  const wrapper = ({ children }) => (
    <FileProvider>
      <ModalProvider>{children}</ModalProvider>
    </FileProvider>
  );
  const { findByText } = render(<Header />, { wrapper });
  return findByText;
};

test("renders the header with a Document button", async () => {
  const headerText = getFindByTextHeader();
  const text = await headerText(/document/i);
  const classN = text.className;
  expect(classN).toBe("MuiButton-label");
});

test("renders the header with a File button", async () => {
  const headerText = getFindByTextHeader();
  const text = await headerText(/file/i);
  const classN = text.className;
  expect(classN).toBe("MuiButton-label");
});

// Can test it was closed before hand but we did that already.
test("Opens File Dropdown", async () => {
  const headerText = getFindByTextHeader();
  const text = await headerText(/file/i);

  const click = new MouseEvent("click", { bubbles: true, cancelable: true });

  fireEvent(text, click);
  const wrapper = ({ children }) => (
    <FileProvider>
      <ModalProvider>{children}</ModalProvider>
    </FileProvider>
  );

  const { getAllByTestId } = render(<Header />, { wrapper });
  const classN = getAllByTestId("file-dropdown")[0].className;
  expect(classN).toBe("opened");
});

test("Opens Document Dropdown", async () => {
  global.URL.createObjectURL = jest.fn();
  const click = new MouseEvent("click", { bubbles: true, cancelable: true });

  const wrapper = ({ children }) => (
    <FileProvider>
      <ModalProvider>{children}</ModalProvider>
    </FileProvider>
  );

  const state = { name: "test.pdf", blob: "test.blob" };
  const { result } = renderHook((state) => useFileUpdate(state), {
    wrapper,
    initialProps: false,
  });

  act(() => {
    result.current.openFile(state);
  });

  // console.log(result.current);

  const { findByText, rerender, findAllByText, getByTestId } = render(
    <Header />,
    {
      wrapper,
    }
  );

  const text = await findByText(/document/i);
  fireEvent(text, click);
  console.log(getByTestId("document-dropdown"));
});
