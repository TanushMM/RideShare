// import React, { useState, useRef, useEffect } from 'react';
// import styled from 'styled-components';

// const CompanionContainer = styled.div`
//   position: fixed;
//   bottom: 20px;
//   left: 20px;
//   z-index: 1000;
// `;

// const CompanionButton = styled.div`
//   width: 60px;
//   height: 60px;
//   background-color: #021526;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

//   &:hover {
//     background-color: #333;
//   }
// `;

// const CompanionPopup = styled.div`
//   position: fixed;
//   bottom: 90px;
//   left: 20px;
//   width: 30%;
//   height: 420px;
//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
//   display: ${props => (props.open ? 'block' : 'none')};
//   overflow: hidden;
//   z-index: 1000;
// `;

// const CompanionHeader = styled.div`
//   background-color: #021526;
//   color: white;
//   padding: 10px;
//   border-radius: 10px 10px 0 0;
// `;

// const CompanionBody = styled.div`
//   padding: 10px;
//   height: 300px;
//   overflow-y: auto;
// `;

// const CompanionInputContainer = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   border-top: 1px solid #ddd;
// `;

// const CompanionInput = styled.input`
//   flex: 1;
//   border-radius: 5px;
//   padding: 10px;
//   margin-right: 10px;
//   border: 1px solid #ddd;
//   background-color: #021526;
//   color: white;
// `;

// const SendButton = styled.button`
//   padding: 10px 15px;
//   background-color: #2a85d7;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #333;
//   }
// `;

// const MessageContainer = styled.div`
//   display: flex;
//   justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
//   margin-bottom: 10px;
// `;

// const MessageBubble = styled.div`
//   background-color: ${props => (props.isUser ? '#2a85d7' : '#f1f1f1')};
//   color: ${props => (props.isUser ? 'white' : 'black')};
//   padding: 10px;
//   border-radius: 10px;
//   max-width: 60%;
// `;

// const VirtualCompanion = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const messageEndRef = useRef(null); // Ref for auto-scrolling

//   const toggleCompanion = () => {
//     setIsOpen(!isOpen);
//   };

//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (message.trim()) {
//       const newMessage = { text: message, isUser: true };
//       setMessages([...messages, newMessage]);

//       try {
//         const token = sessionStorage.getItem('jwt');
//         const response = await fetch('http://3.110.16.132:5150/vc/chat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ text: message }),
//         });

//         const data = await response.json();
//         const botMessage = { text: data.data, isUser: false };
//         setMessages([...messages, newMessage, botMessage]);
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }

//       setMessage('');
//     }
//   };

//   const handleInputKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <CompanionContainer>
//       <CompanionButton onClick={toggleCompanion}>
//         <img src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/VirtualCompanion.png" alt="Virtual Companion" width={50} />
//       </CompanionButton>
//       <CompanionPopup open={isOpen}>
//         <CompanionHeader>Chat with Your Companion</CompanionHeader>
//         <CompanionBody>
//           {messages.map((msg, index) => (
//             <MessageContainer key={index} isUser={msg.isUser}>
//               <MessageBubble isUser={msg.isUser}>{msg.text}</MessageBubble>
//             </MessageContainer>
//           ))}
//           <div ref={messageEndRef} /> {/* Empty div to scroll to */}
//         </CompanionBody>
//         <CompanionInputContainer>
//           <CompanionInput
//             type="text"
//             placeholder="Type your message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleInputKeyPress}
//           />
//           <SendButton onClick={handleSendMessage}>Send</SendButton>
//         </CompanionInputContainer>
//       </CompanionPopup>
//     </CompanionContainer>
//   );
// };

// export default VirtualCompanion;


import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Animation for companion popup
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CompanionContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
`;

const CompanionButton = styled.div`
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
`;

const CompanionPopup = styled.div`
  position: fixed;
  bottom: 90px;
  left: 20px;
  width: 30%;
  height: 420px;
  background: linear-gradient(145deg, #f9f9f9, #f1f1f1);
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: ${props => (props.open ? 'block' : 'none')};
  overflow: hidden;
  z-index: 1000;
  animation: ${slideUp} 0.3s ease-out;
  transition: all 0.3s ease-in-out;
`;

const CompanionHeader = styled.div`
  background-color: #021526;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanionBody = styled.div`
  padding: 15px;
  height: 300px;
  overflow-y: auto;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid #ddd;
`;

const CompanionInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.05);
`;

const CompanionInput = styled.input`
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
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #F5F5F5;
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
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${props => (props.isUser ? '#2a85d7' : '#f1f1f1')};
  color: ${props => (props.isUser ? 'white' : 'black')};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 60%;
  font-size: 0.9rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
`;

const VirtualCompanion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleCompanion = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = { text: message, isUser: true };
      setMessages([...messages, newMessage]);

      try {
        const token = sessionStorage.getItem('jwt');

        const response = await fetch('http://3.110.16.132:5150/vc/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ text: message }),
        });

        const data = await response.json();
        const botMessage = { text: data.data, isUser: false };

        setMessages([...messages, newMessage, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setMessage('');
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <CompanionContainer>
      <CompanionButton onClick={toggleCompanion}>
        <img src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/VirtualCompanion.png" alt="Virtual Companion" width={40} />
      </CompanionButton>
      <CompanionPopup open={isOpen}>
        <CompanionHeader>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
            Chat with Your Companion
          </Typography>
          <IconButton onClick={toggleCompanion}>
            <KeyboardArrowDownIcon style={{ color: 'white' }} />
          </IconButton>
        </CompanionHeader>
        <CompanionBody>
          {messages.map((msg, index) => (
            <MessageContainer key={index} isUser={msg.isUser}>
              <MessageBubble isUser={msg.isUser}>{msg.text}</MessageBubble>
            </MessageContainer>
          ))}
        </CompanionBody>
        <CompanionInputContainer>
          <CompanionInput
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleInputKeyPress}
          />
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </CompanionInputContainer>
      </CompanionPopup>
    </CompanionContainer>
  );
};

export default VirtualCompanion;