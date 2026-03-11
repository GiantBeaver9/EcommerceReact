const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP ${response.status}`)
  }
  return response.json()
}

export const orderService = {
  async getOrders({ email, status, page = 1, pageSize = 20 } = {}) {
    const params = new URLSearchParams()
    if (email) params.set('email', email)
    if (status) params.set('status', status)
    params.set('page', page)
    params.set('pageSize', pageSize)

    const res = await fetch(`${API_BASE}/api/orders?${params}`)
    return handleResponse(res)
  },

  async getOrder(id) {
    const res = await fetch(`${API_BASE}/api/orders/${id}`)
    return handleResponse(res)
  },

  async createOrder(orderData) {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
    return handleResponse(res)
  },

  async updateOrderStatus(id, status) {
    const res = await fetch(`${API_BASE}/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    return handleResponse(res)
  },

  async cancelOrder(id) {
    const res = await fetch(`${API_BASE}/api/orders/${id}/cancel`, {
      method: 'POST',
    })
    return handleResponse(res)
  },

  async deleteOrder(id) {
    const res = await fetch(`${API_BASE}/api/orders/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || `HTTP ${res.status}`)
    }
  },
}
