document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const chatWindow = document.getElementById("chatWindow");

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === "") return;

        // 새로운 메시지 요소 생성
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "sent");
        messageDiv.innerHTML = `<img src="avatar1.png" alt="나" class="profile-img"> ${messageText}`;

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