import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Motion, spring } from "react-motion";
import { ToastContext } from "../contexts/toastContext";
import { metrics } from "../themes";

const ToastContainer = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -${metrics.baseUnit * 8}px;
  pointer-events: none;
  transform: ${props => "translateY(" + props.motionStyle.y + "px)"};
  div {
    width: ${metrics.bodyWidth}px;
    display: flex;
    justify-content: flex-end;
    div {
      visibility: ${props => props.visibility};
      border-radius: ${metrics.globalBorderRadius}px;
      min-height: ${metrics.baseUnit * 4}px;
      width: ${metrics.baseUnit * 32}px;
      font-size: 1.5rem;
      line-height: ${metrics.baseUnit * 2}px;
      color: white;
      background-color: red;
      display: flex;
      justify-content: center;
      align-content: center;
      font-family: "Kollektif-Bold";
      div {
        color: white;
        padding: ${metrics.baseUnit * 2}px;
        width: 100%;
        text-align: center;
      }
    }
  }
`;

const ToastWithContext = props => {
  const [show, setShow] = useState(false);
  const { message, sendMessage } = useContext(ToastContext);

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        sendMessage("");
      }, 4000);
    }
  }, [message]);

  return (
    <Motion
      defaultStyle={{ y: 0 }}
      style={{
        y: spring(show ? -108 : 0)
      }}>
      {motionStyle => (
        <ToastContainer {...props} id="container" motionStyle={motionStyle}>
          <div {...props}>
            <div {...props}>
              <div {...props}>{message}</div>
            </div>
          </div>
        </ToastContainer>
      )}
    </Motion>
  );
};

export default ToastWithContext;
