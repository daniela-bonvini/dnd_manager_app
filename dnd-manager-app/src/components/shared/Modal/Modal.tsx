import { useEffect, useRef } from "react";
import "./Modal.css";

function ModalWrapper({ handleDismiss, children }: { handleDismiss: () => void; children: React.ReactNode }) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Escape") {
        handleDismiss();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Restore focus on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [handleDismiss]);

  return (
    <div className="wrapper">
      <div className="backdrop" onClick={handleDismiss} />
      <div className="dialog" role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
}

function Modal({ handleDismiss, children }: { handleDismiss: () => void; children: React.ReactNode }) {
  return <ModalWrapper handleDismiss={handleDismiss}>{children}</ModalWrapper>;
}

export default Modal;
