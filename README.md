# Enregistrement_de_lart_sur_la_blockchain

Techno: React, Ethereum (solidity), 

1. realisation d'un site en react 
2. realisation d'un contrat de vente type ICO mais pour de l'art 
3. custom d'un contrat ERC721

> - Osman     :   Deploiement Smart contrat
> - Halim     :   -------------------------
> - Maxime    :   Site en react
> - Alexis    :   Support site et Smart Contract

le projet contient l'ensemble des fichier .sol necessaire au deploiement du smart contract.
le fichier principale est ARt4blockchain.sol

this project is made by 4 students Osman, Halim, Maxime and Alexis.
the goal is to be able to create NFT on ethereum for a piece of art, view the art piece and be able to buy them directly from the site.

the contracts are written in solidity and uses a standard ERC721 contract but adds on top of it.
with the ```Art_Piece.sol```
we have a bunch of function that are callable.
## list of functions
 ``` list_of_owned``` 
takes no argument but returns an array of every token owned by the caller of the function on that specific smart contract 

