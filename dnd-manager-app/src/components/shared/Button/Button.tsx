import "./Button.css";

function Button({
  buttonLabel,
  handleButtonClick,
  disabled,
  children,
}: {
  buttonLabel?: string;
  handleButtonClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button className="btn" onClick={() => handleButtonClick()} type="button" disabled={disabled}>
      {children}
      {buttonLabel}
    </button>
  );
}
export default Button;
