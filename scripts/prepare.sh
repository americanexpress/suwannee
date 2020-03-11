#!/bin/bash
# To build all modules
cd ./packages/dlt
yarn && yarn build
cd ../logger
yarn && yarn build
echo "prepare done"
cd ../corda
yarn && yarn build
cd ../fabric
yarn && yarn build
cd ../iotaMam
yarn && yarn build
