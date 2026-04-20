import type {PortableTextComponents} from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="mb-4 text-base leading-7 text-[#1B3A5C]/80 last:mb-0">{children}</p>
    ),
    h2: ({children}) => (
      <h2 className="mb-3 mt-8 font-serif text-2xl text-[#1B3A5C] first:mt-0">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="mb-2 mt-6 text-lg font-semibold text-[#1B3A5C]">{children}</h3>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-6 border-l-4 border-[#C9A96E] pl-5 font-serif text-lg italic leading-relaxed text-[#1B3A5C]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-[#1B3A5C]/80">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-[#1B3A5C]/80">{children}</ol>
    ),
  },
}
