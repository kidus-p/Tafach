const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-[#f9f7f2] rounded-xl shadow-lg w-11/12 md:w-1/3 relative transform transition-transform duration-300 scale-105">
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 float-right text-2xl focus:outline-none"
          >
            &times;
          </button>
          {/* Modal Content */}
          <div className="text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
