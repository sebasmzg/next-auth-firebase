import React from 'react';

interface InputFieldProps {
    label: string;
    value: string;
    type: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const inputField: React.FC<InputFieldProps> = ({ label, value, type, name, onChange, placeholder }) => {
    return (
        <div className="mb-4">
      <label className="block text-gray-200 dark:text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    )
}

export default inputField;