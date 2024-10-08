'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'

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
        value=""
        className="paragraph-regular no-focus placeholder border-none bg-transparent shadow-none outline-none"
        onChange={() => {}}
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
