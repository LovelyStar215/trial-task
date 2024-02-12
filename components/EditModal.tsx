import { useState } from 'react';
import styles from './Modal.module.css';
import WidgetSelector from '../components/dashboardcreation/WidgetSelector';

interface EditModalProps {
    isOpen: boolean;
    idToEdit: number;
    onClose: () => void;
    onEdit: () => void;
    widgetSelect: (widgetId: number) => void;
    widgetDeselect: (widgetId: number) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, idToEdit, onClose, onEdit, widgetSelect, widgetDeselect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="relative bg-white w-96 mx-auto p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Edit Dashboard</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 justify-end">
                        <WidgetSelector
                            selectedWidget={idToEdit}
                            onWidgetSelect={widgetSelect}
                            onWidgetDeselect={widgetDeselect}
                        />
                        <button className="border border-black px-2 py-1 rounded-lg my-3" onClick={onEdit}>Save Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
