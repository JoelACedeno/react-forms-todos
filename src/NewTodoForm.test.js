import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

// smoke test
it("renders without crashing", () => {
    render(<NewTodoForm />);
})

// snapshot test
it("matching snapshot", () => {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment()).toMatchSnapshot();
})

it("runs the create function on form submit", () => {
    // simulate create function call
    const createMock = jest.fn();
    const { getByText } = render(<NewTodoForm createTodo={createMock} />);
    const createButton = getByText("Add a todo!");
    fireEvent.click(createButton);

    expect(createMock).toHaveBeenCalled();
})