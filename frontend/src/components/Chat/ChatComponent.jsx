import React, { useRef, useState, useEffect } from 'react';
import './ChatComponent.css'
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements'
import { useNavigate } from 'react-router-dom';
import UserChatList from "./UserChatList";




const ChatComponent = ({ roomId, roomName, roomMate }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [mateId, setMateId] = useState(-1);
  const backend = import.meta.env.VITE_APP_BACKEND;
  let navigate = useNavigate();
  const messagesContainerRef = useRef(null);


  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };
 
  // Función para cargar los mensajes de la sala de chat
  const fetchMessages = () => {
    const token = localStorage.getItem('token'); 
    return fetch(`${backend}/chat/${roomId}/messages/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setMessages(data);
    })
    .catch(error => console.error('Error fetching messages:', error));
  };
  

  // Función para enviar un nuevo mensaje
  const sendMessage = (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    if (!newMessage.trim()) return;
  
    const content = newMessage;
    fetch(`${backend}/chat/${roomId}/post_message/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setNewMessage('');
      console.log("FETCHING");
      setTimeout(fetchMessages, 200); 
      setTimeout(() => {
        scrollToBottom();
      }, 250); // Ajusta este tiempo si es necesario
    })
    .catch(error => {
      console.error('Error:', error);
      setNewMessage('');
    })
    
  }

  useEffect(() => {
    fetchMessages().then(() => {
      setTimeout(() => {
        scrollToBottom();
      }, 250); // Ajusta este tiempo si es necesario
    });
    // Establece un intervalo para actualizar mensajes, si es necesario, pero sin hacer scroll
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, [roomId]); 
  


  // Obtenemos el ID de un usuario a partir de su username
  useEffect(() => {
    
    const token = localStorage.getItem('token'); 
    console.log(roomMate)
    const url = `${backend}/users/get-user-id/${roomMate}/`; 

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setMateId(data.user_id); 
    })
    .catch(error => {
      console.error('Hubo un problema con la petición fetch:', error);
    });
  }, [roomMate]); 
  
  return (
    <div className='chat-page'>
      <div className="sidebar">
        <div className="back-button-container">
          <button onClick={() => navigate(`/user-details/${mateId}`)} className="back-button">
            <i className="left-arrow">←</i> Volver
          </button>
        </div>
        <UserChatList/>
      </div>
      
      {roomId != 0 ? <div className='chat' >
        <h2 className='title'>{roomName}</h2>
        <div className='window'> 
          <div className='messages-container' ref={messagesContainerRef}>
            {
              messages.map((message, index) => (
                <MessageBox
                  key={index}
                  position={message.author__username === localStorage.getItem('username') ? 'right' : 'left'} // Ajusta la posición basada en si el mensaje fue enviado o recibido
                  type="text"
                  text={message.content}
                  title={message.author__username}
                  date={message.timestamp}
                  // Para más personalización, puedes añadir aquí otras props como `date`, `avatar`, etc.
                />
              ))
            }
          </div>
        
          <form className='f' onSubmit={sendMessage}>
            <input
              className='fi'
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <button className='fb' type="submit">Enviar</button>
          </form>
        </div>
      </div> : <div className="contenedor-centrado"> <h2 className='mis-chats'>Elige un usuario con el que comenzar a chatear.</h2> </div>}
    </div>
  );
};

export default ChatComponent;
