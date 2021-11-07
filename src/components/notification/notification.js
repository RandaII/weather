import React from "react";

import "./notification.scss";

const Notification = ({children}) =>{
  return (
    <div className="notification">{children}</div>
  );
}

export default Notification;