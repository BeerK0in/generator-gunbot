#!/bin/bash

# Set variables
# -----------------------------------
GUNBOT_GITHUB_FOLDER_NAME="Gunbot3.3.2"
GUNBOT_GITHUB_FILE_NAME="GUNBOT_v3.3.2_Poloniex_Bittrex_Patch"


# Set functions
# -----------------------------------
logMessage () {
  echo " $1"
  echo " ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
}


echo ""
echo " ============================================================"
echo "                    GUNBOT 3.3.2 SETUP started"
echo ""
echo "                This will take a few seconds"
echo ""
echo " ============================================================"
echo ""

logMessage "(1/6) Update the base system"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
apt-get -qq update > /dev/null 2>&1


logMessage "(2/6) Install nodejs 6.x"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
curl -qsL https://deb.nodesource.com/setup_6.x | bash - > /dev/null 2>&1
apt-get -y -qq install nodejs > /dev/null 2>&1


logMessage "(3/6) Install tools"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
apt-get -y -qq install unzip > /dev/null 2>&1
npm install -g pm2 yo@1.8.5 generator-gunbot gunbot-monitor > /dev/null 2>&1


logMessage "(4/6) Install GUNBOT"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/${GUNBOT_GITHUB_FOLDER_NAME}/${GUNBOT_GITHUB_FILE_NAME}.zip -P /opt/
unzip -o -qq /opt/${GUNBOT_GITHUB_FILE_NAME}.zip -d /opt/unzip-tmp

# create folder for the current version.
mkdir /opt/${GUNBOT_GITHUB_FILE_NAME} -p

# Copy only the executables.
cp /opt/unzip-tmp/gunthy-* /opt/${GUNBOT_GITHUB_FILE_NAME}

# creates a symbolic link to the gunbot folder.
rm /opt/gunbot > /dev/null 2>&1
ln -s /opt/${GUNBOT_GITHUB_FILE_NAME} /opt/gunbot

# Cleanup
rm /opt/${GUNBOT_GITHUB_FILE_NAME}.zip
rm -R /opt/unzip-tmp

# Set rights
chmod +x /opt/gunbot/gunthy-*



logMessage "(5/6) Add GUNBOT aliases"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo "" >> ~/.bashrc
echo "# GUNBOT ALIASES" >> ~/.bashrc
echo "alias gcd='cd /opt/gunbot'" >> ~/.bashrc
echo "alias ginit='gcd && yo gunbot init'" >> ~/.bashrc
echo "alias gadd='gcd && yo gunbot add'" >> ~/.bashrc
echo "alias gl='pm2 l'" >> ~/.bashrc
echo "alias glog='pm2 logs'" >> ~/.bashrc
echo "alias gstart='pm2 start'" >> ~/.bashrc
echo "alias gstop='pm2 stop'" >> ~/.bashrc



logMessage "(6/6) Init generator"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Create folder for yeoman.
chmod g+rwx /root
chmod g+rwx /opt/gunbot

# Yeoman write rights.
mkdir /root/.config/configstore -p
cat > /root/.config/configstore/insight-yo.json << EOM
{
        "clientId": 1337,
        "optOut": true
}
EOM
chmod g+rwx /root/.config
chmod g+rwx /root/.config/configstore
chmod g+rw /root/.config/configstore/*

# pm2 write rights.
mkdir /root/.pm2 -p
echo "1337" > /root/.pm2/touch
chmod g+rwx /root/.pm2
chmod g+rw /root/.pm2/*


echo ""
echo " ============================================================"
echo "                   GUNBOT SETUP complete!"
echo ""
echo "          Please run this command to init the GUNBOT:"
echo "                           gcd"
echo "                           ginit"
echo ""
echo " ============================================================"
echo ""
