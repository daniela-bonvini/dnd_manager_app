import { HandCoins } from "lucide-react";
import "./Button.css";

function Button({
  buttonLabel,
  handleOpenModal,
  disabled,
  children,
}: {
  buttonLabel?: string;
  handleOpenModal: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button className="btn" onClick={() => handleOpenModal()} type="button" disabled={disabled}>
      {children}
      {buttonLabel}
    </button>
  );
}
export default Button;
