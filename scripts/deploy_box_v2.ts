import { ethers, upgrades } from "hardhat";

const PROXY = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

async function main() {
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    const Upgraded = await upgrades.upgradeProxy(PROXY, BoxV2)

    console.log(`BoxV2 deployed to : ${Upgraded.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
