import { createContext } from "react";
import { ContactContextType } from "../types/Contact";

export const ContactContext = createContext<ContactContextType | undefined>(
  undefined
);
