const { request, gql } = require('graphql-request');

var univ3 = require("@uniswap/sdk");
var ethers = require("ethers");//to API pou xrhsimopoiw
const fs = require('fs');

function swapFor(your_budget, data,smt){
  console.log(data.pairs.length);
  for(i in data.pairs){
    try{
      if(data.pairs[i].token0.id == smt){
        console.log("token0 Name : " + data.pairs[i].token0.name +
        "\ntoken1 Name : " + data.pairs[i].token1.name+
        "\nPair id : " + data.pairs[i].id
      );
    }
  }catch(err){var x = 1;}
}
}


async function value_pair(address0, address1) {
  var temp_prices = [];
  var startingAmmount = 100;

  var start = Date.now();

  var marr = [];

var QUERY_Pair = gql`
query pairs($token0 : String! ,$token1 : String!){
  pairs(first : 1000 ,skip : 5000){
    id
    token0{
      id
      name
    }
    token1{
      id
      name
    }
  }
}
`

var QUERY_kserw_Pair = gql`
query pairs($id : String!){
  pair(id : $id){
    id
    reserve0
    reserve1
    token0{
      id
      name
    }
    token1{
      id
      name
    }
  }
}
`

var QUERY_Token = gql`
query tokens($tokenAddress : String!){
  token(id: $tokenAddress){
    id
    symbol
    name
    decimals
    tradeVolume
    tradeVolumeUSD
    untrackedVolumeUSD
    txCount
    totalLiquidity
    derivedETH
  }
}
`

  let rawdata = fs.readFileSync('D:\\FeredinosBot\\Feredinos_V0.1\\uniswapV2_pairs.json');
  let all_pairs = JSON.parse(rawdata);

  var address0 = await address0.toLowerCase();//after many attempts this has to be LowerCase
  var address1 = await address1.toLowerCase();//after many attempts this has to be LowerCase
  //request uniswap to identify the coin
  var token1 = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
                QUERY_Token,
                {tokenAddress : address1});
  //console.log(token1.token);
  var token0 = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
                QUERY_Token,
                {tokenAddress : address0});
  //console.log(token0.token);
  //ask uniswap to get pair
  var r = 0;
  var dr = 0;
  console.log(token0.token.name+"\\"+token1.token.name);
  if(all_pairs[token0.token.name+"\\"+token1.token.name] !== undefined){
    console.log(all_pairs[token0.token.name+"\\"+token1.token.name]);
    r = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    QUERY_kserw_Pair,
    {id : all_pairs[token0.token.name+"\\"+token1.token.name],token1 : "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"});
  }else if(all_pairs[token1.token.name+"\\"+token0.token.name] !== undefined){
    console.log(all_pairs[token1.token.name+"\\"+token0.token.name]);
    r = await request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    QUERY_kserw_Pair,
    {id : all_pairs[token1.token.name+"\\"+token0.token.name]});
  }else{
    console.log("Malakeia");
  }
  console.log(r);
  var end = Date.now();
  console.log(end - start);
  return r;
};

module.exports = value_pair; // Changed line
