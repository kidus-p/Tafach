const Modal = ({ isOpen, onClose, children, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
    >
      <div
        className="relative bg-white rounded-xl shadow-lg w-11/12 md:w-1/3 transform transition-transform duration-300 scale-100 md:scale-105"
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-900 hover:text-gray-700 text-2xl focus:outline-none"
          >
            &times;
          </button>
          {/* Modal Content */}
          <div className="text-center">
            {children}
            {/* Message Display */}
            {message && (
              <p
                className={`mt-4 ${
                  message.includes("successful") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
