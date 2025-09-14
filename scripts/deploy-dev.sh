#!/bin/bash

# Development Deployment Script
# This script configures the app for full development (all AI features)

echo "🛠️ Configuring for DEVELOPMENT mode..."

# Backup current .env.local if it exists
if [ -f ".env.local" ]; then
    echo "📁 Backing up current .env.local to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy development configuration
echo "📝 Applying development configuration..."
cp .env.development .env.local

echo "✅ Development configuration applied!"
echo ""
echo "🎯 DEVELOPMENT MODE ACTIVE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Features ENABLED for development:"
echo "  ✅ AI Writing Assistant"
echo "  ✅ AI Draft Intelligence"
echo "  ✅ AI Image Generation"
echo "  ✅ AI Critique System"
echo "  ✅ Success Prediction"
echo "  ✅ Learning Insights"
echo "  ✅ Version Control"
echo "  ✅ Performance Analytics"
echo "  ✅ Blog Editor"
echo "  ✅ Blog Management"
echo "  ✅ Media Upload"
echo "  ✅ Debug Mode"
echo "  ✅ Mock Data (when API unavailable)"
echo ""
echo "📁 Files updated:"
echo "  - .env.local (development configuration)"
echo "  - .env.local.backup (your previous settings)"
echo ""
echo "🚀 Ready for development!"
echo "   Run 'npm run dev' to start development server"