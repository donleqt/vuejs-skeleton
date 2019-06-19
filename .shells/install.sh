#!/usr/bin/env bash
echo -e "\033[32mInstall node modules ...\033[0m"
yarn install
echo -e "\033[32mClone config files ...\033[0m";
.shells/check-config-files.sh
echo -e "\033[32mInstall is successfully!\033[0m";