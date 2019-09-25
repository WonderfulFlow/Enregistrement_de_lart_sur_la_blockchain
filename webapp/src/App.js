import React from 'react';
import Web3 from 'web3';
import Home from './containers/Home/Home';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        network: "",
        account: "",
        lastBlock: ""
    };

    this.loadBlockchainData = this.loadBlockchainData.bind(this);
  }

  async loadBlockchainData() {
    await window.ethereum.enable();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    const lastBlock = await web3.eth.getBlock('latest');

    this.setState({
        ...this.state,
        network: network,
        account: accounts[0],
        lastBlock: lastBlock.number
    });
  }

  componentDidMount(){
      this.loadBlockchainData();
  }

  render() {
    return (
        <>
            <Home network={this.state.network}
                  account={this.state.account}
                  lastBlock={this.state.lastBlock}/>
        </>
    );
  }
}

export default App;
