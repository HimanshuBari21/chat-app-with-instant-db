import clsx from "clsx";
import { Contact } from "../types/Contact";
import { FC, HTMLAttributes } from "react";
import Avatar from "react-avatar";
import title from "title";

export type ContactHeaderProps = HTMLAttributes<HTMLDivElement> & {
  contact: Contact;
  nameClassName?: string;
};

const ContactHeader: FC<ContactHeaderProps> = (props) => {
  const { contact, className, nameClassName, ...rest } = props;

  return (
    <div className={clsx("flex items-center", className)} {...rest}>
      {contact?.avatar ? (
        <img
          src={contact.avatar}
          alt={contact?.name}
          width={42}
          height={42}
          className="rounded-full mr-4"
        />
      ) : (
        <Avatar
          name={contact?.name}
          className={clsx("rounded-full mr-4", nameClassName)}
          size={"42"}
        />
      )}
      <h2 className="font-semibold line-clamp-1">
        {title(contact?.name ?? "")}
      </h2>
    </div>
  );
};

export default ContactHeader;
