(function() {
    // Create chat widget HTML
    const chatWidget = document.createElement('div');
    chatWidget.className = 'ai-chat-widget';
    chatWidget.innerHTML = `
        <div class="ai-chat-window" id="aiChatWindow" style="display:none;">
            <div class="ai-chat-header">
                <span>AI Assistant</span>
                <button class="close-btn" id="closeAiChatBtn">&times;</button>
            </div>
            <div class="ai-chat-messages" id="aiChatMessages">
                <div class="message assistant">Hello! How can I help you today?</div>
            </div>
            <div class="ai-chat-input-area">
                <input type="text" id="aiChatMessageInput" placeholder="Ask something...">
                <button id="sendAiChatMessageBtn">Send</button>
            </div>
        </div>
        <button class="ai-chat-toggle" id="aiChatToggleBtn" style="display:block;">
            <span>🤖</span>
        </button>
    `;
    document.body.appendChild(chatWidget);

    // Styles (only if not already present)
    if (!document.getElementById('ai-chat-widget-styles')) {
        const style = document.createElement('style');
        style.id = 'ai-chat-widget-styles';
        style.textContent = `
            .ai-chat-widget {
                position: fixed; bottom: 20px; right: 20px; z-index: 1000;
            }
            .ai-chat-toggle {
                background-color: #7a684a; color: #fff; border: none; border-radius: 50%;
                width: 60px; height: 60px; font-size: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background-color 0.3s ease;
            }
            .ai-chat-toggle:hover { background-color: #5e513a; }
            .ai-chat-window {
                position: absolute; bottom: 80px; right: 0;
                width: 320px; height: 450px; background-color: #fff;
                border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                display: flex; flex-direction: column; overflow: hidden;
            }
            .ai-chat-header {
                background-color: #7a684a; color: #fff; padding: 12px 15px; font-weight: bold;
                display: flex; justify-content: space-between; align-items: center;
            }
            .ai-chat-header .close-btn { background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; }
            .ai-chat-messages {
                flex-grow: 1; padding: 15px; overflow-y: auto; background-color: #f7f5f0;
                display: flex; flex-direction: column; gap: 10px;
            }
            .ai-chat-messages .message { padding: 8px 12px; border-radius: 15px; max-width: 80%; font-size: 0.95em; }
            .ai-chat-messages .message.user { background-color: #e6c77d; color: #222; align-self: flex-end; border-bottom-right-radius: 5px; }
            .ai-chat-messages .message.assistant { background-color: #eaf0fa; color: #222; align-self: flex-start; border-bottom-left-radius: 5px; }
            .ai-chat-input-area { display: flex; padding: 10px; border-top: 1px solid #eee; }
            .ai-chat-input-area input { flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; margin-right: 8px; outline: none; }
            .ai-chat-input-area button {
                background-color: #7a684a; color: #fff; border: none; border-radius: 20px;
                padding: 0 15px; cursor: pointer; font-weight: bold;
            }
            .ai-chat-input-area button:hover { background-color: #5e513a; }
        `;
        document.head.appendChild(style);
    }

    // Widget logic
    const aiChatToggleBtn = chatWidget.querySelector('#aiChatToggleBtn');
    const aiChatWindow = chatWidget.querySelector('#aiChatWindow');
    const closeAiChatBtn = chatWidget.querySelector('#closeAiChatBtn');
    const aiChatMessageInput = chatWidget.querySelector('#aiChatMessageInput');
    const sendAiChatMessageBtn = chatWidget.querySelector('#sendAiChatMessageBtn');
    const aiChatMessagesContainer = chatWidget.querySelector('#aiChatMessages');

    aiChatToggleBtn.addEventListener('click', () => {
        aiChatWindow.style.display = aiChatWindow.style.display === 'none' ? 'flex' : 'none';
        aiChatToggleBtn.style.display = aiChatWindow.style.display === 'none' ? 'block' : 'none';
    });
    closeAiChatBtn.addEventListener('click', () => {
        aiChatWindow.style.display = 'none';
        aiChatToggleBtn.style.display = 'block';
    });
    function addMessageToChat(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        aiChatMessagesContainer.appendChild(messageDiv);
        aiChatMessagesContainer.scrollTop = aiChatMessagesContainer.scrollHeight;
    }
    sendAiChatMessageBtn.addEventListener('click', () => {
        const messageText = aiChatMessageInput.value.trim();
        if (messageText) {
            addMessageToChat(messageText, 'user');
            aiChatMessageInput.value = '';
            setTimeout(() => {
                addMessageToChat("I'm a demo AI. I received: " + messageText, 'assistant');
            }, 1000);
        }
    });
    aiChatMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendAiChatMessageBtn.click();
    });
})();
