import { assertNonNullish } from 'src/shared/lib/assertNonNullish'

import type { TNewsAction } from 'src/features/newsManagement/model/TNewsAction'

/** Возвращает новый массив новостей с измененными данными */
export const editNewsItem: TNewsAction = ({ formData, id, newsList, now }) => {
  const targetItemIndex = newsList.findIndex((newsItem) => newsItem.id === id)

  const targetItem = assertNonNullish(newsList[targetItemIndex])

  return newsList.toSpliced(targetItemIndex, 1, {
    ...targetItem,
    ...formData,
    updatedAt: now.toISOString(),
  })
}
