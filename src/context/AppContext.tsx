import React, { createContext, useContext, useState } from 'react'
import { Unit } from 'openweathermap-ts/dist/types'

interface AppContextType {
  searchInput: string
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
  units: Unit
  toggleUnits: (value: Unit) => void
}

const AppContext: React.Context<AppContextType> = createContext(null)

export const useAppContext = () => {
  return useContext(AppContext)
}

export const AppContextProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [units, setUnits] = useState<Unit>('metric')

  const toggleUnits = (value: Unit) => {
    setUnits(value)
  }

  const value = {
    searchInput,
    setSearchInput,
    toggleUnits,
    units,
  }
  return (
    <AppContext.Provider value={{ ...value }}>{children}</AppContext.Provider>
  )
}
