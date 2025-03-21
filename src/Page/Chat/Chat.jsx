import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Layout from '../../components/Layout';
import Picker from 'emoji-picker-react';
const apiPort = process.env.REACT_APP_API_PORT;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const socket = useRef(null);

  // Ensure token is retrieved and set in headers unconditionally
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const isPaidUser =  () => {
    if (userRole === "superAdmin") return true;  
    if(!user) return false;
    if (!user.subscription || !user.subscription?.expiryDate) {
      return false; 
    }
    return true;
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${apiPort}/api/chat/messages/${selectedUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token, navigate]);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL);
    socket.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    axios.get(`${apiPort}/api/chat/users`).then((response) => {     
        setUsers(response.data);    
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user, navigate]);

  useEffect(() => {
    if (selectedUser) {     
      fetchMessages();
    }
  }, [selectedUser, token]);

  const sendMessage = async () => {
    if (input.trim() && selectedUser) {
      const message = { user: user.fullName, text: input, receiver: selectedUser._id };
      socket.current.emit('message', message);
      await axios.post(`${apiPort}/api/chat/messages`, message);
      setInput('');
      fetchMessages();
    }
  };

  //fetch messages neeed to run every 3 seconds to get new messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedUser) {
        fetchMessages();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-110px)]">
        {/* Users List */}
        <div className="w-1/4 bg-gray-800 p-4 overflow-y-auto">
          <h2 className="text-white text-xl mb-4">Users</h2>
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`p-2 cursor-pointer ${selectedUser && selectedUser._id === u._id ? 'bg-gray-600' : 'bg-gray-700'} text-white rounded-lg mb-2`}
            >
              {u.fullName}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="w-3/4 flex flex-col bg-gray-900">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              //sender message will show left and receiver message will show right
              <div key={index} className={`mb-2 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
                 <span className={`inline-block p-2 rounded-lg ${msg.sender === userId ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
                   {msg.text}
                 </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-800 flex items-center">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="mr-2 px-2 py-1 bg-gray-700 text-white rounded-lg"
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-16">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="w-full p-2 rounded-lg text-gray-800"
              placeholder="Type a message"
            />
            <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
