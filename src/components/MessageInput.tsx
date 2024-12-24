import clsx from "clsx";
import { FC, HTMLAttributes } from "react";

export type MessageInputProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

const MessageInput: FC<MessageInputProps> = (props) => {
  const { value, onChange, onSend, className, ...rest } = props;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className={clsx("bg-white p-4 flex", className)} {...rest}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
        className="w-full border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSend}
        className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
