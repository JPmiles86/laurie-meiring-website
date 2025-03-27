# Partner Matching Email Templates

## Auto-Response Template

```
Dear {name},

Thank you for using our Pickleball Partner Matching service. We have received your request and will work to help you find compatible playing partners in Costa Rica.

Here's a summary of your submission:
- Skill Level: {skillLevel}
- Years Playing: {yearsPlaying}
- Preferred Locations: {preferredLocations}
- Availability: {availability details}

Our team reviews all partner requests and will be in touch with potential matches. In the meantime, we encourage you to check out our upcoming events where you can meet fellow pickleball players.

Best regards,
Laurie Meiring
Your Pickleball Guide Costa Rica
WhatsApp: +506 6200 2747
```

## Form Configuration for Formspree

When implementing the Partner Matching Form, use the following metadata fields for Formspree:

```javascript
const metadata = {
  _subject: `New Partner Matching Request from ${formData.name}`,
  _replyto: formData.email,
  _template: "table",
  _autoresponse: autoResponseTemplate // Use the template above with replaced values
};

// Actual form data that will appear in the email
const formFields = {
  "Name": formData.name,
  "Email": formData.email,
  "Phone": formData.phone || "Not provided",
  "Skill Level": formData.skillLevel,
  "Years Playing": formData.yearsPlaying,
  "Preferred Position": formData.preferredPosition || "Not specified",
  "Availability": availabilityString, // Format the availability object into a readable string
  "Preferred Locations": formData.preferredLocations.join(", "),
  "Travel Distance": formData.travelDistance || "Not specified",
  "Partner Preferences": partnerPreferencesString, // Format the partner preferences into a readable string
  "Additional Message": formData.message || "None"
};
```

## Form ID

The Formspree form ID for the Partner Matching form is:
```
https://formspree.io/f/mwplqdgo
```

The next agent should use this ID when implementing the form submission functionality.