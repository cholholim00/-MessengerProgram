const chatWindow = document.getElementById("chatWindow");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

// 메시지 전송 함수
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        messageInput.value = ""; // 입력 필드 초기화
        chatWindow.scrollTop = chatWindow.scrollHeight; // 스크롤을 아래로
    }
}

// 버튼 클릭 시 메시지 전송
sendButton.addEventListener("click", sendMessage);

// Enter 키로 메시지 전송
messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});