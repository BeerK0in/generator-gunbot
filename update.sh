#!/bin/bash

# Set variables
# -----------------------------------
GUNBOT_GITHUB_FOLDER_NAME="Core3.2"
GUNBOT_GITHUB_FILE_NAME="Gunbot_v3.2_core_allCPU"
TIMESTAMP="$(date +"%s")"
LATEST_PATCH="2022"

# Set functions
# -----------------------------------
logMessage () {
  echo " $1"
  echo " ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
}


echo ""
echo " ============================================================"
echo "                    GUNBOT 3.2 UPDATE started"
echo ""
echo "                        Patch ${LATEST_PATCH}"
echo ""
echo " ============================================================"
echo ""

logMessage "(1/5) Stop all bots"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
pm2 stop all > /dev/null 2>&1


logMessage "(2/5) Backup current version"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cp /opt/gunbot/ /opt/gunbot-backup-${TIMESTAMP}/ -r > /dev/null 2>&1


logMessage "(3/5) Update tools"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
apt -y -qq install unzip python-minimal build-essential > /dev/null 2>&1
npm install -g pm2 yo generator-gunbot gunbut-monitor > /dev/null 2>&1


logMessage "(4/5) Update GUNBOT"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
rm /opt/Patch_Fixes_2019_all_CPU.zip
rm /opt/Patch2020_v3.2_Core_allCPU.zip
rm /opt/Patch2021_Gunbot_v3.2_core_allCPU.zip
rm /opt/Patch2022_Gunbot_v3.2_core_allCPU.zip

# Set rights
mkdir /opt/gunbot/originalConfigFiles -p
mv /opt/gunbot/ALLPAIRS-params.js /opt/gunbot/originalConfigFiles/ALLPAIRS-params.js > /dev/null 2>&1
mv /opt/gunbot/poloniex-BTC_BELA-config.js /opt/gunbot/originalConfigFiles/poloniex-BTC_BELA-config.js > /dev/null 2>&1
mv /opt/gunbot/kraken-BTC_DASH-config.js /opt/gunbot/originalConfigFiles/kraken-BTC_DASH-config.js > /dev/null 2>&1
mv /opt/gunbot/bittrex-BTC_ARK-config.js /opt/gunbot/originalConfigFiles/bittrex-BTC_ARK-config.js > /dev/null 2>&1

chmod +x /opt/gunbot/gunthy-*


logMessage "(5/5) Restore old config"
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
cp /opt/gunbot-backup-${TIMESTAMP}/ALLPAIRS-params.js /opt/gunbot/ > /dev/null 2>&1
cp /opt/gunbot-backup-${TIMESTAMP}/poloniex-BTC_BELA-config.js /opt/gunbot/ > /dev/null 2>&1

chown 1000 /opt/gunbot/ALLPAIRS-params.js > /dev/null 2>&1
chown 1000 /opt/gunbot/poloniex-BTC_BELA-config.js > /dev/null 2>&1


echo ""
echo " ============================================================"
echo "                   GUNBOT UPDATE complete!"
echo ""
echo "          Please run this command to restart the GUNBOT:"
echo "                           ginit"
echo ""
echo " ============================================================"
echo ""
