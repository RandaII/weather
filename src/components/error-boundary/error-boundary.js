import React, {Component} from "react";
import Notification from "../notification";

export default class ErrorBoundary extends Component {

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({hasError: true});
  }

  render() {

    if (this.state.hasError) {
      if (this.props.emptyComponent) {
        return <></>;
      }
      return <Notification>{`Что-то пошло не так`}</Notification>
    }
    return this.props.children;
  }
}