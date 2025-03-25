## Domain Setup Instructions

### Part 1: Developer Tasks (JP)

1. **Vercel Domain Configuration**
   - Log into Vercel dashboard
   - Go to project settings under "Domains"
   - Add the domain (pbguidecr.com)
   - Note down the following Vercel DNS records that need to be configured:
     - A Record: Host `@`, Value `76.76.21.21`
     - CNAME Record: Host `www`, Value `cname.vercel-dns.com`

2. **Wait for DNS Records**
   - After Laurie configures the DNS records (Part 2)
   - Verify domain status in Vercel's Domains section
   - Ensure it shows as "Valid Configuration"
   - Use https://dnschecker.org/ to monitor DNS propagation
   - DNS changes can take up to 48 hours to fully propagate

3. **Post-Setup Verification**
   - Test the domain (pbguidecr.com)
   - Test www subdomain (www.pbguidecr.com)
   - Verify SSL certificate is working (https)
   - Check that all site functionality works on the new domain

### Part 2: Site Owner Tasks (Laurie)

1. **Access Google Workspace Admin Console**
   - Log into [Google Workspace Admin Console](https://admin.google.com)
   - Navigate to "Domains" section
   - Select your domain (pbguidecr.com)

2. **Configure DNS Records**
   - Find the DNS settings section
   - Add the following records:

   **Required Records for Vercel:**
   ```
   Type: A
   Host: @
   Value: 76.76.21.21
   TTL: 3600 (or 1 hour)

   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   TTL: 3600 (or 1 hour)
   ```

   **Additional Recommended Records:**
   ```
   Type: MX
   Host: @
   Value: (Your Google Workspace mail servers)
   Priority: As specified by Google Workspace
   TTL: 3600

   Type: TXT
   Host: @
   Value: (Your Google Workspace SPF record)
   TTL: 3600
   ```

3. **Email Configuration**
   - Verify MX records are correct for Google Workspace
   - Test email functionality by sending a test email
   - Ensure you can receive emails at your new domain

4. **Verification Steps**
   - Wait for DNS propagation (can take up to 48 hours)
   - Verify you can access your site at pbguidecr.com
   - Verify www.pbguidecr.com redirects correctly
   - Verify your email is working at the new domain
   - Check that SSL (https) is working properly

### Common Issues and Troubleshooting

1. **DNS Propagation**
   - Changes can take up to 48 hours
   - Use https://dnschecker.org/ to check propagation
   - Different regions may see changes at different times

2. **SSL Certificate Issues**
   - Ensure DNS is fully propagated
   - Verify Vercel's SSL provisioning status
   - Check for mixed content warnings

3. **Email Issues**
   - Verify MX records are correct
   - Check SPF records
   - Test email delivery

### Need Help?

- For DNS/Domain issues: Contact JP
- For Google Workspace issues: Contact Google Support
- For website functionality: Contact JP

### Important Notes

- Don't delete or modify any existing records unless specifically instructed
- Keep a backup of old DNS settings before making changes
- Document any changes made for future reference
- Test everything thoroughly after changes are propagated 