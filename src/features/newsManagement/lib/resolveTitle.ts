import type { INewsItem } from 'src/entities/news'

/** Вычисляет заголовок для компонента списка новостей */
export const resolveTitle = (newsList: INewsItem[]): string => {
  if (newsList.length === 1) {
    return `${newsList.length} новость`
  }

  // eslint-disable-next-line ts/no-magic-numbers
  if (newsList.length < 5 && newsList.length > 0) {
    return `${newsList.length} новости`
  }

  return `${newsList.length} новостей`
}
