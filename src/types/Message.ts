export type Message = {
  content: string;
  timestamp: number;
  sender: string;
  receiver: string;
};

export type MessageWithId = Message & {
  id: string;
};
