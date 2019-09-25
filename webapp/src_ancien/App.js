import React from 'react';
import Web3 from 'web3';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      network: "",
      account: ""
    };

    this.loadBlockchainData = this.loadBlockchainData.bind(this);
  }

  async loadBlockchainData() {
    await window.ethereum.enable();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();

    this.setState({
      ...this.state,
      network: network,
      account: accounts[0]
    });
  }

  componentDidMount(){
    this.loadBlockchainData();
  }

  render() {
    return (
        <div className="container">
          <p>You're on the network : {this.state.network}</p>
          <p>Your account is : {this.state.account}</p>
        </div>
    );
  }
}

export default App;
