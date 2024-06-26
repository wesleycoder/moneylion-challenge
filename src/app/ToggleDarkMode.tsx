'use client'
import { Icon, type IconifyIconProperties } from '@iconify-icon/react'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { useCookies } from 'next-client-cookies'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { cn } from '~/lib/utils'

const prefersDark: MediaQueryList | null = globalThis.matchMedia?.('(prefers-color-scheme: dark)')

const selectTheme = async (theme?: string | null) => {
  const isDark = theme === 'dark' || ((!theme || theme === 'system') && prefersDark.matches)

  if (isDark) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}

type ModeIconProps = Omit<IconifyIconProperties, 'icon' | 'inline'> & { theme?: string | null }
const ModeIcon = ({ theme, ...props }: ModeIconProps) =>
  ({
    system: <Icon {...props} inline icon="line-md:computer" />,
    light: <Icon {...props} inline icon="line-md:sunny-outline-loop" />,
    dark: <Icon {...props} inline icon="line-md:moon-loop" />,
  })[theme || 'system']

type ToggleDarkModeProps = DropdownMenuProps & {
  className?: string
  setTheme: (theme?: string) => Promise<void>
}

export const ToggleDarkMode = ({ className, setTheme }: ToggleDarkModeProps) => {
  const cookies = useCookies()

  useEffect(() => {
    const themeListener = (e: MediaQueryListEvent) => {
      selectTheme(cookies.get('theme'))
    }
    prefersDark.addEventListener('change', themeListener)

    selectTheme(cookies.get('theme'))

    return () => {
      prefersDark.removeEventListener('change', themeListener)
    }
  }, [cookies])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-hidden="false"
          aria-label="Select dark mode"
          className={cn('py-2 px-4', className)}
          role="combobox"
          asChild
        >
          <Button type="button" variant="ghost" size="icon">
            <ModeIcon theme={cookies.get('theme')} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={cookies.get('theme') || 'system'}
            onValueChange={async (value) => {
              await setTheme(value)
              selectTheme(value)
            }}
            role="listbox"
          >
            <DropdownMenuRadioItem value="system" className="gap-2" role="option">
              <ModeIcon theme="system" /> System
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light" className="gap-2" role="option">
              <ModeIcon theme="light" /> Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" className="gap-2" role="option">
              <ModeIcon theme="dark" /> Dark
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ToggleDarkMode
