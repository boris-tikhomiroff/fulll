import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from ".";

describe("<SearchInput />", () => {
  test("renders correctly with placeholder", () => {
    const placeholderText = "Search input";
    render(<SearchInput onChange={() => {}} placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onChange when user types", async () => {
    const placeholderText = "Search input";
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<SearchInput onChange={handleChange} placeholder={placeholderText} />);

    const inputElement = screen.getByPlaceholderText(placeholderText);
    const inputText = "test";

    await user.type(inputElement, inputText);

    expect(handleChange).toHaveBeenCalledTimes(inputText.length);
    expect(handleChange).toHaveBeenNthCalledWith(1, "t");
    expect(handleChange).toHaveBeenNthCalledWith(2, "te");
    expect(handleChange).toHaveBeenNthCalledWith(3, "tes");
    expect(handleChange).toHaveBeenNthCalledWith(4, "test");
    expect(inputElement).toHaveValue(inputText);
  });

  test("does not crash without onChange", () => {
    const placeholderText = "Search input";
    render(<SearchInput onChange={() => {}} placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });
});
