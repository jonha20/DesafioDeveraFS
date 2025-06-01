#!/bin/bash
apt-get update
apt-get install -y wget unzip
wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -y ./google-chrome-stable_current_amd64.deb
wget -q https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
mkdir -p bin
mv chromedriver ./bin/chromedriver
chmod +x ./bin/chromedriver