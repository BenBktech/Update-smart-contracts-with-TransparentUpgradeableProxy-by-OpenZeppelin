import hre from 'hardhat' 
import assert from 'assert'
import { util } from 'chai'
import { ethers } from 'ethers'

before('get factories', async function() {
  this.Box = await hre.ethers.getContractFactory('Box')
  this.BoxV2 = await hre.ethers.getContractFactory('BoxV2')
})

it('Should deploy the first smart contract and then upgrade it', async function() {
  const Box = await hre.upgrades.deployProxy(this.Box, [777], {
    initializer: "initialize"
  })
  const PROXY = Box.address
  let val = await Box.val();
  let valToString = val.toString();
  assert(valToString === '777')

  const BoxV2 = await hre.upgrades.upgradeProxy(PROXY, this.BoxV2)
  await BoxV2.inc()
  let valV2 = await BoxV2.val();
  let valV2ToString = valV2.toString();
  assert(valV2ToString === '778')
})