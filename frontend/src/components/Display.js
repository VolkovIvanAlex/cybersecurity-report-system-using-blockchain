import { useState } from "react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "./Display.css";
import Report from "./Report";

const Display = ({ contract, account }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getdata = async () => {
    let dataArray;
    let otheraddress = document.querySelector("#address").value;
    try {
      if (otheraddress) {
        dataArray = await contract.display(otheraddress);
      } else {
        dataArray = await contract.display(account);
        otheraddress = account;
      }
    } catch (e) {
      alert("You don't have access.");
      return;
    }
    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {
      const filteredReports = dataArray.filter(report => {
        const reportDate = report.date * 1000; // Convert seconds to milliseconds
        if (startDate && endDate) {
          return reportDate >= new Date(startDate).getTime() && reportDate <= new Date(endDate).getTime();
        } else if (startDate) {
          return reportDate >= new Date(startDate).getTime();
        } else if (endDate) {
          return reportDate <= new Date(endDate).getTime();
        }
        return true; // If no date range is specified, include all reports
      });

      const reports = filteredReports.map((report, index) => {
          return (
          <Report report={report} contract={contract} fromAdress={otheraddress} index={index}/>
          );
      });      
      setData(reports);
    } else {
      setError("No image to display.");
    }
  };
  return (
    <>
      <div class="p-6 bg-gray-400 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h4 class="my-2.5 font-extrabold text-white">Fetch reports by address :</h4>
        <input placeholder="Enter Address" type="text" id="address" 
        class="address bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        <div className="validation-text">{error}</div>
        <div className="flex justify-center">
          <div className="grid md:grid-cols-3" style={{ width: "31%" }}>
            <input
              placeholder="Start Date (Optional)"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="start-date bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <span className="flex items-center justify-center text-white">From - To</span>
            <input
              placeholder="End Date (Optional)"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="end-date bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <button className="my-2.5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={getdata}>
          Get Data
        </button>
        <div className="image-list">
          {data}
        </div>
      </div>
    </>
  );
};
export default Display;