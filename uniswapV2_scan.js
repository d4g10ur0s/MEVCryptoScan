const { request, gql } = require('graphql-request');

var univ3 = require("@uniswap/sdk");
var ethers = require("ethers");//to API pou xrhsimopoiw
const fs = require('fs/promises');

function swapFor(your_budget, data){
  console.log(data);
}

async function value_pair(address) {
  var temp_prices = [];
  var startingAmmount = 100;

  var start = Date.now();

  var marr = [];

const QUERY_PAIR = gql`
query tokens($tokenAddress : String!){
  token(id: $tokenAddress){
    name
    symbol
    decimals
    derivedETH
    tradeVolumeUSD
    totalLiquidity
  }
}
`
  var address1 = await address.toLowerCase();//after many attempts this has to be LowerCase
  await console.log(address1);
  //request uniswap to identify the coin
  await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
                QUERY_PAIR,
                {tokenAddress : address1}).then( (data) =>
                swapFor(100,data)
              );

  var end = Date.now();
  console.log(end - start);

};

module.exports = value_pair; // Changed line
