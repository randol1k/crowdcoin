// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum, string memory campDesc, uint campGoal, string memory campName) public {
        address newCampaign = address(new Campaign(minimum, msg.sender, campDesc, campGoal, campName));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        string title;
        uint value;
        address recipient;
        bool isClosed;
        uint positiveApprovalsCount;
        mapping(address => bool) positiveApprovals;
    }

    address public manager;
    string public campaignDescription;
    string public campaignName;
    uint public campaignGoal;
    uint public totalSpent;
    uint public minimumContribution;
    uint public backersCount;
    mapping(address => bool) backers;
    uint public requestNumber; // We will select a request by it's number
    mapping(uint => Request) requests;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator, string memory campDesc, uint campGoal, string memory campName) {
        manager = creator;
        minimumContribution = minimum;
        campaignDescription = campDesc;
        campaignGoal = campGoal;
        campaignName = campName;
    }

    function participate() public payable {
        require(msg.value >= minimumContribution);
        require(!backers[msg.sender]);

        backersCount++;
        backers[msg.sender] = true;
    }

    function createRequest(string memory desc, uint val, address rec) public restricted {
        Request storage newRequest = requests[++requestNumber];
        newRequest.description = desc;
        newRequest.value = val;
        newRequest.recipient = rec;
        newRequest.isClosed = false;
        newRequest.positiveApprovalsCount = 0;
    }

    function approveRequest(uint reqId) public {
        require(backers[msg.sender]);

        Request storage req = requests[reqId];
        require(!req.isClosed);
        require(!req.positiveApprovals[msg.sender]);
        req.positiveApprovalsCount++;
        req.positiveApprovals[msg.sender] = true;
    }

    function finalizeRequest(uint reqId) public restricted {
        Request storage req = requests[reqId];
        require(!req.isClosed);
        require(req.positiveApprovalsCount > (backersCount / 2));
        req.isClosed = true;
        payable(req.recipient).transfer(req.value);
        totalSpent += req.value;
    }

    function isApprovedAlready(uint reqId, address checkAddress) public view returns (bool) {
        Request storage req = requests[reqId];
        return req.positiveApprovals[checkAddress] ? true : false;
    }

    function getShortRequest(uint reqId) public view returns (string memory title, string memory desc, uint value, address recipient) {
        Request storage req = requests[reqId];
        return (req.title, req.description, req.value, req.recipient);
    }

    function getFullRequest(uint reqId) public view returns (string memory title, string memory desc, uint value, uint approvalsCount, address recipient, bool isClosed ) {
        Request storage req = requests[reqId];
        return (req.title, req.description, req.value, req.positiveApprovalsCount, req.recipient, req.isClosed);
    }

    function getShortCampaign() public view returns (string memory name, string memory desc, uint goal) {
        return(campaignName, campaignDescription, campaignGoal);
    }

    function getFullCampaign() public view returns (address mgr, uint ttlSpent, uint minContrib, uint bckrsCnt, uint rqstNmbr, string memory campDesc, string memory campName, uint campGoal) {
        return(manager, totalSpent, minimumContribution, backersCount, requestNumber, campaignDescription, campaignName, campaignGoal);
    }
}