// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ChatbotContainer = styled.div`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   z-index: 1000;
// `;

// const ChatbotButton = styled.div`
//   width: 60px;
//   height: 60px;
//   background-color: #3f51b5;
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

// const ChatbotPopup = styled.div`
//   position: fixed;
//   bottom: 90px;
//   right: 20px;
//   width: 30%;
//   height: 420px;
//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
//   display: ${props => (props.open ? 'block' : 'none')};
//   overflow: hidden;
//   z-index: 1000;
// `;

// const ChatbotHeader = styled.div`
//   background-color: #3f51b5;
//   color: white;
//   padding: 10px;
//   border-radius: 10px 10px 0 0;
// `;

// const ChatbotBody = styled.div`
//   padding: 10px;
//   height: 300px;
//   overflow-y: auto;
// `;

// const ChatbotInputContainer = styled.div`
//   padding: 0 0 20 0;
//   border-top: 1px solid #ddd;
// `;

// const ChatbotInput = styled.input`
//   width: 90%;
//   border-radius: 5px;
//   padding: 10px;
//   margin: 10px;
//   border: 1px solid #ddd;
// `;

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <ChatbotContainer>
//       <ChatbotButton onClick={toggleChatbot}>
//         <img src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/chatbot_icon.png" alt="Chatbot" width={50}/>
//       </ChatbotButton>
//       <ChatbotPopup open={isOpen}>
//         <ChatbotHeader>Chat with us</ChatbotHeader>
//         <ChatbotBody>
//           {/* Chat messages will go here */}
//           <p>Hello! How can I help you today?</p>
//         </ChatbotBody>
//         <ChatbotInputContainer>
//           <ChatbotInput type="text" placeholder="Type your message..." />
//         </ChatbotInputContainer>
//       </ChatbotPopup>
//     </ChatbotContainer>
//   );
// };

// export default Chatbot;


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
  background-color: #3f51b5;
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
  background-color: #3f51b5;
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
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    console.log(message);
    // if (message.trim()) {
    //   // Send the message to the API endpoint
    //   try {
    //     const response = await fetch('https://your-api-endpoint.com/sendMessage', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ text: message }),
    //     });
    //     const data = await response.json();
    //     console.log('Message sent:', data);
    //   } catch (error) {
    //     console.error('Error sending message:', error);
    //   }
    //   setMessage(''); // Clear the input field
    // }
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
          {/* Chat messages will go here */}
          <p>Hello! How can I help you today?</p>
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
