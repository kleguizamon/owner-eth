const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
	beforeEach(async function () {
		// no hace falta importar hre(Hardhat Runtime Environment)
		[this.kevin, this.natu] = await hre.ethers.getSigners();
		this.Ownable = await hre.ethers.getContractFactory("Ownable");
		//le indico quien es el owner del contrato(al deployarlo dejamos a natu como owner)
		this.ownable = await this.Ownable.deploy(this.natu.address);
		await this.ownable.deployed();
	});

	it("Tengo un Owner", async function () {
		//llamo a owner() que es nuestro parametro que espera el contrato
		//que esta en el contracto y devuelve
		//el owner del contrato
		const owner = await this.ownable._owner();
		expect(owner).to.equal(this.natu.address);
	});

	it("Solo el owner puede transferir el ownership", async function () {
		await expect(
			this.ownable.transferOwnership(this.kevin.address)
		).to.be.revertedWith("No es el owner");
	});

	it("Emita evento de OwnershipTransferred", async function () {
		await expect(
			//le decimos con que cuenta nos conectamos con ownable.connect
			//de esta forma podemos cambiar de cuenta tambien
			this.ownable.connect(this.natu).transferOwnership(this.kevin.address)
			//llamamos emit donde le pasamos como parametro el contracto(este tiene la avi)
			//y el evento que creamos en el contrato(en este caso OwnershipTransferred)
		)
			.to.emit(this.ownable, "OwnershipTransferred")
			//testeamos los argumentos del evento OwnershipTransferred que se emitio
			//en este caso previousOwner y newOwner
			.withArgs(this.natu.address, this.kevin.address);
	});
});
