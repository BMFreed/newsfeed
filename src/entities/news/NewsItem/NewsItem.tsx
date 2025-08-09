import type { INewsItem } from 'src/entities/news/NewsItem/INewsItem'
import styles from 'src/entities/news/NewsItem/NewsItem.module.css'

import { Calendar, Edit2, Trash2, User } from 'lucide-react'
import React from 'react'

interface INewsItemProps {
  news: INewsItem
  onDelete: (id: string) => void
  onEdit: (news: INewsItem) => void
}

/** Новость в списке новостей */
export const NewsItem: React.FC<INewsItemProps> = ({
  news,
  onDelete,
  onEdit,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const deleteItem = (): void => {
    // eslint-disable-next-line no-alert
    if (confirm('Вы уверены, что хотите удалить эту новость?')) {
      onDelete(news.id)
    }
  }

  return (
    <article className={styles['newsItem']}>
      <header className={styles['header']}>
        <h3 className={styles['title']}>{news.title}</h3>
        <div className={styles['actions']}>
          <button
            aria-label="Редактировать новость"
            className={styles['editButton']}
            onClick={() => {
              onEdit(news)
            }}
          >
            <Edit2 size={18} />
          </button>
          <button
            aria-label="Удалить новость"
            className={styles['deleteButton']}
            onClick={deleteItem}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      <div className={styles['content']}>
        <p className={styles['text']}>{news.content}</p>
      </div>

      <footer className={styles['footer']}>
        <div className={styles['author']}>
          <User size={16} />
          <span>{news.author}</span>
        </div>
        <div className={styles['date']}>
          <Calendar size={16} />
          <time dateTime={news.createdAt}>{formatDate(news.createdAt)}</time>
        </div>
      </footer>

      {news.updatedAt !== news.createdAt && (
        <div className={styles['updated']}>
          Обновлено:{' '}
          <time dateTime={news.updatedAt}>{formatDate(news.updatedAt)}</time>
        </div>
      )}
    </article>
  )
}
