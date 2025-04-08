document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block';
        errorMessage.textContent = '아이디와 비밀번호를 입력하세요.';
        return;
    }

    // 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 사용자 인증
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // 로그인 성공 시 사용자 이름 저장
        localStorage.setItem('loggedInUser', username);

        // 유저 리스트 페이지로 이동
        window.location.href = 'UserList.html';
    } else {
        // 로그인 실패 시 오류 메시지 표시
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block';
        errorMessage.textContent = '아이디 또는 비밀번호가 잘못되었습니다.';
    }
});