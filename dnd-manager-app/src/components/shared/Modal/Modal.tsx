import React from "react";
import { X as Close } from "lucide-react";
import "./Modal.css";

function ModalWrapper({ handleDismiss, children }: { handleDismiss: () => void; children: React.ReactNode }) {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Escape") {
        handleDismiss();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDismiss]);

  return (
    <div className="wrapper">
      <div className="backdrop" onClick={handleDismiss} />
      <div className="dialog">
        <button className="closeBtn" onClick={handleDismiss}>
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
}

function Modal({ handleDismiss, children }: { handleDismiss: () => void; children: React.ReactNode }) {
  return (
    <>
      <ModalWrapper handleDismiss={handleDismiss}>{children}</ModalWrapper>
    </>
  );
}

export default Modal;
