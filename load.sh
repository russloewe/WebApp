#!/bin/bash

load () {
    echo "Copying files from external source"
    FOLDER='sf_WebApp'
    rm -rf `ls | grep -v 'node_modules' | grep -v '.git'`
    cp -R /media/$FOLDER/* ./
}

css () {
    echo "Bundling desktop css files"
    cat ./src/stylesheets/desktop/*.scss ./src/stylesheets/shared/*.scss | sed -f ./src/stylesheets/shared/theme.sed > ./public/stylesheets/desktop.css
    echo "Bundling mobile css files"
    cat ./src/stylesheets/mobile/*.scss ./src/stylesheets/shared/*.scss | sed -f ./src/stylesheets/shared/theme.sed > ./public/stylesheets/mobile.css
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


while getopts ":hwplqc" opt; do
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
    c) css ;;
    q) sql ;;
     *) echo "Unknown option" 
        break   ;;
  esac
done
exit 0
