import { id } from "@instantdb/react";
import { db } from "../instantdb/init";
import { Message } from "../types/Message";

const useMessages = () => {
  const addMessage = (message: Message) => {
    db.transact(db.tx.messages[id()].update(message))
      .then(() => {
        console.log("Message added successfully");
      })
      .catch((error) => {
        console.error("Error adding message", error);
      });
  };

  return { addMessage };
};

export default useMessages;
