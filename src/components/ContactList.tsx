import clsx from "clsx";
import { FC, HTMLAttributes, useContext, useMemo } from "react";
import { ContactContext } from "../store/ContactContext";
import { Contact } from "../types/Contact";
import { useLocalStorage } from "usehooks-ts";
import Button from "./Button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/16/solid";
import ContactHeader from "./ContactHeader";

export type ContactListProps = HTMLAttributes<HTMLDivElement> & {
  contacts: Contact[];
};

const ContactList: FC<ContactListProps> = (props) => {
  const { contacts, className, ...rest } = props;

  const { selectedContact, setSelectedContact } =
    useContext(ContactContext) ?? {};

  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", "");

  // to not recalculate the variable on every render
  const currentUserContact = useMemo(
    () => contacts?.find((c) => c.id === currentUser),
    [contacts, currentUser]
  );

  return (
    <div className={clsx("relative bg-white border-r", className)} {...rest}>
      <h2 className="text-2xl font-bold p-4 py-3.5 border-b flex items-center">
        <span className="inline-block mr-2">
          <ChatBubbleLeftRightIcon className="h-8" />
        </span>
        Charcha
      </h2>
      <ul>
        {contacts
          ?.filter((c) => c.id !== currentUser)
          ?.map((contact) => (
            <li
              key={contact.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                selectedContact?.id === contact.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedContact?.(contact)}
            >
              <ContactHeader contact={contact} />
            </li>
          ))}
      </ul>
      <div className="absolute bottom-0 w-full">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <ContactHeader contact={currentUserContact as Contact} />
          </div>
          <Button onClick={() => setCurrentUser("")} variant="secondary">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
