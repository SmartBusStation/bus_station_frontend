import React from "react";

interface TextareaFieldProps {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    rows?: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    icon?: React.ReactNode;
    required?: boolean;
}

export default function TextareaField  ({id, name, label, placeholder, rows = 3, value, onChange, icon, required = false,}: TextareaFieldProps) : React.JSX.Element {


    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                {icon && <div className="absolute top-3 left-3 pointer-events-none">{icon}</div>}
                <textarea
                    id={id}
                    name={name}
                    rows={rows}
                    placeholder={placeholder}
                    value={value ?? ""}
                    onChange={onChange}
                    required={required}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${icon ? "pl-10" : ""}`}
                />
            </div>
        </div>
    )
}