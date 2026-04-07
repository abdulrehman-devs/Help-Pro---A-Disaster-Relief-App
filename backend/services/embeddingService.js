import { pipeline } from '@xenova/transformers';

let embedder;

export async function getEmbedding(text) {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  const embedding = await embedder(text); 
  
  return embedding[0];
}