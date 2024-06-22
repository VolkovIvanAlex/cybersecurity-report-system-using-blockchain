import { useState } from "react";
import "./ShareModal.css";

const ShareModal = ({ contract }) => {
  const [error, setError] = useState("");
  const sharing = async () => {
    try{
      const address = document.querySelector(".address").value;
      await contract.allow(address);
      window.location.reload();
    }catch(e){
      setError("Please enter a valid address");
    }
  };
  
  return (
    <> 
      <div id="share-popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Enter Address"
            ></input>
            <div className="validation-text">{error}</div>
          </div>
          <div className="footer">
            <button data-modal-hide="share-popup-modal"
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShareModal;