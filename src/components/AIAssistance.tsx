"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "contact" | "location" | "availability";
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
  userProfile?: {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    role?: string;
    skills?: string[];
    experience?: string[];
  };
  contactInfo?: ContactInfo;
  availability?: AvailabilitySlot[];
  onContactRequest?: (message: string) => Promise<boolean>;
}

export function AIAssistance({
  userProfile,
  contactInfo,
  availability,
  onContactRequest,
}: AIAssistanceProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        content: `Hello! I'm your AI assistant. I can help you find and connect with ${userProfile?.name || "this person"}. I can provide their contact information, availability, skills, and help you send them a message. How can I help you today?`,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userProfile?.name]);

  // Simulate AI response
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    setIsTyping(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const message = userMessage.toLowerCase();
    let response = "";
    let type: "text" | "contact" | "location" | "availability" = "text";
    let metadata: any = undefined;

    // Contact information queries
    if (message.includes("contact") || message.includes("email") || 
        message.includes("phone") || message.includes("reach") ||
        message.includes("connect")) {
      type = "contact";
      response = `Here's how you can contact ${userProfile?.name || "them"}:`;
      metadata = contactInfo;
    }
    // Location queries
    else if (message.includes("location") || message.includes("where") ||
             message.includes("based") || message.includes("live")) {
      type = "location";
      response = `${userProfile?.name || "They"} are based in ${contactInfo?.location || "their profile location"}.`;
      metadata = { location: contactInfo?.location };
    }
    // Availability queries
    else if (message.includes("available") || message.includes("time") ||
             message.includes("schedule") || message.includes("meet")) {
      type = "availability";
      response = `${userProfile?.name || "They"} are available at these times:`;
      metadata = { availability: availability };
    }
    // Skills/experience queries
    else if (message.includes("skill") || message.includes("experience") ||
             message.includes("do") || message.includes("work")) {
      response = `${userProfile?.name || "They"} have experience in: ${userProfile?.skills?.join(", ") || "various areas"}. ${userProfile?.experience?.[0] || "They have professional experience in their field."}`;
    }
    // Bio/profile queries
    else if (message.includes("about") || message.includes("bio") ||
             message.includes("who") || message.includes("tell me")) {
      response = `${userProfile?.name || "They"} ${userProfile?.bio || "are a professional in their field."} ${userProfile?.role ? `They work as a ${userProfile?.role}.` : ""}`;
    }
    // Direct message request
    else if (message.includes("message") || message.includes("send") ||
             message.includes("hello") || message.includes("hi") ||
             message.includes("greeting")) {
      response = `I can help you send a message to ${userProfile?.name || "them"}. What would you like to say?`;
    }
    // Default response
    else {
      const responses = [
        `I can help you find information about ${userProfile?.name || "this person"}. You can ask about their contact details, availability, skills, or send them a message.`,
        `What would you like to know about ${userProfile?.name || "them"}? I can provide contact information, availability, or help you send a message.`,
        `I'm here to help you connect with ${userProfile?.name || "this person"}. Try asking about their contact details, skills, or availability!`,
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    setIsTyping(false);
    return {
      id: Date.now().toString(),
      content: response,
      sender: "ai",
      timestamp: new Date(),
      type,
      metadata,
    };
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

    // Generate AI response
    const aiResponse = await generateAIResponse(input);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleContactRequest = async () => {
    if (!input.trim() || !onContactRequest) return;

    const success = await onContactRequest(input);
    
    const resultMessage: Message = {
      id: Date.now().toString(),
      content: success 
        ? "Your message has been sent successfully!"
        : "Sorry, I couldn't send your message. Please try again later.",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    };

    setMessages(prev => [...prev, resultMessage]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showContactInfo && onContactRequest) {
        handleContactRequest();
      } else {
        handleSendMessage();
      }
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tracking Toggle */}
      <div className="mb-3 flex items-center gap-2 bg-slate-800/90 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/50 shadow-lg">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isTrackingEnabled ? "bg-green-500 animate-pulse" : "bg-slate-600"}`} />
          <span className="text-sm text-slate-400">Tracking</span>
        </div>
        <Switch
          checked={isTrackingEnabled}
          onCheckedChange={setIsTrackingEnabled}
          className="scale-75"
        />
      </div>

      {/* AI Assistant Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-110"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="bg-slate-900 border-slate-700 max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-30"></div>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-white">AI Assistant</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Helping you connect with {userProfile?.name || "this person"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Profile Preview */}
          {userProfile && (
            <>
              <Separator className="bg-slate-800" />
              <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-lg">
                <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-white font-medium">{userProfile.name}</p>
                  <p className="text-sm text-slate-400">{userProfile.role || "Professional"}</p>
                </div>
                {isTrackingEnabled && (
                  <Badge className="bg-green-500/20 text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                    Online
                  </Badge>
                )}
              </div>
            </>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowContactInfo(!showContactInfo)}
              className="text-xs border-slate-700 text-slate-400 hover:text-white"
            >
              <Mail className="h-3 w-3 mr-1" />
              Contact
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAvailability(!showAvailability)}
              className="text-xs border-slate-700 text-slate-400 hover:text-white"
            >
              <Clock className="h-3 w-3 mr-1" />
              Available
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInput("Tell me about their skills and experience");
                handleSendMessage();
              }}
              className="text-xs border-slate-700 text-slate-400 hover:text-white"
            >
              <Search className="h-3 w-3 mr-1" />
              Skills
            </Button>
          </div>

          {/* Contact Info Dropdown */}
          {showContactInfo && contactInfo && (
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-medium text-white mb-3">Contact Information</h4>
                <div className="space-y-2">
                  {contactInfo.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Mail className="h-4 w-4 text-purple-400" />
                      <span>{contactInfo.email}</span>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Phone className="h-4 w-4 text-purple-400" />
                      <span>{contactInfo.phone}</span>
                    </div>
                  )}
                  {contactInfo.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <MapPin className="h-4 w-4 text-purple-400" />
                      <span>{contactInfo.location}</span>
                    </div>
                  )}
                  {contactInfo.website && (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Globe className="h-4 w-4 text-purple-400" />
                      <span>{contactInfo.website}</span>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    {contactInfo.linkedin && (
                      <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {contactInfo.github && (
                      <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {contactInfo.twitter && (
                      <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Availability Dropdown */}
          {showAvailability && availability && availability.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-medium text-white mb-3">Availability</h4>
                <div className="space-y-2">
                  {availability.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{slot.day}</span>
                      <span className="text-purple-400">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </span>
                      <span className="text-slate-500 text-xs">{slot.timezone}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-900/50 rounded-lg max-h-64">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === "user"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-slate-800 text-slate-300"
                    }`}
                >
                  {message.sender === "ai" && (
                    <Bot className="h-3 w-3 inline-block mr-1 mb-1" />
                  )}
                  {message.sender === "user" && (
                    <User className="h-3 w-3 inline-block mr-1 mb-1" />
                  )}
                  <span className="text-sm">{message.content}</span>
                  
                  {/* Contact Info Display */}
                  {message.type === "contact" && message.metadata && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      {message.metadata.email && (
                        <div className="text-xs text-slate-400 mb-1">
                          <Mail className="h-3 w-3 inline mr-1" />
                          {message.metadata.email}
                        </div>
                      )}
                      {message.metadata.phone && (
                        <div className="text-xs text-slate-400 mb-1">
                          <Phone className="h-3 w-3 inline mr-1" />
                          {message.metadata.phone}
                        </div>
                      )}
                      {message.metadata.location && (
                        <div className="text-xs text-slate-400">
                          <MapPin className="h-3 w-3 inline mr-1" />
                          {message.metadata.location}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Availability Display */}
                  {message.type === "availability" && message.metadata?.availability && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      {message.metadata.availability.map((slot: AvailabilitySlot, index: number) => (
                        <div key={index} className="text-xs text-slate-400 mb-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {slot.day}: {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="pt-3">
            <Separator className="bg-slate-800 mb-3" />
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={showContactInfo ? "Type your message..." : "Ask about contact, availability, or skills..."}
                className="bg-slate-800 border-slate-700 text-white"
              />
              <Button
                size="icon"
                onClick={showContactInfo && onContactRequest ? handleContactRequest : handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Example usage component for profile page
export function ProfileAIAssistance() {
  const { user } = useAuth();

  const contactInfo = {
    email: user?.email || "",
    location: "Remote / Available Worldwide",
    website: "https://portfolio.example.com",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  };

  const availability = [
    { day: "Monday", startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    { day: "Tuesday", startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    { day: "Wednesday", startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    { day: "Thursday", startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    { day: "Friday", startTime: "09:00", endTime: "15:00", timezone: "UTC" }
  ];

  const handleContactRequest = async (message: string): Promise<boolean> => {
    // Simulate sending contact request
    console.log("Contact request sent:", message);
    return true;
  };

  if (!user) return null;

  return (
    <AIAssistance
      userProfile={{
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        role: user.role,
        skills: ["Full-Stack Development", "React", "Node.js", "TypeScript"],
        experience: ["5+ years of professional experience", "Led multiple successful projects"],
      }}
      contactInfo={contactInfo}
      availability={availability}
      onContactRequest={handleContactRequest}
    />
  );
}

// Simplified version for visitor use
export function VisitorAIAssistance({ profileData }: { profileData?: any }) {
  return (
    <AIAssistance
      userProfile={profileData}
      contactInfo={{
        email: profileData?.email || "",
        location: profileData?.location || "",
      }}
    />
  );
}