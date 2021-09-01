import React from "react";
import "./App.css";
import { Button } from "./Button";
import "./FrontSection.css";


import Web3 from "web3";

import contract from "./build/contracts/KURASAH.json";

class App extends React.Component {
  async componentWillMount() {
    await this.loadWeb3();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      window.location.href =
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
    }
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createTender = this.createTender.bind(this);
    this.closeBid = this.closeBid.bind(this);
    this.bid = this.bid.bind(this);
    this.numberOfBids = this.numberOfBids.bind(this);
    this.infoData = this.infoData.bind(this);
    this.funWithdraw = this.funWithdraw.bind(this);
    this.state = {
      infoAllDAta: "",
      account: "",
      address: "",
      name: "",
      close: "",
      bidding: "",
      price: "",
      numberBids: "",
      info: "",
      withdraw: "",
      user: "",
      status: "",
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async createTender() {
    console.log("createTender", this.state.name);
    this.setState({status: "(please wait)"})

    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);

    const kurContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await kurContract.methods
      .createTender(this.state.name)
      .send({ from: this.state.account });

    this.setState({status: "Tender has been create... (please wait)"})
  }

  async closeBid() {
    console.log("closeBid", this.state.close);
    this.setState({status: ""});

    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);

    const kurContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await kurContract.methods
      .closeBid(this.state.close)
      .send({ from: this.state.account });

    this.setState({status: "Tender has been close... (please wait)"})
  }

  async bid() {
    console.log("bidding", this.state.bidding);
    console.log("price", this.state.price);
    console.log("Adress", this.state.address);
    this.setState({status: ""})

    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);

    const kurContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await kurContract.methods
      .bid(this.state.bidding, this.state.address)
      .send({ from: this.state.account, value: this.state.price });

    this.setState({status: "Bid has been submit... (please wait)"})
  }


  async numberOfBids() {
    console.log("numberOfBids", this.state.numberBids);
    this.setState({status: ""})

    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);

    const kurContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await kurContract.methods
      .numberOfBids(this.state.numberBids)
      .send({ from: this.state.account });

    this.setState({status: "(please wait)"})
  }


  async infoData() {
    console.log("infoData", this.state.info);
    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);

    const kurContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

   const dataInfo = await kurContract.methods
      .info(this.state.info)
      .call({ from: this.state.account });

    this.setState({status: "(please wait)"})
    this.setState({infoAllDAta: "Name : " + dataInfo[0]+ "\n" + "Open : " + dataInfo[1] + "\n" + "Bids : " + 
    dataInfo[2]  + "\n" + "LowestBid : " + dataInfo[3]+ "\n"+ "Winner : " + dataInfo[4] + "\n" + "Win ID : " + dataInfo[5]})
    console.log(dataInfo[0]);
    console.log(dataInfo[1]);
    console.log(dataInfo[2]);
    console.log(dataInfo[3]);
    console.log(dataInfo[4]);
    console.log(dataInfo[5]);
  }


  async funWithdraw() {
    console.log("withdraw", this.state.withdraw);
    console.log("user", this.state.user);
    this.setState({status: ""})
    
    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);


    const kurContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await kurContract.methods
      .withdraw(this.state.withdraw, this.state.user)
      .send({ from: this.state.account });

    this.setState({status: "withdraw has been submit... (please wait)"})
  }


  render() {
    return (
      <div>
        <div
          className={false ? "home__hero-section" : "home__hero-section darkBg"}
        >
          <div className="container" style={{ marginLeft: "30px" }}>
            <div
              className="row home__hero-row"
              style={{
                display: "flex",
                flexDirection: "" === "start" ? "row-reverse" : "row",
              }}
            >
              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">{" DAPP"}</div>
                  
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"KURASAH"}
                  </h1>
                  <div className="status-line">Status: {this.state.status}</div>
                  <div className="input-areas">

                      <div className="top-line">{"Create Tender"}</div>
                      <input
                        className="footer-input"
                        name="name"
                        type="text"
                        placeholder="Create Tender"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />

                      <Button
                        buttonSize="btn--medium"
                        buttonColor="blue"
                        onClick={this.createTender}
                      >
                        Create Tender
                      </Button>
   

                    <div className="top-line" style={{ marginTop: "25px" }}>{"Close Bid"}</div>
                      <input
                        className="footer-input"
                        name="close"
                        type="text"
                        placeholder="أسم المشروع"
                        value={this.state.close}
                        onChange={this.handleChange}
                      />

                      <Button
                        buttonSize="btn--medium"
                        buttonColor="blue"
                        onClick={this.closeBid}
                      >
                        Close Bid
                      </Button>
                    
                    
                    <div className="top-line" style={{ marginTop: "25px" }}>{"Bid"}</div>
                      <input
                        className="footer-input"
                        name="bidding"
                        type="text"
                        placeholder="أسم المشروع"
                        value={this.state.bidding}
                        onChange={this.handleChange}
                      />

                       <input
                        className="footer-input"
                        name="price"
                        type="text"
                        placeholder="Amount"
                        value={this.state.price}
                        onChange={this.handleChange}
                      />

                       <input
                        className="footer-input"
                        name="address"
                        type="text"
                       placeholder="Address"
                        value={this.state.address}
                        onChange={this.handleChange}
                      />

                      <Button
                        buttonSize="btn--medium"
                        buttonColor="blue"
                        onClick={this.bid}
                      >
                        Bid
                      </Button>

                    <div className="top-line" style={{ marginTop: "25px" }}>{"Number of Bids"}</div>
                      <input
                        className="footer-input"
                        name="numberBids"
                        type="text"
                        placeholder="أسم المشروع"
                        value={this.state.numberBids}
                        onChange={this.handleChange}
                      />

                      <Button
                        buttonSize="btn--medium"
                        buttonColor="blue"
                        onClick={this.numberOfBids}
                      >
                        Number of Bids
                      </Button>

                    <div className="top-line" style={{ marginTop: "25px" }}>{"Info"}</div>
                      <input
                        className="footer-input"
                        name="info"
                        type="text"
                        placeholder="أسم المشروع"
                        value={this.state.info}
                        onChange={this.handleChange}
                      />

                      <Button
                        buttonSize="btn--medium"
                        buttonColor="blue"
                        onClick={this.infoData}
                      >
                        Info  
                      </Button>

                    <div className="top-line" style={{ marginTop: "25px" }}>{"Withdraw"}</div>
                      <input
                        className="footer-input"
                        name="withdraw"
                        type="text"
                        placeholder="أسم المشروع"
                        value={this.state.withdraw}
                        onChange={this.handleChange}
                      />

                       <input
                        className="footer-input"
                        name="user"
                        type="text"
                        placeholder="عنوان المحفظة"
                        value={this.state.user}
                        onChange={this.handleChange}
                      />

                      <Button
                        buttonSize="btn--medium"
                        buttonColor="blue"
                        onClick={this.funWithdraw}
                      >
                        Withdraw
                      </Button>

                  </div>
                  <div style={{marginTop: "20px"}}>
                    {this.state.infoAllDAta}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
