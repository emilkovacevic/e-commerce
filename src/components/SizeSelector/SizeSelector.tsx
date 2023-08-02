import React, { FormEvent, useState } from 'react';

const SizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (e: FormEvent<HTMLInputElement>) => {
    setSelectedSize(e.currentTarget.value);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700">
      <h2 className="mb-2 text-lg font-semibold">Select Size:</h2>
      <form>
        <label className="block mb-2">
          <input
            type="radio"
            value="sm"
            checked={selectedSize === 'sm'}
            onChange={handleSizeChange}
            className="mr-2"
          />
          Small
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            value="m"
            checked={selectedSize === 'm'}
            onChange={handleSizeChange}
            className="mr-2"
          />
          Medium
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            value="lg"
            checked={selectedSize === 'lg'}
            onChange={handleSizeChange}
            className="mr-2"
          />
          Large
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            value="2xl"
            checked={selectedSize === '2xl'}
            onChange={handleSizeChange}
            className="mr-2"
          />
          2XL
        </label>
      </form>
      {selectedSize && <p className="mt-4">Selected size: {selectedSize.toUpperCase()}</p>}
    </div>
  );
};

export default SizeSelector;
