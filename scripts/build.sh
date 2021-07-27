#!/bin/sh
SCRIPTS_DIR=$(dirname "$0")
cd $SCRIPTS_DIR
SCRIPTS_DIR=$(pwd);
cd ../apps
APPS_ROOT_DIR=$(pwd);
# echo $APPS_ROOT_DIR
# echo $SCRIPTS_DIR

for d in */ ; do
    if [ $d != 'template/' ];then
        echo "<<<<<<<<<<<< Start build $d"
        cd $d
        npm install
        npm run build
        cd $APPS_ROOT_DIR
        echo "Finish build $d >>>>>>>>>>>>>>>"
    fi
done