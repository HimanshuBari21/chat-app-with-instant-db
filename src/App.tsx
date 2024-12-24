"use client";

import { useState } from "react";

import ChatWindow from "./components/ChatWindow";
import ContactList from "./components/ContactList";

import { Contact } from "./types/Contact";

import { contacts } from "./dummyData/contacts";
import { messages } from "./dummyData/messages";

const App = () => {
  const [selectedContact, setSelectedContact] = useState<Contact>();

  return (
    <main className="flex h-screen bg-gray-100">
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
      />
      {selectedContact ? (
        <ChatWindow
          contact={selectedContact}
          messages={messages}
          onSendMessage={(message) => console.log(message)}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a contact to start chatting
        </div>
      )}
    </main>
  );
};

export default App;
