import { ChatBubbleLeftRightIcon } from "@heroicons/react/16/solid";
import Button from "./Button";
import { db } from "../instantdb/init";
import { useCallback, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const LoginScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_currentUser, setCurrentUser] = useLocalStorage("currentUser", "");
  const [contactName, setContactName] = useState("");

  // no not recalculate the function on every render
  const handleNameEnter = useCallback(async () => {
    const { data: contact } = await db.queryOnce({
      peoples: {
        $: {
          where: { name: contactName },
        },
      },
    });

    if (contact.peoples.length === 0) {
      alert(
        "User not found!\n- The name is case sensitive\n- Please check with DB\nPlease try again"
      );
    } else {
      setCurrentUser(contact.peoples[0].id);
    }
  }, [contactName, setCurrentUser]);

  return (
    <div className="h-screen flex items-center justify-center text-gray-500">
      <div className="container max-w-80 md:max-w-96 mx-auto flex flex-col items-center justify-center text-gray-500 space-y-4 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold p-4 py-3.5 border-b flex items-center">
          <span className="inline-block mr-2">
            <ChatBubbleLeftRightIcon className="h-8" />
          </span>
          Charcha
        </h2>
        <p className="text-lg font-semibold text-center">
          Please enter your name to start chatting
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-gray-400 rounded-lg p-2 w-full"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNameEnter()}
          />
          <Button onClick={handleNameEnter}>Enter</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
