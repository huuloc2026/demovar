import React from "react";
import currentPageData from "./data-1.json";

const TestJson = () => {
  return (
    <tbody className="bg-white divide-x  whitespace-nowrap">
      {currentPageData.map((data, index) => (
        <tr key={index}>
          <td className="px-4 py-5 text-left text-sm text-black">{data.d}</td>
          <td className="px-4 py-5 text-left text-sm text-black">{data.no}</td>
          <td className="px-4 py-5 text-right text-sm text-black">{data.am}</td>
          <td className="px-4 py-5 text-left text-sm text-black whitespace-pre-line">
            {data.c}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TestJson;
