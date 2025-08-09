import type { INewsItem } from 'src/entities/news'

import type { INewsFormData } from 'src/features/newsManagement/ui/NewsForm/INewsFormData'
import styles from 'src/features/newsManagement/ui/NewsForm/NewsForm.module.css'

import type { ChangeEvent, FC, FormEvent } from 'react'

import { Save, X } from 'lucide-react'
import { useState } from 'react'

interface INewsForm {
  newsItem: INewsItem | null
  onCancel: () => void
  onSubmit: (data: INewsFormData, id: string) => void
}

type TErrors = Partial<Record<keyof INewsFormData, string | undefined>>

/** Форма для создания или редактирования новости */
export const NewsForm: FC<INewsForm> = ({ newsItem, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<INewsFormData>(
    newsItem ?? {
      author: '',
      content: '',
      title: '',
    },
  )

  const [errors, setErrors] = useState<TErrors>({})

  const validateForm = (): boolean => {
    const newErrors: TErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Заголовок обязателен'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Содержимое обязательно'
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Автор обязателен'
    }

    setErrors(newErrors)

    return Object.values(newErrors).length === 0
  }

  const submit = (event: FormEvent): void => {
    event.preventDefault()
    if (validateForm()) {
      onSubmit(formData, newsItem?.id ?? crypto.randomUUID())
    }
  }

  const onChange =
    (field: keyof INewsFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      })

      // Очистка ошибки при изменении поля
      if (errors[field] !== undefined) {
        setErrors({
          ...errors,
          // undefined здесь использовать легче
          // eslint-disable-next-line sonarjs/no-undefined-assignment
          [field]: undefined,
        })
      }
    }

  return (
    <form className={styles['form']} onSubmit={submit}>
      <div className={styles['field']}>
        <label className={styles['label']} htmlFor="title">
          Заголовок новости
        </label>
        <input
          className={`${styles['input']} ${errors.title === undefined ? '' : styles['inputError']}`}
          id="title"
          onChange={onChange('title')}
          placeholder="Введите заголовок новости"
          type="text"
          value={formData.title}
        />
        <span className={styles['errorText']} role="alert">
          {errors.title}
        </span>
      </div>

      <div className={styles['field']}>
        <label className={styles['label']} htmlFor="author">
          Автор
        </label>
        <input
          className={`${styles['input']} ${errors.author === undefined ? '' : styles['inputError']}`}
          id="author"
          onChange={onChange('author')}
          placeholder="Введите имя автора"
          type="text"
          value={formData.author}
        />
        <span className={styles['errorText']} role="alert">
          {errors.author}
        </span>
      </div>

      <div className={styles['field']}>
        <label className={styles['label']} htmlFor="content">
          Содержимое новости
        </label>
        <textarea
          className={`${styles['textarea']} ${errors.content === undefined ? '' : styles['inputError']}`}
          id="content"
          onChange={onChange('content')}
          placeholder="Введите текст новости"
          rows={6}
          value={formData.content}
        />
        <span className={styles['errorText']} role="alert">
          {errors.content}
        </span>
      </div>

      <div className={styles['actions']}>
        <button
          className={styles['cancelButton']}
          onClick={onCancel}
          type="button"
        >
          <X size={20} />
          Отмена
        </button>
        <button className={styles['submitButton']} type="submit">
          <Save size={20} />
          {newsItem ? 'Сохранить изменения' : 'Создать новость'}
        </button>
      </div>
    </form>
  )
}
