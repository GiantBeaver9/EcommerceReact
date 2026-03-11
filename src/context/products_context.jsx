import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { getProducts, getProduct } from '../data/sample-products'
import { useStoreContext } from './store_context'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currentStoreId } = useStoreContext()

  const openSidebar = () => dispatch({ type: SIDEBAR_OPEN })
  const closeSidebar = () => dispatch({ type: SIDEBAR_CLOSE })

  const fetchProducts = () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const products = getProducts(currentStoreId)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const product = getProduct(currentStoreId, id)
      if (product) {
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product })
      } else {
        dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
      }
    } catch {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [currentStoreId])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
