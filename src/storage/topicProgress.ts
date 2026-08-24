const KEY = 'ai-core:topic-progress'
interface StoredProgress {
  version: 1
  topics: Record<string, { completedChapters: string[] }>
}
const empty = (): StoredProgress => ({ version: 1, topics: {} })
const read = (): StoredProgress => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    if (!parsed || typeof parsed !== 'object') return empty()
    const raw = parsed as { topics?: unknown }
    if (!raw.topics || typeof raw.topics !== 'object') return empty()
    const result = empty()
    for (const [id, value] of Object.entries(raw.topics)) {
      const chapters = (value as { completedChapters?: unknown })
        ?.completedChapters
      if (Array.isArray(chapters))
        result.topics[id] = {
          completedChapters: chapters.filter(
            (item): item is string => typeof item === 'string',
          ),
        }
    }
    return result
  } catch {
    return empty()
  }
}
const write = (progress: StoredProgress) =>
  localStorage.setItem(KEY, JSON.stringify(progress))
export const getCompletedChapters = (topicId: string) =>
  read().topics[topicId]?.completedChapters ?? []
export const isChapterComplete = (topicId: string, chapterId: string) =>
  getCompletedChapters(topicId).includes(chapterId)
export const setChapterComplete = (
  topicId: string,
  chapterId: string,
  complete: boolean,
) => {
  const progress = read()
  const current = new Set(progress.topics[topicId]?.completedChapters ?? [])
  if (complete) current.add(chapterId)
  else current.delete(chapterId)
  progress.topics[topicId] = { completedChapters: [...current] }
  write(progress)
}
export const getTopicPercentage = (topicId: string, total: number) =>
  total <= 0
    ? 0
    : Math.round((getCompletedChapters(topicId).length / total) * 100)
