import React, { useState } from 'react';
import styled from 'styled-components';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatbotButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: #021526;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #333;
  }
`;

const ChatbotPopup = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 30%;
  height: 420px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: ${props => (props.open ? 'block' : 'none')};
  overflow: hidden;
  z-index: 1000;
`;

const ChatbotHeader = styled.div`
  background-color: #021526;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
`;

const ChatbotBody = styled.div`
  padding: 10px;
  height: 300px;
  overflow-y: auto;
`;

const ChatbotInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const ChatbotInput = styled.input`
  flex: 1;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  background-color: #021526;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #2a85d7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${props => (props.isUser ? '#2a85d7' : '#f1f1f1')};
  color: ${props => (props.isUser ? 'white' : 'black')};
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Add the user's message to the messages array
      const newMessage = { text: message, isUser: true };
      setMessages([...messages, newMessage]);

      try {
        const token = sessionStorage.getItem('jwt');
        // console.log(token);
  
        const response = await fetch('http://127.0.0.1:5150/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ text: message }),
        });
  
        const data = await response.json();
        // console.log('Message Received:', data.data.text);

        // Add the bot's response to the messages array
        const botMessage = { text: data.data.text, isUser: false };
        // console.log("Bot: ", botMessage);
        setMessages([...messages, newMessage, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setMessage(''); // Clear the input field
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer>
      <ChatbotButton onClick={toggleChatbot}>
        <img src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/chatbot_icon.png" alt="Chatbot" width={50} />
      </ChatbotButton>
      <ChatbotPopup open={isOpen}>
        <ChatbotHeader>Chat with us</ChatbotHeader>
        <ChatbotBody>
          {messages.map((msg, index) => (
            <MessageContainer key={index} isUser={msg.isUser}>
              <MessageBubble isUser={msg.isUser}>{msg.text}</MessageBubble>
            </MessageContainer>
          ))}
        </ChatbotBody>
        <ChatbotInputContainer>
          <ChatbotInput
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleInputKeyPress}
          />
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </ChatbotInputContainer>
      </ChatbotPopup>
    </ChatbotContainer>
  );
};

export default Chatbot;
