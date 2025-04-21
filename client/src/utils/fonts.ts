import { Lexend } from "next/font/google";
import { Anton } from "next/font/google";
import { Kanit } from "next/font/google";
import { Poppins } from "next/font/google";

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

  export const kanit = Kanit({
    subsets: ['latin'],
    variable: '--font-kanit',
    weight: ['400'],
  })
  export const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['400'],
  })