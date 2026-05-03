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
    <div
      className="min-h-screen bg-[#080b12]"
      style={{
        fontFamily:
          "'Noto Sans', 'Roboto', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-400" />
            <span className="text-[10px] sm:text-xs font-medium text-purple-300">
              Get in Touch
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            Contact{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5">
            <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl overflow-hidden">
              <CardHeader className="pb-3 pt-4 sm:pt-5 px-4 sm:px-5">
                <CardTitle className="text-sm sm:text-base md:text-lg font-black text-white flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pb-4 sm:pb-5 px-4 sm:px-5">
                <div className="flex items-start gap-3 p-2 rounded-lg transition-all hover:bg-slate-700/30">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm">
                      Email
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 break-all">
                      ndzelenromarick@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 rounded-lg transition-all hover:bg-slate-700/30">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm">
                      Phone
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400">
                      +237 676 15 42 53
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 rounded-lg transition-all hover:bg-slate-700/30">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm">
                      Location
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400">
                      Cameroon (Remote)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
                  <span className="text-[10px] sm:text-xs font-semibold text-white">
                    Response Time
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-400 leading-relaxed">
                  I typically respond within 24 hours. Looking forward to
                  hearing from you!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl overflow-hidden">
              <CardHeader className="pb-3 pt-4 sm:pt-5 px-4 sm:px-5">
                <CardTitle className="text-sm sm:text-base md:text-lg font-black text-white flex items-center gap-2">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-[11px] sm:text-sm text-slate-400">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 sm:pb-5 px-4 sm:px-5">
                {isSuccess && (
                  <div className="mb-4 p-2.5 sm:p-3 rounded-xl bg-green-500/10 border border-green-500/20 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
                      <span className="text-[11px] sm:text-sm text-green-400">
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-2.5 sm:p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400" />
                      <span className="text-[11px] sm:text-sm text-red-400">
                        {error}
                      </span>
                    </div>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-[10px] sm:text-xs text-slate-300 font-semibold"
                      >
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500 text-xs sm:text-sm h-8 sm:h-9 rounded-lg"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-[10px] sm:text-xs text-slate-300 font-semibold"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500 text-xs sm:text-sm h-8 sm:h-9 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="subject"
                      className="text-[10px] sm:text-xs text-slate-300 font-semibold"
                    >
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500 text-xs sm:text-sm h-8 sm:h-9 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-[10px] sm:text-xs text-slate-300 font-semibold"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, ideas, or questions..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500 text-xs sm:text-sm rounded-lg resize-none"
                    />
                    <p className="text-[8px] sm:text-[10px] text-slate-500 text-right">
                      {formData.message.length}/5000 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs sm:text-sm h-9 sm:h-10 font-semibold rounded-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-[8px] sm:text-[10px] text-slate-500 pt-2">
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
