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
webpackProd () {
    echo "Calling webpack production mode"
    ./node_modules/.bin/webpack --mode production --config webpack.config.js >&2
}
while getopts ":hwprl" opt; do
        case ${opt} in
    h|\?)
      echo "-w       invoke webpack script"
      echo "-p       invoke webpack script in production mode"
      echo "-l          copy files from external to local"
      exit 1
      ;;
    w) webpack ;;
    p) webpackProd ;;
    l) load    ;;
     *) echo "Unknown option" 
        break   ;;
  esac
done
exit 0
