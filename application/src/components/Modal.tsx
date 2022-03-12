import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { animated, useTransition } from "react-spring";
interface IModalProps {
  icon?: any;
  title?: string;
  show: boolean;
  onShow: (t: boolean) => any;
  children?: React.ReactNode;
  cardStyles?: React.CSSProperties | undefined;
}
const Modal = ({
  title = "Modal",
  icon = null,
  show,
  children,
  cardStyles,
  onShow,
}: IModalProps) => {
  const transition = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition(
    (style, render) =>
      render && (
        <animated.div style={style}>
          <div className="app-modal">
            <div style={{ ...cardStyles }} className="app-modal-card">
              <div className="app-modal-card-header">
                <div className="text-main-primary">
                  {icon}
                  <h3>{title}</h3>
                </div>
                <IoIosClose
                  onClick={() => onShow(false)}
                  size={36}
                  className="text-main-primary cursor-pointer"
                />
              </div>
              <div className="app-modal-card-body">{children}</div>
            </div>
          </div>
        </animated.div>
      )
  );
};

export default Modal;
