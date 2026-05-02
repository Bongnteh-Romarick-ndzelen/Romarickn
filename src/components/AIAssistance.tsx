"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Send,
  Bot,
  User,
  Clock,
  Loader2,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Zap,
  Briefcase,
  X,
  Minimize2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIAssistance() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Romarick's profile data
  const profileData = {
    name: "Romarick",
    fullName: "Bongnteh Romarick Ndzelen",
    title: "Full-Stack Developer",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Next.js, Node.js, and cloud technologies. I love creating innovative solutions that make a difference.",
    avatar: "/romarick.jpeg",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "AWS",
      "GraphQL",
    ],
    experience: [
      "Senior Full-Stack Developer at Tech Solutions Inc. (2021-Present) - Led development of 10+ successful web applications",
      "Full-Stack Developer at Digital Innovations (2019-2021) - Built scalable e-commerce platforms",
      "Freelance Developer (2018-Present) - Worked with 20+ clients worldwide",
    ],
    education: ["B.S. in Computer Science - University of Buea"],
    contact: {
      email: "ndzelenromarick@gmail.com",
      phone: "+237 676 154 253",
      location: "Cameroon • Available Worldwide (Remote)",
    },
    socialLinks: {
      github: "https://github.com/bongnteh-romarick-ndzelen",
      linkedin: "https://linkedin.com/in/bongnteh-romarick-ndzelen",
      twitter: "https://twitter.com/BongntehNdzelen",
    },
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        content: `👋 Hey! I'm Romarick's AI assistant. Ask me about his skills, experience, or how to connect!`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    setIsTyping(true);

    const systemPrompt = `You are a friendly, professional AI assistant representing Romarick (full name: ${profileData.fullName}), a ${profileData.title}.

PERSONAL INFORMATION:
- Name: ${profileData.fullName} (goes by Romarick)
- Title: ${profileData.title}
- Bio: ${profileData.bio}
- Skills: ${profileData.skills.join(", ")}
- Experience: ${profileData.experience.join(". ")}
- Education: ${profileData.education.join(", ")}
- Location: ${profileData.contact.location}
- Email: ${profileData.contact.email}
- Phone: ${profileData.contact.phone}
${profileData.socialLinks.github ? `- GitHub: ${profileData.socialLinks.github}` : ""}
${profileData.socialLinks.linkedin ? `- LinkedIn: ${profileData.socialLinks.linkedin}` : ""}

GUIDELINES:
- Be conversational, warm, and enthusiastic like a real assistant
- Keep responses under 150 words
- Use emojis occasionally to be friendly
- If asked about contact, provide the email and encourage reaching out
- If asked about skills/experience, highlight key strengths and achievements
- If asked about location, mention he's based in Cameroon but works remotely worldwide
- Be honest about limitations - don't invent information
- Format responses with line breaks for readability
- Speak in first person as if you are Romarick's assistant
- Always be helpful and professional`;

    try {
      const response = await axios.post(
        "https://api.x.ai/v1/chat/completions",
        {
          model: "grok-4-1-fast",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_XAI_API_KEY}`,
          },
        },
      );

      return (
        response.data.choices[0]?.message?.content ||
        "Thanks for your interest! Could you rephrase that? I'd be happy to tell you more about Romarick's background and work."
      );
    } catch (error) {
      console.error("API error:", error);
      return "I'm having trouble connecting right now. Please try again in a moment, or feel free to reach out directly via the contact information provided.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiResponseContent = await generateAIResponse(input);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponseContent,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const quickQuestions = [
    {
      icon: Zap,
      text: "Skills",
      question: "What technologies and skills does Romarick specialize in?",
    },
    {
      icon: Briefcase,
      text: "Experience",
      question: "Can you tell me about Romarick's work experience?",
    },
    {
      icon: Mail,
      text: "Contact",
      question: "How can I contact Romarick for opportunities?",
    },
    {
      icon: Clock,
      text: "Availability",
      question: "Is Romarick available for freelance work or collaboration?",
    },
  ];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-110 group"
            >
              <div className="relative">
                <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px]"
          >
            <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700 shadow-2xl shadow-purple-500/20 rounded-2xl overflow-hidden">
              {/* Header - Reduced padding */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30"></div>
                      <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        Romarick's AI
                      </h3>
                      <p className="text-white/70 text-[10px] sm:text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        Grok AI
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Profile Preview - Reduced margin and padding */}
              <div className="mx-3 sm:mx-4 -mt-5 sm:-mt-6 mb-2 sm:mb-3 relative z-10">
                <div className="bg-slate-800/90 backdrop-blur rounded-xl p-2.5 sm:p-3 border border-slate-700 shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-purple-500/50">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs sm:text-sm">
                        {getInitials(profileData.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-xs sm:text-sm truncate">
                        {profileData.name}
                      </p>
                      <p className="text-slate-400 text-[10px] sm:text-xs truncate">
                        {profileData.title}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {profileData.socialLinks.github && (
                        <a
                          href={profileData.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 hover:text-white" />
                        </a>
                      )}
                      {profileData.socialLinks.linkedin && (
                        <a
                          href={profileData.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Linkedin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 hover:text-blue-400" />
                        </a>
                      )}
                      {profileData.socialLinks.twitter && (
                        <a
                          href={profileData.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Twitter className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 hover:text-sky-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Questions - Reduced padding */}
              <div className="px-3 py-1.5 sm:px-4 sm:py-2">
                <p className="text-[10px] sm:text-xs text-slate-400 mb-1.5 sm:mb-2 flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-400" />
                  Try asking
                </p>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {quickQuestions.map((q, idx) => {
                    const Icon = q.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(q.question)}
                        className="group flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 transition-all hover:scale-[1.02]"
                      >
                        <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-400" />
                        <span className="text-[10px] sm:text-xs font-medium">
                          {q.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Messages - Reduced height for mobile */}
              <div className="h-[280px] sm:h-[250px] overflow-y-auto px-3 py-2 sm:px-4 sm:py-3 space-y-2 sm:space-y-3 custom-scrollbar">
                {messages.map((message, idx) => (
                  <motion.div
                    key={message.id}
                    initial={{
                      opacity: 0,
                      x: message.sender === "user" ? 20 : -20,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] ${message.sender === "user" ? "order-2" : "order-1"}`}
                    >
                      {message.sender === "ai" && (
                        <div className="flex items-center gap-1.5 mb-1 ml-1">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Bot className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                          </div>
                          <span className="text-[8px] sm:text-[10px] text-slate-500 font-medium">
                            Assistant
                          </span>
                        </div>
                      )}
                      <div
                        className={`px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm"
                            : "bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="flex items-center gap-1.5 mt-1 mr-1 justify-end">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-700 flex items-center justify-center">
                            <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-800 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex space-x-1">
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Reduced padding */}
              <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/50">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Ask me..."
                      className="w-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      disabled={isTyping}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                  >
                    {isTyping ? (
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    ) : (
                      <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-[8px] sm:text-[9px] text-slate-600 text-center mt-1.5 sm:mt-2">
                  AI responses by Grok • Ask about Romarick
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 2px;
          }
        }
      `}</style>
    </>
  );
}
