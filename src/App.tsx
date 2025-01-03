import { useEffect, useState } from "react";

import ChatWindow from "./components/ChatWindow";
import ContactList from "./components/ContactList";
import LoginScreen from "./components/LoginScreen";

import { Contact } from "./types/Contact";

import {
  ChatBubbleLeftRightIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import clsx from "clsx";
import { useLocalStorage } from "usehooks-ts";
import useMessages from "./hooks/useMessages";
import { db } from "./instantdb/init";
import { ContactContext } from "./store/ContactContext";

const App = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    undefined
  );
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [currentUser] = useLocalStorage("currentUser", "");

  const { addMessage } = useMessages();

  const { data: contacts } = db.useQuery({ peoples: {} });

  // if onmobile device open contacts by default
  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsContactsOpen(true);
    }
  }, []);

  // if no user is logged in show login screen
  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <ContactContext.Provider value={{ selectedContact, setSelectedContact }}>
      <main className="flex h-screen bg-gray-100">
        {contacts && (
          <ContactList
            contacts={contacts.peoples as Contact[]}
            className={clsx(
              "absolute h-screen md:relative md:w-1/4 transition-all w-0 overflow-hidden",
              isContactsOpen && "!w-[68%]"
            )}
          />
        )}
        {selectedContact ? (
          <ChatWindow
            contact={selectedContact}
            onSendMessage={(message) =>
              addMessage({
                content: message,
                sender: currentUser ?? "",
                receiver: selectedContact.id,
                timestamp: Date.now(),
              })
            }
            onClick={() => isContactsOpen && setIsContactsOpen(false)}
          />
        ) : (
          <div
            className="flex-1 flex flex-col items-center justify-center text-gray-500"
            onClick={() => isContactsOpen && setIsContactsOpen(false)}
          >
            <div className="flex items-center space-x-2 my-4">
              <ChatBubbleLeftRightIcon className="h-14" />
              Charcha
            </div>
            <p className="text-xl text-center">
              Select a contact to start chatting
            </p>
          </div>
        )}
        <button
          onClick={() => setIsContactsOpen(!isContactsOpen)}
          className="flex items-center md:hidden fixed bottom-28 left-0 rounded-l-none p-2 pr-4 pl-3 bg-blue-500 text-white rounded-full shadow-lg transition-all"
        >
          {isContactsOpen ? (
            <XMarkIcon className="h-8" />
          ) : (
            <UsersIcon className="h-8" />
          )}
        </button>
      </main>
    </ContactContext.Provider>
  );
};

export default App;
