import React, { useEffect } from "react";

function Toast({ msg, visible, color, icon, onClose }) {
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(onClose, 2000);
      return () => clearTimeout(timeout); // Limpiar timeout si el componente se desmonta
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      id="toast-container"
      className={`toast bg-${color} show`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ position: "fixed", color:"white", top: "20px", right: "20px", zIndex: 1050 }} // Para posicionar el toast

    >
      <div className="d-flex">
        <div className="toast-body d-flex flex-row gap-2"><i className={icon}></i>{msg}</div>
        <button
          type="button"
          className="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export default Toast;
