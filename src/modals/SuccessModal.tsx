// import { CheckCircle } from 'lucide-react';

// interface SuccessModalProps {
//     canOpenSuccessModal: (param: boolean) => void,
//     message: string,
//     makeAction?: () => void
// }

// export function SuccessModal ({canOpenSuccessModal, message, makeAction }: SuccessModalProps) {

//     function onCloseModal()
//     {
//         canOpenSuccessModal(false);
//         if (makeAction) {
//             makeAction();
//         }
//     }

//     return (
//          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//             <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center">
//                     <CheckCircle className="w-12 h-12 text-primary mr-2 animate-success-check" />
//                     <h3 className="text-2xl font-bold text-gray-900">Success</h3>
//                 </div>
//             </div>
//             <p className="mb-6 mt-3 text-md">{message}</p>
//             <div className="flex justify-center">
//                 <button
//                     onClick={() => onCloseModal()}
//                     className="cursor-pointer px-4 py-1 bg-primary font-bold text-md text-white  rounded-md  transition-colors duration-300"
//                 >
//                     Continue
//                 </button>
//             </div>
//         </div>
//     );
// }

// src/modals/SuccessModal.tsx
"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-sm w-full text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{message}</h3>
        <p className="mt-2 text-sm text-gray-600">
          Le voyage est maintenant visible dans le calendrier et sur le
          marketplace.
        </p>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
