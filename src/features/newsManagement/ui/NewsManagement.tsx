import { useLocalStorage } from 'src/shared/hooks/useLocalStorage'
import { assertNonNullish } from 'src/shared/lib/assertNonNullish'
import { Modal } from 'src/shared/ui/Modal/Modal'
import type { IModalMethods } from 'src/shared/ui/Modal/Modal'

import type { INewsItem } from 'src/entities/news'
import { NewsList } from 'src/entities/news'

import { resolveLastUpdated } from 'src/features/newsManagement/lib/resolveLastUpdated'
import { resolveTitle } from 'src/features/newsManagement/lib/resolveTitle'
import { createNewsItem } from 'src/features/newsManagement/model/createNewsItem'
import { editNewsItem } from 'src/features/newsManagement/model/editNewsItem'
import type { INewsFormData } from 'src/features/newsManagement/ui/NewsForm/INewsFormData'
import { NewsForm } from 'src/features/newsManagement/ui/NewsForm/NewsForm'
import styles from 'src/features/newsManagement/ui/NewsManagement.module.css'

import type { FC } from 'react'

import { Plus } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'

type TNewsManagementState =
  | {
      newsItem: INewsItem
      value: 'editing'
    }
  | {
      value: 'creating'
    }
  | {
      value: 'default'
    }

/** Модальное окно для добавления/редактирования новости */
export const NewsManagement: FC = () => {
  const [state, setState] = useState<TNewsManagementState>({ value: 'default' })
  const [newsList, setNewsList] = useLocalStorage<INewsItem[]>('news-list', [])
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const modalRef = useRef<IModalMethods>(null)

  const title = useMemo(() => resolveTitle(newsList), [newsList])

  const onAddNewsItem = (): void => {
    assertNonNullish(modalRef.current).open()
    setState({ value: 'creating' })
  }

  const onEditNewsItem = (newsItem: INewsItem): void => {
    assertNonNullish(modalRef.current).open()
    setState({ newsItem, value: 'editing' })
  }

  const onDeleteNewsItem = (id: string): void => {
    setNewsList(newsList.filter((news) => news.id !== id))
    setLastUpdated(resolveLastUpdated(new Date()))
  }

  const closeModal = useCallback((): void => {
    const modalInstance = assertNonNullish(modalRef.current)
    modalInstance.close()
    setState({ value: 'default' })
  }, [])

  const onSubmit = (formData: INewsFormData, id: string): void => {
    const now = new Date()

    setNewsList(
      state.value === 'editing'
        ? editNewsItem({ formData, id, newsList, now })
        : createNewsItem({ formData, id, newsList, now }),
    )

    setLastUpdated(resolveLastUpdated(now))
    closeModal()
  }

  return (
    <div className={styles['app']}>
      <div className={styles['container']}>
        <header className={styles['header']}>
          <h1 className={styles['title']}>Новостной Портал</h1>
          <p className={styles['subtitle']}>
            Создавайте, редактируйте и управляйте новостями
          </p>
          <button
            aria-label="Добавить новую новость"
            className={styles['addButton']}
            onClick={onAddNewsItem}
          >
            <Plus size={20} />
            Добавить новость
          </button>
        </header>

        <main className={styles['main']}>
          {newsList.length > 0 && (
            <div className={styles['statsBar']}>
              <div className={styles['statsCount']}>{title}</div>
              {lastUpdated !== null && (
                <div className={styles['lastUpdated']}>
                  Последнее обновление: {lastUpdated}
                </div>
              )}
            </div>
          )}

          <NewsList
            newsList={newsList}
            onDelete={onDeleteNewsItem}
            onEdit={onEditNewsItem}
          />
        </main>
      </div>
      <Modal
        isOpen={state.value !== 'default'}
        onClose={closeModal}
        ref={modalRef}
        title={
          state.value === 'editing'
            ? 'Редактировать новость'
            : 'Добавить новость'
        }
      >
        <NewsForm
          newsItem={'newsItem' in state ? state.newsItem : null}
          onCancel={closeModal}
          onSubmit={onSubmit}
        />
      </Modal>
    </div>
  )
}
