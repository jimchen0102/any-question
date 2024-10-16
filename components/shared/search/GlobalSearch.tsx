'use client'

import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import GlobalResult from './GlobalResult'

const GlobalSearch = () => {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const query = searchParams.get('global')
  const [search, setSearch] = useState(query || '')
  const [isOpen, setIsOpen] = useState(false)
  const searchContainerRef = useRef(null)

  useEffect(() => {
    setIsOpen(false)
    setSearch('')

    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [pathname])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['global', 'type'],
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search, router, pathname, searchParams, query])

  return (
    <div
      ref={searchContainerRef}
      className="relative w-full max-w-[600px] max-lg:hidden"
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          value={search}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
          onChange={(e) => {
            setSearch(e.target.value)

            if (!isOpen) setIsOpen(true)
            if (e.target.value === '' && isOpen) setIsOpen(false)
          }}
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  )
}

export default GlobalSearch
