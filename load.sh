#!/bin/bash

load () {
    echo "Copying files from external source"
    FOLDER='sf_webapp'
    rm -rf `ls | grep -v 'node_modules' | grep -v '.git'`
    cp -R /media/$FOLDER/* ./
}

webpack () {
    echo "Calling webpack"
    ./node_modules/.bin/webpack --config webpack.config.js >&2
}
Prod () {
	echo "Launching node in production"
    NODE_ENV=production npm start
}


while getopts ":hwpl" opt; do
        case ${opt} in
    h|\?)
      echo "-w       invoke webpack script"
      echo "-p       set node production env and run node"
      echo "-l       copy files from external to local"
      exit 1
      ;;
    w) webpack ;;
    p) Prod ;;
    l) load    ;;
     *) echo "Unknown option" 
        break   ;;
  esac
done
exit 0
