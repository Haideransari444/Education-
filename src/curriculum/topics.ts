import type { ChapterDefinition, TopicDefinition } from './topicTypes'

const titles = [
  'Scalars and vectors',
  'Vector notation and representation',
  'Components and coordinate systems',
  'Magnitude and direction',
  'Vector addition and subtraction',
  'Scalar multiplication',
  'Norms and distance',
  'Dot product',
  'Angles between vectors',
  'Cosine similarity',
  'Vector projection',
  'Basis vectors',
  'Span',
  'Linear combinations',
  'Linear dependence and independence',
  'Vector spaces',
  'Subspaces',
  'Orthogonality',
  'Orthonormal vectors and bases',
  'Gram-Schmidt process',
  'Cross product and 3D geometry',
  'Element-wise / Hadamard operations',
  'High-dimensional vectors',
  'Vectorization and broadcasting',
  'Embeddings and vectors in AI',
  'Vectors inside neural networks',
] as const

const ids = [
  'scalars-and-vectors',
  'notation-and-representation',
  'components-and-coordinates',
  'magnitude-and-direction',
  'addition-and-subtraction',
  'scalar-multiplication',
  'norms-and-distance',
  'dot-product',
  'angles-between-vectors',
  'cosine-similarity',
  'vector-projection',
  'basis-vectors',
  'span',
  'linear-combinations',
  'linear-dependence-and-independence',
  'vector-spaces',
  'subspaces',
  'orthogonality',
  'orthonormal-vectors-and-bases',
  'gram-schmidt-process',
  'cross-product-and-3d-geometry',
  'hadamard-operations',
  'high-dimensional-vectors',
  'vectorization-and-broadcasting',
  'embeddings-and-vectors-in-ai',
  'vectors-inside-neural-networks',
] as const

export const vectorChapters: ChapterDefinition[] = titles.map(
  (title, index) => ({
    id: ids[index],
    number: index + 1,
    title,
    description:
      [
        'Distinguish single values from ordered collections used throughout AI.',
        'Read vector symbols, components, dimensions, shapes, and spaces.',
        'Connect vector components to Cartesian coordinates and projections.',
        'Measure vector length, direction, and safely normalize vectors.',
        'Combine vectors numerically and geometrically.',
        'Understand how a scalar changes vector length and direction.',
        'Compare L1, L2, and infinity norms and the distances they induce.',
        'Connect component-wise calculation to geometric alignment.',
        'Recover the angle between vectors from dot products and norms.',
        'Compare direction independently of overall magnitude.',
      ][index] ?? `Continue the vectors path with ${title.toLowerCase()}.`,
    difficulty:
      index < 7 ? 'beginner' : index < 18 ? 'intermediate' : 'advanced',
    estimatedMinutes: index < 10 ? 12 + (index % 3) * 3 : undefined,
    status: index < 10 ? 'available' : 'planned',
    prerequisites: index ? [ids[index - 1]] : [],
  }),
)

export const vectorsTopic: TopicDefinition = {
  id: 'vectors',
  title: 'Vectors',
  category: 'foundations',
  prerequisites: [],
  chapters: vectorChapters,
  description: 'From simple coordinates to embeddings and neural networks.',
  aiConnections: [
    'feature vectors',
    'embeddings',
    'optimization',
    'attention',
    'neural networks',
  ],
}

export const topics: TopicDefinition[] = [vectorsTopic]
export const getTopic = (id: string) => topics.find((topic) => topic.id === id)
export const getChapter = (topicId: string, chapterId: string) =>
  getTopic(topicId)?.chapters.find((chapter) => chapter.id === chapterId)
