import React, { useEffect } from 'react';

const MessageModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="inline-block bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all">
        <div className="bg-white px-4 py-5 sm:p-6">
          <p className="text-lg text-gray-900">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
