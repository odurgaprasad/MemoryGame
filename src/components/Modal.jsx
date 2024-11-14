import React from "react";

const Modal = ({ onRestart, message }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
    <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm text-center">
      <h2 className="text-2xl font-bold text-green-800 mb-4">{message}🎉🎊</h2>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
      >
        Restart Game
      </button>
    </div>
  </div>
);

export default Modal;
