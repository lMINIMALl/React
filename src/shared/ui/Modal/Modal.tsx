import * as React from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import type { ReactNode, PropsWithChildren, FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface FooterProps extends PropsWithChildren<{}> {
  onClose?: () => void;
}

export const Modal: FC<ModalProps> & {
  Header: FC<PropsWithChildren<{}>>;
  Body: FC<PropsWithChildren<{}>>;
  Footer: FC<FooterProps>;
} = ({ isOpen, onClose, children }) => {
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


const Header: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="modal-header">{children}</div>
);

const Body: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="modal-body">{children}</div>
);

const Footer: FC<FooterProps> = ({ onClose, children }) => (
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
