#!/usr/bin/env bash

echo -e "\033[32mCorrect Roles & Permissions\033[0m";
current_owner=$(whoami)
group_current_owner=$(id -g -n $current_owner)
sudo chown "$current_owner":"$group_current_owner" ./ -R
sudo chmod +x .shells/*