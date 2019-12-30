#!/bin/bash
# To build all modules
cd ./packages/dlt
yarn build
cd ../logger
yarn build
echo "prepare done"
cd ../corda
yarn build
cd ../fabric
yarn build
