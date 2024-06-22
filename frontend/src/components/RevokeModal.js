import { useEffect } from "react";
import "./ShareModal.css";

const RevokeModal = ({ contract }) => {

  const revoke = async () => {
    try{
      const selectElement = document.querySelector("#selectAddress");
      const address = selectElement.value;
      await contract.disallow(address);
      window.location.reload();
    }catch(e){
      console.log(e);
    }
  } 

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAcess();
      let select = document.querySelector("#selectAddress");
      for (let i = 0; i < addressList.length; i++) {
        let accessMember = addressList[i];
        if(accessMember[1] == true){ //check if has access
          let option = document.createElement("option");
          option.textContent = accessMember[0]; //getting address here
          option.value = accessMember[0];
          select.appendChild(option);
        }
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div id="revoke-popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="modalContainer">
          <div className="title">Access List</div>
          <form id="myForm">
            <select id="selectAddress" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button data-modal-hide="revoke-popup-modal" id="cancelBtn">
              Cancel
            </button>
            <button onClick={() => revoke()}>Revoke</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default RevokeModal;