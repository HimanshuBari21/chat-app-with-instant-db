import { MessageWithId } from "../types/Message";
import clsx from "clsx";
import { FC, HTMLAttributes, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import Message from "./Message";
import { getFormattedDate } from "../utils/commons";

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
      <p className="text-center border bg-blue-100 w-fit mx-auto px-3 py-1.5 text-gray-600 text-xs rounded-full mb-4">
        Your messages are NOT end-to-end-encypted.
      </p>
      {messages?.map((message, i) => (
        <>
          <div className="flex justify-center sticky top-0 my-2 z-50">
            {getFormattedDate(message.timestamp, { dateStyle: "short" }) !==
            getFormattedDate(messages[i - 1]?.timestamp, {
              dateStyle: "short",
            }) ? (
              <div className="text-center w-fit bg-gray-700 text-white px-3 py-1.5 text-xs rounded-full">
                {getFormattedDate(message.timestamp, {
                  dateStyle: "full",
                })}
              </div>
            ) : null}
          </div>
          <Message
            key={message.id}
            message={message}
            currentUser={currentUser}
          />
        </>
      ))}
    </div>
  );
};

export default MessageList;
