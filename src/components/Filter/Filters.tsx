
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
export default function Filter({ options, isFilterPopup, SetIsFilterPopup, setOptionValue}) {
  const [selectOption, setSelectoption]=useState(null);

  const clickFilter = () => {
    setSelectoption(null)
      SetIsFilterPopup(false)
  }
  { return isFilterPopup && (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl px-2'>
        <h2 className='text-xl font-semibold text-white mb-4'>Filter Options</h2>
        <div className='flex flex-col md:flex-row md:flex-nowrap gap-3 mb-6'>
          {options.map((option, i) => (
            <button
            onClick={()=>(setOptionValue(option), setSelectoption(i))}
            className={`px-4 py-2 rounded-lg cursor-pointer text-white hover:bg-gray-700 transition-all duration-100
                 ${selectOption === i 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-800 hover:bg-gray-700 '
            }`}
            key={option}
            >
              {option}
            </button>
          ))}
        </div>
        <hr className='border-gray-600 mb-6' />
        <div className='flex gap-3 justify-end'>
          <button className='px-5 py-2 bg-gray-600 rounded-lg text-white cursor-pointer hover:bg-gray-700 transition-colors'
          onClick={()=>(
            SetIsFilterPopup(!isFilterPopup),
            setOptionValue(null)
          )}
          >
            Clear All
          </button>
          <button className='px-5 py-2 bg-gray-600 rounded-lg cursor-pointer text-white hover:bg-gray-700 transition-colors' onClick={()=>SetIsFilterPopup(!isFilterPopup)}>
            Cancel
          </button>
          <button className='px-5 py-2 bg-blue-600 rounded-lg cursor-pointer text-white hover:bg-blue-700 transition-colors font-semibold'
          onClick={clickFilter}>
            Ok
          </button>
        </div>
      </div>
    </div>
      )}
}
