import type { IntegrationDefinition } from './types'

export const integrations: IntegrationDefinition[] = [
  {
    id: 'tensorflow-playground',
    name: 'TensorFlow Playground',
    upstream: {
      id: 'tensorflow-playground',
      project: 'TensorFlow Playground',
      repository: 'https://github.com/tensorflow/playground',
      commit: '02469bd3751764b20486015d4202b792af5362a6',
      license: 'Apache-2.0',
      codeApproved: true,
      assetsApproved: false,
      dataApproved: false,
      weightsApproved: false,
      integration: 'port',
      notes: ['No analytics, upstream data, or model parameters imported.'],
    },
    topics: ['neural-networks'],
    entryTopic: 'neural-networks',
    entryChapter: 'playground',
    lazyEntry: () => import('./tensorflow-playground'),
  },
  {
    id: 'cnn-explainer',
    name: 'CNN Explainer',
    upstream: {
      id: 'cnn-explainer',
      project: 'CNN Explainer',
      repository: 'https://github.com/poloclub/cnn-explainer',
      commit: 'd0971f9447ed9806022a3d47587b62394682bc51',
      license: 'MIT',
      codeApproved: true,
      assetsApproved: false,
      dataApproved: false,
      weightsApproved: false,
      integration: 'port',
      notes: [
        'Uses an original synthetic image and fixed educational kernels.',
      ],
    },
    topics: ['cnn'],
    entryTopic: 'cnn',
    entryChapter: 'convolution',
    lazyEntry: () => import('./cnn-explainer'),
  },
  {
    id: 'ganlab',
    name: 'GAN Lab',
    upstream: {
      id: 'ganlab',
      project: 'GAN Lab',
      repository: 'https://github.com/poloclub/ganlab',
      commit: '09073e8d8c05ff572e287ba5e69007b3fb9101cd',
      license: 'Apache-2.0',
      codeApproved: true,
      assetsApproved: false,
      dataApproved: false,
      weightsApproved: false,
      integration: 'port',
      notes: ['Deterministic educational dynamics replace pretrained models.'],
    },
    topics: ['gans'],
    entryTopic: 'gans',
    entryChapter: 'training-dynamics',
    lazyEntry: () => import('./ganlab'),
  },
  {
    id: 'transformer-explainer',
    name: 'Transformer Explainer',
    upstream: {
      id: 'transformer-explainer',
      project: 'Transformer Explainer',
      repository: 'https://github.com/poloclub/transformer-explainer',
      commit: 'bfe50afba10b9b560b84143ee1107d977defa74f',
      license: 'MIT',
      codeApproved: true,
      assetsApproved: false,
      dataApproved: false,
      weightsApproved: false,
      integration: 'port',
      notes: ['Uses tiny hand-authored vectors; no ONNX model or tokenizer.'],
    },
    topics: ['transformer'],
    entryTopic: 'transformer',
    entryChapter: 'attention-walkthrough',
    lazyEntry: () => import('./transformer-explainer'),
  },
  {
    id: 'diffusion-explainer',
    name: 'Diffusion Explainer',
    upstream: {
      id: 'diffusion-explainer',
      project: 'Diffusion Explainer',
      repository: 'https://github.com/poloclub/diffusion-explainer',
      commit: '0820016ce908a8e66619b7a1c9369af1498160d6',
      license: 'MIT',
      codeApproved: true,
      assetsApproved: false,
      dataApproved: false,
      weightsApproved: false,
      integration: 'port',
      notes: ['Programmatic grids replace generated images and model data.'],
    },
    topics: ['diffusion-models'],
    entryTopic: 'diffusion-models',
    entryChapter: 'noise-and-denoising',
    lazyEntry: () => import('./diffusion-explainer'),
  },
]

export const getIntegration = (id: string) =>
  integrations.find((integration) => integration.id === id)

export const getIntegrationForChapter = (topicId: string, chapterId: string) =>
  integrations.find(
    (integration) =>
      integration.entryTopic === topicId &&
      integration.entryChapter === chapterId,
  )
