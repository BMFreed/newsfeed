import { useState } from 'react'

/** Реализует работу с localStorage */
export const useLocalStorage = <Data>(
  key: string,
  initialValue: Data,
): [Data, (param: Data) => void] => {
  const [storedValue, setStoredValue] = useState<Data>(() => {
    try {
      const item = localStorage.getItem(key)
      return item === null ? initialValue : (JSON.parse(item) as Data)
    } catch (error) {
      console.error('Error reading localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value: Data): void => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue] as const
}
