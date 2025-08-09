import type { INewsItem } from 'src/entities/news/NewsItem/INewsItem'
import { NewsItem } from 'src/entities/news/NewsItem/NewsItem'
import styles from 'src/entities/news/NewsList/NewsList.module.css'

import type { FC } from 'react'

interface INewsList {
  newsList: INewsItem[]
  onDelete: (id: string) => void
  onEdit: (news: INewsItem) => void
}

/** Компонент списка новостей */
export const NewsList: FC<INewsList> = ({ newsList, onDelete, onEdit }) => {
  if (newsList.length === 0) {
    return (
      <div className={styles['emptyState']}>
        <div className={styles['emptyStateContent']}>
          <h3 className={styles['emptyStateTitle']}>Новостей пока нет</h3>
          <p className={styles['emptyStateText']}>
            Создайте первую новость, чтобы начать работу
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className={styles['newsList']} role="main">
      <h2 style={{ display: 'none' }}>Список новостей</h2>
      <div className={styles['newsGrid']}>
        {newsList.map((news) => (
          <NewsItem
            key={news.id}
            news={news}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  )
}
