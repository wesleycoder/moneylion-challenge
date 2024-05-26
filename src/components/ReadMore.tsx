'use client'
import { useState, type HTMLProps, type PropsWithChildren } from 'react'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'

type ReadMoreProps = PropsWithChildren<HTMLProps<HTMLDivElement>>
export const ReadMore = ({ children, className, ...props }: ReadMoreProps) => {
  const [isShort, setIsShort] = useState(true)
  const toggleShort = () => setIsShort((s) => !s)

  return (
    <>
      <div
        {...props}
        onClick={toggleShort}
        className={cn('break-words', className, isShort && 'line-clamp-3 overflow-ellipsis')}
      >
        {children}
      </div>
      <Button variant="link" onClick={toggleShort}>
        {isShort ? 'Read more' : 'Collapse'}
      </Button>
    </>
  )
}
