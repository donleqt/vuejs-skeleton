#!/usr/bin/env bash
BLUE='\033[0;34m'

.shells/check-config-files.sh

echo -e "\033[32mYarn install dependencies if any...\033[0m"
yarn install
echo -e "\033[32mBuild client side (production.json) bundle...\033[0m"
yarn build:prod

echo -e "\033[32mStart node server ...\033[0m"
pm2 stop camta > /dev/null
pm2 delete camta > /dev/null

echo -e "\033[32mDeploy successfully! Run 'pm2 log camta' to monitor\033[0m";
