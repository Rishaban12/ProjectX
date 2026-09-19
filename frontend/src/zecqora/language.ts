import { createContext, useContext } from 'react'

export type Translate = (english: string, tamil: string) => string
export const Language = createContext<Translate>((english) => english)
export const useCopy = () => useContext(Language)
