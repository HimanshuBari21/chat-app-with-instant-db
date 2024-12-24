import { Contact } from "@/types/Contact";
import clsx from "clsx";
import { HTMLAttributes, FC } from "react";

export type ContactListProps = HTMLAttributes<HTMLDivElement> & {
  contacts: Contact[];
  selectedContact?: Contact;
  onSelectContact: (contact: Contact) => void;
};

const ContactList: FC<ContactListProps> = (props) => {
  const { contacts, onSelectContact, selectedContact, className, ...rest } =
    props;
  return (
    <div className={clsx("w-1/4 bg-white border-r", className)} {...rest}>
      <h2 className="text-2xl font-bold p-4 border-b">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
              selectedContact?.id === contact.id ? "bg-gray-200" : ""
            }`}
            onClick={() => onSelectContact(contact)}
          >
            <img
              src={contact.avatar || "/fallback-avatar.png"}
              alt={contact.name}
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <span>{contact.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
