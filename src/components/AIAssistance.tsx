"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  MapPin,
  Code2,
  GraduationCap,
  Award,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export function AIAssistance() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState<GroqMessage[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Complete profile data based on the experience page
  const profileData = {
    name: "Romarick",
    fullName: "Bongnteh Romarick Ndzelen",
    title: "Full-Stack Developer",
    bio: "Passionate full-stack developer with experience building scalable web applications. Specialized in React, Next.js, Node.js, Django, and cloud technologies. Currently pursuing Software Engineering at University of Bamenda.",
    avatar: "/romarick.jpeg",
    skills: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "JavaScript", "HTML/CSS", "Bootstrap"],
      backend: ["Node.js", "Express", "Django", "Python", "PHP Laravel", "GraphQL", "REST APIs"],
      database: ["MongoDB", "PostgreSQL", "Prisma", "MySQL"],
      devops: ["Docker", "AWS", "CI/CD", "Git", "Cloudinary"],
    },
    workExperience: [
      {
        role: "Full-Stack Developer",
        company: "TiC Foundation",
        location: "Remote",
        period: "March 2025 - September 2025",
        highlights: [
          "Built an all-in-one online course management platform with mentorship and internship tracking",
          "Used Next.js, Node.js, MongoDB, PostgreSQL, and Prisma",
          "Developed 15+ features and collaborated with team members",
        ],
      },
      {
        role: "Full-Stack Developer",
        company: "Suscam",
        location: "Remote",
        period: "January 2024 - March 2024",
        highlights: [
          "Worked on online course management and cybersecurity startup",
          "Implemented secure authentication with Next.js and Node.js",
          "Integrated Cloudinary for media management",
        ],
      },
      {
        role: "Intern Developer",
        company: "A&T Humanitarian Legacy",
        location: "Douala, Cameroon",
        period: "June 2023 - August 2023",
        highlights: [
          "Built web applications using Django and Bootstrap",
          "Worked with PHP Laravel for backend services",
          "Completed 3+ successful projects during internship",
        ],
      },
      {
        role: "Microsoft Office Certification Student",
        company: "Giddis Computer Training Center",
        location: "Yaounde, Cameroon",
        period: "2020",
        highlights: [
          "Gained proficiency in Excel (advanced formulas, pivot tables)",
          "Mastered Word, PowerPoint, and Publisher",
          "Earned Microsoft Office certification",
        ],
      },
    ],
    education: [
      {
        degree: "BEng in Software Engineering",
        school: "University of Bamenda / NAHPI",
        location: "Bamenda, Cameroon",
        period: "2022 - Present",
        highlights: [
          "Mastered MERN stack and Next.js",
          "Built projects with Django and Python",
          "Gained expertise in TypeScript and Prisma",
        ],
      },
      {
        degree: "GCE Advanced Level",
        school: "GHS Buea",
        location: "Buea, Cameroon",
        period: "2020 - 2021",
        highlights: ["Passed 5 subjects including Mathematics and Sciences"],
      },
      {
        degree: "Secondary Education",
        school: "GBHS Tatum",
        location: "Tatum, Cameroon",
        period: "2016 - 2017",
        highlights: ["Persevered through Anglophone Crisis disruption"],
      },
      {
        degree: "GCE Ordinary Level",
        school: "GHS Nseh",
        location: "Nseh, Cameroon",
        period: "2010 - 2015",
        highlights: ["Earned O-Level Certificate", "Built foundation for advanced studies"],
      },
    ],
    notableProjects: [
      "Built an all-in-one online course management platform with mentorship and internship tracking",
      "Developed a real-time collaborative platform using WebSockets and React",
      "Created an e-learning management system used by multiple universities",
      "Built portfolio website with AI chatbot assistant",
    ],
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
    availability: "Available for freelance, contract, and full-time remote opportunities",
    languages: ["English (Fluent)", "French (Conversational)"],
    softSkills: ["Team leadership", "Problem-solving", "Agile/Scrum", "Client communication", "Resilience", "Adaptability"],
  };

  const systemPrompt = `You are an intelligent, friendly, and professional AI assistant for Romarick (${profileData.fullName}), a ${profileData.title} based in Cameroon.

YOUR ROLE: You represent Romarick's personal portfolio assistant. Be warm, knowledgeable, and genuinely helpful.

=== FULL PROFILE ===

NAME: ${profileData.fullName} (goes by Romarick)
TITLE: ${profileData.title}
BIO: ${profileData.bio}

TECHNICAL SKILLS:
- Frontend: ${profileData.skills.frontend.join(", ")}
- Backend: ${profileData.skills.backend.join(", ")}
- Databases: ${profileData.skills.database.join(", ")}
- DevOps: ${profileData.skills.devops.join(", ")}

WORK EXPERIENCE:
${profileData.workExperience.map((e) => `• ${e.role} @ ${e.company} (${e.period})\n  Location: ${e.location}\n  - ${e.highlights.join("\n  - ")}`).join("\n\n")}

EDUCATION:
${profileData.education.map((e) => `• ${e.degree} — ${e.school}\n  Period: ${e.period}\n  Location: ${e.location}\n  - ${e.highlights.join("\n  - ")}`).join("\n\n")}

RESILIENCE NOTE: Romarick's education at GBHS Tatum was disrupted by the Anglophone Crisis (2016-2017), yet he persevered and continued his studies, demonstrating remarkable resilience and determination.

NOTABLE PROJECTS:
${profileData.notableProjects.map((p) => `• ${p}`).join("\n")}

CONTACT:
- Email: ${profileData.contact.email}
- Phone: ${profileData.contact.phone}
- Location: ${profileData.contact.location}

SOCIAL:
- GitHub: ${profileData.socialLinks.github}
- LinkedIn: ${profileData.socialLinks.linkedin}
- Twitter: ${profileData.socialLinks.twitter}

AVAILABILITY: ${profileData.availability}
LANGUAGES: ${profileData.languages.join(", ")}
SOFT SKILLS: ${profileData.softSkills.join(", ")}

=== BEHAVIOR RULES ===
1. MEMORY: You have full conversation history. Reference prior messages naturally — never ask something already answered.
2. INTELLIGENCE: Give specific, detailed answers. If asked about a skill, explain HOW Romarick uses it in real projects.
3. TONE: Warm, professional, enthusiastic. Use emojis sparingly (1–2 per response max).
4. LENGTH: Keep responses concise (under 130 words) unless a detailed answer is clearly needed.
5. HONESTY: If something isn't in the profile, say so rather than inventing details.
6. PROACTIVITY: Occasionally suggest a related topic the visitor might find interesting.
7. HIRING PITCH: If someone seems interested in hiring, highlight Romarick's strengths and encourage reaching out at ${profileData.contact.email}.
8. FORMAT: Use short paragraphs and line breaks. Use bullet points only when listing 3+ items.
9. PERSPECTIVE: Speak as Romarick's assistant, not as Romarick himself.
10. RESILIENCE: Mention Romarick's perseverance through the Anglophone Crisis when relevant.`;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        content: `👋 Hi! I'm Romarick's AI assistant.\n\nI can tell you about his skills, work experience, education, projects, or help you get in touch. What would you like to know?`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    setIsTyping(true);

    const updatedHistory: GroqMessage[] = [
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...updatedHistory,
          ],
          temperature: 0.75,
          max_tokens: 600,
          top_p: 0.9,
          frequency_penalty: 0.3,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          },
        },
      );

      const assistantReply =
        response.data.choices[0]?.message?.content ||
        "Thanks for your question! Could you rephrase that? I'd love to help.";

      setConversationHistory([
        ...updatedHistory,
        { role: "assistant", content: assistantReply },
      ]);

      return assistantReply;
    } catch (error) {
      console.error("Groq API error:", error);
      return "I'm having a little trouble connecting right now. Please try again, or reach out to Romarick directly at ndzelenromarick@gmail.com 📧";
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiResponseContent = await generateAIResponse(text);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponseContent,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleSendMessage = () => sendMessage(input);
  const handleQuickQuestion = (question: string) => sendMessage(question);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const quickQuestions = [
    {
      icon: Zap,
      text: "Skills",
      question: "What are Romarick's main technical skills?",
    },
    {
      icon: Briefcase,
      text: "Work Experience",
      question: "Tell me about Romarick's work experience.",
    },
    {
      icon: GraduationCap,
      text: "Education",
      question: "What is Romarick's educational background?",
    },
    {
      icon: Code2,
      text: "Projects",
      question: "What notable projects has Romarick built?",
    },
    {
      icon: Award,
      text: "Resilience",
      question: "How did Romarick overcome the Anglophone Crisis?",
    },
    {
      icon: Mail,
      text: "Hire him",
      question: "I'd like to hire Romarick. How can I contact him?",
    },
  ];

  const socialButtons = [
    {
      label: "GitHub",
      icon: Github,
      href: profileData.socialLinks.github,
      hoverBg: "hover:bg-slate-600",
      hoverText: "hover:text-white",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: profileData.socialLinks.linkedin,
      hoverBg: "hover:bg-blue-600",
      hoverText: "hover:text-white",
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: profileData.socialLinks.twitter,
      hoverBg: "hover:bg-sky-500",
      hoverText: "hover:text-white",
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:${profileData.contact.email}`,
      hoverBg: "hover:bg-purple-600",
      hoverText: "hover:text-white",
    },
  ];

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-7 right-4 sm:bottom-8 sm:right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-110"
            >
              <div className="relative">
                <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px]"
          >
            <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700 shadow-2xl shadow-purple-500/20 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30" />
                      <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        Romarick's AI Assistant
                      </h3>
                      <p className="text-white/70 text-[10px] sm:text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                        Online · LLaMA 3.3 70B via Groq
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

              {/* Quick questions - 2x3 grid */}
              <div className="px-3 py-1.5 sm:px-4 sm:py-2">
                <p className="text-[10px] sm:text-xs text-slate-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-400" />
                  Quick questions
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {quickQuestions.map((q, idx) => {
                    const Icon = q.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(q.question)}
                        disabled={isTyping}
                        className="flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 hover:border-purple-500/50 rounded-xl text-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-400 shrink-0" />
                        <span className="text-[10px] sm:text-xs font-medium truncate">
                          {q.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Messages */}
              <div className="h-[280px] sm:h-[260px] overflow-y-auto px-3 py-2 sm:px-4 sm:py-3 space-y-2 sm:space-y-3 custom-scrollbar">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[88%]">
                      {message.sender === "ai" && (
                        <div className="flex items-center gap-1.5 mb-1 ml-1">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Bot className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                          </div>
                          <span className="text-[8px] sm:text-[10px] text-slate-500 font-medium">
                            AI Assistant
                          </span>
                        </div>
                      )}
                      <div
                        className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm"
                            : "bg-slate-800 border border-slate-700/80 text-slate-200 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="flex items-center justify-end mt-1 mr-1">
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-800 border border-slate-700/80 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                      <div className="flex space-x-1 items-center">
                        {[0, 150, 300].map((delay) => (
                          <div
                            key={delay}
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${delay}ms` }}
                          />
                        ))}
                        <span className="text-[9px] text-slate-500 ml-1.5">
                          thinking...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Social Links */}
              <div className="px-3 py-1.5 border-t border-slate-800 bg-slate-900/30">
                <div className="flex items-center justify-center gap-2">
                  {socialButtons.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded-lg bg-slate-800/50 transition-colors ${social.hoverBg}`}
                    >
                      <social.icon className={`h-3.5 w-3.5 text-slate-400 ${social.hoverText}`} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Input area */}
              <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSendMessage()
                    }
                    placeholder="Ask me about Romarick's work, education, or skills..."
                    className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 transition-colors"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 shrink-0"
                  >
                    {isTyping ? (
                      <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-[8px] sm:text-[9px] text-slate-600 text-center mt-1.5">
                  Powered by Groq LLaMA 3.3 70B · About Romarick's journey
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
          background: rgba(139, 92, 246, 0.8);
        }
        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 2px;
          }
        }
      `}</style>
    </>
  );
}