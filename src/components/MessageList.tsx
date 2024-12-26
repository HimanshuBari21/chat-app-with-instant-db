import { MessageWithId } from "../types/Message";
import clsx from "clsx";
import { FC, HTMLAttributes, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import Message from "./Message";

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
        <Message key={message.id} message={message} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default MessageList;
