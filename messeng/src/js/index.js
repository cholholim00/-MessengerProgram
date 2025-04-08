

// 로그인 상태 확인
const loggedInUser = localStorage.getItem('loggedInUser');
const navMenu = document.getElementById('navMenu');
const welcomeMessage = document.getElementById('welcomeMessage');
const chatLink = document.getElementById('chatLink');

if (loggedInUser) {
    // 로그인된 경우
    navMenu.innerHTML = `
        <p>안녕하세요, <strong>${loggedInUser}</strong>님!</p>
        <a href="#" id="logoutButton">로그아웃</a>
    `;
    welcomeMessage.textContent = '채팅을 시작하려면 아래 버튼을 클릭하세요.';
    chatLink.style.display = 'inline-block';

    // 로그아웃 버튼 이벤트 추가
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        alert('로그아웃되었습니다.');
        window.location.reload(); // 페이지 새로고침
    });
} else {
    // 로그인되지 않은 경우
    navMenu.innerHTML = `
        <a href="login.html">회원 로그인하러가기</a>
    `;
    chatLink.style.display = 'none';
}
const loginButton = document.getElementById("loginButton");
const usernameInput = document.getElementById("usernameInput");

loginButton.addEventListener("click", () => {
    // 로그인 상태 확인
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // 로그인하지 않은 경우 로그인 페이지로 이동
        window.location.href = 'login.html';
    }
});