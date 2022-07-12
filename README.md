# Crypto_Scan
Small Scripts to show how to scan Ethereum mempool for pending which concern Uniswap. 

uniswapV2_scan.js uses a graphQL query to identify the coin. Then it uses another gql query to identify the pair and the reserves of each token.
mempool_scan_github_version.js , listens to ETH mempool .When a transaction that references to Uniswap occurs, it calls uniswapV2_scan.js .


uniswapV2_pairs.json is a json file with pair addresses. 
