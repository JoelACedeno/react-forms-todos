import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import Todo from "./Todo";

// smoke test 
it("renders without crashing", () => {
    render(<Todo />);
});

// snapshot test 
it("matches snapshot", () => {
    const { asFragment } = render(<Todo />);
    expect(asFragment()).toMatchSnapshot();
});

// snapshot test for editing
it("matches snapshot when editing", () => {
    const { asFragment, getByText } = render(<Todo />);
    const editButton = getByText("Edit");
    fireEvent.click(editButton);
    expect(asFragment()).toMatchSnapshot();
});

it("runs the update function on form submit", () => {
    // simulate update function call
    const updateMock = jest.fn();
    const { getByText } = render(<Todo update={updateMock} />);
    const editButton = getByText("Edit");
    fireEvent.click(editButton);
    const updateButton = getByText("Update!");
    fireEvent.click(updateButton);

    expect(updateMock).toHaveBeenCalled();
});

it("runs the delete function on button click", () => {
    // simulate delete function call
    const removeMock = jest.fn();
    const { getByText } = render(<Todo remove={removeMock} />);
    const deleteButton = getByText("X");
    fireEvent.click(deleteButton);

    expect(removeMock).toHaveBeenCalled();
})