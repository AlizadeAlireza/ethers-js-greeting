const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    // takes PK and Provider for creating our wallet

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    // ABI
    const abi = fs.readFileSync("./Greeting_sol_Greeting.abi", "utf8")
    // BINARY
    const binary = fs.readFileSync("./Greeting_sol_Greeting.bin", "utf8")

    // initialize our contract
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")

    // deploying contract
    const contract = await contractFactory.deploy("alireza")
    await contract.deployTransaction.wait(1) // to make sure this happend
    console.log(`Contract Address: ${contract.address}`)

    // Get the first name
    const first_greeting_name = await contract.getGreeting()
    console.log(first_greeting_name)

    // update the name to greeting
    const newName = await contract.setName("saleh")
    const newName_receipt = await newName.wait(1)
    const just_name = await contract.name()
    const update_greeting_name = await contract.getGreeting()
    console.log(
        `hi ${just_name}, wa want say hello to you. ${update_greeting_name}`
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
