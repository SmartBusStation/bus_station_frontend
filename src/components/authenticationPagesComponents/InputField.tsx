import React, {JSX} from "react";

export type InputFieldProps = {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    required?: boolean;
};

export default function  InputField ({ id, name, label, placeholder, type = "text", value, onChange, icon, required }: InputFieldProps) : JSX.Element
{
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value ?? ""}
                    onChange={onChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={placeholder}
                    required={required}
                />
            </div>
        </div>
    )
}
