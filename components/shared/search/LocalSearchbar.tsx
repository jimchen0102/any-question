'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

interface Props {
  route: string
  iconPosition: string
  imgSrc: string
  placeholder: string
  otherClasses?: string
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [search, setSearch] = useState(query || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        })

        router.push(newUrl, { scroll: false })
      } else if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['q'],
        })

        router.push(newUrl, { scroll: false })
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search, route, router, pathname, searchParams, query])

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />

      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  )
}

export default LocalSearchbar
