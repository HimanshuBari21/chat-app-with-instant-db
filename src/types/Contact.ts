export type Contact = {
  id: string;
  name: string;
  avatar?: string;
};

export type ContactContextType = {
  selectedContact: Contact | undefined;
  setSelectedContact: (value: Contact) => void;
};
