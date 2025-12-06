import { X as Close } from "lucide-react";
import "./ModalHeader.css";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  rightContent?: React.ReactNode;
}

function ModalHeader({ title, onClose, rightContent }: ModalHeaderProps) {
  return (
    <div className="modal-header">
      <h3>{title}</h3>
      <div className="modal-header-right">
        {rightContent}
        <button className="modal-header-close-btn" onClick={onClose}>
          <Close />
        </button>
      </div>
    </div>
  );
}

export default ModalHeader;
