import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
const HealthChatbot = () => {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('healthChatbotMessages');
        return savedMessages
            ? JSON.parse(savedMessages)
            : [{ sender: 'bot', text: 'Xin chào! Vui lòng nhập các triệu chứng bạn đang gặp phải (ví dụ: sốt, ho, đau bụng, v.v.) để được tư vấn chuyên khoa và bác sĩ.' }];
    });
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [suggestedDoctors, setSuggestedDoctors] = useState([]);
    const messagesContainerRef = useRef(null);
    const { backendURL, doctors } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Cuộn xuống tin nhắn mới nhất
    const scrollToBottom = () => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth',
            });
        }
    };
    useEffect(() => {
        scrollToBottom();
        localStorage.setItem('healthChatbotMessages', JSON.stringify(messages));
    }, [messages]);
    // Xử lý chuyển giọng nói thành văn bản
    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói');
            return;
        }
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = () => {
            setIsListening(true);
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };
        recognition.onend = () => {
            setIsListening(false);
        };
        recognition.start();
    };

    // Trích xuất chuyên khoa từ phản hồi của AI
    const extractSpecialty = (reply) => {
        const specialties = [
            'Hô Hấp - Phổi',
            'Tim Mạch',
            'Cơ - Xương - Khớp',
            'Nội Tiết',
            'Truyền Nhiễm',
            'Thận - Niệu',
            'Thần Kinh',
            'Tiêu Hóa',
            'Nội Tổng Quát'
        ];
        for (const specialty of specialties) {
            if (reply.includes(specialty)) {
                return specialty;
            }
        }
        return null;
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            alert('Vui lòng nhập triệu chứng trước khi gửi!');
            return;
        }
        setLoading(true);
        // Thêm tin nhắn của người dùng
        const userMessage = {
            sender: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, userMessage]);
        try {
            const response = await axios.post(`${backendURL}/api/ai-chatbot/chat`, {
                userMessage: input,
                conversation: messages,
            });
            const { reply } = response.data;
            const botMessage = {
                sender: 'bot',
                text: reply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, botMessage]);
            const specialty = extractSpecialty(reply);
            if (specialty) {
                const filteredDoctors = doctors.filter(doctor => doctor.speciality === specialty && doctor.available === true);
                setSuggestedDoctors(filteredDoctors);
            } else {
                setSuggestedDoctors([]);
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                sender: 'bot',
                text: `Đã có lỗi xảy ra: ${error.response?.data?.error || error.message}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
        setInput('');
    };

    const clearChatHistory = () => {
        const initialMessage = [{
            sender: 'bot',
            text: 'Xin chào! Vui lòng nhập các triệu chứng bạn đang gặp phải (ví dụ: sốt, ho, đau bụng, v.v.) để được tư vấn chuyên khoa và bác sĩ.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }];
        setMessages(initialMessage);
        setSuggestedDoctors([]);
        localStorage.setItem('healthChatbotMessages', JSON.stringify(initialMessage));
    };

    return (
        <div className="w-full max-w-7xl mx-auto my-8 flex flex-col lg:flex-row gap-6">
            {/* Cột trái: Chatbot */}
            <div className="w-full h-[600px] lg:w-1/2 flex flex-col border border-gray-200 shadow-xl rounded-2xl bg-white">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 rounded-t-2xl flex justify-between items-center">
                    <h2 className="text-xl font-bold tracking-wide">Health Chatbot - Tư vấn triệu chứng</h2>
                    <button
                        onClick={clearChatHistory}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                        Xóa lịch sử
                    </button>
                </div>

                {/* Khu vực hiển thị tin nhắn */}
                <div
                    ref={messagesContainerRef}
                    className="flex-1 p-6 overflow-y-auto bg-gray-100"
                    style={{ maxHeight: 'calc(100vh - 200px)' }}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`my-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl shadow-md relative ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                {msg.sender === 'user' ? (
                                    <span>{msg.text}</span>
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                                )}
                                <span className="text-xs text-gray-400 mt-1 block">
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="my-3 flex justify-start">
                            <div className="max-w-[80%] p-4 rounded-2xl shadow-md bg-white text-gray-800 rounded-bl-none flex items-center">
                                <SyncLoader size={8} speedMultiplier={0.8} color="#2563EB" />
                                <span className="ml-2"> Đang xử lý...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form nhập liệu */}
                <form onSubmit={handleSendMessage} className="flex p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập triệu chứng hoặc câu trả lời của bạn..."
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                    <button
                        type="button"
                        onClick={handleVoiceInput}
                        className={`p-3 mx-3 rounded-full ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-200 hover:bg-gray-300'
                            } transition-all duration-300`}
                    >
                        <img className="w-6 h-6" src={isListening ? assets.voice_icon_slash : assets.voice_icon} alt="Voice Input" />
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
                    >
                        Gửi
                    </button>
                </form>
            </div>

            {/* Cột phải: Danh sách bác sĩ */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {suggestedDoctors.length > 0 ? (
                    <>
                        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-5 rounded-t-2xl shadow-xl">
                            <h2 className="text-xl font-bold tracking-wide">Danh sách bác sĩ đề xuất</h2>
                        </div>
                        <div className="flex-1 p-6 bg-gray-100 rounded-b-2xl shadow-xl">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {suggestedDoctors.map((doctor, index) => (
                                    <div
                                        key={index}
                                        onClick={() => navigate(`/appointment/${doctor._id}`)}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                                    >
                                        <div className="relative">
                                            <img
                                                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                                                src={doctor.image}
                                                loading="lazy"
                                                alt={doctor.name}
                                            />
                                            <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-white bg-green-500 px-3 py-1 rounded-full animate-pulse">
                                                <span className="w-3 h-3 bg-white rounded-full"></span>
                                                <span>Available</span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{doctor.speciality}</p>
                                            <button className="hover:scale-105 cursor-pointer mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                                                Đặt lịch ngay
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 bg-gray-100 rounded-2xl shadow-xl flex items-center justify-center">
                        <img className='rounded-2xl w-full h-full' src={assets.bot_img} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthChatbot;