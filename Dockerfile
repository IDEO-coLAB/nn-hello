# This image is for a server that receives payloads from the
# nomad command line "nom push" and spins up new containers hosting
# the pushed sensor codebase

# build on node
FROM node:boron

# set up container launcher
COPY ./docker-control /root/docker-control
WORKDIR /root/docker-control
RUN npm install

# create empty directories for testing. In production these paths will be mapped
# to volumes from the host
WORKDIR /root
RUN mkdir nomad-inbox
RUN mkdir nomad-tmp
RUN mkdir nomad-sensors

# mount host volume at nomad-data
# need to also specify flags at container run too
# VOLUME /root/nomad-data
# Keep commented out because its just easier to configure volumes at runtime

WORKDIR /root/docker-control
CMD node main.js
