export function decodeBase64Content(base64: string): string {
  return Buffer.from(base64, 'base64').toString('utf8');
}

export function extractFeaturesFromReadme(base64: string) {
  const content = decodeBase64Content(base64);

  const featureBlocks = [...content.matchAll(/<!--feature\n([\s\S]*?)-->/g)];

  return featureBlocks.map((match) => JSON.parse(match[1]));
}
export function encodeBase64Content(content: string): string {
  return Buffer.from(content, 'utf8').toString('base64');
}
