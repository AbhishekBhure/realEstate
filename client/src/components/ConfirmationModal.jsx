const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p>Are you sure you want to delete your account?</p>
        <div className="flex justify-end mt-4">
          <button
            className="border px-4 py-2 mr-2"
            onClick={() => {
              onClose();
            }}
          >
            No
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
