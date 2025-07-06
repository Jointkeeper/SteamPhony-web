#!/usr/bin/env bash
set -euo pipefail

SERVICE=${1:-api}

echo "Rolling update for $SERVICE..."

docker compose pull "$SERVICE"
# Start new container first
docker compose up -d --no-deps --no-build "$SERVICE"

echo "Rolling update complete." 