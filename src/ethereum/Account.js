import {ethers} from 'ethers';

const AccountAbi = [];

const faucetContract = (provider)=>{
    return new ethers.Contract("",AccountAbi, provider);
};

export default faucetContract;