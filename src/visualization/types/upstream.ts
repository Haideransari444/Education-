export interface UpstreamSource {
  id: string
  project: string
  repository: string
  commit: string
  license: string
  codeApproved: boolean
  assetsApproved: boolean
  dataApproved: boolean
  weightsApproved: boolean
  integration: 'vendor' | 'port' | 'reference'
  notes?: string[]
}
