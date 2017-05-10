#!/bin/bash

# Set variables
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GUNBOT_GITHUB_FOLDER_NAME=x3CoreEditionv3.1
GUNBOT_GITHUB_FILE_NAME=GUNBOT_x3_edition_corev3.1b


# Update the base system
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
apt -qq update
apt -y -qq upgrade


# Install nodejs 7.x
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
curl -qsL https://deb.nodesource.com/setup_7.x | bash - > /dev/null
apt -y -qq install nodejs


# Install needed tools
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install -g pm2 yo > /dev/null
apt -y -qq install unzip


# Install gunbot in /opt folder
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd /opt
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/${GUNBOT_GITHUB_FOLDER_NAME}/${GUNBOT_GITHUB_FILE_NAME}.zip
unzip -qq ${GUNBOT_GITHUB_FILE_NAME}.zip -d ${GUNBOT_GITHUB_FILE_NAME}

# creates a symbolic link to the gunbot folder
ln -s ${GUNBOT_GITHUB_FILE_NAME} gunbot

# Install BB patch
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/Patch1024/BB.zip
unzip -o -qq BB.zip -d gunbot/

# Cleanup
rm /opt/${GUNBOT_GITHUB_FILE_NAME}.zip /opt/BB.zip

cd /opt/gunbot/
chmod +x index.js


# Add gunbot aliases
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo "" >> ~/.bashrc
echo "# GUNBOT ALIASES" >> ~/.bashrc
echo "alias ginit='yo gunbot init'" >> ~/.bashrc
echo "alias gadd='yo gunbot add'" >> ~/.bashrc
echo "alias gl='pm2 l'" >> ~/.bashrc
echo "alias glog='pm2 logs'" >> ~/.bashrc
echo "alias gstart='pm2 start'" >> ~/.bashrc
echo "alias gstop='pm2 stop'" >> ~/.bashrc
# Restart bash to take changes effect
bash

# Start generator
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
