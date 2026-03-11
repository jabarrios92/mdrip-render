import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Image as ImageIcon, Loader2, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: 'user' | 'model';
  text?: string;
  imageUrl?: string;
  isGenerating?: boolean;
};

const ASPECT_RATIOS = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hello! I am your AI assistant. How can I help you today? I can answer questions or generate images for you.' }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<'chat' | 'image'>('chat');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    if (mode === 'chat') {
      const modelMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '', isGenerating: true }]);

      try {
        const chat = ai.chats.create({
          model: 'gemini-3.1-pro-preview',
          config: {
            systemInstruction: 'You are a helpful AI assistant for MDrip, a premium IV therapy service in Medellín.',
          }
        });

        // Add previous context (simplified)
        for (const msg of messages.filter(m => m.text && !m.isGenerating)) {
          if (msg.role === 'user') {
            await chat.sendMessage({ message: msg.text! });
          }
        }

        const responseStream = await chat.sendMessageStream({ message: userMessage.text! });
        
        let fullText = '';
        for await (const chunk of responseStream) {
          fullText += chunk.text;
          setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: fullText } : m));
        }
        
        setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, isGenerating: false } : m));
      } catch (error) {
        console.error('Chat error:', error);
        setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: 'Sorry, I encountered an error.', isGenerating: false } : m));
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Image Generation
      const modelMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: `Generating image with aspect ratio ${aspectRatio}...`, isGenerating: true }]);

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [{ text: userMessage.text! }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio,
            }
          }
        });

        let imageUrl = '';
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }

        if (imageUrl) {
          setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: undefined, imageUrl, isGenerating: false } : m));
        } else {
          setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: 'Failed to generate image.', isGenerating: false } : m));
        }
      } catch (error) {
        console.error('Image generation error:', error);
        setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: 'Sorry, I encountered an error generating the image.', isGenerating: false } : m));
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black rounded-full shadow-2xl flex items-center justify-center z-50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[380px] h-[600px] max-h-[80vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00ffff]/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-[#00ffff]" />
                </div>
                <h3 className="font-bold text-white">AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-[#008080] text-white' : 'bg-white/10 text-white/90'}`}>
                    {msg.imageUrl ? (
                      <img src={msg.imageUrl} alt="Generated" className="rounded-lg w-full h-auto" />
                    ) : (
                      <div className="markdown-body text-sm">
                        <Markdown>{msg.text || ''}</Markdown>
                      </div>
                    )}
                    {msg.isGenerating && !msg.imageUrl && (
                      <span className="inline-block w-2 h-2 bg-[#00ffff] rounded-full animate-pulse mt-2" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setMode('chat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${mode === 'chat' ? 'bg-[#00ffff]/20 text-[#00ffff]' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat
                </button>
                <button
                  onClick={() => setMode('image')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${mode === 'image' ? 'bg-[#00ffff]/20 text-[#00ffff]' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Image
                </button>
                
                {mode === 'image' && (
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="ml-auto bg-black/50 border border-white/20 rounded-lg text-xs text-white px-2 py-1.5 outline-none focus:border-[#00ffff]"
                  >
                    {ASPECT_RATIOS.map(ratio => (
                      <option key={ratio} value={ratio}>{ratio}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={mode === 'chat' ? "Ask me anything..." : "Describe an image to generate..."}
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ffff]/50 transition-colors"
                  disabled={isGenerating}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  className="w-10 h-10 rounded-xl bg-[#008080] hover:bg-[#00ffff] text-white hover:text-black flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-[#008080] disabled:hover:text-white"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
