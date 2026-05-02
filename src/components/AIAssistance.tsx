'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Send,
  Bot,
  User,
  Clock,
  Loader2,
  Search,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Sparkles,
  MessageCircle,
  Calendar,
  Award,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "contact" | "location" | "availability" | "skills";
  metadata?: any;
}

interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  timezone: string;
}

interface AIAssistanceProps {
  profileData: {
    name: string;
    title: string;
    bio: string;
    avatar?: string;
    skills: string[];
    experience: string[];
    education?: string[];
    contact: ContactInfo;
    availability?: AvailabilitySlot[];
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
}

export function AIAssistance({ profileData }: AIAssistanceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        content: `👋 Hi there! I'm an AI assistant for ${profileData.name}. I can help you learn more about my skills, experience, how to contact me, and more. What would you like to know?`,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      };
      setMessages([welcomeMessage]);
      setShowQuickActions(true);
    }
  }, [isOpen, profileData.name]);

  // Generate AI response using Grok API
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    setIsTyping(true);
    setShowQuickActions(false);

    // Build system prompt with profile data
    const systemPrompt = `You are a helpful AI assistant representing ${profileData.name}, a ${profileData.title}. 
Your role is to help visitors learn about this person and facilitate communication.

PERSON'S INFORMATION:
- Name: ${profileData.name}
- Title/Role: ${profileData.title}
- Bio: ${profileData.bio}
- Skills: ${profileData.skills.join(", ")}
- Experience: ${profileData.experience.join(". ")}
- Education: ${profileData.education?.join(", ") || "Not specified"}
- Location: ${profileData.contact.location || "Not specified"}
- Email: ${profileData.contact.email}
- Phone: ${profileData.contact.phone || "Not publicly available"}
- Website: ${profileData.contact.website || "Not specified"}
- Availability: ${profileData.availability ? profileData.availability.length + " time slots available" : "Contact for availability"}

GUIDELINES:
- Be professional, friendly, and enthusiastic about the person's work
- Keep responses concise (under 150 words when possible)
- If asked about contact, provide email and encourage appropriate communication
- If asked about skills or experience, highlight key achievements
- If someone expresses interest in collaboration, be encouraging
- Be honest about what you don't know and offer to help with what you can
- Never share sensitive personal information beyond what's provided`;

    try {
      const response = await axios.post(
        "https://api.x.ai/v1/chat/completions",
        {
          model: "grok-beta",
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
        }
      );

      const aiResponse = response.data.choices[0]?.message?.content || 
        "I'm sorry, I couldn't process that request. Please try asking something else about my background or how to contact me.";

      // Determine message type based on content
      let type: "text" | "contact" | "location" | "availability" | "skills" = "text";
      const lowerContent = aiResponse.toLowerCase();
      
      if (lowerContent.includes("contact") || lowerContent.includes("email")) {
        type = "contact";
      } else if (lowerContent.includes("location") || lowerContent.includes("based")) {
        type = "location";
      } else if (lowerContent.includes("available") || lowerContent.includes("schedule")) {
        type = "availability";
      } else if (lowerContent.includes("skill") || lowerContent.includes("experience")) {
        type = "skills";
      }

      return {
        id: Date.now().toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        type,
        metadata: type === "contact" ? profileData.contact : 
                 type === "availability" ? { availability: profileData.availability } : 
                 type === "skills" ? { skills: profileData.skills, experience: profileData.experience } :
                 type === "location" ? { location: profileData.contact.location } : undefined,
      };
    } catch (error) {
      console.error("Grok API error:", error);
      
      // Fallback responses if API fails
      let fallbackResponse = "I'm having trouble connecting right now. Please try again in a moment or use the contact form to reach out directly.";
      
      const message = userMessage.toLowerCase();
      if (message.includes("contact") || message.includes("email")) {
        fallbackResponse = `You can reach ${profileData.name} at ${profileData.contact.email}. Feel free to send a message for any inquiries or collaboration opportunities!`;
      } else if (message.includes("skill") || message.includes("experience")) {
        fallbackResponse = `${profileData.name} specializes in: ${profileData.skills.slice(0, 4).join(", ")}${profileData.skills.length > 4 ? ", and more" : ""}. With experience in ${profileData.experience[0] || "the field"}.`;
      } else if (message.includes("about") || message.includes("bio")) {
        fallbackResponse = profileData.bio;
      } else if (message.includes("work") || message.includes("do")) {
        fallbackResponse = `As a ${profileData.title}, ${profileData.name} focuses on ${profileData.skills.slice(0, 3).join(", ")}.`;
      } else {
        fallbackResponse = `I'd love to help! You can ask me about ${profileData.name}'s skills, experience, how to contact them, or their background. What would you like to know?`;
      }
      
      return {
        id: Date.now().toString(),
        content: fallbackResponse,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      };
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setShowQuickActions(false);

    const aiResponse = await generateAIResponse(input);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
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
    { icon: Briefcase, text: "What do you do?", question: "What do you do professionally?" },
    { icon: Award, text: "Skills", question: "What are your main skills and expertise?" },
    { icon: Mail, text: "Contact", question: "How can I contact you?" },
    { icon: Calendar, text: "Availability", question: "When are you available for meetings?" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* AI Assistant Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md max-h-[85vh] flex flex-col p-0 gap-0 rounded-2xl">
          {/* Header */}
          <DialogHeader className="p-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-30"></div>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-white flex items-center gap-2">
                  <span>Chat with {profileData.name.split(' ')[0]}'s AI</span>
                  <Badge className="bg-purple-500/20 text-purple-300 text-[9px]">Powered by Grok</Badge>
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs">
                  Ask me anything about my background, skills, or how to connect
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Profile Mini Card */}
          <div className="flex items-center gap-3 p-3 mx-4 mt-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <Avatar className="h-12 w-12 border-2 border-purple-500/30">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                {getInitials(profileData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{profileData.name}</p>
              <p className="text-xs text-slate-400">{profileData.title}</p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-[10px]">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse" />
              Online
            </Badge>
          </div>

          {/* Quick Questions - Show only at start */}
          {showQuickActions && messages.length <= 2 && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-400 mb-2">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((q, idx) => {
                  const Icon = q.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q.question)}
                      className="flex items-center gap-2 px-3 py-2 text-xs bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 transition-all"
                    >
                      <Icon className="h-3.5 w-3.5 text-purple-400" />
                      {q.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-4 min-h-[300px] max-h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-slate-800 border border-slate-700 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {message.sender === "ai" && (
                      <Sparkles className="h-3 w-3 text-purple-400" />
                    )}
                    {message.sender === "user" && (
                      <User className="h-3 w-3" />
                    )}
                    <span className="text-[10px] opacity-70">
                      {message.sender === "ai" ? "AI Assistant" : "You"}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  
                  {/* Contact Info Display */}
                  {message.type === "contact" && message.metadata && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      {message.metadata.email && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                          <Mail className="h-3 w-3 text-purple-400" />
                          <span>{message.metadata.email}</span>
                        </div>
                      )}
                      {message.metadata.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Phone className="h-3 w-3 text-purple-400" />
                          <span>{message.metadata.phone}</span>
                        </div>
                      )}
                      <div className="flex gap-2 mt-2">
                        {profileData.socialLinks?.github && (
                          <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {profileData.socialLinks?.linkedin && (
                          <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                            <Linkedin className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {profileData.socialLinks?.twitter && (
                          <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 transition-colors">
                            <Twitter className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Location Display */}
                  {message.type === "location" && message.metadata?.location && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <MapPin className="h-3 w-3 text-purple-400" />
                        <span>{message.metadata.location}</span>
                      </div>
                    </div>
                  )}

                  {/* Skills Display */}
                  {message.type === "skills" && message.metadata?.skills && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      <div className="flex flex-wrap gap-1">
                        {message.metadata.skills.slice(0, 4).map((skill: string, idx: number) => (
                          <Badge key={idx} className="bg-purple-500/20 text-purple-300 text-[9px]">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Availability Display */}
                  {message.type === "availability" && message.metadata?.availability && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50 space-y-1">
                      {message.metadata.availability.slice(0, 3).map((slot: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Clock className="h-3 w-3 text-purple-400" />
                          <span>{slot.day}: {formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-[9px] text-slate-500 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 px-4 py-2 rounded-xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Contact CTA */}
          <div className="px-4 py-2 bg-slate-800/30 border-t border-slate-800">
            <p className="text-[10px] text-slate-500 text-center">
              Want to have a real conversation?{" "}
              <button 
                onClick={() => handleQuickQuestion("How can I contact you?")}
                className="text-purple-400 hover:text-purple-300"
              >
                Contact me directly →
              </button>
            </p>
          </div>

          {/* Input Area */}
          <div className="p-4 pt-2 border-t border-slate-800">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm h-9"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="h-9 w-9 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isTyping ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
            <p className="text-[9px] text-slate-500 text-center mt-2">
              AI responses are generated by Grok • 
              <button 
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="text-purple-400 hover:text-purple-300 ml-1"
              >
                {showQuickActions ? "Hide suggestions" : "Show suggestions"}
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Pre-configured instance for your profile
export function MyAIAssistance() {
  const profileData = {
    name: "Bongnteh Romarick",
    title: "Full-Stack Developer & Tech Innovator",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Next.js, Node.js, and cloud technologies. I love creating innovative solutions that make a difference.",
    avatar: "/romarick.jpeg",
    skills: [
      "React", "Next.js", "TypeScript", "Node.js", 
      "Express", "Python", "MongoDB", "PostgreSQL",
      "Tailwind CSS", "Docker", "AWS", "GraphQL"
    ],
    experience: [
      "Senior Full-Stack Developer at Tech Solutions Inc. (2021-Present)",
      "Led development of 10+ successful web applications",
      "Mentored junior developers and conducted code reviews",
      "Improved application performance by 40% through optimization"
    ],
    education: [
      "B.S. in Computer Science - State University"
    ],
    contact: {
      email: "ndzelenromarick@gmail.com",
      phone: "+237 676 154 253",
      location: "Cameroon (Remote / Worldwide)",
      website: "https://romarick.vercel.app",
    },
    availability: [
      { day: "Monday", startTime: "09:00", endTime: "17:00", timezone: "WAT" },
      { day: "Tuesday", startTime: "09:00", endTime: "17:00", timezone: "WAT" },
      { day: "Wednesday", startTime: "09:00", endTime: "17:00", timezone: "WAT" },
      { day: "Thursday", startTime: "09:00", endTime: "17:00", timezone: "WAT" },
      { day: "Friday", startTime: "09:00", endTime: "15:00", timezone: "WAT" }
    ],
    socialLinks: {
      github: "https://github.com/bongnteh-romarick-ndzelen",
      linkedin: "https://linkedin.com/in/bongnteh-romarick-ndzelen",
      twitter: "https://twitter.com/BongntehNdzelen"
    }
  };

  return <AIAssistance profileData={profileData} />;
}