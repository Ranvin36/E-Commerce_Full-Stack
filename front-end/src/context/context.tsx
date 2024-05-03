import { Dispatch, ReactNode, createContext, useState , SetStateAction } from "react";
import React from 'react'

type Search = string

interface UserContextInterface{
    search:Search,
    setSearch: Dispatch<SetStateAction<Search>>
}

const defaultState : UserContextInterface = {
    search:'',
    setSearch:() => {}
} 

export const SearchContext = createContext<UserContextInterface>(defaultState)


type SearchProviderProps ={
    children:ReactNode
}

export default function SearchProvider({ children }: SearchProviderProps) {
    const [search, setSearch] = useState<Search>('');
  
    return (
      <SearchContext.Provider value={{ search, setSearch }}>
        {children}
      </SearchContext.Provider>
    );
  }