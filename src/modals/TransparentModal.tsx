import { createPortal } from "react-dom";
import React from "react";

interface TransparentModalProps {
    isLoading: boolean;
    children: React.ReactNode;
}

export default function TransparentModal({ isLoading, children }: TransparentModalProps) {
    if (!isLoading) return null;

    return createPortal(
        <div className="dialog fixed inset-0 z-50 flex items-center justify-center">
            {children}
        </div>,
        document.body
    );
}
