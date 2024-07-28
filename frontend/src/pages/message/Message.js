import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Message.scss"

const Message = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    let mainuserId = ""

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:8000/api/users/getallusers');
            setUsers(response.data.newUsers);
        };

        fetchUsers();
    }, []);

    for (let user of users) {
        if (user.email == JSON.parse(localStorage.getItem("email"))) {
            mainuserId = user.id;
        }
    }

    const fetchMessages = async (userId) => {
        const response = await axios.get(`http://localhost:8000/api/messages/${mainuserId}/${userId}`);
        setMessages(response.data);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/messages', {
            senderId: mainuserId,
            receiverId: selectedUser.id,
            senderName: JSON.parse(localStorage.getItem("name")),
            recieverName: selectedUser.name,
            content,
        });
        setMessages([...messages, response.data]);
        setContent('');
    };

    return (
        <div>
            <h2 style={{ margin: "10px 0" }}>Chat</h2>
            <hr />
            <div>
                <h3>Users</h3>
                <ul>
                    {users.map((u) => (
                        u.id == mainuserId ? (
                            <li key={u.id}>
                                {u.name} (Current User)
                            </li>
                        ) : (
                            <li key={u.id} onClick={() => { setSelectedUser(u); fetchMessages(u.id); }}>
                                {u.name}
                            </li>
                        )
                    ))}
                </ul>
            </div>
            <div>
                <h3>Messages</h3>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.senderName}:</strong> {msg.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage}>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Message;