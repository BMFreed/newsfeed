import { assertNonNullish } from 'src/shared/lib/assertNonNullish'
import styles from 'src/shared/ui/Modal/Modal.module.css'

import type { FC, ReactNode, Ref } from 'react'

import { X } from 'lucide-react'
import { useImperativeHandle, useRef } from 'react'

interface IModal {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  ref: Ref<IModalMethods>
  title: string
}

/** Методы компонента модального окна */
export interface IModalMethods {
  /** Закрывает модальное окно */
  close: () => void
  /** Открывает модальное окно */
  open: () => void
}

/** Компонент модального окна */
export const Modal: FC<IModal> = ({
  children,
  isOpen,
  onClose,
  ref,
  title,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => ({
    close: () => {
      const dialogElement = assertNonNullish(dialogRef.current)
      dialogElement.close()
      document.body.style.overflow = 'unset'
    },
    open: () => {
      const dialogElement = assertNonNullish(dialogRef.current)

      dialogElement.showModal()
      dialogElement.focus()
      document.body.style.overflow = 'hidden'
    },
  }))

  return (
    <dialog
      className={styles['modal']}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      ref={dialogRef}
    >
      {isOpen && (
        <>
          <header className={styles['header']}>
            <h2 className={styles['title']} id="modal-title">
              {title}
            </h2>
            <button
              aria-label="Закрыть модальное окно"
              className={styles['closeButton']}
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </header>
          <div className={styles['content']}>{children}</div>
        </>
      )}
    </dialog>
  )
}
