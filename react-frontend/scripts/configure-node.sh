#!/bin/sh
#
# Install nvm and node version v14.13.0

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 14.13.0
npm config delete prefix
npm config set prefix $NVM_DIR/versions/node/v14.13.0
nvm use v14.13.0
npm install
