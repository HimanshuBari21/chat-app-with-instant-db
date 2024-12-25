import { FC, HTMLAttributes, useContext, useState } from "react";

import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

import { Contact } from "../types/Contact";

import clsx from "clsx";
import { db } from "../instantdb/init";
import { MessageWithId } from "../types/Message";

import { ContactContext } from "../store/ContactContext";
import { useLocalStorage } from "usehooks-ts";
import ContactHeader from "./ContactHeader";

export type ChatWindowProps = HTMLAttributes<HTMLDivElement> & {
  contact: Contact;
  onSendMessage: (message: string) => void;
};

const ChatWindow: FC<ChatWindowProps> = (props) => {
  const { contact, onSendMessage, className, ...rest } = props;

  const { selectedContact } = useContext(ContactContext) || {};

  const [currentUser] = useLocalStorage("currentUser", "");

  const { data: messages } = db.useQuery({
    messages: {
      $: {
        where: {
          or: [
            {
              sender: currentUser,
              receiver: selectedContact?.id as string,
            },
            {
              sender: selectedContact?.id as string,
              receiver: currentUser,
            },
          ],
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
      <div className="flex items-center p-4 py-[9px] border-b">
        <ContactHeader contact={contact} />
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
