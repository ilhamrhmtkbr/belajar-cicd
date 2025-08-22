#!/bin/sh

if [ ! -f /app/node_modules/.package-lock.json ] || [ /app/package.json -nt /app/node_modules/.package-lock.json ]; then
  echo "🔧 Running npm install..."
  npm install
else
  echo "✅ Node modules already installed and up to date. Skipping npm install."
fi

echo "🚀 Starting React development server..."
exec npm run dev
