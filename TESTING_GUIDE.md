# AI Writing Assistant - Testing Guide

## 🚀 Quick Start Testing

### Step 1: Access the Admin Panel
1. Open your browser to `http://localhost:5173/admin`
2. Login with password: `lauriepickleball2024`
3. Click on "AI Assistant" tab

### Step 2: Configure API Keys
1. Click the settings icon (⚙️) in the top right
2. Choose your AI provider:
   - **OpenAI**: Best for general use + image generation (future)
   - **Anthropic (Claude)**: Best for writing quality
3. Enter your API key
4. Click "Save Configuration"
5. You should see a green checkmark ✓

## 📝 Testing Scenarios

### Test 1: Basic Content Generation
**Goal**: Verify AI integration works

1. In the blog idea field, type: "My experience winning the Ojochal tournament"
2. Leave variations at 1
3. Click "Generate Content"
4. **Expected**: 
   - Loading spinner appears
   - Content generates in 5-10 seconds
   - Shows title, excerpt, and full content

### Test 2: Style Bible Creation (Acting as Laurie)
**Goal**: Analyze existing blogs to create writing style

1. Click "Style Bible Manager" button
2. Click "Analyze Existing Blogs"
3. **Expected**:
   - Analyzes your 8 existing blog posts
   - Creates writing rules based on patterns
   - Shows tone, structure, common phrases
4. Click "Save Style Bible"

### Test 3: Idea Generator
**Goal**: Get contextual blog ideas

1. Click the lightbulb icon (💡) or "Get Ideas" button
2. **Expected**:
   - Shows 10 blog ideas based on past content
   - Ideas have categories and descriptions
3. Click any idea card
4. **Expected**: 
   - Idea populates in the blog idea field
   - You can now generate content from it

### Test 4: Multiple Variations
**Goal**: Test A/B content generation

1. Type a blog idea: "5 tips for improving your kitchen game"
2. Set variations to 3
3. Click "Generate Content"
4. **Expected**:
   - Shows 3 different versions
   - Use arrow buttons to navigate between them
   - Click "Compare Mode" to see 2 side-by-side

### Test 5: Critic System
**Goal**: Improve generated content

1. Generate any content (single variation)
2. Click "Run Critics" button
3. Select critics to run:
   - ✓ Grammar Editor (try this first)
   - ✓ Style Checker
   - ✓ SEO Optimizer
4. Set intensity to "Medium"
5. Click "Run Selected Critics"
6. **Expected**:
   - Shows suggestions for each critic
   - Click "Apply" on individual suggestions
   - Or "Apply All Suggestions"

### Test 6: Blog Editor Integration
**Goal**: Move AI content to blog editor

1. Generate content you like
2. Click "Edit in Blog Editor"
3. **Expected**:
   - Switches to Blog Editor tab
   - Content is pre-filled
   - You can add images, format, etc.

### Test 7: Image Options in Blog Editor
**Goal**: Test new image sizing features

1. In Blog Editor, click the image button
2. Enter an image URL
3. **Expected**:
   - Modal shows size options (small/medium/large)
   - Modal shows alignment options (left/center/right)
4. Insert image and verify it displays correctly

### Test 8: YouTube Embedding
**Goal**: Add video to blog

1. In Blog Editor, click "YouTube" button
2. Paste a YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
3. **Expected**:
   - Video embeds in editor
   - Saves as `[youtube:VIDEO_ID]` in markdown

## 🔍 What to Check During Testing

### Performance
- [ ] Content generates in <10 seconds
- [ ] No freezing or crashes
- [ ] Smooth transitions between screens

### Quality
- [ ] Generated content matches Laurie's style
- [ ] Ideas are relevant to past content
- [ ] Critics provide useful suggestions

### User Experience
- [ ] All buttons have loading states
- [ ] Error messages are clear
- [ ] Mobile layout works properly

## 🐛 Common Issues & Solutions

### "API Error" Message
- **Check**: Is your API key correct?
- **Check**: Do you have credits/balance with OpenAI/Anthropic?
- **Solution**: Try the other provider

### Style Bible Won't Save
- **Check**: Did you analyze blogs first?
- **Check**: Is API key configured?
- **Solution**: Make sure you have at least one blog post

### Content Seems Generic
- **Check**: Is Style Bible loaded?
- **Solution**: Analyze blogs and save Style Bible first

### Slow Generation
- **Normal**: 5-10 seconds for single variation
- **Normal**: 15-30 seconds for 4 variations
- **Issue**: If >30 seconds, check internet connection

## 💰 Cost Estimates

### Per Generation:
- **Single variation**: ~$0.02-0.04
- **4 variations**: ~$0.08-0.16
- **With critics**: Add ~$0.01-0.02

### Monthly Usage (50 blogs):
- **Light use**: $5-10
- **Heavy use**: $20-40

## 📊 Testing Checklist

**Phase 1: Setup**
- [ ] API key saved successfully
- [ ] Can access AI Assistant tab

**Phase 2: Core Features**
- [ ] Generate single variation
- [ ] Generate multiple variations
- [ ] Style Bible analyzes blogs
- [ ] Idea generator shows relevant ideas

**Phase 3: Advanced Features**
- [ ] Critics provide suggestions
- [ ] Can apply critic suggestions
- [ ] Compare mode works
- [ ] Content transfers to Blog Editor

**Phase 4: Blog Editor**
- [ ] Image sizing works
- [ ] YouTube embedding works
- [ ] Can publish to GitHub (if configured)

## 🎯 Success Criteria

1. **It Works**: Can generate blog content
2. **It's Smart**: Content matches Laurie's style
3. **It's Helpful**: Ideas and critics add value
4. **It's Fast**: Reasonable generation times
5. **It's Stable**: No crashes or data loss

## 📝 Notes for Demo to Laurie

1. **Start Simple**: Show single generation first
2. **Highlight Value**: 
   - "It learned from your past blogs"
   - "Get ideas when you're stuck"
   - "Polish with professional critics"
3. **Cost Transparency**: Show estimated costs
4. **Future Vision**: Mention upcoming features

---

**Ready to Test!** Start with Test 1 and work through each scenario. Make notes of what works well and any issues you encounter.