import { Contact } from "@/types/Contact";
import { FC, HTMLAttributes, useState } from "react";
import MessageInput from "./MessageInput";
import { Message } from "@/types/Message";
import MessageList from "./MessageList";
import clsx from "clsx";

export type ChatWindowProps = HTMLAttributes<HTMLDivElement> & {
  contact: Contact;
  messages: Message[];
  onSendMessage: (message: string) => void;
};

const ChatWindow: FC<ChatWindowProps> = (props) => {
  const { contact, messages, onSendMessage, className, ...rest } = props;

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className={clsx("w-full flex flex-col", className)} {...rest}>
      <div className="flex items-center p-4 border-b">
        <img
          src={contact.avatar || "/fallback-avatar.png"}
          alt={contact.name}
          width={40}
          height={40}
          className="rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold">{contact.name}</h2>
      </div>
      <MessageList messages={messages} />
      <MessageInput
        value={newMessage}
        onChange={(value) => setNewMessage(value as string)}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
