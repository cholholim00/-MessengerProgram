const API_BASE_URL = 'https://your-api-url.com/api';

export const getUserList = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다.');
        }
        return await response.json();
    } catch (error) {
        console.error('사용자 목록을 가져오는 중 오류 발생:', error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('로그인 실패');
        }
        return await response.json();
    } catch (error) {
        console.error('로그인 중 오류 발생:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('로그아웃 실패');
        }
        return await response.json();
    } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
        throw error;
    }
};