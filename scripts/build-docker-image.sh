#!/bin/sh

######################################################
# Build neoxu/examples
######################################################

SCRIPTS_DIR=$(dirname "$0")
echo "Scripts Folder: $SCRIPTS_DIR"

cd $SCRIPTS_DIR
cd ..
echo "Build Docker Folder: $(pwd)"
docker build -t neoxu/examples -f Dockerfile .