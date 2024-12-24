import { Contact } from "../types/Contact";
import clsx from "clsx";
import { HTMLAttributes, FC, useContext } from "react";
import { ContactContext } from "../store/ContactContext";
import title from "title";
import { currentUser } from "../App";

export type ContactListProps = HTMLAttributes<HTMLDivElement> & {
  contacts: Contact[];
};

const ContactList: FC<ContactListProps> = (props) => {
  const { contacts, className, ...rest } = props;

  const { selectedContact, setSelectedContact } =
    useContext(ContactContext) ?? {};

  return (
    <div className={clsx("bg-white border-r", className)} {...rest}>
      <h2 className="text-2xl font-bold p-4 py-3.5 border-b">Contacts</h2>
      <ul>
        {contacts
          ?.filter((c) => c.name !== currentUser)
          ?.map((contact) => (
            <li
              key={contact.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                selectedContact?.id === contact.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedContact?.(contact)}
            >
              <img
                src={contact.avatar || "/fallback-avatar.png"}
                alt={contact.name}
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <span>{title(contact.name)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactList;
