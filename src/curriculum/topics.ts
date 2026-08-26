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

const topic = (
  id: string,
  title: string,
  category: string,
  description: string,
  chapters: Array<
    Pick<ChapterDefinition, 'id' | 'title' | 'description' | 'status'>
  >,
): TopicDefinition => ({
  id,
  title,
  category,
  description,
  prerequisites: id === 'neural-networks' ? ['vectors'] : [],
  chapters: chapters.map((chapter, index) => ({
    ...chapter,
    number: index + 1,
    difficulty: index < 2 ? 'beginner' : 'intermediate',
    estimatedMinutes: chapter.status === 'available' ? 18 : undefined,
    prerequisites: index ? [chapters[index - 1].id] : [],
  })),
})

export const neuralNetworksTopic = topic(
  'neural-networks',
  'Neural Network Playground',
  'neural-networks',
  'Train a tiny network and inspect its boundary, loss, and architecture.',
  [
    {
      id: 'playground',
      title: 'Neural network playground',
      description:
        'Train a small dense network on synthetic classification data.',
      status: 'available',
    },
    {
      id: 'perceptron',
      title: 'Perceptron',
      description: 'Build the smallest learnable decision unit.',
      status: 'planned',
    },
    {
      id: 'backpropagation',
      title: 'Backpropagation',
      description: 'Trace how error changes every parameter.',
      status: 'planned',
    },
  ],
)

export const cnnTopic = topic(
  'cnn',
  'Convolutional Neural Networks',
  'computer-vision',
  'Inspect pixels, filters, feature maps, activations, and pooling.',
  [
    {
      id: 'convolution',
      title: 'Convolution and feature maps',
      description: 'Slide a kernel across pixels and inspect every output.',
      status: 'available',
    },
    {
      id: 'channels',
      title: 'Channels and activations',
      description: 'Combine channel responses and nonlinear activations.',
      status: 'planned',
    },
    {
      id: 'cnn-walkthrough',
      title: 'Complete CNN walkthrough',
      description: 'Follow an input through a complete classifier.',
      status: 'planned',
    },
  ],
)

export const gansTopic = topic(
  'gans',
  'Generative Adversarial Networks',
  'generative-ai',
  'Watch a generator and discriminator improve through competition.',
  [
    {
      id: 'training-dynamics',
      title: 'Generator and discriminator dynamics',
      description:
        'Step through an adversarial loop and diagnose mode collapse.',
      status: 'available',
    },
    {
      id: 'adversarial-objective',
      title: 'Adversarial objective',
      description: 'Understand the two coupled optimization goals.',
      status: 'planned',
    },
  ],
)

export const transformerTopic = topic(
  'transformer',
  'Transformer',
  'transformers',
  'Trace tokens through Q, K, V (QKV), attention, residuals, and logits.',
  [
    {
      id: 'attention-walkthrough',
      title: 'Token to attention walkthrough',
      description:
        'Compute Q, K, V (QKV), attention weights, and a contextual output.',
      status: 'available',
    },
    {
      id: 'multi-head-attention',
      title: 'Multi-head attention',
      description: 'Learn why parallel attention heads specialize.',
      status: 'planned',
    },
    {
      id: 'transformer-block',
      title: 'Transformer block',
      description: 'Combine attention, MLPs, residuals, and normalization.',
      status: 'planned',
    },
  ],
)

export const diffusionTopic = topic(
  'diffusion-models',
  'Diffusion Models',
  'generative-ai',
  'See noise accumulate and a learned denoising process conceptually reverse it.',
  [
    {
      id: 'noise-and-denoising',
      title: 'Forward noise and reverse denoising',
      description: 'Navigate a local diffusion timeline one step at a time.',
      status: 'available',
    },
    {
      id: 'noise-prediction',
      title: 'Noise prediction',
      description: 'Understand what the denoiser learns to estimate.',
      status: 'planned',
    },
    {
      id: 'latent-diffusion',
      title: 'Latent diffusion',
      description: 'Move the process into a compressed representation.',
      status: 'planned',
    },
  ],
)

export const topics: TopicDefinition[] = [
  vectorsTopic,
  neuralNetworksTopic,
  cnnTopic,
  gansTopic,
  transformerTopic,
  diffusionTopic,
]
export const getTopic = (id: string) => topics.find((topic) => topic.id === id)
export const getChapter = (topicId: string, chapterId: string) =>
  getTopic(topicId)?.chapters.find((chapter) => chapter.id === chapterId)
