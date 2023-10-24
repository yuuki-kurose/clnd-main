# 使用イメージ
FROM php:8.0-fpm

# php.iniをetcディレクトリにコピー
COPY php.ini /usr/local/etc/php/

# packageインストール
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
  && docker-php-ext-install pdo pdo_mysql

# Composerインストール
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" 
RUN php composer-setup.php 
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# 作業ディレクトリの指定
WORKDIR /var/www

# laravelをインストールするために記述
RUN composer global require "laravel/installer"
