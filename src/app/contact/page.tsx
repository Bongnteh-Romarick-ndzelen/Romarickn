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
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactService } from "@/lib/services/contact.service";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const { toast } = useToast();
  const [error, setError] = useState("");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
        toast({
          variant: 'success',
          title: 'Success',
          description: "Your Message has been sent successfully. Will get back to you soon.",
        });
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Close form after 3 seconds
        setTimeout(() => {
          setFormVisible(false);
        }, 3000);
        
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
          toast({
          variant: 'destructive',
          title: 'Error',
          description: "Your Message has not been sent. Please try again.",
        });
        setError(response.message || "Failed to send message");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormVisible(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSuccess(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        h1, h2, h3, h4, .font-heading {
          font-family: 'Radley', serif !important;
          font-weight: 700 !important;
        }
        p, span, div, a, button, label, .font-body {
          font-family: 'Lato', sans-serif !important;
        }
      `}</style>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/80 border-2 border-blue-200 backdrop-blur-sm mb-4">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <span className="text-base font-bold text-blue-700 uppercase tracking-wide">
              Get in Touch
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Me
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-bold mt-4">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="lg:col-span-1 space-y-6">
            <motion.div
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                variants={cardHover}
                className="bg-white border-2 border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                <CardHeader className="pb-4 pt-6 px-6">
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pb-6 px-6">
                  <motion.a 
                    href="mailto:ndzelenromarick@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border-2 border-slate-200/60 hover:border-blue-300 transition-all cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800">
                        Email
                      </h3>
                      <p className="text-base font-semibold text-slate-600 break-all">
                        ndzelenromarick@gmail.com
                      </p>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="tel:+237678196930"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border-2 border-slate-200/60 hover:border-indigo-300 transition-all cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800">
                        Call Me
                      </h3>
                      <p className="text-base font-semibold text-slate-600">
                        +237 678 196 930
                      </p>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="https://wa.me/237676154253"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border-2 border-slate-200/60 hover:border-green-300 transition-all cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800">
                        WhatsApp
                      </h3>
                      <p className="text-base font-semibold text-slate-600">
                        +237 676 154 253
                      </p>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="https://maps.google.com/?q=Bambili,Cameroon"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border-2 border-slate-200/60 hover:border-purple-300 transition-all cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800">
                        Location
                      </h3>
                      <p className="text-base font-semibold text-slate-600">
                        Bambili, Cameroon
                      </p>
                    </div>
                  </motion.a>
                </CardContent>
              </motion.div>
            </motion.div>

            <motion.div
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                variants={cardHover}
                className="bg-white border-2 border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <span className="text-base font-black text-slate-800">
                      Response Time
                    </span>
                  </div>
                  <p className="text-base text-slate-600 font-semibold leading-relaxed">
                    I typically respond within 24 hours. Looking forward to
                    hearing from you!
                  </p>
                </CardContent>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {formVisible ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                  >
                    <motion.div
                      variants={cardHover}
                      className="bg-white border-2 border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                    >
                      <CardHeader className="pb-4 pt-6 px-6">
                        <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                          <Send className="h-6 w-6 text-blue-600" />
                          Send a Message
                        </CardTitle>
                        <CardDescription className="text-base text-slate-600 font-semibold">
                          Fill out the form below and I'll get back to you as soon as
                          possible.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-6 px-6">
                        {error && (
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-5 p-4 rounded-xl bg-red-50 border-2 border-red-200"
                          >
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-red-600" />
                              <span className="text-base font-bold text-red-700">
                                {error}
                              </span>
                            </div>
                          </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-base font-bold text-slate-700">
                                Your Name *
                              </Label>
                              <Input
                                id="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="bg-white border-2 border-slate-200 focus:border-blue-400 text-slate-800 placeholder:text-slate-400 text-base h-12 rounded-xl font-semibold"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-base font-bold text-slate-700">
                                Email Address *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-white border-2 border-slate-200 focus:border-blue-400 text-slate-800 placeholder:text-slate-400 text-base h-12 rounded-xl font-semibold"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subject" className="text-base font-bold text-slate-700">
                              Subject *
                            </Label>
                            <Input
                              id="subject"
                              placeholder="What's this about?"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="bg-white border-2 border-slate-200 focus:border-blue-400 text-slate-800 placeholder:text-slate-400 text-base h-12 rounded-xl font-semibold"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message" className="text-base font-bold text-slate-700">
                              Message *
                            </Label>
                            <Textarea
                              id="message"
                              placeholder="Tell me about your project, ideas, or questions..."
                              rows={6}
                              value={formData.message}
                              onChange={handleChange}
                              required
                              className="bg-white border-2 border-slate-200 focus:border-blue-400 text-slate-800 placeholder:text-slate-400 text-base rounded-xl resize-none font-semibold"
                            />
                            <p className="text-sm text-slate-500 font-semibold text-right">
                              {formData.message.length}/5000 characters
                            </p>
                          </div>

                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center gap-3">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Sending...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                <Send className="h-5 w-5" />
                                Send Message
                              </span>
                            )}
                          </motion.button>

                          <p className="text-center text-sm text-slate-500 font-semibold pt-2">
                            Your information will never be shared. I respect your
                            privacy.
                          </p>
                        </form>
                      </CardContent>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg shadow-green-100 p-8 text-center"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-green-50 border-2 border-green-200 mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-lg text-slate-600 font-semibold mb-6">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={handleResetForm}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}