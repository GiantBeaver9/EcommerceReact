import React, { useContext, useState } from 'react'
import { storeConfigs, activeStoreId, getStoreConfig } from '../data/store-config'

const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const [currentStoreId, setCurrentStoreId] = useState(activeStoreId)
  const storeConfig = getStoreConfig(currentStoreId)

  const switchStore = (storeId) => {
    if (storeConfigs[storeId]) {
      setCurrentStoreId(storeId)
    }
  }

  const availableStores = Object.keys(storeConfigs).map((key) => ({
    id: key,
    name: storeConfigs[key].name,
    type: storeConfigs[key].type,
  }))

  return (
    <StoreContext.Provider
      value={{ ...storeConfig, currentStoreId, switchStore, availableStores }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => {
  return useContext(StoreContext)
}
