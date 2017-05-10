#!/bin/bash

# Set variables
# -----------------------------------
GUNBOT_GITHUB_FOLDER_NAME="x3CoreEditionv3.1"
GUNBOT_GITHUB_FILE_NAME="GUNBOT_x3_edition_corev3.1b"


# Set functions
# -----------------------------------
logMessage () {
  echo " $1"
  echo " ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
}


echo ""
echo " ============================================================"
echo "                     GUNBOT SETUP"
echo ""
echo "              This will take a few seconds"
echo ""
echo " ============================================================"
echo ""

logMessage "Update the base system"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
apt -qq update > /dev/null 2>&1
apt -y -qq upgrade > /dev/null 2>&1


logMessage "Install nodejs 7.x"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
curl -qsL https://deb.nodesource.com/setup_7.x | bash - > /dev/null 2>&1
apt -y -qq install nodejs > /dev/null 2>&1


logMessage "Install npm tools"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install -g pm2 > /dev/null 2>&1
npm install -g yo > /dev/null 2>&1
npm install -g generator-gunbot > /dev/null 2>&1
apt -y -qq install unzip > /dev/null 2>&1


logMessage "Install GUNBOT"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cd /opt
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/${GUNBOT_GITHUB_FOLDER_NAME}/${GUNBOT_GITHUB_FILE_NAME}.zip
unzip -o -qq ${GUNBOT_GITHUB_FILE_NAME}.zip -d ${GUNBOT_GITHUB_FILE_NAME}

# creates a symbolic link to the gunbot folder
rm gunbot
ln -s ${GUNBOT_GITHUB_FILE_NAME} gunbot

# Install BB patch
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/Patch1024/BB.zip
unzip -o -qq BB.zip -d gunbot/

# Cleanup
rm /opt/${GUNBOT_GITHUB_FILE_NAME}.zip /opt/BB.zip

cd /opt/gunbot
chmod +x index.js


logMessage "Add GUNBOT aliases"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo "" >> ~/.bashrc
echo "# GUNBOT ALIASES" >> ~/.bashrc
echo "alias gcd='cd /opt/gunbot'" >> ~/.bashrc
echo "alias ginit='yo gunbot init'" >> ~/.bashrc
echo "alias gadd='yo gunbot add'" >> ~/.bashrc
echo "alias gl='pm2 l'" >> ~/.bashrc
echo "alias glog='pm2 logs'" >> ~/.bashrc
echo "alias gstart='pm2 start'" >> ~/.bashrc
echo "alias gstop='pm2 stop'" >> ~/.bashrc



logMessage "Init generator"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Create folder for yeoman.
mkdir /root/.config/configstore -p
chmod g+rwx /root /root/.config /root/.config/configstore
cat > /root/.config/configstore/insight-yo.json << EOM
{
        "clientId": 1337,
        "optOut": true
}
EOM


#logMessage "Start generator"
##~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#exec yo gunbot init


logMessage "Restart bash to take changes effect"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
exec bash
