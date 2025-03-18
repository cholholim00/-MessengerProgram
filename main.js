document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.getElementById("login-container");
    const chatContainer = document.getElementById("chat-container");
    const loginButton = document.getElementById("loginButton");
    const usernameInput = document.getElementById("username");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const chatWindow = document.getElementById("chatWindow");

    let username = "";

    // 로그인 버튼 클릭
    loginButton.addEventListener("click", function () {
        username = usernameInput.value.trim();
        if (username === "") {
            alert("사용자 이름을 입력하세요!");
            return;
        }

        // 로그인 화면 숨기고 채팅 화면 표시
        loginContainer.classList.add("hidden");
        chatContainer.classList.remove("hidden");
    });

    // 메시지 보내기 함수
    function sendMessage() {
        if (!username) {
            alert("로그인 후 메시지를 보낼 수 있습니다.");
            return;
        }

        const messageText = messageInput.value.trim();
        if (messageText === "") return;

        // 현재 시간 가져오기
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;

        // 새로운 메시지 요소 생성
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "sent");
        messageDiv.innerHTML = `
            <img src="avatar1.png" alt="${username}" class="profile-img">
            <span>${messageText}</span>
            <span class="time">${timeString}</span>
        `;

        // 채팅창에 추가
        chatWindow.appendChild(messageDiv);

        // 입력 필드 비우기
        messageInput.value = "";

        // 스크롤 자동 내리기
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // 버튼 클릭 이벤트
    sendButton.addEventListener("click", sendMessage);

    // Enter 키 입력 시 메시지 전송
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});