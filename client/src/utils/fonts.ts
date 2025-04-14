import { Lexend } from "next/font/google";
import { Anton } from "next/font/google";

export const lexend = Lexend({
    subsets: ['latin'],
    variable: '--font-lexend',
    weight: ['500'],
  })

  export const anton = Anton({
    subsets: ['latin'],
    variable: '--font-anton',
    weight: ['400'],
  })