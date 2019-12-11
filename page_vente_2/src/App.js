import React, {Component}from 'react';
import {Button,Typography,Container,Input,InputLabel,TextField} from '@material-ui/core';
import Modal from '@material-ui/core/Modal'
import Web3 from 'web3'
import {abi, addresss, byte_code} from './config'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      address :""
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.DeployContract = this.DeployContract.bind(this)
  }

  async DeployContract () {
    await window.ethereum.enable();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const myContract = new web3.eth.Contract(abi,addresss)
    myContract.deploy({
      data : '0x60556023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea265627a7a72315820a906072c1065dbdb1041d1de751cb1b25ace39613f9db0640852d7974cddc8be64736f6c634300050c0032',
      arguments : [3,"bonjour","bonjour","bonjour",3]
    }).send({
        from: '0x2dEe326bd5b94034F3d7968E4d3a94EED1c3c852',
        gasPrice: '20000000000'
      })
      .then(function(newContractInstance){
          console.log(newContractInstance.options.address) // instance with the new contract address
      });
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
  };

  componentDidMount(){
    this.DeployContract();
    //this.getAddress();
  }

  render(){
    return (
<div className>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Mettez en vente vos oeuvres ! 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Vos oeuvres peuvent être découpées en morceaux et chacun d'entre eux mis en vente. Il est alors possible d'acheter et d'être le propriétaire de parties de votre oeuvre.
            </Typography>
            <form noValidate autoComplete = "off">
              <div>
                <TextField
                  required
                  id="name"
                  label="Nom de l'oeuvre"
                  defaultValue=" "
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  
                  id="bio"
                  label="Description de l'oeuvre"
                  defaultValue=" "
                  margin="normal"
                  variant = "outlined"
                />
              </div>
              <div>
                <TextField
                  required
                  id="price"
                  label="Prix par subdivision"
                  defaultValue=" "
                  margin="normal"
                />
              </div>
              <br></br>
              <div>
                  <Input 
                    type="file"
                    className="custom-file-input"
                    aria-describedby="inputGroupFileAddon01" 
                    placeholder={"test"}
                    onChange={this.uploadImage}
                  />
                  <InputLabel 
                    className="custom-file-label" 
                    htmlFor="inputGroupFile01"
                  />
              </div>
              <br></br>
              <Button type="button" onClick={this.DeployContract}>
                Suivant
              </Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
              >
                <div>
                  <h2 id="simple-modal-title">IMAGE avec découpage etc.</h2>
                  <p id="simple-modal-description">
                  </p>
                </div>
              </Modal>
            </form>

          </Container>
        </div> 
    );
  }
}

export default App;