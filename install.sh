#!/bin/bash

# Set variables
# -----------------------------------
GUNBOT_GITHUB_FOLDER_NAME="Core3.2"
GUNBOT_GITHUB_FILE_NAME="Gunbot_v3.2_core_allCPU"


# Set functions
# -----------------------------------
logMessage () {
  echo " $1"
  echo " ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
}


echo ""
echo " ============================================================"
echo "                    GUNBOT 3.2 SETUP started"
echo ""
echo "                This will take a few seconds"
echo ""
echo " ============================================================"
echo ""

logMessage "(1/6) Update the base system"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
apt -qq update > /dev/null 2>&1
apt -y -qq upgrade > /dev/null 2>&1


logMessage "(2/6) Install nodejs 7.x"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
curl -qsL https://deb.nodesource.com/setup_7.x | bash - > /dev/null 2>&1
apt -y -qq install nodejs > /dev/null 2>&1


logMessage "(3/6) Install tools"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
apt -y -qq install unzip python-minimal build-essential > /dev/null 2>&1
npm install -g pm2 yo generator-gunbot gunbut-monitor > /dev/null 2>&1


logMessage "(4/6) Install GUNBOT"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/${GUNBOT_GITHUB_FOLDER_NAME}/${GUNBOT_GITHUB_FILE_NAME}.zip -P /opt/
unzip -o -qq /opt/${GUNBOT_GITHUB_FILE_NAME}.zip -d /opt/

# creates a symbolic link to the gunbot folder
rm /opt/gunbot > /dev/null 2>&1
ln -s /opt/${GUNBOT_GITHUB_FILE_NAME} /opt/gunbot

# Install patch 2019
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/Patch2019/Patch_Fixes_2019_all_CPU.zip -P /opt/
unzip -o -qq /opt/Patch_Fixes_2019_all_CPU.zip -d /opt/gunbot

# Install patch 2020
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/patch2020/Patch2020_v3.2_Core_allCPU.zip -P /opt/
unzip -o -qq /opt/Patch2020_v3.2_Core_allCPU.zip -d /opt/gunbot

# Install patch 2021
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/patch2021/Patch2021_Gunbot_v3.2_core_allCPU.zip -P /opt/
unzip -o -qq /opt/Patch2021_Gunbot_v3.2_core_allCPU.zip -d /opt/gunbot

# Install patch 2022
wget -q https://github.com/GuntharDeNiro/BTCT/releases/download/Patch2022/Patch2022_Gunbot_v3.2_core_allCPU.zip -P /opt/
unzip -o -qq /opt/Patch2022_Gunbot_v3.2_core_allCPU.zip -d /opt/gunbot

# Cleanup
rm /opt/${GUNBOT_GITHUB_FILE_NAME}.zip 
rm /opt/Patch_Fixes_2019_all_CPU.zip
rm /opt/Patch2020_v3.2_Core_allCPU.zip
rm /opt/Patch2021_Gunbot_v3.2_core_allCPU.zip
rm /opt/Patch2022_Gunbot_v3.2_core_allCPU.zip

# Set rights
chmod +x /opt/gunbot/gunthy-*
mkdir /opt/gunbot/originalConfigFiles -p
mv /opt/gunbot/ALLPAIRS-params.js /opt/gunbot/originalConfigFiles/ALLPAIRS-params.js > /dev/null 2>&1
mv /opt/gunbot/poloniex-BTC_BELA-config.js /opt/gunbot/originalConfigFiles/poloniex-BTC_BELA-config.js > /dev/null 2>&1
mv /opt/gunbot/kraken-BTC_DASH-config.js /opt/gunbot/originalConfigFiles/kraken-BTC_DASH-config.js > /dev/null 2>&1
mv /opt/gunbot/bittrex-BTC_ARK-config.js /opt/gunbot/originalConfigFiles/bittrex-BTC_ARK-config.js > /dev/null 2>&1



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
echo "alias gsys='vmstat -s -S M | grep \"free memory\" && cat /proc/loadavg'" >> ~/.bashrc



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
echo "                           ginit"
echo ""
echo " ============================================================"
echo ""
