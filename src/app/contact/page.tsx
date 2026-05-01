"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-300">Let's Connect</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Get in <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mb-6 max-w-2xl mx-auto p-3 rounded-xl bg-green-500/10 border border-green-500/20 animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">Message sent successfully! I'll get back to you soon.</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 max-w-2xl mx-auto p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 justify-center">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-5">
            <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-5 px-5">
                <a 
                  href="mailto:ndzelenromarick@gmail.com" 
                  className="flex items-start gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-slate-700/30 group"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <Mail className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Email</h3>
                    <p className="text-xs text-slate-400">ndzelenromarick@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+237676154253" 
                  className="flex items-start gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-slate-700/30 group"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Phone</h3>
                    <p className="text-xs text-slate-400">+237 676 15 42 53</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-3 p-2">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <MapPin className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Location</h3>
                    <p className="text-xs text-slate-400">Cameroon (Remote)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links Card */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                  Connect with me
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 px-5">
                <div className="flex gap-3">
                  <Link href="https://github.com/bongnteh-romarick-ndzelen" target="_blank">
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-700 hover:border-purple-500 hover:text-purple-400">
                      <Github className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com/in/bongnteh-romarick-ndzelen-b2946023b" target="_blank">
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-700 hover:border-purple-500 hover:text-purple-400">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://x.com/BongntehNdzelen" target="_blank">
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-700 hover:border-purple-500 hover:text-purple-400">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Card */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-medium text-white">Response Time</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  I typically respond within 24 hours. Looking forward to hearing from you!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Send className="h-5 w-5 text-purple-400" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-5 px-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-slate-300">
                        Your Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500 text-sm h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-slate-300">
                        Email Address
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500 text-sm h-9"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-slate-300">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="What's this about?" 
                      required 
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500 text-sm h-9"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-slate-300">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell me about your project, ideas, or questions..." 
                      required 
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500 text-sm resize-none"
                    />
                    <p className="text-[10px] text-slate-500 text-right">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-center text-[10px] text-slate-500 pt-2">
                    Your information will never be shared. I respect your privacy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map/Additional Info Section */}
        <div className="mt-10">
          <Card className="bg-slate-800/30 border border-slate-700/50">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Quick Response</h3>
                    <p className="text-xs text-slate-400">I aim to respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <CheckCircle className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Free Consultation</h3>
                    <p className="text-xs text-slate-400">Initial consultation is always free</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <MessageSquare className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">No Spam</h3>
                    <p className="text-xs text-slate-400">Your email is safe with me</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}