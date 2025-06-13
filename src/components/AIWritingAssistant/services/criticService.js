// Critic Service - Provides different critic personas for content review

const criticRules = {
  grammar: {
    light: [
      { pattern: /\bi\b/g, message: 'Capitalize "I"', type: 'capitalization' },
      { pattern: /\s+([.,!?;:])/g, message: 'Remove space before punctuation', type: 'spacing' },
      { pattern: /([.,!?;:])\s{2,}/g, message: 'Use single space after punctuation', type: 'spacing' },
      { pattern: /\s{2,}/g, message: 'Remove extra spaces', type: 'spacing' }
    ],
    medium: [
      { pattern: /\b(your|you're)\b/gi, message: 'Check your/you\'re usage', type: 'grammar' },
      { pattern: /\b(its|it's)\b/gi, message: 'Check its/it\'s usage', type: 'grammar' },
      { pattern: /\b(their|there|they're)\b/gi, message: 'Check their/there/they\'re usage', type: 'grammar' },
      { pattern: /\b(then|than)\b/gi, message: 'Check then/than usage', type: 'grammar' },
      { pattern: /\b(effect|affect)\b/gi, message: 'Check effect/affect usage', type: 'grammar' }
    ],
    thorough: [
      { pattern: /\b(who|whom)\b/gi, message: 'Check who/whom usage', type: 'grammar' },
      { pattern: /\b(lie|lay)\b/gi, message: 'Check lie/lay usage', type: 'grammar' },
      { pattern: /\b(farther|further)\b/gi, message: 'Check farther/further usage', type: 'grammar' },
      { pattern: /\b(e\.g\.|i\.e\.)/gi, message: 'Ensure correct usage of e.g./i.e.', type: 'grammar' },
      { pattern: /\b(could of|would of|should of)\b/gi, message: 'Should be "could have", "would have", or "should have"', type: 'grammar' }
    ]
  },
  style: {
    light: [
      { pattern: /\b(very|really|quite|rather)\b/gi, message: 'Consider removing weak intensifiers', type: 'word choice' },
      { pattern: /\b(thing|stuff)\b/gi, message: 'Use more specific nouns', type: 'clarity' },
      { pattern: /!{2,}/g, message: 'Avoid multiple exclamation marks', type: 'punctuation' }
    ],
    medium: [
      { pattern: /\b(get|got|gotten)\b/gi, message: 'Consider more descriptive verbs', type: 'word choice' },
      { pattern: /\b(nice|good|bad)\b/gi, message: 'Use more descriptive adjectives', type: 'word choice' },
      { pattern: /^.{150,}$/gm, message: 'Consider breaking long sentences', type: 'readability' },
      { pattern: /\b(basically|literally|actually)\b/gi, message: 'Remove unnecessary filler words', type: 'conciseness' }
    ],
    thorough: [
      { pattern: /\b(in order to)\b/gi, message: 'Simplify to "to"', type: 'conciseness' },
      { pattern: /\b(due to the fact that)\b/gi, message: 'Simplify to "because"', type: 'conciseness' },
      { pattern: /\b(at this point in time)\b/gi, message: 'Simplify to "now"', type: 'conciseness' },
      { pattern: /\b(utilize|utilization)\b/gi, message: 'Consider "use" instead', type: 'simplicity' },
      { pattern: /\b(commence|initiate)\b/gi, message: 'Consider "start" or "begin"', type: 'simplicity' }
    ]
  },
  seo: {
    light: [
      { check: 'title_length', message: 'Title should be 50-60 characters for optimal SEO', type: 'title' },
      { check: 'meta_description', message: 'Add a meta description (150-160 characters)', type: 'metadata' }
    ],
    medium: [
      { check: 'keyword_density', message: 'Include target keywords 2-3 times', type: 'keywords' },
      { check: 'headings', message: 'Use H2 and H3 headings to structure content', type: 'structure' },
      { check: 'internal_links', message: 'Add internal links to related content', type: 'links' }
    ],
    thorough: [
      { check: 'alt_text', message: 'Add descriptive alt text to images', type: 'accessibility' },
      { check: 'external_links', message: 'Include authoritative external links', type: 'links' },
      { check: 'readability_score', message: 'Aim for 8th-grade reading level', type: 'readability' },
      { check: 'semantic_keywords', message: 'Include related terms and synonyms', type: 'keywords' }
    ]
  },
  engagement: {
    light: [
      { check: 'hook', message: 'Start with a compelling hook or question', type: 'opening' },
      { check: 'call_to_action', message: 'End with a clear call-to-action', type: 'closing' }
    ],
    medium: [
      { check: 'questions', message: 'Include questions to engage readers', type: 'interaction' },
      { check: 'personal_pronouns', message: 'Use "you" to connect with readers', type: 'tone' },
      { check: 'storytelling', message: 'Include anecdotes or examples', type: 'narrative' }
    ],
    thorough: [
      { check: 'emotion', message: 'Appeal to reader emotions', type: 'psychological' },
      { check: 'social_proof', message: 'Include testimonials or statistics', type: 'credibility' },
      { check: 'scannability', message: 'Use bullet points or numbered lists', type: 'formatting' },
      { check: 'value_proposition', message: 'Clearly state what readers will gain', type: 'benefit' }
    ]
  }
};

function analyzeGrammar(content, intensity) {
  const suggestions = [];
  const rules = [
    ...criticRules.grammar.light,
    ...(intensity === 'medium' || intensity === 'thorough' ? criticRules.grammar.medium : []),
    ...(intensity === 'thorough' ? criticRules.grammar.thorough : [])
  ];

  rules.forEach(rule => {
    const matches = content.matchAll(rule.pattern);
    for (const match of matches) {
      suggestions.push({
        id: `grammar-${suggestions.length}`,
        type: rule.type,
        severity: rule.type === 'grammar' ? 'error' : 'warning',
        description: rule.message,
        original: match[0],
        replacement: getGrammarReplacement(match[0], rule.type),
        position: match.index
      });
    }
  });

  return {
    type: 'grammar',
    summary: `Found ${suggestions.length} grammar and punctuation issues`,
    suggestions
  };
}

function analyzeStyle(content, intensity) {
  const suggestions = [];
  const rules = [
    ...criticRules.style.light,
    ...(intensity === 'medium' || intensity === 'thorough' ? criticRules.style.medium : []),
    ...(intensity === 'thorough' ? criticRules.style.thorough : [])
  ];

  // Analyze sentence length
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  sentences.forEach((sentence, index) => {
    if (sentence.split(' ').length > 25) {
      suggestions.push({
        id: `style-sentence-${index}`,
        type: 'readability',
        severity: 'suggestion',
        description: 'This sentence is quite long. Consider breaking it up.',
        original: sentence.trim(),
        position: content.indexOf(sentence)
      });
    }
  });

  // Apply pattern-based rules
  rules.forEach(rule => {
    const matches = content.matchAll(rule.pattern);
    for (const match of matches) {
      suggestions.push({
        id: `style-${suggestions.length}`,
        type: rule.type,
        severity: 'suggestion',
        description: rule.message,
        original: match[0],
        replacement: getStyleReplacement(match[0], rule.type),
        position: match.index
      });
    }
  });

  return {
    type: 'style',
    summary: `Found ${suggestions.length} style improvements`,
    suggestions
  };
}

function analyzeSEO(content, intensity) {
  const suggestions = [];
  
  // Title analysis (assuming first line is title)
  const firstLine = content.split('\n')[0];
  if (firstLine.length < 50 || firstLine.length > 60) {
    suggestions.push({
      id: 'seo-title-length',
      type: 'title',
      severity: 'warning',
      description: `Title is ${firstLine.length} characters. Optimal length is 50-60 characters.`,
      original: firstLine
    });
  }

  // Keyword density (simplified check)
  const wordCount = content.split(/\s+/).length;
  if (intensity === 'medium' || intensity === 'thorough') {
    suggestions.push({
      id: 'seo-keywords',
      type: 'keywords',
      severity: 'suggestion',
      description: 'Consider adding your target keywords 2-3 times throughout the content'
    });
  }

  // Check for headings
  if (!content.includes('##') && (intensity === 'medium' || intensity === 'thorough')) {
    suggestions.push({
      id: 'seo-headings',
      type: 'structure',
      severity: 'warning',
      description: 'Add H2 (##) and H3 (###) headings to structure your content'
    });
  }

  // Check for links
  if (intensity === 'thorough') {
    if (!content.includes('[') || !content.includes('](')) {
      suggestions.push({
        id: 'seo-links',
        type: 'links',
        severity: 'suggestion',
        description: 'Add internal and external links to improve SEO'
      });
    }
  }

  return {
    type: 'seo',
    summary: `Found ${suggestions.length} SEO optimization opportunities`,
    suggestions
  };
}

function analyzeEngagement(content, intensity) {
  const suggestions = [];
  
  // Check for hook (first paragraph)
  const firstParagraph = content.split('\n\n')[0];
  if (!firstParagraph.includes('?') && !firstParagraph.match(/you|your/i)) {
    suggestions.push({
      id: 'engagement-hook',
      type: 'opening',
      severity: 'suggestion',
      description: 'Consider starting with a question or addressing the reader directly'
    });
  }

  // Check for call-to-action (last paragraph)
  const paragraphs = content.split('\n\n');
  const lastParagraph = paragraphs[paragraphs.length - 1];
  if (intensity === 'medium' || intensity === 'thorough') {
    if (!lastParagraph.match(/\b(click|subscribe|share|comment|try|start|join)\b/i)) {
      suggestions.push({
        id: 'engagement-cta',
        type: 'closing',
        severity: 'suggestion',
        description: 'Add a clear call-to-action at the end'
      });
    }
  }

  // Check for questions throughout
  const questionCount = (content.match(/\?/g) || []).length;
  if (questionCount < 2 && (intensity === 'medium' || intensity === 'thorough')) {
    suggestions.push({
      id: 'engagement-questions',
      type: 'interaction',
      severity: 'suggestion',
      description: 'Include more questions to engage readers'
    });
  }

  // Check for "you" usage
  const youCount = (content.match(/\byou\b/gi) || []).length;
  if (youCount < 3 && intensity === 'thorough') {
    suggestions.push({
      id: 'engagement-pronouns',
      type: 'tone',
      severity: 'suggestion',
      description: 'Use "you" more often to connect with readers'
    });
  }

  return {
    type: 'engagement',
    summary: `Found ${suggestions.length} ways to boost reader engagement`,
    suggestions
  };
}

function getGrammarReplacement(original, type) {
  const replacements = {
    'capitalization': original.replace(/\bi\b/g, 'I'),
    'spacing': original.trim().replace(/\s+/g, ' '),
    'grammar': original // Complex grammar replacements would need more context
  };
  return replacements[type] || original;
}

function getStyleReplacement(original, type) {
  const replacements = {
    'word choice': '',
    'punctuation': '!',
    'conciseness': {
      'in order to': 'to',
      'due to the fact that': 'because',
      'at this point in time': 'now',
      'utilize': 'use',
      'utilization': 'use',
      'commence': 'start',
      'initiate': 'begin'
    }[original.toLowerCase()] || original
  };
  return typeof replacements === 'string' ? replacements : replacements[type] || original;
}

export async function runCritiques(content, selectedCritics, intensity) {
  const results = [];

  if (selectedCritics.grammar) {
    results.push(analyzeGrammar(content, intensity));
  }

  if (selectedCritics.style) {
    results.push(analyzeStyle(content, intensity));
  }

  if (selectedCritics.seo) {
    results.push(analyzeSEO(content, intensity));
  }

  if (selectedCritics.engagement) {
    results.push(analyzeEngagement(content, intensity));
  }

  return results;
}

export function applySuggestion(content, suggestion) {
  if (!suggestion.replacement && !suggestion.original) {
    return content;
  }

  // Simple replacement for now
  if (suggestion.original && suggestion.replacement) {
    return content.replace(suggestion.original, suggestion.replacement);
  }

  return content;
}