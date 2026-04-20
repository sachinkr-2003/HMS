import React, { useState } from 'react';
import axios from 'axios';
import { 
    Calendar, FileText, Pill, DollarSign, Activity, 
    MessageSquare, Send, BrainCircuit, Loader2, User, 
    Clock, ChevronRight, HeartPulse
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', content: `Hello ${user?.name}, how can I assist you today?` }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleChat = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = { role: 'user', content: query };
        setChatHistory(prev => [...prev, userMsg]);
        setQuery('');
        setIsTyping(true);

        try {
            const res = await axios.post('http://localhost:5000/api/ai/chat', { query: userMsg.content });
            setChatHistory(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
        } catch (err) {
            setChatHistory(prev => [...prev, { role: 'assistant', content: "AI system is currently unavailable. Please try later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Extremely Simple Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-500 mt-1">Here is your health activity and support center.</p>
            </div>

            {/* Simple Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Next Visit</p>
                    <p className="text-base font-bold text-gray-800 italic">Tomorrow, 10:30 AM</p>
                </div>
                <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Prescriptions</p>
                    <p className="text-base font-bold text-gray-800 italic">4 Active Requests</p>
                </div>
                <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Lab Results</p>
                    <p className="text-base font-bold text-emerald-600">All Normal</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Clean AI Chat Panel */}
                <div className="lg:col-span-2 flex flex-col h-[500px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Health AI Assistant</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold uppercase">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Online
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white scrollbar-hide">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-xs font-medium ${
                                    msg.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-none' 
                                        : 'bg-gray-100 text-gray-700 rounded-tl-none'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="text-[10px] text-gray-400 italic">AI is typing...</div>
                        )}
                    </div>

                    <form onSubmit={handleChat} className="p-4 bg-gray-50 border-t border-gray-200 flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-md outline-none focus:border-blue-500 text-xs"
                            placeholder="Message AI Assistant..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs font-bold"
                        >
                            Send
                        </button>
                    </form>
                </div>

                {/* Minimal Quick Actions */}
                <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Menu</p>
                    {[
                        { title: 'Book Appointment', icon: Calendar, color: 'text-blue-600' },
                        { title: 'Lab Reports', icon: FileText, color: 'text-emerald-600' },
                        { title: 'Buy Medicines', icon: Pill, color: 'text-amber-600' },
                        { title: 'Payment History', icon: DollarSign, color: 'text-rose-600' }
                    ].map((item, i) => (
                        <button key={i} className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all group">
                            <div className="flex items-center gap-3">
                                <item.icon size={18} className={`${item.color}`} />
                                <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{item.title}</span>
                            </div>
                            <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-600" />
                        </button>
                    ))}

                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Support Info</p>
                        <p className="text-[10px] text-gray-600 leading-relaxed font-medium">
                            If you face any issues, please call our 24/7 helpdesk or use the chat for instant help.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
