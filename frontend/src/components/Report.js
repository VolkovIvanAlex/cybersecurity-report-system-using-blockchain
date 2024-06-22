import { useState } from "react";
import ImageViewer from "./ImageViewer";
import "./ShareModal.css";

const Report = ({ report, contract, fromAdress, index }) => {
  const [error, setError] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const revealForm = () => {
    if(showFeedbackForm){
      setShowFeedbackForm(false);
    }else{
      setShowFeedbackForm(true);
    }
  };

  const hideForm = () => {
    setShowFeedbackForm(false);
  };

  const updateFeedback = async () => {
    try{
      const feedback = document.querySelector(".feedback-"+index).value;
      console.log(fromAdress + index + feedback);
      await contract.updateFeedback(fromAdress,index,feedback);
    }catch(e){
      setError("Owner of the report cannot leave feedback on it.");
    }
  };
  
  return (
    <div>
      <p class="m-0 text-white" >{report.name}</p>
      <button  type="button" onClick={revealForm}
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" >
            Feedback
      </button>
      {showFeedbackForm && (
      <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label for="comment" class="sr-only">Your comment</label>
              <textarea id="comment" rows="4" class={`feedback-${index} -w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400`} placeholder={report.feedback} ></textarea>
              <div className="validation-text">{error}</div>
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
             <button onClick={hideForm} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                  Cancel
              </button>
              <button onClick={() => updateFeedback()} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                  Submit
              </button>
          </div>
      </div>
      )}
      <a className="overflow-hidden" href={report.reportUrl} key={index} target="_blank">
          <ImageViewer pdfURL={report.reportUrl}/>
      </a>
    </div>
  );
};
export default Report;