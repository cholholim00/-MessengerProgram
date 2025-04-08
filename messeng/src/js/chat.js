// 채팅 상대 확인
const chatWith = localStorage.getItem('chatWith');
const loggedInUser = localStorage.getItem('loggedInUser');

if (!chatWith || !loggedInUser) {
    alert('로그인이 필요하거나 채팅 상대가 선택되지 않았습니다.');
    window.location.href = 'UserList.html';
}

// 채팅 상대 이름 표시
document.getElementById('chatWithUser').textContent = `${chatWith}님과의 채팅`;

// DOM 요소 가져오기
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');

// 채팅 기록 가져오기
let chatHistory = JSON.parse(localStorage.getItem(`chat_${loggedInUser}_${chatWith}`)) || [];

// 채팅 기록 표시
function displayMessages() {
    chatMessages.innerHTML = ''; // 기존 메시지 초기화
    chatHistory.forEach((message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender === loggedInUser ? 'me' : 'them'}`;
        messageDiv.textContent = `${message.sender}: ${message.text}`;
        chatMessages.appendChild(messageDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight; // 스크롤을 맨 아래로
}

// 메시지 전송
sendMessage.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    // 메시지 저장
    const message = { sender: loggedInUser, text: messageText, timestamp: Date.now() };
    chatHistory.push(message);

    // 양방향 저장 (상대방도 동일한 기록을 확인할 수 있도록)
    const reverseChatKey = `chat_${chatWith}_${loggedInUser}`;
    localStorage.setItem(`chat_${loggedInUser}_${chatWith}`, JSON.stringify(chatHistory));
    localStorage.setItem(reverseChatKey, JSON.stringify(chatHistory));

    // 메시지 표시
    displayMessages();
    messageInput.value = '';
});

// 초기 메시지 표시
displayMessages();