#!/bin/bash

loadFolder() {
    echo "Copying '$1' only"
    FOLDER='WebApp'    
    rm -r ./"$1"/*
    cp -r /media/sf_Share/$FOLDER/"$1"/* ./"$1"/
}
loadJs () {
    loadFolder src
    echo "Building with webpack"
    ./node_modules/.bin/webpack --config webpack.config.js >&2
}

loadAll () {
    echo "Copying all files from external source"
    echo "Make sure to rebuild JS bundle with -j"
    FOLDER='WebApp'
    rm -rf `ls | grep -v 'node_modules' | grep -v '.git'`
    cp -R /media/sf_Share/$FOLDER/* ./
    loadjs
}

loadRmd () {
	echo "Building R html"
	Rscript build.R
	
}

loadDjango () {
    echo "loading django files"
    rm -rf /home/sysadmin/website/*
    cp -r /media/sf_Share/website/* /home/sysadmin/website/
    chmod g+rw /home/sysadmin/website/db.sqlite3
    chmod a+x /home/sysadmin/website
    chmod a+x /home/sysadmin/website/russloewe_com
    sudo chown :www-data /home/sysadmin/website/db.sqlite3
    sudo chown :www-data /home/sysadmin/website
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


while getopts ":hjpaqdrvus" opt; do
        case ${opt} in
    h|\?)
      echo "-j       ./src js source files and build (no restart)"
      echo "-p       set node production env and run node"
      echo "-d       set node to development mode and run"
      echo "-a       copy everything"
      echo "-q       launch sql editor"
      echo "-v       views (no restart)"
      echo "-s       data "
      echo "-u       django"
      
      exit 1
      ;;
    j) loadJs ;;
    p) Prod ;;
    s) loadFolder public;;
    d) Dev ;;
    a) loadAll;;
    q) sql ;;
    u) loadDjango ;;
    v) loadFolder views;;
     *) echo "Unknown option" 
        break   ;;
  esac
done
exit 0
