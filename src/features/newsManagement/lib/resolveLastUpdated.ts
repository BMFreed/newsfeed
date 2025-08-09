/** Вычисляет текст для последнего обновления новостей */
export const resolveLastUpdated = (date: Date): string =>
  date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    year: 'numeric',
  })
