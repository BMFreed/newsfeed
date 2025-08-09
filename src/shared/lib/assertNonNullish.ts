/** Проверяет, что данные не равны null или undefined */
export const assertNonNullish = <Data>(
  value: Data | null | undefined,
): Data => {
  if (value === null || value === undefined) {
    throw new Error('Данные не заданы')
  }

  return value as Data
}
