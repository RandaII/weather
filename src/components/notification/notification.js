import React from "react";
import PropTypes from "prop-types";
import "./notification.scss";

const Notification = ({children}) => (<div className="notification">{children}</div>);

Notification.propTypes = {
  children: PropTypes.string
}

export default Notification;