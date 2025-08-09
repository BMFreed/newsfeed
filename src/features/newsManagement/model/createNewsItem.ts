import type { INewsItem } from 'src/entities/news'

import type { TNewsAction } from 'src/features/newsManagement/model/TNewsAction'

/** Возвращает новый массив с созданной новостью */
export const createNewsItem: TNewsAction = ({
  formData,
  id,
  newsList,
  now,
}) => {
  const newNewsItem: INewsItem = {
    id,
    ...formData,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }

  return [newNewsItem, ...newsList]
}
