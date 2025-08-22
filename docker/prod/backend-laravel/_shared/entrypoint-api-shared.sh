#!/bin/sh

# Jalankan composer install (sekali saja jika belum ada vendor/autoload.php)
if [ ! -f /app/vendor/autoload.php ]; then
  echo "🔧 Running composer install..."
  composer install --prefer-dist --no-dev --optimize-autoloader
else
  echo "✅ Vendor already installed. Skipping composer install."
fi

# Permission fix (optional, kalau belum dilakukan di Dockerfile)
chown -R ilhamrhmtkbr:ilhamrhmtkbr /app/storage /app/bootstrap/cache
chmod -R 775 /app/storage /app/bootstrap/cache

# Jalankan FrankenPHP sebagai user non-root
echo "🚀 Starting FrankenPHP as ilhamrhmtkbr..."
exec gosu ilhamrhmtkbr frankenphp run --config /etc/caddy/Caddyfile --adapter caddyfile
