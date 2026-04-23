import { API_BASE_URL } from './config';

async function parseResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  return parseResponse(response);
}

export async function getProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  return parseResponse(response);
}

export async function createProduct(payload) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
}

export async function updateProduct(id, payload) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Could not delete product');
  }
}
