import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

// simulates submitting a new todo with the task value of "write tests"
const addTodo = (todoList, task = "write tests") => {
    const taskInput = todoList.getByLabelText("Task:");
    fireEvent.change(taskInput, { target: { value: task } });
    const submitButton = todoList.getByText("Add a todo!");
    fireEvent.click(submitButton);
}

// smoke test 
it("renders without crashing", () => {
    render(<TodoList />);
});

// snapshot test
it("matches snapshot", () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("can add a todo", () => {
    const list = render(<TodoList />);
    addTodo(list);

    // expect form to be cleared and todo to be on the page
    expect(list.getByLabelText("Task:")).toHaveValue("");
    expect(list.getByText("write tests")).toBeInTheDocument();
    expect(list.getByText("Edit")).toBeInTheDocument();
    expect(list.getByText("X")).toBeInTheDocument();
});

it("can edit a todo", () => {
    const list = render(<TodoList />);
    addTodo(list);

    // simulate clicking edit button, updating field text, and clicking update
    fireEvent.click(list.getByText("Edit"));
    const editInput = list.getByDisplayValue("write tests");
    fireEvent.change(editInput, { target: { value: "drink water" } });
    fireEvent.click(list.getByText("Update!"));

    // expect only updated todo to be on the page
    expect(list.getByText("drink water")).toBeInTheDocument();
    expect(list.queryByText("write tests")).not.toBeInTheDocument();
});

it("can delete a todo", () => {
    const list = render(<TodoList />);
    addTodo(list);

    fireEvent.click(list.getByText("X"));

    expect(list.queryByText("write tests")).not.toBeInTheDocument();
})