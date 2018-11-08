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

while getopts ":hwrl" opt; do
        case ${opt} in
    h|\?)
      echo "-w, --webpack       invoke webpack script"
      echo "-l, --load          copy files from external to local"
      exit 1
      ;;
    w) webpack ;;
    l) load    ;;
     *) echo "Unknown option" 
        break   ;;
  esac
done
exit 0
