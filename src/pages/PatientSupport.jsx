import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Bot, Send, User, BrainCircuit, Activity, HelpCircle, Loader2 } from 'lucide-react';
import API from '../api/axios';

const PatientSupport = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hello! I'm HealthRekha AI. How can I help you today? You can ask about your reports, appointments, or describe symptoms." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text }]);
    setLoading(true);
    try {
      const res = await API.post('/ai/chat', { query: text });
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, I am unable to respond right now. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') sendMessage(); };

  const faqs = ['How to book a lab test?', 'Where can I find my old prescriptions?', 'How to update insurance details?'];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Support & Assistance</h1>
        <p className="text-slate-500 font-medium text-sm">Get help from our AI assistant or chat with your medical care team.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">HealthRekha AI</h3>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 max-w-2xl ${m.from === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${m.from === 'bot' ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white'}`}>
                  {m.from === 'bot' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className={`p-4 rounded-[2rem] ${m.from === 'bot' ? 'bg-slate-50 rounded-tl-none text-slate-600' : 'bg-indigo-600 rounded-tr-none text-white'}`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4 max-w-2xl">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0"><Bot size={20} /></div>
                <div className="bg-slate-50 p-4 rounded-[2rem] rounded-tl-none flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-indigo-400" />
                  <span className="text-sm text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-6 bg-slate-50/50 border-t border-slate-100">
            <div className="flex items-center gap-4 bg-white p-2 pl-6 rounded-2xl border border-slate-100 shadow-sm">
              <input
                type="text"
                placeholder="Type your health query here..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button onClick={sendMessage} disabled={loading} className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col min-h-0 overflow-y-auto pr-2">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden shrink-0">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-3">
              <BrainCircuit size={24} className="text-indigo-400" /> AI Symptom Checker
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">Describe how you're feeling and our AI will help identify potential causes.</p>
            <button
              onClick={() => { setInput('I want to check my symptoms'); }}
              className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <Activity size={18} /> Start Symptom Check
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 shrink-0">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle size={20} className="text-indigo-600" /> Common FAQs
            </h3>
            <div className="space-y-3">
              {faqs.map((q, i) => (
                <button key={i} onClick={() => setInput(q)} className="w-full text-left p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-center gap-4 shrink-0">
            <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600"><MessageSquare size={20} /></div>
            <div>
              <h4 className="text-xs font-black text-indigo-900 uppercase">Emergency Support</h4>
              <p className="text-xs text-indigo-600 font-bold">+91 1800-444-999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSupport;
