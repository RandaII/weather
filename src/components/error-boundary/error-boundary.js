import React, {Component} from "react";
import PropTypes from "prop-types";
import Notification from "../notification";

export default class ErrorBoundary extends Component {

  static defaultProps = {
    children: PropTypes.element.isRequired
  }

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({hasError: true});
  }

  render() {

    if (this.state.hasError) {
      if (this.props.errorEmptyComponent) {
        return <></>;
      }
      return <Notification>{`Что-то пошло не так`}</Notification>
    }
    return this.props.children;
  }
}