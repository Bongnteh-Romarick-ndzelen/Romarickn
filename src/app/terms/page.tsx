"use client";

import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Shield, Gavel, Users, Code, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function TermsPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 -ml-2 text-slate-600 hover:text-blue-600 text-sm font-bold"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/80 border-2 border-blue-200 backdrop-blur-sm mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="text-base font-black text-blue-700 uppercase tracking-wide">
              Terms of Service
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Service
            </span>
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-3 max-w-2xl">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              Introduction
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed">
              Welcome to Bongnteh Romarick's portfolio website. By using this website, 
              you agree to comply with and be bound by the following terms and conditions. 
              Please read these Terms of Service carefully before using our website.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              Acceptance of Terms
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          {/* Use of Website */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Code className="h-6 w-6 text-indigo-600" />
              Use of Website
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Permitted Use</h3>
                <ul className="mt-2 space-y-1.5 text-base text-slate-600 font-semibold list-disc pl-5">
                  <li>Viewing and reading content for personal, non-commercial use</li>
                  <li>Engaging with interactive features (comments, likes, shares)</li>
                  <li>Subscribing to newsletters and updates</li>
                  <li>Contacting us for legitimate inquiries</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Prohibited Use</h3>
                <ul className="mt-2 space-y-1.5 text-base text-slate-600 font-semibold list-disc pl-5">
                  <li>Unauthorized copying or distribution of content</li>
                  <li>Harassment, abuse, or harmful behavior toward others</li>
                  <li>Attempting to breach security measures</li>
                  <li>Using the website for illegal or malicious purposes</li>
                  <li>Interfering with the website's functionality</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-600" />
              User Accounts
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed mb-3">
              When you create an account on our website, you agree to:
            </p>
            <ul className="space-y-2 text-base text-slate-600 font-semibold list-disc pl-5">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Accept that we may suspend or terminate accounts that violate these terms</li>
            </ul>
          </section>

          {/* Content and Intellectual Property */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="h-6 w-6 text-amber-600" />
              Content and Intellectual Property
            </h2>
            <div className="space-y-3">
              <p className="text-base text-slate-700 font-semibold leading-relaxed">
                All content on this website, including text, images, code, and design elements, 
                is the property of Bongnteh Romarick unless otherwise stated.
              </p>
              <ul className="space-y-2 text-base text-slate-600 font-semibold list-disc pl-5">
                <li>You may share content with proper attribution</li>
                <li>You may not use content for commercial purposes without permission</li>
                <li>User-generated content remains the property of the user but grants us license to display it</li>
                <li>Third-party content used under license or fair use</li>
              </ul>
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-amber-600" />
              Disclaimer of Warranties
            </h2>
            <div className="space-y-3">
              <p className="text-base text-slate-700 font-semibold leading-relaxed">
                This website is provided "as is" without any warranties of any kind, either express or implied.
              </p>
              <ul className="space-y-2 text-base text-slate-600 font-semibold list-disc pl-5">
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>Content is for informational purposes only</li>
                <li>We are not responsible for third-party content or links</li>
                <li>Use the website at your own risk</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Gavel className="h-6 w-6 text-rose-600" />
              Limitation of Liability
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed">
              To the fullest extent permitted by law, Bongnteh Romarick shall not be liable for:
            </p>
            <ul className="mt-3 space-y-2 text-base text-slate-600 font-semibold list-disc pl-5">
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Damages arising from the use or inability to use the website</li>
              <li>Third-party content, products, or services</li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="h-6 w-6 text-teal-600" />
              Changes to Terms
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed">
              We reserve the right to update these Terms of Service at any time. 
              Changes will be effective immediately upon posting. Your continued use of 
              the website constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              Contact Us
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-lg font-bold text-blue-600 mt-2">
              ndzelenromarick@gmail.com
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}