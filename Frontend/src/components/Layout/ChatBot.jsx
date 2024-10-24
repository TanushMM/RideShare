import React, { useState, useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { IconButton, Typography } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import axios from "axios"
import ReactMarkdown from "react-markdown"

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`

const ChatbotButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: #021526;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #1e3a5f;
    transform: scale(1.05);
  }
`

const ChatbotPopup = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 30%;
  height: 620px;
  background: linear-gradient(145deg, #f9f9f9, #f1f1f1);
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.open ? "block" : "none")};
  overflow: hidden;
  z-index: 1000;
  animation: ${slideUp} 0.3s ease-out;
  transition: all 0.3s ease-in-out;
`

const ChatbotHeader = styled.div`
  background-color: #021526;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ChatbotBody = styled.div`
  padding: 15px;
  height: 500px;
  overflow-y: auto;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid #ddd;
`

const ChatbotInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.05);
`

const ChatbotInput = styled.input`
  flex: 1;
  border-radius: 20px;
  padding: 10px 15px;
  margin-right: 10px;
  border: 1px solid #ddd;
  background-color: #021526;
  color: #fff;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border: 1px solid #2a85d7;
    box-shadow: 0 0 5px rgba(42, 133, 215, 0.5);
  }
`

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: black;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: black;
    color: white;
    transform: scale(1.05);
  }
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`

const MessageBubble = styled.div`
  background-color: ${(props) => (props.isUser ? "#2a85d7" : "#f1f1f1")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 60%;
  font-size: 0.9rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  white-space: pre-wrap;
`

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const chatbotBodyRef = useRef(null)

  useEffect(() => {
    if (sessionStorage.getItem("jwt" === null)) {
      alert("")
    }
  })

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (chatbotBodyRef.current) {
      chatbotBodyRef.current.scrollTop = chatbotBodyRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = { text: message, isUser: true }
      setMessages([...messages, newMessage])

      try {
        // no need for JWT because, ChatBot must allows for user to access it irrespective of Login status
        // const token = sessionStorage.getItem('jwt');

        const response = await axios.post(
          `http://${import.meta.env.VITE_SERVER_IP}:8000/chat/bot/chat`,
          { text: message },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const botMessage = { text: response.data.data, isUser: false }
        setMessages([...messages, newMessage, botMessage])
      } catch (error) {
        console.error("Error sending message:", error)
      }

      setMessage("")
    }
  }

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <ChatbotContainer>
      <ChatbotButton onClick={toggleChatbot}>
        <img
          src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/chatbot_icon.png"
          alt="Chatbot"
          width={40}
        />
      </ChatbotButton>
      <ChatbotPopup open={isOpen}>
        <ChatbotHeader>
          <Typography sx={{ fontFamily: "Poppins", fontSize: "20px" }}>
            Chat with us
          </Typography>
          <IconButton onClick={toggleChatbot}>
            <KeyboardArrowDownIcon style={{ color: "white" }} />
          </IconButton>
        </ChatbotHeader>
        <ChatbotBody ref={chatbotBodyRef}>
          {messages.map((msg, index) => (
            <MessageContainer key={index} isUser={msg.isUser}>
              <MessageBubble isUser={msg.isUser}>
                {msg.isUser ? (
                  msg.text
                ) : (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                )}
              </MessageBubble>
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
  )
}

export default Chatbot
