#!/bin/bash

load () {
    echo "Copying files from external source"
    FOLDER='sf_WebApp'
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
sql () {
	echo "Launching psql"
    sudo -u postgres psql www
}


while getopts ":hwplq" opt; do
        case ${opt} in
    h|\?)
      echo "-w       invoke webpack script"
      echo "-p       set node production env and run node"
      echo "-l       copy files from external to local"
      echo "-q       launch sql editor"
      exit 1
      ;;
    w) webpack ;;
    p) Prod ;;
    l) load    ;;
    q) sql ;;
     *) echo "Unknown option" 
        break   ;;
  esac
done
exit 0
