FROM php:8.2.25-fpm-alpine

RUN apk update && apk add \
    libzip-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libxml2-dev \
    gettext-dev \
    && docker-php-ext-install mysqli pdo pdo_mysql zip gd xml gettext
