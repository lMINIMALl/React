import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <Button onClick={onClose}>Закрыть</Button>
      </div>
    </div>,
    document.body
  );
};
