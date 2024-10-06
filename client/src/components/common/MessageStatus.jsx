import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({ messagesStatus }) {
  return (
    <div>
      {messagesStatus === "sent" && <BsCheck className="text-lg" />}
      {messagesStatus === "delivered" && <BsCheckAll className="text-lg" />}
      {messagesStatus === 'read' && <BsCheckAll className="text-lg text-icon-ack" />}
    </div>
  );
}

export default MessageStatus;
