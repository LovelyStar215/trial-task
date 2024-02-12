import { useState } from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="relative bg-white w-96 mx-auto p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Remove Widget</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="mt-4">Do you want to remove this widget?</p>
                    <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none">
                            Cancel
                        </button>
                        <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
