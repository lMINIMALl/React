import * as React from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import type { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface FooterProps {
  onClose?: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const enhancedChildren = React.Children.map(children, (child) => {
    if (
      React.isValidElement<FooterProps>(child) &&
      child.type === Modal.Footer
    ) {
      return React.cloneElement<FooterProps>(child, { onClose });
    }
    return child;
  });

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{enhancedChildren}</div>
    </div>,
    document.body
  );
};

const Header = ({ children }: { children: ReactNode }) => (
  <div className="modal-header">{children}</div>
);

const Body = ({ children }: { children: ReactNode }) => (
  <div className="modal-body">{children}</div>
);

const Footer = ({ onClose, children }: FooterProps) => (
  <div className="modal-footer">
    {children}
    {onClose && (
      <Button onClick={onClose} className="close-btn">
        Закрыть
      </Button>
    )}
  </div>
);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
