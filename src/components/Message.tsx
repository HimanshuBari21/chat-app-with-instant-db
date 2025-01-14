import clsx from "clsx";
import { FC, HTMLAttributes } from "react";
import { MessageWithId } from "../types/Message";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  message: MessageWithId;
  currentUser: string;
};

const Message: FC<MessageProps> = (props) => {
  const { message, currentUser } = props;
  return (
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
        {new Date(message.timestamp).toLocaleString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default Message;
