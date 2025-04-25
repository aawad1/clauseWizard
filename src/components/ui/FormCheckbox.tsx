import React from 'react';

interface FormCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
  helpText?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  required = false,
  error,
  className = '',
  helpText,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {helpText && <p className="mt-1 text-xs text-gray-500 ml-6">{helpText}</p>}
      {error && <p className="mt-1 text-xs text-red-500 ml-6">{error}</p>}
    </div>
  );
};

export default FormCheckbox;