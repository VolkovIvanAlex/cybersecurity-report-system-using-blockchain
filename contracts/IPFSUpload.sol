//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract IPFSUpload {
    mapping(address => Access[]) public accessList;
    mapping(address => Report[]) public reports;
    mapping(address => mapping(address => bool)) public ownership;
    mapping(address => mapping(address => bool)) public previousAccess;

    struct Report{
        string reportUrl;
        string name;
        uint256 date;
        string feedback;
    }

    struct Access {
        address user;
        bool hasAccess;
    }


    function add(address _user, string calldata _url,string calldata _name, uint256 _date) external {
        reports[_user].push(Report({
            reportUrl: _url,
            name: _name,
            date: _date,
            feedback: ""
        }));
    }

    function allow(address _user) external {
        ownership[msg.sender][_user]=true;
        if (previousAccess[msg.sender][_user]==true){ // if user once has given access
            for(uint i=0; i<accessList[msg.sender].length; i++){
                if (accessList[msg.sender][i].user==_user){
                    accessList[msg.sender][i].hasAccess=true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(_user, true));
            previousAccess[msg.sender][_user]=true;
        }
    }

    function disallow(address _user) external {
        ownership[msg.sender][_user]=false;
        for(uint i=0; i<accessList[msg.sender].length; i++){
            if (accessList[msg.sender][i].user==_user){
                accessList[msg.sender][i].hasAccess=false;
            }
        }
    }

    function updateFeedback(address _user, uint256 _reportIndex, string calldata _feedback) external {
        require(
            msg.sender != _user, "Owner of the report cannot leave feedback."
        );
        require(
            ownership[_user][msg.sender], "Permission denied."
        );
        require(
            _reportIndex < reports[_user].length, "Report index out of bounds."
        );
        reports[_user][_reportIndex].feedback = _feedback;
    }

    function display(address _user) external view returns (Report[] memory){
        require(msg.sender == _user || ownership[_user][msg.sender], "Permission denied.");
        return reports[_user];
    }

    function shareAcess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}