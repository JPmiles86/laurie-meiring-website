#!/bin/bash

# Client Deployment Script
# This script configures the app for client delivery (no AI features)

echo "🚀 Configuring for CLIENT DELIVERY mode..."

# Backup current .env.local if it exists
if [ -f ".env.local" ]; then
    echo "📁 Backing up current .env.local to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy client configuration
echo "📝 Applying client configuration..."
cp .env.client .env.local

# Build the application
echo "🔨 Building application for client delivery..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Client build completed successfully!"
    echo ""
    echo "🎯 CLIENT DELIVERY MODE ACTIVE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Features DISABLED for client:"
    echo "  ❌ AI Writing Assistant"
    echo "  ❌ AI Draft Intelligence"
    echo "  ❌ AI Image Generation"
    echo "  ❌ AI Critique System"
    echo "  ❌ Success Prediction"
    echo "  ❌ Learning Insights"
    echo "  ❌ Version Control"
    echo "  ❌ Performance Analytics"
    echo ""
    echo "Features AVAILABLE for client:"
    echo "  ✅ Blog Editor"
    echo "  ✅ Blog Management"
    echo "  ✅ Media Upload"
    echo ""
    echo "📁 Files created:"
    echo "  - .env.local (client configuration)"
    echo "  - .env.local.backup (your previous settings)"
    echo "  - dist/ (production build)"
    echo ""
    echo "🚀 Ready to deploy to client!"
    echo "   Run 'npm run preview' to test the client build"
else
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi