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
  const [unreadCounts, setUnreadCounts] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const socket = useRef(null);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

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
      const isCurrentChat = selectedUser && message.sender === selectedUser._id;
      setMessages((prevMessages) =>
        isCurrentChat ? [...prevMessages, message] : prevMessages
      );

      if (!isCurrentChat) {
        setUnreadCounts((prev) => ({
          ...prev,
          [message.sender]: (prev[message.sender] || 0) + 1,
        }));
      }
    });

    axios.get(`${apiPort}/api/chat/users`).then((response) => {
      setUsers(response.data);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
      setUnreadCounts((prev) => ({
        ...prev,
        [selectedUser._id]: 0,
      }));
    }
  }, [selectedUser]);

  const sendMessage = async () => {
    if (input.trim() && selectedUser) {
      const message = { user: user.fullName, text: input, receiver: selectedUser._id };
      socket.current.emit('message', message);
      await axios.post(`${apiPort}/api/chat/messages`, message);
      setInput('');
      fetchMessages();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedUser) {
        fetchMessages();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
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
              className={`relative p-2 cursor-pointer flex justify-between items-center ${
                selectedUser && selectedUser._id === u._id ? 'bg-gray-600' : 'bg-gray-700'
              } text-white rounded-lg mb-2`}
            >
              <span>{u.fullName}</span>
              {unreadCounts[u._id] > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCounts[u._id]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="w-3/4 flex flex-col bg-gray-900">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === userId ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
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
              <div className="absolute bottom-16 z-10">
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
