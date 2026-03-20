#!/bin/bash
# ============================================================
# download-images.sh
# Run this script to download all Unsplash images locally.
# After running, images will be served from ./images/ instead of Unsplash CDN.
# Usage: bash download-images.sh
# ============================================================

set -e

IMAGES_DIR="$(dirname "$0")/images"
mkdir -p "$IMAGES_DIR"

echo "Downloading Techfospect website images..."

wget -q --show-progress \
  "https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?w=1080&q=80" \
  -O "$IMAGES_DIR/hero-ai.jpg" && echo "✓ hero-ai.jpg"

wget -q --show-progress \
  "https://images.unsplash.com/photo-1659018966825-43297e655ccf?w=1080&q=80" \
  -O "$IMAGES_DIR/dashboard.jpg" && echo "✓ dashboard.jpg"

wget -q --show-progress \
  "https://images.unsplash.com/photo-1758873268663-5a362616b5a7?w=1080&q=80" \
  -O "$IMAGES_DIR/team-collab.jpg" && echo "✓ team-collab.jpg"

wget -q --show-progress \
  "https://images.unsplash.com/photo-1622579521534-8252f7da47fd?w=1080&q=80" \
  -O "$IMAGES_DIR/workspace.jpg" && echo "✓ workspace.jpg"

wget -q --show-progress \
  "https://images.unsplash.com/photo-1681770678332-3a190df72091?w=1080&q=80" \
  -O "$IMAGES_DIR/network-tech.jpg" && echo "✓ network-tech.jpg"

echo ""
echo "All images downloaded to $IMAGES_DIR"
echo ""
echo "Now update image src attributes in your HTML files:"
echo "  index.html:             https://images.unsplash.com/photo-1764336312138-14a5368a6cd3...  →  ./images/hero-ai.jpg"
echo "  index.html:             https://images.unsplash.com/photo-1659018966825-43297e655ccf...  →  ./images/dashboard.jpg"
echo "  about.html:             https://images.unsplash.com/photo-1758873268663-5a362616b5a7...  →  ./images/team-collab.jpg"
echo "  about.html:             https://images.unsplash.com/photo-1622579521534-8252f7da47fd...  →  ./images/workspace.jpg"
echo "  products.html:          https://images.unsplash.com/photo-1659018966825-43297e655ccf...  →  ./images/dashboard.jpg"
echo "  products.html:          https://images.unsplash.com/photo-1681770678332-3a190df72091...  →  ./images/network-tech.jpg"
echo "  products/triim-ai-hub:  https://images.unsplash.com/photo-1659018966825-43297e655ccf...  →  ../images/dashboard.jpg"
