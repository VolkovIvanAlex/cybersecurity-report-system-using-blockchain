require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: 'https://opt-sepolia.g.alchemy.com/v2/C45CLcmds8qcH4ktfr5fM6ojNmeoYu1_',
      accounts: [`0xda76a11964b74372ef03ff0c3f6f4f0f4bbe06edcbac1433f53c02eb820b79fd`]
    }
  },
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
};
