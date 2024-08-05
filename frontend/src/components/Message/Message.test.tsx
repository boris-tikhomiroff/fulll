import { render, screen } from "@testing-library/react";
import Message from ".";

describe("<Message />", () => {
  test("renders message content", () => {
    const messageContent = "This is an info message";
    render(<Message content={messageContent} type="info" />);

    expect(screen.getByText(messageContent)).toBeInTheDocument();
  });

  test("applies correct classes for info type", () => {
    const messageContent = "This is an info message";
    render(<Message content={messageContent} type="info" />);

    const containerElement = screen.getByTestId("message-container");
    expect(containerElement).toHaveClass("message__container");
    expect(containerElement).toHaveClass("message__container--info");
    expect(containerElement).not.toHaveClass("message__container--error");

    const contentElement = screen.getByText(messageContent);
    expect(contentElement).toHaveClass("message__content");
    expect(contentElement).toHaveClass("message__content--info");
    expect(contentElement).not.toHaveClass("message__content--error");
  });

  test("applies correct classes for error type", () => {
    const messageContent = "This is an error message";
    render(<Message content={messageContent} type="error" />);

    const containerElement = screen.getByTestId("message-container");
    expect(containerElement).toHaveClass("message__container");
    expect(containerElement).toHaveClass("message__container--error");
    expect(containerElement).not.toHaveClass("message__container--info");

    const contentElement = screen.getByText(messageContent);
    expect(contentElement).toHaveClass("message__content");
    expect(contentElement).toHaveClass("message__content--error");
    expect(contentElement).not.toHaveClass("message__content--info");
  });
});
