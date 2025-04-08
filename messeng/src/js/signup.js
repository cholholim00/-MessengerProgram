document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (!username || !password) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block';
        errorMessage.textContent = '아이디와 비밀번호를 입력하세요.';
        return;
    }

    // 기존 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 아이디 중복 확인
    if (users.some(user => user.username === username)) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block';
        errorMessage.textContent = '이미 존재하는 아이디입니다.';
        return;
    }

    // 새 사용자 추가
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    window.location.href = 'login.html';
});