FROM mysql:8.0 as mysql
FROM debian:bookworm

# Copy MySQL from official MySQL image
COPY --from=mysql /usr/sbin/mysqld /usr/sbin/mysqld
COPY --from=mysql /usr/bin/mysql* /usr/bin/
COPY --from=mysql /etc/mysql /etc/mysql

# Install Apache, PHP and dependencies for phpMyAdmin
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    php-mysql \
    php-mbstring \
    php-zip \
    php-gd \
    php-json \
    php-curl \
    curl \
    wget \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Download and install phpMyAdmin
WORKDIR /tmp
RUN wget https://files.phpmyadmin.net/phpMyAdmin/5.2.1/phpMyAdmin-5.2.1-all-languages.tar.gz && \
    tar xzf phpMyAdmin-5.2.1-all-languages.tar.gz && \
    mv phpMyAdmin-5.2.1-all-languages /var/www/html/phpmyadmin && \
    rm phpMyAdmin-5.2.1-all-languages.tar.gz && \
    chown -R www-data:www-data /var/www/html

# Configure phpMyAdmin
RUN cp /var/www/html/phpmyadmin/config.sample.inc.php /var/www/html/phpmyadmin/config.inc.php

# Configure Apache
RUN a2enmod rewrite && \
    a2enmod php8.2

# Create Apache virtual host
RUN echo '<VirtualHost *:80>\n\
    DocumentRoot /var/www/html\n\
    <Directory /var/www/html>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Create startup script for MySQL
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
# Initialize MySQL if needed\n\
if [ ! -d "/var/lib/mysql/mysql" ]; then\n\
    mysql_install_db --user=mysql --datadir=/var/lib/mysql || true\n\
fi\n\
\n\
# Start MySQL\n\
mysqld_safe &\n\
MYSQL_PID=$!\n\
\n\
# Wait for MySQL to start\n\
sleep 5\n\
\n\
# Create database and user if needed\n\
mysql -u root -e "CREATE DATABASE IF NOT EXISTS '"${MYSQL_DATABASE}"';" || true\n\
mysql -u root -e "CREATE USER IF NOT EXISTS '"${MYSQL_USER}"'"@"localhost" IDENTIFIED BY '"'"'${MYSQL_PASSWORD}'"'"';" || true\n\
mysql -u root -e "GRANT ALL PRIVILEGES ON '"${MYSQL_DATABASE}"'.* TO '"${MYSQL_USER}"'"@"localhost";" || true\n\
mysql -u root -e "FLUSH PRIVILEGES;" || true\n\
\n\
# Start Apache\n\
apache2ctl -D FOREGROUND &\n\
APACHE_PID=$!\n\
\n\
wait $MYSQL_PID $APACHE_PID' > /start.sh && chmod +x /start.sh

# Expose ports for MySQL and Apache
EXPOSE 3306 80

# Start services
CMD ["/start.sh"]
