//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Ownable {
    //declaramos payable para el contrato pueda
    address payable public _owner; //native datatype address

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    /*
   variables globales dentro de un contrato:
      msg -> msg.sender (nos indica quien es el que envia la transaccion)
      block -> (cosas que estan sucediendo en el bloque mientras 
      se esta ejecutando la transaccion)
      tx -> tx.origin(nos indica cual es el address origen de la transaccion)
   */

    // Es como un decorator
    modifier onlyOwner() {
        // require es una fn booleana que si es false la fn se va a revertir
        // y los cambio se van a deshacer y no van a quedar en el historial de la
        // blockchain como algo que produjo cambios, salvo que el gas que haya consumido
        // se envie al minero
        require(msg.sender == _owner, "No es el owner");
        // _; ejecuta el cuerpo de la fn modificada o sea en este caso
        // owner = newOwner;
        _;
    }

    //parameter to deploy
    constructor(address payable owner) {
        //podria poner _owner = msg.sender asi toma el dueño del contrato directamente
        _owner = owner;
        //owner.transfer(10 ether);
    }

    function transferOwnership(address payable newOwner) external onlyOwner {
        // Para que me guarde el 1er owner, porque dsp se pisa la variable
        address previousOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }
}
