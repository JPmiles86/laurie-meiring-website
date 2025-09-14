import { getVisiblePosts } from './blogUtils';

export function generateRSSFeed() {
  const posts = getVisiblePosts();
  const siteUrl = window.location.origin;
  const blogUrl = `${siteUrl}/blog`;
  
  const rssItems = posts.map(post => {
    const postUrl = `${blogUrl}/${post.slug}`;
    const pubDate = new Date(post.publishDate).toUTCString();
    
    // Clean content for RSS (remove markdown syntax)
    const cleanContent = post.content
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to text
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .substring(0, 500) + '...';
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${cleanContent}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>noreply@lauriemeiring.com (${post.author})</author>
      ${post.categories ? post.categories.map(cat => `<category>${cat}</category>`).join('\n      ') : ''}
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pickleball & Paradise - Laurie Meiring</title>
    <link>${blogUrl}</link>
    <description>Stories, tips, and adventures from Costa Rica's vibrant pickleball community</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return rss;
}

// Function to download RSS feed
export function downloadRSSFeed() {
  const rssContent = generateRSSFeed();
  const blob = new Blob([rssContent], { type: 'application/rss+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'rss.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}