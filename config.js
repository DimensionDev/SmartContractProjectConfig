const ethers = require("ethers");
const fs = require('fs');

let project_secret;

const ProjectSecrestConfigFile = './project.secret.js';
const ProjectSecrestDummyConfigFile = './project.secret.sample.js';

try {
    project_secret = require(ProjectSecrestConfigFile);
}
catch (err) {
    project_secret = require(ProjectSecrestDummyConfigFile);
    console.log('Warning: loading secrets from tempalte file, might be invalid');
}

const HardhatNetworkConfig = {
    localhost: {
        url: 'http://127.0.0.1:8545',
        chainId: 1337,
    },
    hardhat: {
        blockGasLimit: 6000000,
        chainId: 31337,
        gas: 'auto',
    },
    mainnet: {
        url: 'https://mainnet.infura.io/v3/' + project_secret.infura_project_id,
        accounts: project_secret.private_key_list,
        chainId: 1,
        gasPrice: ethers.utils.parseUnits('10', 'gwei').toNumber(),
        // to solve timeout error, increase the hardcoded `waitAndValidateDeployment` in `@openzeppelin/upgrades-core/dist/deployment.js`
    },
    ropsten: {
        url: 'https://ropsten.infura.io/v3/' + project_secret.infura_project_id,
        accounts: project_secret.private_key_list,
        chainId: 3,
        gasPrice: ethers.utils.parseUnits('10', 'gwei').toNumber(),
    },
    rinkeby: {
        url: "https://rinkeby.infura.io/v3/" + project_secret.infura_project_id,
        accounts: project_secret.private_key_list,
        chainId: 4,
        gasPrice: ethers.utils.parseUnits('5', 'gwei').toNumber(),
    },
    bsc_test: {
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        accounts: project_secret.private_key_list,
        chainId: 97,
        gasPrice: ethers.utils.parseUnits('25', 'gwei').toNumber(),
    },
    bsc_mainnet: {
        url: 'https://bsc-dataseed1.binance.org:443',
        accounts: project_secret.private_key_list,
        chainId: 56,
        gasPrice: ethers.utils.parseUnits('5', 'gwei').toNumber(),
    },
    matic_mumbai_test: {
        url: 'https://rpc-mumbai.matic.today',
        accounts: project_secret.private_key_list,
        chainId: 80001,
        gasPrice: ethers.utils.parseUnits('2', 'gwei').toNumber(),
    },
    matic_mainnet: {
        url: 'https://rpc-mainnet.matic.network',
        accounts: project_secret.private_key_list,
        chainId: 137,
        gasPrice: ethers.utils.parseUnits('1', 'gwei').toNumber(),
    },
};

const HardhatSolidityConfig = {
    version: '0.8.0',
    settings: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
};

const HardhatGasReporterConfig = {
    currency: 'USD',
    gasPrice: 21,
    enabled: true,
};

// https://docs.chain.link/docs/vrf-contracts/
const ChainlinkVRFConfig = {
    mainnet: {
        VRFCoordinator: '0xf0d54349aDdcf704F77AE15b96510dEA15cb7952',
        LinkAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        KeyHash: '0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445',
        Fee: ethers.utils.parseUnits(`2`, 18).toString(),
    },
    rinkeby: {
        VRFCoordinator: '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B',
        LinkAddress: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
        KeyHash: '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311',
        Fee: ethers.utils.parseUnits(`0.1`, 18).toString(),
    },
    bsc_mainnet: {
        VRFCoordinator: '0x747973a5A2a4Ae1D3a8fDF5479f1514F65Db9C31',
        LinkAddress: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
        KeyHash: '0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c',
        Fee: ethers.utils.parseUnits(`0.2`, 18).toString(),
    },
    matic_mainnet: {
        VRFCoordinator: '0x3d2341ADb2D31f1c5530cDC622016af293177AE0',
        LinkAddress: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
        KeyHash: '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da',
        Fee: ethers.utils.parseUnits(`0.0001`, 18).toString(),
    },
};

const ContractAddressConfig = {
    mainnet: {
        MaskTokenAddress : '0x69af81e73a73b40adf4f3d4223cd9b1ece623074',
    },
    ropsten: {
        MaskTokenAddress : '0x0f6d3ec17ad4be4641fff47b98d970a2845c1365',
    },
    rinkeby: {
        MaskTokenAddress : '0x46ed2e50a9f27de0dc47b04e7580e8e91fce7246',
    },
    bsc_test: {
        MaskTokenAddress : '0xC119574D5Fb333F5AC018658D4d8b5035E16bf39',
    },
    bsc_mainnet: {
        MaskTokenAddress : '0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3',
    },
    matic_mumbai_test: {
        MaskTokenAddress : '0xC119574D5Fb333F5AC018658D4d8b5035E16bf39',
    },
    matic_mainnet: {
        MaskTokenAddress : '0x0000000000000000000000000000000000000000',
    },
};

module.exports = {
    HardhatNetworkConfig,
    HardhatSolidityConfig,
    ChainlinkVRFConfig,
    HardhatGasReporterConfig,
    ContractAddressConfig,
}
