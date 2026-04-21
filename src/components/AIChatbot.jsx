import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles, MessageSquare } from 'lucide-react';

const AIChatbot = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am HealthRekha AI. How can I assist you with hospital operations today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simulated AI Logic based on Brochure
        setTimeout(() => {
            let response = "I'm analyzing that for you. Based on our clinical database, I suggest checking the department-wise performance in the Reports section.";
            
            if (userMsg.toLowerCase().includes('appointment')) response = "I can help you schedule an appointment. Please visit the Appointments module or I can link you to the Doctor Directory.";
            if (userMsg.toLowerCase().includes('billing') || userMsg.toLowerCase().includes('payment')) response = "Financial records show a 100% GST compliance this month. Total revenue is up by 8%.";
            if (userMsg.toLowerCase().includes('bed') || userMsg.toLowerCase().includes('occupancy')) response = "Current bed occupancy is at 78%. We have 12 beds available in the General Ward.";
            if (userMsg.toLowerCase().includes('emergency')) response = "Emergency protocol activated. Red alerts have been dispatched to all duty surgeons.";

            setMessages(prev => [...prev, { role: 'bot', text: response }]);
            setIsTyping(false);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-[9999] flex flex-col animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="bg-blue-600 p-5 text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-tight">HealthRekha AI</h3>
                        <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Active Intelligence</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[400px] min-h-[300px] bg-gray-50/50">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
                            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" />
                            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce delay-100" />
                            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce delay-200" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
                <input 
                    type="text"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 transition-all font-medium"
                    placeholder="Ask AI anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    <Send size={18} />
                </button>
            </form>

            <div className="bg-gray-50 px-6 py-2 border-t border-gray-100 flex items-center justify-center gap-2">
                <Sparkles size={10} className="text-blue-600" />
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Powered by HealthRekha GPT Engine</span>
            </div>
        </div>
    );
};

export default AIChatbot;
