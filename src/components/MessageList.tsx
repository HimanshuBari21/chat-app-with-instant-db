import { MessageWithId } from "../types/Message";
import clsx from "clsx";
import { FC, HTMLAttributes, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export type MessageListProp = HTMLAttributes<HTMLDivElement> & {
  messages: MessageWithId[];
};

const MessageList: FC<MessageListProp> = (props) => {
  const { messages, className, ...rest } = props;
  const [currentUser] = useLocalStorage("currentUser", "");

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
      <p className="text-center border bg-blue-100 w-fit mx-auto px-4 py-2 text-gray-600 text-xs rounded-full mb-4">
        Your messages are NOT end-to-end-encypted.
      </p>
      {messages?.map((message) => (
        <div key={message.id} className={"mb-4 relative flex flex-col"}>
          <div
            className={clsx(
              "relative p-2 px-4 rounded-lg max-w-[80%]",
              message.sender === currentUser
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            )}
          >
            {message.content}
          </div>
          <div
            className={clsx(
              "text-xs text-gray-500 mt-1",
              message.sender === currentUser ? "self-end" : "self-start"
            )}
          >
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
