import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options = [], value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  // handleSelect now correctly receives the full option object
  const handleSelect = (option) => {
    onChange(option); // Pass the full option object to the parent's onChange
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center">
        <span>
          {/* Ensure options is an array before calling find */}
          {value ? options.find((opt) => opt.value === value)?.label : placeholder}
        </span>
        <span className="ml-2">
          {isOpen ? <LuChevronDown className="" /> : <LuChevronDown className="rotate-180" />}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10">
          {options.map((option) => (
            <div
              key={option.value}
              // FIX: Pass the entire 'option' object to handleSelect
              onClick={() => handleSelect(option)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;