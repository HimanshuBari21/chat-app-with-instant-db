import { MessageWithId } from "../types/Message";
import clsx from "clsx";
import { FC, HTMLAttributes, useEffect } from "react";
import { currentUser } from "../App";

export type MessageListProp = HTMLAttributes<HTMLDivElement> & {
  messages: MessageWithId[];
};

const MessageList: FC<MessageListProp> = (props) => {
  const { messages, className, ...rest } = props;

  // scroll to bottom of chat window
  useEffect(() => {
    const messageList = document.querySelector(".chat-window");
    messageList?.scrollTo({
      top: messageList.scrollHeight,
    });
  });

  return (
    <div
      className={clsx("flex-1 overflow-y-auto chat-window p-4", className)}
      {...rest}
    >
      {messages?.map((message) => (
        <div
          key={message.id}
          className={`mb-4 ${
            message.sender === currentUser ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block p-2 px-4 rounded-lg max-w-[80%] ${
              message.sender === currentUser
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {message.content}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
