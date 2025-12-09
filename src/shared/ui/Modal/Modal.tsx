import { createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<{ onClose: () => void } | null>(null);

export const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <ModalContext.Provider value={{ onClose }}>
          <Header />
          <Body />
          <Footer />
        </ModalContext.Provider>
      </div>
    </div>,
    document.body
  );
};

const Header = () => {
  return <h2 className="modal-header">Информация о проекте</h2>;
};

const Body = () => {
  return <p className="modal-body">Модальное окно</p>;
};

const Footer = () => {
  const ctx = useContext(ModalContext);

  return (
    <div className="modal-footer">
      <Button onClick={ctx?.onClose} className="close-btn">Закрыть</Button>
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
