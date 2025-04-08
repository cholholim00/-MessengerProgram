// 로그인된 사용자 확인
const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    alert('로그인이 필요합니다.');
    window.location.href = 'login.html';
}

// 유저 목록 가져오기
const users = JSON.parse(localStorage.getItem('users')) || [];
const userList = document.getElementById('userList');

// 유저 목록 표시
users.forEach(user => {
    if (user.username !== loggedInUser) { // 본인을 제외한 유저만 표시
        const li = document.createElement('li');
        li.textContent = user.username;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => startChat(user.username));
        userList.appendChild(li);
    }
});

// 로그아웃 버튼 클릭 이벤트
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    alert('로그아웃되었습니다.');
    window.location.href = 'login.html';
});

// 채팅 시작 함수
function startChat(username) {
    localStorage.setItem('chatWith', username); // 채팅 상대 저장
    window.location.href = 'chat.html'; // 채팅 화면으로 이동
}