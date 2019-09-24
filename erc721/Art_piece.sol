pragma solidity ^0.4.24;
import "./ERC721.sol";

contract Art4blockchain is ERC721{
    
    struct Art{
        string nom_de_l_oeuvre; // nom_de_l_oeuvre
        string auteur; //nom de l'artiste
    }
    event logListeOfArt(string nomdoeuvre, string createur );
    
    Art[] private list_of_art; //tab de la liste de tout ce qui a été créé 
    address private owner;
   
    function set_ownership() public { // sts ownership but needs to be changed because anyone can claim it now
        owner=msg.sender;
    }
    
    function read_liste() public {
        for (uint i=0; i<list_of_art.length; i++) {
            emit logListeOfArt(list_of_art[i].nom_de_l_oeuvre,list_of_art[i].auteur);
            
        }
        
    }
    
    function Create_Token(string _nomdoeuvre,string _auteur,Address _to)public {
        require(owner == msg.sender); // Only the Owner can create Items
        uint id = list_of_art.length; // Item ID = Length of the Array Items
        list_of_art.push(Art(_nomdoeuvre,_auteur)); // creation et ajout de l'oeuvre a la table
        _mint(_to,id); // Assigns the Token to the Ethereum Address that is specified
    }
    
}