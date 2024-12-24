import { Message } from "../types/Message";

export const messages: Message[] = [
  {
    content: "Hello!",
    timestamp: Date.now(),
    sender: "contact-1",
    receiver: "user",
  },
  {
    content: "Hi!",
    timestamp: Date.now(),
    sender: "user",
    receiver: "contact-1",
  },
  {
    content: "How are you?",
    timestamp: Date.now(),
    sender: "contact-1",
    receiver: "user",
  },
  {
    content: "I'm good, thanks!",
    timestamp: Date.now(),
    sender: "user",
    receiver: "contact-1",
  },
  {
    content: "What are you up to?",
    timestamp: Date.now(),
    sender: "contact-1",
    receiver: "user",
  },
  {
    content: "Nothing much, just chilling.",
    timestamp: Date.now(),
    sender: "user",
    receiver: "contact-1",
  },
  {
    content: "Cool!",
    timestamp: Date.now(),
    sender: "contact-1",
    receiver: "user",
  },
  {
    content:
      "Yeah! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, corrupti iusto! Repudiandae aperiam nihil, voluptates distinctio aspernatur ipsa. Libero quaerat laboriosam facilis odio corporis quam inventore voluptatem temporibus! Mollitia, eveniet!",
    timestamp: Date.now(),
    sender: "contact-2",
    receiver: "user",
  },
];
