// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KURASAH {
    // state variables
    address payable owner;

    //constructor

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    fallback() external payable {}

    // struct
    struct Tender {
        bool open;
        string name;
        uint256 bids;
        uint256 LowestBid;
        address payable winner;
        uint256 winId;
        uint256 start;
        uint256 end;
    }

    struct Bidders {
        address payable bidder;
        uint256 biddingAmount;
    }
    // modifier

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can run this function ");
        _;
    }

    // mappings

    mapping(string => mapping(uint256 => Bidders)) public bidding;
    mapping(string => Tender) public tenderInfo;
    mapping(address => uint256) public bidderId;

    // events
    event BidWinner(address winner, string bidName, uint256 amout);
    event TenderCreated(string name);

    // tender creation
    function createTender(string memory _name) public onlyOwner {
        Tender storage tn = tenderInfo[_name];
        tn.open = true;
        tn.name = _name;
        tn.start = block.timestamp;
        emit TenderCreated(_name);
    }

    // check contract Balance
    function contractBalance() public view returns (uint256) {
        return ((address(this)).balance);
    }

    // balance of ether of current user
    function balanceOf() public view returns (uint256) {
        uint256 myBalance = msg.sender.balance;
        return myBalance;
    }

    // check no. of bids in Tender
    function numberOfBids(string memory _tender) public view returns (uint256) {
        Tender storage tn = tenderInfo[_tender];
        require(tn.open == true, "Sorry! Bidding is closed now");
        return (tn.bids);
    }

    // bidding
    function bid(string memory _name, address payable user) public payable {
        Tender storage tn = tenderInfo[_name];
        tn.bids = tn.bids + 1;
        uint256 newId = tn.bids;
        require(tn.open == true, "Sorry! Bidding is closed now");
        require(msg.value != 0, "value should not be zero");
        uint256 amount = msg.value;
        bidding[_name][newId] = Bidders(user, amount);
        bidderId[user] = newId;
        if (tn.LowestBid == 0) {
            (payable(address(this))).transfer(amount);
            tn.LowestBid = amount;
            tn.winner = user;
        } else if (amount > tn.LowestBid) {
            (payable(address(this))).transfer(amount);
        } else if (amount < tn.LowestBid) {
            (payable(address(this))).transfer(amount);
            tn.winner = user;
            tn.LowestBid = amount;
        }
    }

    // close bidding
    function closeBid(string memory _name) public onlyOwner {
        Tender storage tn = tenderInfo[_name];
        tn.open = false;
        announce(_name);
    }

    // bid announcment
    function announce(string memory _name) public {
        Tender storage tn = tenderInfo[_name];
        // tn.open == true;
        owner.transfer(tn.LowestBid);
        Bidders storage sn = bidding[_name][bidderId[tn.winner]];
        sn.biddingAmount = 0;
        emit BidWinner(tn.winner, _name, tn.LowestBid);
    }

     function info(string memory _Info) public view returns(string memory name,bool open , uint256 bids, uint256 LowestBid, address winner , uint256 winId){
         return (tenderInfo[_Info].name, tenderInfo[_Info].open, tenderInfo[_Info].bids, tenderInfo[_Info].LowestBid, tenderInfo[_Info].winner, tenderInfo[_Info].winId);
    }

    // Losers withdrawal
    function withdraw(string memory _name, address payable user) public {
        Tender storage tn = tenderInfo[_name];
        Bidders storage sn = bidding[_name][bidderId[user]];
        require(
            sn.biddingAmount > 0 && sn.bidder == user && tn.open == false,
            "bid winner cant withdraw, bidder doesnt exist,bid closed "
        );
        (user).transfer(sn.biddingAmount);
    }
}
