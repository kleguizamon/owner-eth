const hre = require("hardhat");

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// desestructuro signer para tomar 1er elemento de las cuentas
	const [kevin, natu] = await hre.ethers.getSigners();

	// We get the contract to deploy
	// A la factory getContractFactory le pasamos el contracto que toma desde artifacts
	const Ownable = await hre.ethers.getContractFactory("Ownable");
	// tomo el address del signer
	const ownable = await Ownable.deploy(kevin.address);

	await ownable.deployed();
	console.log("Ownable deployed to:", ownable.address);

	//llamo a la funcion owner que se creo al tener la variable
	//del contrato como publica -> address payable public owner;
	const foo = await ownable._owner();
	console.log(`Este es el owner: ${foo}`);

	await ownable.transferOwnership(natu.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
