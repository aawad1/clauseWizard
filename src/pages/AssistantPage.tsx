import React, { useState, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
    role: 'assistant' | 'user';
    content: string;
}

const AssistantPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };
    //
    // useEffect(() => {
    //     if (messages.length > 0) {
    //         scrollToBottom();
    //     }
    // }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/check_legality', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: userMessage }),
            });
            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response || 'Nisam mogao pronaći odgovor na vaše pitanje.'
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Greška pri dohvaćanju odgovora. Pokušajte ponovo.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <div className="flex items-center space-x-3 text-white">
                        <Bot className="h-8 w-8" />
                        <div>
                            <h1 className="text-2xl font-bold">ClauseWizard Asistent</h1>
                            <p className="text-blue-100">Postavite pitanje o ugovorima i pravnim temama</p>
                        </div>
                    </div>
                </div>

                {/* CHAT */}
                <div className="h-[500px] sm:h-[70vh] flex flex-col overflow-hidden">
                    {/* Scrollable messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-8">
                                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p className="text-lg font-medium">Kako vam mogu pomoći?</p>
                                <p className="text-sm">Postavite pitanje o ugovorima, zakonima ili pravnim procedurama.</p>
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-start space-x-3 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex-shrink-0 bg-blue-600 rounded-lg p-2">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                                        message.role === 'assistant' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'
                                    }`}
                                >
                                    {message.content}
                                </div>
                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 bg-blue-700 rounded-lg p-2">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 bg-blue-600 rounded-lg p-2">
                                    <Bot className="h-5 w-5 text-white" />
                                </div>
                                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* INPUT */}
                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Postavite pitanje..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isLoading}
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className={`px-4 py-2 rounded-xl flex items-center justify-center transition-colors ${
                                    isLoading || !input.trim()
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssistantPage;
