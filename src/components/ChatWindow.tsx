import { FC, HTMLAttributes, useContext, useState } from "react";

import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

import { Contact } from "../types/Contact";

import clsx from "clsx";
import { db } from "../instantdb/init";
import { MessageWithId } from "../types/Message";

import title from "title";
import Avatar from "react-avatar";
import { ContactContext } from "../store/ContactContext";
import { currentUser } from "../App";

export type ChatWindowProps = HTMLAttributes<HTMLDivElement> & {
  contact: Contact;
  onSendMessage: (message: string) => void;
};

const ChatWindow: FC<ChatWindowProps> = (props) => {
  const { contact, onSendMessage, className, ...rest } = props;

  const { selectedContact } = useContext(ContactContext) || {};

  const { data: messages } = db.useQuery({
    messages: {
      $: {
        where: {
          receiver: selectedContact?.name ?? "",
          sender: currentUser ?? "",
        },
      },
    },
  });

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className={clsx("flex-1 flex flex-col", className)} {...rest}>
      <div className="flex items-center p-4 border-b">
        {contact.avatar ? (
          <img
            src={contact.avatar}
            alt={contact.name}
            width={42}
            height={42}
            className="rounded-full mr-4"
          />
        ) : (
          <Avatar
            name={contact.name}
            className="rounded-full mr-4"
            size={"42"}
          />
        )}
        <h2 className="text-xl font-semibold">{title(contact.name)}</h2>
      </div>
      <MessageList messages={messages?.messages as MessageWithId[]} />
      <MessageInput
        value={newMessage}
        onChange={(value) => setNewMessage(value as string)}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
