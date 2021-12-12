FROM node:lts

RUN apt-get update -qq && apt -y upgrade && \
    apt-get install -y git build-essential libpng-dev wget pkg-config glib2.0-dev libexpat1-dev autoconf nasm libtool dpkg g++
RUN wget https://github.com/libvips/libvips/releases/download/v8.11.0/vips-8.11.0.tar.gz
RUN tar xf vips-8.11.0.tar.gz && cd vips-8.11.0 && ./configure && make && make install && ldconfig

WORKDIR /home/node/app
ENV PATH /home/node/app/node_modules/.bin:$PATH

RUN yarn global add gatsby-cli
EXPOSE 8000
