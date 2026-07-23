/**
 * Claims Parser - Manual Rules for Splitting Thought Processes into Claims
 *
 * Rules:
 * 1. Each bullet point (-, *, •) on its own line = 1 claim
 * 2. Each numbered item (1., 2), etc.) on its own line = 1 claim
 * 3. For prose text: split on ". " followed by capital letter (new sentence)
 * 4. Skip headers (short lines ending with ":")
 * 5. Skip noise (npm commands, file names, "Thought for Xs", etc.)
 * 6. Protect abbreviations (Dr., Mr., vs., etc., i.e., e.g.)
 */

// Abbreviations that should NOT trigger sentence splits
const ABBREVIATIONS = [
  'Dr', 'Mr', 'Mrs', 'Ms', 'Prof', 'Sr', 'Jr', 'vs', 'etc', 'ie', 'eg',
  'Inc', 'Ltd', 'Corp', 'Co', 'St', 'Ave', 'Blvd', 'Rd',
  'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  'No', 'Vol', 'pp', 'pg', 'Ch', 'Sec', 'Fig', 'Ex', 'approx', 'est', 'min', 'max',
  'HTML', 'CSS', 'JS', 'API', 'URL', 'UI', 'UX'
];

/**
 * Check if a line is a header (short line ending with colon)
 */
function isHeader(line: string): boolean {
  const t = line.trim();
  if (!t.endsWith(':')) return false;
  if (t.length > 60) return false;
  const words = t.split(/\s+/).length;
  return words <= 8;
}

/**
 * Check if a line is noise that should be skipped
 */
function isNoise(line: string): boolean {
  const t = line.trim().toLowerCase();
  if (t.length < 8) return true;

  const noisePatterns = [
    /^thought for \d+s?$/i,
    /^thoughts?$/i,
    /^npm\s/i,
    /^(index\.html|style\.css|main\.js|script\.js|app\.js)$/i,
    /^npm (run dev|install|start|build)$/i,
    /^\d+\.?$/,
  ];

  return noisePatterns.some(p => p.test(t));
}

/**
 * Check if a line starts with a bullet point
 */
function isBulletLine(line: string): boolean {
  return /^[\s]*[-*•]\s+/.test(line);
}

/**
 * Check if a line starts with a number (numbered list)
 */
function isNumberedLine(line: string): boolean {
  return /^[\s]*\d+[\.\)]\s+/.test(line);
}

/**
 * Extract content from a bullet or numbered line
 */
function extractListContent(line: string): string {
  return line.trim()
    .replace(/^[-*•]\s+/, '')
    .replace(/^\d+[\.\)]\s+/, '')
    .trim();
}

/**
 * Split prose text into sentences using ". [A-Z]" rule
 */
function splitProseIntoSentences(text: string): string[] {
  if (!text || text.trim().length === 0) return [];

  // Normalize whitespace
  let normalized = text.replace(/\s+/g, ' ').trim();

  // Protect abbreviations by replacing their periods temporarily
  const PLACEHOLDER = '\x00';
  ABBREVIATIONS.forEach(abbr => {
    const regex = new RegExp(`\\b${abbr}\\.\\s`, 'gi');
    normalized = normalized.replace(regex, `${abbr}${PLACEHOLDER} `);
  });

  // Protect decimal numbers (1.5, 2.0)
  normalized = normalized.replace(/(\d)\.(\d)/g, `$1${PLACEHOLDER}$2`);

  // Split on sentence boundaries: . ! ? followed by space and capital letter
  const sentences: string[] = [];
  let current = '';

  for (let i = 0; i < normalized.length; i++) {
    current += normalized[i];

    // Check for sentence boundary: punctuation + space + capital letter
    if ('.!?'.includes(normalized[i]) &&
        i + 2 < normalized.length &&
        normalized[i + 1] === ' ' &&
        /[A-Z]/.test(normalized[i + 2])) {

      const sentence = current.trim().replace(new RegExp(PLACEHOLDER, 'g'), '.');
      if (sentence.length >= 15 && !isNoise(sentence) && !isHeader(sentence)) {
        sentences.push(sentence);
      }
      current = '';
      i++; // Skip the space
    }
  }

  // Add the last sentence
  if (current.trim().length > 0) {
    const sentence = current.trim().replace(new RegExp(PLACEHOLDER, 'g'), '.');
    if (sentence.length >= 15 && !isNoise(sentence) && !isHeader(sentence)) {
      sentences.push(sentence);
    }
  }

  return sentences;
}

/**
 * Main function to parse thought process text into individual claims
 */
export function parseThoughtIntoClaims(text: string): string[] {
  if (!text || text.trim() === '') return [];

  const claims: string[] = [];
  const lines = text.split('\n');

  let proseBuffer: string[] = [];

  const flushProse = () => {
    if (proseBuffer.length === 0) return;
    const proseText = proseBuffer.join(' ');
    const sentences = splitProseIntoSentences(proseText);
    claims.push(...sentences);
    proseBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines - flush prose buffer
    if (!trimmed) {
      flushProse();
      continue;
    }

    // Skip noise
    if (isNoise(trimmed)) continue;

    // Skip headers (but flush prose first)
    if (isHeader(trimmed)) {
      flushProse();
      continue;
    }

    // Handle bullet points - each is a separate claim
    if (isBulletLine(line)) {
      flushProse();
      const content = extractListContent(line);
      if (content.length >= 10 && !isNoise(content) && !isHeader(content)) {
        claims.push(content);
      }
      continue;
    }

    // Handle numbered items - each is a separate claim
    if (isNumberedLine(line)) {
      flushProse();
      const content = extractListContent(line);
      if (content.length >= 10 && !isNoise(content) && !isHeader(content)) {
        claims.push(content);
      }
      continue;
    }

    // Regular prose - accumulate
    proseBuffer.push(trimmed);
  }

  // Flush any remaining prose
  flushProse();

  return claims;
}

/**
 * Parse all thought processes for a task and return combined claims
 */
export function parseTaskThoughts(
  thoughtContents: Record<string, string>,
  thoughtIds: { thought1?: string; thought2?: string; thought3?: string }
): string[] {
  const allText: string[] = [];

  if (thoughtIds.thought1 && thoughtContents[thoughtIds.thought1]) {
    allText.push(thoughtContents[thoughtIds.thought1]);
  }
  if (thoughtIds.thought2 && thoughtContents[thoughtIds.thought2]) {
    allText.push(thoughtContents[thoughtIds.thought2]);
  }
  if (thoughtIds.thought3 && thoughtContents[thoughtIds.thought3]) {
    allText.push(thoughtContents[thoughtIds.thought3]);
  }

  return parseThoughtIntoClaims(allText.join('\n\n'));
}

export interface ClaimData {
  taskId: string;
  taskTitle: string;
  tier: string;
  claims: string[];
}

export interface CategoryClaims {
  categoryId: string;
  categoryName: string;
  modelName: string;
  tasks: ClaimData[];
}
