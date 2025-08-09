import type { INewsItem } from 'src/entities/news'

import type { INewsFormData } from 'src/features/newsManagement/ui/NewsForm/INewsFormData'

/** Описывает доменную логику метода для работы с новостями */
export type TNewsAction = (param: {
  formData: INewsFormData
  id: string
  newsList: INewsItem[]
  now: Date
}) => INewsItem[]
