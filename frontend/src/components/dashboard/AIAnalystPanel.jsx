import React, { useState } from 'react';
import GlassPanel from '../common/GlassPanel';
import { Bot, User, Send, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

export default function AIAnalystPanel({ currentRegion = 'delhi ncr' }) {
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'prototype analyst ready. this panel uses predefined demo responses; it is not connected to an LLM or live geospatial processing service yet.' },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const handleSend = (event) => {
    event.preventDefault();
    if (!input.trim() || isThinking) return;
    const userMessage = input.trim();
    setMessages((previous) => [...previous, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsThinking(true);

    window.setTimeout(() => {
      const lower = userMessage.toLowerCase();
      let reply;
      if (lower.includes('change') || lower.includes('2020') || lower.includes('2024')) {
        reply = `demo response: a temporal comparison for ${currentRegion} would require dated satellite scenes and validated change-detection processing. those integrations are planned, not active.`;
      } else if (lower.includes('vegetation') || lower.includes('tree') || lower.includes('ndvi')) {
        reply = `demo response: vegetation monitoring could use Sentinel-2 NDVI and MODIS Terra/Aqua time series. imagery retrieval and index calculation are not connected yet.`;
      } else if (lower.includes('water') || lower.includes('flood') || lower.includes('river')) {
        reply = 'demo response: Sentinel-1 SAR is the planned starting point for flood-extent mapping. this prototype does not currently retrieve or classify radar imagery.';
      } else {
        reply = 'demo response: the request has been received by this interface only. LLM-based workflow planning and geospatial tool execution are future integrations.';
      }
      setMessages((previous) => [...previous, { sender: 'assistant', text: reply }]);
      setIsThinking(false);
    }, 650);
  };

  return (
    <GlassPanel className="w-80 md:w-96 border border-white/10 shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
      <div className="flex items-center justify-between p-3.5 border-b border-white/[0.08] bg-black/30">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-xs font-mono text-white lowercase">analyst preview • demo responses</span>
        </div>
        <button onClick={() => setMinimized(!minimized)} aria-label={minimized ? 'Expand analyst preview' : 'Minimize analyst preview'} className="p-1 rounded hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors">
          {minimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
      {!minimized && (
        <>
          <div className="p-3.5 space-y-3 max-h-60 overflow-y-auto font-mono text-xs">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-2.5 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'assistant' && <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 flex-shrink-0 mt-0.5"><Bot className="w-3.5 h-3.5" /></div>}
                <div className={`p-2.5 rounded-xl max-w-[85%] lowercase leading-relaxed text-[11px] ${message.sender === 'user' ? 'bg-sky-500/20 border border-sky-400/30 text-sky-100 rounded-tr-none' : 'bg-white/[0.03] border border-white/[0.08] text-gray-300 rounded-tl-none'}`}>{message.text}</div>
                {message.sender === 'user' && <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 flex-shrink-0 mt-0.5"><User className="w-3.5 h-3.5" /></div>}
              </div>
            ))}
            {isThinking && <div className="flex items-center gap-2 text-[11px] text-sky-400 font-mono"><Sparkles className="w-3 h-3 animate-spin" /><span>preparing demo response...</span></div>}
          </div>
          <form onSubmit={handleSend} className="p-2.5 border-t border-white/[0.08] bg-black/20 flex gap-1.5">
            <input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="try a demo question..." className="flex-1 px-3 py-1.5 rounded-lg glass-input text-xs font-mono text-white placeholder-gray-500 lowercase" />
            <button type="submit" disabled={isThinking || !input.trim()} aria-label="Send demo question" className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-xs font-mono transition-colors disabled:opacity-40"><Send className="w-3.5 h-3.5" /></button>
          </form>
        </>
      )}
    </GlassPanel>
  );
}
