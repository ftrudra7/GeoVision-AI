import React, { useState } from 'react';
import GlassPanel from '../common/GlassPanel';
import { Bot, User, Send, Sparkles, X, ChevronUp, ChevronDown } from 'lucide-react';

export default function AIAnalystPanel({ currentRegion = 'delhi ncr' }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'geospatial analyst initialized. ask any question regarding land use, temporal changes, vegetation canopy, or urban growth.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = userMsg.toLowerCase();
      if (lower.includes('change') || lower.includes('2020') || lower.includes('2024')) {
        reply = `analyzing temporal differential for ${currentRegion} between 2020 and 2024. sentinel-2 rasters indicate expansion in built-up density indices along arterial transit corridors. (demo prototype telemetry)`;
      } else if (lower.includes('vegetation') || lower.includes('tree') || lower.includes('ndvi')) {
        reply = `calculating ndvi (nir - red) / (nir + red) across ${currentRegion}. moderate canopy density detected across agricultural and riparian zones. (demo prototype telemetry)`;
      } else if (lower.includes('water') || lower.includes('flood') || lower.includes('river')) {
        reply = `evaluating modified normalized difference water index (mndwi). surface water reservoirs and wetland perimeters identified. (demo prototype telemetry)`;
      } else {
        reply = `query received: "${userMsg}". decomposing spatial extents and generating deterministic gis execution plan for ${currentRegion}. (demo prototype telemetry)`;
      }

      setMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <GlassPanel className="w-80 md:w-96 border border-white/10 shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-white/[0.08] bg-black/30">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs font-mono text-white lowercase">
            ai analyst assistant
          </span>
        </div>
        <button
          onClick={() => setMinimized(!minimized)}
          className="p-1 rounded hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors"
        >
          {minimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!minimized && (
        <>
          {/* Message List */}
          <div className="p-3.5 space-y-3 max-h-60 overflow-y-auto font-mono text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-2.5 rounded-xl max-w-[85%] lowercase leading-relaxed text-[11px] ${
                    m.sender === 'user'
                      ? 'bg-sky-500/20 border border-sky-400/30 text-sky-100 rounded-tr-none'
                      : 'bg-white/[0.03] border border-white/[0.08] text-gray-300 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-[11px] text-sky-400 font-mono">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>synthesizing spatial response...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-2.5 border-t border-white/[0.08] bg-black/20 flex gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ask geospatial question..."
              className="flex-1 px-3 py-1.5 rounded-lg glass-input text-xs font-mono text-white placeholder-gray-500 lowercase"
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-xs font-mono transition-colors disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </>
      )}
    </GlassPanel>
  );
}
