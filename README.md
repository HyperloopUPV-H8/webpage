# HyperloopUPV's Webpage

This repository holds the source code for the webpage. It is written using react and typescript, with sass for the styles.

## Deployment

Deployment is usually done through the [Deploy](.github/workflows/deploy.yaml) action, but can also be done manually.

First, if you don't have already, generate an SSH key pair using `ssh-keygen`. Once you have it, request that the public key gets added
to the list of allowed users on the server. Once the key is uploaded you will be notified of the host name and user you can log in on the remote server.

Now create a build using the command `npm i && npm run build`, which will install all dependencies and build the webpage.

Once done use `scp` to upload the `dist` folder to the remote host given to you earlier.
