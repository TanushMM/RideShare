// import React, { useState } from 'react';
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
//   background-color: #3f51b5; /* Matching the ChatbotButton color */
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

//   &:hover {
//     background-color: #333; /* Matching the ChatbotButton hover color */
//   }
// `;

// const CompanionPopup = styled.div`
//   position: fixed;
//   bottom: 90px;
//   left: 20px;
//   width: 30%;
//   height: 420px;
//   background-color: white; /* Matching the ChatbotPopup background color */
//   border-radius: 10px;
//   box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
//   display: ${props => (props.open ? 'block' : 'none')};
//   overflow: hidden;
//   z-index: 1000;
// `;

// const CompanionHeader = styled.div`
//   background-color: #3f51b5; /* Matching the ChatbotHeader color */
//   color: white;
//   padding: 10px;
//   border-radius: 10px 10px 0 0;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const CompanionAvatar = styled.img`
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
// `;

// const CompanionBody = styled.div`
//   padding: 10px;
//   height: 300px;
//   overflow-y: auto;
// `;

// const ConversationStarter = styled.p`
//   color: #333;
//   font-size: 16px;
//   margin-bottom: 15px;
//   text-align: center;
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
// `;

// const SendButton = styled.button`
//   padding: 10px 15px;
//   background-color: #3f51b5; /* Matching the ChatbotButton color */
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #333; /* Matching the ChatbotButton hover color */
//   }
// `;

// const VirtualCompanion = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState('');

//   const toggleCompanion = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSendMessage = async () => {
//     if (message.trim()) {
//       console.log('User message:', message);
//       setMessage(''); // Clear the input field after sending
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
//         <CompanionAvatar src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/VirtualCompanion.png" alt="Companion Avatar" />
//       </CompanionButton>
//       <CompanionPopup open={isOpen}>
//         <CompanionHeader>
//           Your Virtual Companion
//           <CompanionAvatar src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/VirtualCompanion.png" alt="Companion Avatar" />
//         </CompanionHeader>
//         <CompanionBody>
//           <ConversationStarter>Hey! Want to chat or play a quick game?</ConversationStarter>
//           <CompanionInputContainer>
//             <CompanionInput
//               type="text"
//               placeholder="Say something..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={handleInputKeyPress}
//             />
//             <SendButton onClick={handleSendMessage}>Send</SendButton>
//           </CompanionInputContainer>
//         </CompanionBody>
//       </CompanionPopup>
//     </CompanionContainer>
//   );
// };

// export default VirtualCompanion;


import React, { useState } from 'react';
import styled from 'styled-components';

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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #333;
  }
`;

const CompanionPopup = styled.div`
  position: fixed;
  bottom: 90px;
  left: 20px;
  width: 30%;
  height: 420px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: ${props => (props.open ? 'block' : 'none')};
  overflow: hidden;
  z-index: 1000;
`;

const CompanionHeader = styled.div`
  background-color: #021526;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
`;

const CompanionBody = styled.div`
  padding: 10px;
  height: 300px;
  overflow-y: auto;
`;

const CompanionInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const CompanionInput = styled.input`
  flex: 1;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  background-color: #021526;
  color: white;
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

        const response = await fetch('http://127.0.0.1:5150/vc/chat', {
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
        <img src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/VirtualCompanion.png" alt="Virtual Companion" width={50} />
      </CompanionButton>
      <CompanionPopup open={isOpen}>
        <CompanionHeader>Chat with Your Companion</CompanionHeader>
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
