# Clubs Management UI Fix Task

## Assignment Date: 2025-09-16
## Priority: HIGH
## Agent: Clubs UI Fix Specialist

## Current Issues to Fix

### 1. Google Cloud Storage Integration for Club Images
**Current State**: Images use local URLs like `/clubs/jungle/jungle-pv1.jpeg`
**Required State**: All images must be uploaded to and served from Google Cloud Storage

**Implementation Requirements**:
- Replace image URL text inputs with MediaUploader component
- Add "Manage Media" button to upload multiple images
- Allow reordering of uploaded images
- Update all existing club image URLs to use GCS
- Integrate with existing ImageStorageService.js

### 2. Modal Scrolling Issues
**Problems**:
- Background scrolls when modal is open
- Footer overlaps modal when scrolled
- Header overlaps modal when scrolled
- No proper z-index layering

**Fixes Required**:
- Disable body scroll when modal is open
- Set proper z-index for modal (9999)
- Add overlay that prevents background interaction
- Ensure modal always stays on top

### 3. Form Field Spacing
**Current Issue**: Fields are touching each other with no gap
**Fields to Fix**:
- City and Province
- Phone and Email
- Website and Instagram
- Latitude and Longitude
- All 4 court detail fields

**Solution**: Add proper gap/margin between grid columns (e.g., gap: '15px')

### 4. Unsaved Changes Warning
**Current Issue**: Clicking outside modal loses all unsaved changes without warning
**Required**:
- Track if form has been modified
- Show confirmation dialog if closing with unsaved changes
- Options: "Discard Changes" or "Continue Editing"

## Files to Modify
1. `/src/pages/ClubsAdmin.jsx` - Main clubs admin interface
2. `/src/services/ImageStorageService.js` - For GCS upload functionality
3. `/src/components/MediaUploader.jsx` - Reuse existing media uploader

## Testing Requirements
1. Upload multiple images for a club
2. Verify images are stored in GCS
3. Test modal scrolling is disabled
4. Confirm proper z-index layering
5. Check field spacing is correct
6. Test unsaved changes warning

## Progress Tracking
- [ ] GCS integration for images
- [ ] Media uploader added to form
- [ ] Modal scrolling issues fixed
- [ ] Z-index layering corrected
- [ ] Form field spacing fixed
- [ ] Unsaved changes warning implemented
- [ ] All existing clubs migrated to GCS

## Output Required
Create `CLUBS_UI_FIX_RESULTS.md` documenting:
1. All changes made
2. Files modified
3. Testing results
4. Any issues encountered
5. Migration status for existing clubs