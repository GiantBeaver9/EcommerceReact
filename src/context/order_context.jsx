import React, { useContext, useReducer } from 'react'
import { orderService } from '../services/orderService'

const OrderContext = React.createContext()

const initialState = {
  orders: [],
  current_order: null,
  orders_loading: false,
  orders_error: null,
  total_count: 0,
  page: 1,
  page_size: 20,
}

const ORDER_ACTIONS = {
  FETCH_BEGIN: 'FETCH_ORDERS_BEGIN',
  FETCH_SUCCESS: 'FETCH_ORDERS_SUCCESS',
  FETCH_ERROR: 'FETCH_ORDERS_ERROR',
  SET_CURRENT: 'SET_CURRENT_ORDER',
  CLEAR_CURRENT: 'CLEAR_CURRENT_ORDER',
  CREATE_SUCCESS: 'CREATE_ORDER_SUCCESS',
  UPDATE_STATUS: 'UPDATE_ORDER_STATUS',
  CANCEL_SUCCESS: 'CANCEL_ORDER_SUCCESS',
}

const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.FETCH_BEGIN:
      return { ...state, orders_loading: true, orders_error: null }
    case ORDER_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        orders_loading: false,
        orders: action.payload.orders,
        total_count: action.payload.totalCount,
        page: action.payload.page,
        page_size: action.payload.pageSize,
      }
    case ORDER_ACTIONS.FETCH_ERROR:
      return { ...state, orders_loading: false, orders_error: action.payload }
    case ORDER_ACTIONS.SET_CURRENT:
      return { ...state, current_order: action.payload }
    case ORDER_ACTIONS.CLEAR_CURRENT:
      return { ...state, current_order: null }
    case ORDER_ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        current_order: action.payload,
      }
    case ORDER_ACTIONS.UPDATE_STATUS:
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? action.payload : o
        ),
        current_order:
          state.current_order?.id === action.payload.id
            ? action.payload
            : state.current_order,
      }
    case ORDER_ACTIONS.CANCEL_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? action.payload : o
        ),
        current_order:
          state.current_order?.id === action.payload.id
            ? action.payload
            : state.current_order,
      }
    default:
      throw new Error(`No matching action type: ${action.type}`)
  }
}

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState)

  const fetchOrders = async (filters = {}) => {
    dispatch({ type: ORDER_ACTIONS.FETCH_BEGIN })
    try {
      const data = await orderService.getOrders(filters)
      dispatch({ type: ORDER_ACTIONS.FETCH_SUCCESS, payload: data })
    } catch (err) {
      dispatch({ type: ORDER_ACTIONS.FETCH_ERROR, payload: err.message })
    }
  }

  const fetchOrder = async (id) => {
    dispatch({ type: ORDER_ACTIONS.FETCH_BEGIN })
    try {
      const data = await orderService.getOrder(id)
      dispatch({ type: ORDER_ACTIONS.SET_CURRENT, payload: data })
    } catch (err) {
      dispatch({ type: ORDER_ACTIONS.FETCH_ERROR, payload: err.message })
    }
  }

  const createOrder = async (orderData) => {
    const data = await orderService.createOrder(orderData)
    dispatch({ type: ORDER_ACTIONS.CREATE_SUCCESS, payload: data })
    return data
  }

  const updateOrderStatus = async (id, status) => {
    const data = await orderService.updateOrderStatus(id, status)
    dispatch({ type: ORDER_ACTIONS.UPDATE_STATUS, payload: data })
    return data
  }

  const cancelOrder = async (id) => {
    const data = await orderService.cancelOrder(id)
    dispatch({ type: ORDER_ACTIONS.CANCEL_SUCCESS, payload: data })
    return data
  }

  const clearCurrentOrder = () => {
    dispatch({ type: ORDER_ACTIONS.CLEAR_CURRENT })
  }

  return (
    <OrderContext.Provider
      value={{
        ...state,
        fetchOrders,
        fetchOrder,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        clearCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrderContext = () => {
  return useContext(OrderContext)
}
