import { FC } from "react";
import "./Message.css";

type MessageProps = {
  content: string;
  type: "error" | "info";
};

const Message: FC<MessageProps> = ({ content, type }) => {
  return (
    <div
      data-testid="message-container"
      className={`message__container ${type === "error" ? "message__container--error" : ""} ${
        type === "info" ? "message__container--info" : ""
      }`}
    >
      <div
        className={`message__content ${type === "error" ? "message__content--error" : ""} ${
          type === "info" ? "message__content--info" : ""
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
