import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Option {
    label: string;
    value: string;
}

interface SelectFieldProps {
    id: string;
    name?: string;
    label: string;
    options: Option[];
    required?: boolean;
    register?: UseFormRegisterReturn;
    error?: string;
}

export default function SelectField({id, name, label, options, required = false, register, error,}: SelectFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <select
                id={id}
                name={name}
                className={`w-full cursor-pointer äpx-4 py-3 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                required={required}
                {...register}
            >
                <option value="" disabled hidden>
                    Sélectionnez un type
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
