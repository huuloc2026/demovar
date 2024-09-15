import React, { useState } from "react";
import mergedData from "./mergedData.js";

const TestJson = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(mergedData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mergedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          key={number}
          id={number}
          onClick={handleClick}
          className={`px-4 py-2 mx-1 ${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <div className="font-sans overflow-x-auto">
          <table className="min-w-full divide-y ">
            <thead className=" whitespace-nowrap">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white bg-slate-900 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white bg-slate-900 uppercase tracking-wider">
                  Document No
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white bg-slate-900 uppercase tracking-wider">
                  Số tiền (VND)
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white bg-slate-900 uppercase tracking-wider">
                  Nội dung
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-x  whitespace-nowrap">
              {currentItems.map((data, index) => (
                <tr key={index}>
                  <td className="px-4 py-5 text-left text-sm text-black">
                    {data.d}
                  </td>
                  <td className="px-4 py-5 text-left text-sm text-black">
                    {data.no}
                  </td>
                  <td className="px-4 py-5 text-right text-sm text-black">
                    {data.am}
                  </td>
                  <td className="px-4 py-5 text-left text-sm text-black whitespace-pre-line">
                    {data.c}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0]}
              className="px-4 py-2 mx-1 bg-gray-200 text-black"
            >
              Previous
            </button>
            {renderPageNumbers}
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1]}
              className="px-4 py-2 mx-1 bg-gray-200 text-black"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestJson;
