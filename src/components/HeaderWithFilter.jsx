import React from 'react';
import FilterUI from './FilterUI';
import { FiFilter } from 'react-icons/fi';

const HeaderWithFilter = ({ col, filters, handleFilterApply, handleShowFilterUI, showFilterUI, ind, appliedFilters }) => {
    const hasActiveFilter = appliedFilters?.some(filter => filter.column === col.name);

    return (
        <th className="relative border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
            <div className="flex items-center justify-between">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    {col.name}
                </p>
                {filters && (
                    <button
                        onClick={() => handleShowFilterUI(ind)}
                        className={`ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors ${
                            hasActiveFilter ? 'bg-blue-100' : ''
                        }`}
                        title={hasActiveFilter ? 'Filter active' : 'Add filter'}
                    >
                        <FiFilter 
                            className={`w-4 h-4 ${
                                hasActiveFilter ? 'text-blue-500' : 'text-gray-500'
                            }`} 
                        />
                    </button>
                )}
            </div>
            
            {showFilterUI === 1 && filters && (
                <FilterUI
                    col={col}
                    filters={filters}
                    handleFilterApply={handleFilterApply}
                    handleShowFilterUI={handleShowFilterUI}
                    ind={ind}
                />
            )}
        </th>
    );
};

export default HeaderWithFilter;