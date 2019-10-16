pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;
import "./ERC721.sol";

contract Art4blockchain is ERC721{
    
    struct Art{
        string nom_de_l_oeuvre; // nom_de_l_oeuvre
        string auteur; //nom de l'artiste
        uint morceau; //fragment de l'oeuvre
    }
    event logListeOfArt(string nomdoeuvre, string createur, uint morceau );
    
    Art[] public list_of_art; //tab de la liste de tout ce qui a été créé 
   // address private owner;
   
    address public ownership;
    
  /*  function set_ownership() public { // sets ownership but needs to be changed because anyone can claim it now
        owner=address(0);
    }
    */
    
    function list_of_owned () view public returns (uint[]){
        uint[] storage tokeid;
            for (uint i=0; i<list_of_art.length; i++) {
               
            if (ownerOf(i)==msg.sender)
            {
             tokeid.push(i)   ;
            }
        }
        return tokeid;
    }
    
   /* function ownerOf(uint256 tokenId) private view returns (address) {
    address owner = _tokenOwner[tokenId];
    require(owner != address(0));
    return owner;
  }*/
  
   /* function read_liste()  public returns (Art)  {
        Art[] memory listing;
        for (uint i=0; i<list_of_art.length; i++) {
             //list_of_art[i];
            // return list_of_art[i];
            emit logListeOfArt(list_of_art[i].nom_de_l_oeuvre,list_of_art[i].auteur,list_of_art[i].morceau);
            
        }
       // return listing;
        
    }
    */
    function Create_Token(string _nomdoeuvre,string _auteur)public {
        if (list_of_art.length<100)
        {
            for(uint i=0;i<50;i++)
            { 
           //     string memory uneoeuvre=_nomdoeuvre+i;
                uint id = list_of_art.length; // Item ID = Length of the Array Items
                list_of_art.push(Art(_nomdoeuvre,_auteur,i )); // creation et ajout de l'oeuvre a la table
                _mint(msg.sender,id); // Assigns the Token to the Ethereum Address that is specified
            }
        }
    
}
    
}