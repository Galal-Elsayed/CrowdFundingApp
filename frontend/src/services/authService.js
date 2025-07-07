import { getToken } from '../utils/tokenStorage';

const API_BASE = 'http://127.0.0.1:8000/auth';

export async function getCurrentUser() {
    const res = await fetch(`${API_BASE}/users/me/`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to fetch user info');
    return res.json();
}

export async function getAllUsers() {
    const res = await fetch(`${API_BASE}/users/`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

export async function updateUser(data) {
    const res = await fetch(`${API_BASE}/users/me/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
    }
    return res.json();
}

export async function changePassword(current_password, new_password) {
    const res = await fetch(`${API_BASE}/users/set_password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ current_password, new_password })
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
    }
    // Djoser returns 204 No Content on success, so just return true
    return true;
}
