import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

const FilterUI = ({ col, filters, handleFilterApply, handleShowFilterUI, ind }) => {
    const [selectedOperator, setSelectedOperator] = useState(filters?.operators?.[0]?.name || '');
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [showAvailableValues, setShowAvailableValues] = useState(false);

    const handleOperatorChange = (e) => {
        setSelectedOperator(e.target.value);
        setInputValue('');
        setInputValue2('');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputChange2 = (e) => {
        setInputValue2(e.target.value);
    };

    const handleValueSelect = (value) => {
        setInputValue(value);
        setShowAvailableValues(false);
    };

    const handleApply = () => {
        let filterData = {
            column: col.name,
            operator: selectedOperator,
            value: inputValue
        };

        if (selectedOperator === 'between') {
            filterData.value = [inputValue, inputValue2];
        }

        if (['is_null', 'is_not_null'].includes(selectedOperator)) {
            filterData.value = null;
        }

        handleFilterApply(filterData);
        handleShowFilterUI(ind);
    };

    const renderAvailableValues = () => {
        if (!filters.unique_values || !showAvailableValues) return null;

        if (Array.isArray(filters.unique_values)) {
            return (
                <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
                    {filters.unique_values.map((value, idx) => (
                        <div
                            key={idx}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm truncate"
                            onClick={() => handleValueSelect(value)}
                            title={value}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const renderValueInput = () => {
        if (['is_null', 'is_not_null'].includes(selectedOperator)) {
            return null;
        }

        if (selectedOperator === 'between') {
            return (
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <input
                            type={filters.type === 'float64' ? 'number' : 'text'}
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg p-2 text-black"
                            placeholder="From"
                            step={filters.type === 'float64' ? '0.01' : '1'}
                            min={filters.unique_values?.min}
                            max={filters.unique_values?.max}
                        />
                        <input
                            type={filters.type === 'float64' ? 'number' : 'text'}
                            value={inputValue2}
                            onChange={handleInputChange2}
                            className="w-full border border-gray-300 rounded-lg p-2 text-black"
                            placeholder="To"
                            step={filters.type === 'float64' ? '0.01' : '1'}
                            min={filters.unique_values?.min}
                            max={filters.unique_values?.max}
                        />
                    </div>
                    {filters.type === 'float64' && (
                        <div className="text-xs text-gray-500 flex justify-between px-1">
                            <span>Min: {filters.unique_values?.min}</span>
                            <span>Max: {filters.unique_values?.max}</span>
                        </div>
                    )}
                </div>
            );
        }

        if (filters.type === 'float64') {
            return (
                <div className="space-y-2">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 text-black"
                        placeholder={`Value between ${filters.unique_values?.min} and ${filters.unique_values?.max}`}
                        min={filters.unique_values?.min}
                        max={filters.unique_values?.max}
                        step="0.01"
                    />
                    <div className="text-xs text-gray-500 flex justify-between px-1">
                        <span>Min: {filters.unique_values?.min}</span>
                        <span>Mean: {filters.unique_values?.mean?.toFixed(2)}</span>
                        <span>Max: {filters.unique_values?.max}</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="relative">
                <div className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => setShowAvailableValues(true)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-black pr-8"
                        placeholder="Enter or select value..."
                    />
                    {Array.isArray(filters.unique_values) && (
                        <button
                            type="button"
                            onClick={() => setShowAvailableValues(!showAvailableValues)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FiInfo size={16} />
                        </button>
                    )}
                </div>
                {renderAvailableValues()}
            </div>
        );
    };

    return (
        <div className="absolute z-10 mt-2 bg-white rounded-xl shadow-lg p-4 min-w-[300px] text-black right-0">
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                        Filter: {col.name}
                    </label>
                    <select
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={selectedOperator}
                        onChange={handleOperatorChange}
                    >
                        {filters?.operators?.map((op) => (
                            <option key={op.name} value={op.name}>
                                {op.description}
                            </option>
                        ))}
                    </select>
                </div>

                {renderValueInput()}

                <div className="flex gap-2 justify-end mt-2">
                    <button
                        onClick={() => handleShowFilterUI(ind)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        disabled={!inputValue && !['is_null', 'is_not_null'].includes(selectedOperator)}
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterUI;