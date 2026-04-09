'use client';

import { Send, User, Bot, Phone, MoreVertical, Search } from 'lucide-react';
import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello John, how are you feeling today?', time: '10:00 AM' },
    { id: 2, sender: 'user', text: 'I am feeling much better, but I have a question about the new medication.', time: '10:05 AM' },
    { id: 3, sender: 'doctor', text: 'Of course, what would you like to know?', time: '10:06 AM' }
  ]);
  const [input, setInput] = useState('');
  const [activeChat, setActiveChat] = useState('doctor'); // 'doctor' or 'ai'

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), sender: 'user', text: input, time: 'Now' };
    setMessages([...messages, newMessage]);
    setInput('');

    // Simulation response for AI bot
    if (activeChat === 'ai') {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          sender: 'doctor', // Using 'doctor' style for bot too
          text: `I understand you're asking about "${input}". I am processing your health data to provide the best advice. One moment...`, 
          time: 'Now' 
        }]);
      }, 1500);
    }
  };

  const downloadReport = () => {
    const data = "Date,Adherence,Mood\n2026-04-01,90%,Good\n2026-04-02,100%,Great";
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medicare_report.csv';
    a.click();
  };

  return (
    <div className="chat-page">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-160px)]">
        <aside className="card lg:col-span-1 flex flex-col p-4">
          <div className="flex items-center gap-2 mb-6 bg-secondary/30 p-2 rounded-lg">
             <Search size={18} className="opacity-40" />
             <input type="text" placeholder="Search chats..." className="bg-transparent border-none text-sm w-full outline-none" />
          </div>
          
          <div className="chat-list flex-1 overflow-y-auto">
             <div 
               className={`chat-preview ${activeChat === 'doctor' ? 'active' : ''} flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer`}
               onClick={() => setActiveChat('doctor')}
             >
                <div className="avatar bg-primary text-white"><User size={18} /></div>
                <div>
                   <p className="font-bold text-sm">Dr. Sarah Wilson</p>
                   <p className="text-xs opacity-60 truncate w-32">Of course, what would you...</p>
                </div>
             </div>
             <div 
               className={`chat-preview ${activeChat === 'ai' ? 'active' : ''} flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer hover:bg-secondary/20`}
               onClick={() => setActiveChat('ai')}
             >
                <div className="avatar bg-accent text-white"><Bot size={18} /></div>
                <div>
                   <p className="font-bold text-sm">AI Health Assistant</p>
                   <p className="text-xs opacity-60">How can I help you today?</p>
                </div>
             </div>
          </div>

          <button className="btn btn-secondary mt-auto text-xs" onClick={downloadReport}>
            Download Chat History
          </button>
        </aside>

        <section className="card lg:col-span-3 flex flex-col p-0 overflow-hidden">
          <header className="p-4 border-b flex justify-between items-center bg-secondary/10">
             <div className="flex items-center gap-3">
                <div className={`avatar ${activeChat === 'ai' ? 'bg-accent' : 'bg-primary'} text-white`}>
                  {activeChat === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div>
                   <p className="font-bold">{activeChat === 'ai' ? 'AI Health Assistant' : 'Dr. Sarah Wilson'}</p>
                   <p className="text-xs text-success font-medium">Online</p>
                </div>
             </div>
             <div className="flex gap-4">
                <button className="p-2 hover:bg-secondary/40 rounded-full transition-colors"><Phone size={20} /></button>
                <button className="p-2 hover:bg-secondary/40 rounded-full transition-colors"><MoreVertical size={20} /></button>
             </div>
          </header>

          <div className="messages-area flex-1 p-6 overflow-y-auto bg-slate-50/50">
             {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                   <div className={`message-bubble ${m.sender === 'user' ? 'user' : 'other'} max-w-[70%]`}>
                      <p className="text-sm">{m.text}</p>
                      <span className="text-[10px] opacity-40 mt-1 block text-right">{m.time}</span>
                   </div>
                </div>
             ))}
          </div>

          <footer className="p-4 border-t flex gap-3">
             <input 
               type="text" 
               placeholder="Type your message..." 
               className="flex-1 bg-secondary/20 rounded-xl px-4 py-2 outline-none border focus:border-primary transition-colors"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
             />
             <button 
               className="p-3 bg-primary text-white rounded-xl hover:scale-105 transition-transform"
               onClick={sendMessage}
             >
                <Send size={20} />
             </button>
          </footer>
        </section>
      </div>

      <style jsx>{`
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-preview.active {
          background: hsla(var(--primary), 0.1);
          border: 1px solid hsla(var(--primary), 0.2);
        }
        .message-bubble {
          padding: 1rem;
          border-radius: 1.25rem;
        }
        .message-bubble.user {
          background: hsl(var(--primary));
          color: white;
          border-bottom-right-radius: 4px;
        }
        .message-bubble.other {
          background: white;
          border: 1px solid hsl(var(--border));
          border-bottom-left-radius: 4px;
        }
      `}</style>
    </div>
  );
}
