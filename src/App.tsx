"use client";

import { useEffect, useState } from "react";

import ChatWindow from "./components/ChatWindow";
import ContactList from "./components/ContactList";

import { Contact } from "./types/Contact";

import useMessages from "./hooks/useMessages";
import { db } from "./instantdb/init";
import { ContactContext } from "./store/ContactContext";
import clsx from "clsx";
import { BiSolidGroup } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

export const currentUser = "himanshu bari";

const App = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    undefined
  );
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const { addMessage } = useMessages();

  const { data: contacts } = db.useQuery({ peoples: {} });

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsContactsOpen(true);
    }
  }, []);

  return (
    <ContactContext.Provider value={{ selectedContact, setSelectedContact }}>
      <main className="flex h-screen bg-gray-100">
        <ContactList
          contacts={contacts?.peoples as Contact[]}
          className={clsx(
            "absolute h-screen md:relative md:w-1/4 transition-all w-0 overflow-hidden",
            isContactsOpen && "!w-[68%]"
          )}
        />
        {selectedContact ? (
          <ChatWindow
            contact={selectedContact}
            onSendMessage={(message) =>
              addMessage({
                content: message,
                sender: currentUser,
                receiver: selectedContact.name,
                timestamp: Date.now(),
              })
            }
            onClick={() => isContactsOpen && setIsContactsOpen(false)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a contact to start chatting
          </div>
        )}
        <button
          onClick={() => setIsContactsOpen(!isContactsOpen)}
          className="flex items-center md:hidden fixed bottom-28 left-0 rounded-l-none p-2 pr-4 pl-3 bg-blue-500 text-white rounded-full shadow-lg transition-all"
        >
          {isContactsOpen ? <CgClose size={28} /> : <BiSolidGroup size={28} />}
        </button>
      </main>
    </ContactContext.Provider>
  );
};

export default App;
