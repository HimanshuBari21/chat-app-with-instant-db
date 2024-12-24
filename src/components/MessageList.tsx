import { Message } from "@/types/Message";
import clsx from "clsx";
import { FC, HTMLAttributes } from "react";

export type MessageListProp = HTMLAttributes<HTMLDivElement> & {
  messages: Message[];
};

const MessageList: FC<MessageListProp> = (props) => {
  const { messages, className, ...rest } = props;

  return (
    <div className={clsx("flex-1 overflow-y-auto p-4", className)} {...rest}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 ${
            message.sender === "user" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block p-2 rounded-lg ${
              message.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {message.content}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
