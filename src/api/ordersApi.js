import { API_BASE_URL } from './config';

async function parseResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export async function getOrdersByUser(userId) {
  const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`);
  return parseResponse(response);
}

export async function createOrder(payload) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
}

export async function deleteOrder(id) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Could not delete order');
  }
}
