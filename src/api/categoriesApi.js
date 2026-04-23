import { API_BASE_URL } from './config';

async function parseResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return parseResponse(response);
}

export async function createCategory(payload) {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
}

export async function updateCategory(id, payload) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
}

export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Could not delete category');
  }
}
