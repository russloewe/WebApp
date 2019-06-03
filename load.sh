#!/bin/bash

load () {
    echo "Copying files from external source"
    FOLDER='sf_WebApp'
    rm -rf `ls | grep -v 'node_modules' | grep -v '.git'`
    cp -R /media/$FOLDER/* ./
}

loadRmd () {
	echo "Copying and rendering Rmd website"
	FOLDER='sf_RmdSite'
    R ./media/$FOLDER/build.R
}

css () {
    echo "Bundling desktop css files"
    cat ./src/stylesheets/desktop/*.scss ./src/stylesheets/shared/*.scss | sed -f ./src/stylesheets/shared/theme_desktop.sed > ./public/stylesheets/desktop.css
    echo "Bundling mobile css files"
    cat ./src/stylesheets/mobile/*.scss ./src/stylesheets/shared/*.scss | sed -f ./src/stylesheets/shared/theme_mobile.sed > ./public/stylesheets/mobile.css
}

webpack () {
    echo "Calling webpack"
    ./node_modules/.bin/webpack --config webpack.config.js >&2
}
Prod () {
	echo "Launching node in production"
    NODE_ENV=production npm start
}
Dev (){
    	echo "Launching node in development"
    NODE_ENV=development npm start
}
sql () {
	echo "Launching psql"
    sudo -u postgres psql www
}

dbdump () {
    echo "Creating databas dump file www.pgdump "
    sudo -u postgres pg_dump -Fc -c www > www.pgdump  
}


while getopts ":hwplqcdbr" opt; do
        case ${opt} in
    h|\?)
      echo "-w       invoke webpack script"
      echo "-p       set node production env and run node"
      echo "-d       set node to development mode and run"
      echo "-l       copy files from external to local"
      echo "-q       launch sql editor"
      echo "-b       backup database"
      echo "-r       render Rmd site"
      exit 1
      ;;
    w) webpack ;;
    p) Prod ;;
    d) Dev ;;
    l) load    ;;
    c) css ;;
    q) sql ;;
    b) dbdump;;
    r) loadRMD;;
     *) echo "Unknown option" 
        break   ;;
  esac
done
exit 0
