import { render, screen, fireEvent } from "@testing-library/react";
import CheckBoxInput from ".";

describe("<CheckBoxInput />", () => {
  test("renders correctly when checked", () => {
    render(<CheckBoxInput checked={true} onChangeCheckbox={() => {}} />);
    const checkboxElement = screen.getByRole("checkbox");

    expect(checkboxElement).toBeChecked();
  });

  test("renders correctly when not checked", () => {
    render(<CheckBoxInput checked={false} onChangeCheckbox={() => {}} />);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).not.toBeChecked();
  });

  test("calls onChangeCheckbox when clicked", () => {
    const handleChange = jest.fn();
    render(<CheckBoxInput checked={false} onChangeCheckbox={handleChange} />);

    const checkboxElement = screen.getByRole("checkbox");
    fireEvent.click(checkboxElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("updates checked state when clicked", () => {
    const handleChange = jest.fn();
    const { rerender } = render(<CheckBoxInput checked={false} onChangeCheckbox={handleChange} />);

    const checkboxElement = screen.getByRole("checkbox");
    fireEvent.click(checkboxElement);

    rerender(<CheckBoxInput checked={true} onChangeCheckbox={handleChange} />);
    expect(checkboxElement).toBeChecked();
  });
});
