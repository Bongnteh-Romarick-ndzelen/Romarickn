"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactService } from "@/lib/services/contact.service";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await contactService.submitContact(formData);

      if (response.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(response.message || "Failed to send message");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-300">
              Get in Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Contact{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-5">
            <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-5 px-5">
                <div className="flex items-start gap-3 p-2 rounded-lg transition-all hover:bg-slate-700/30">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Mail className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Email</h3>
                    <p className="text-xs text-slate-400">
                      ndzelenromarick@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 rounded-lg transition-all hover:bg-slate-700/30">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Phone className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Phone</h3>
                    <p className="text-xs text-slate-400">+237 676 15 42 53</p>
                  </div>
                </div>

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

            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-medium text-white">
                    Response Time
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  I typically respond within 24 hours. Looking forward to
                  hearing from you!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Send className="h-5 w-5 text-purple-400" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-5 px-5">
                {isSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400">
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-red-400">{error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs text-slate-300">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500 text-sm h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs text-slate-300">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500 text-sm h-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-xs text-slate-300">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500 text-sm h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs text-slate-300">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, ideas, or questions..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500 text-sm resize-none"
                    />
                    <p className="text-[10px] text-slate-500 text-right">
                      {formData.message.length}/5000 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
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
                    Your information will never be shared. I respect your
                    privacy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
