"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie, Mail, UserCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-base font-black text-blue-700 uppercase tracking-wide">
              Privacy Policy
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Your Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Matters
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
              Bongnteh Romarick ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your personal information 
              when you visit our website and use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Database className="h-6 w-6 text-indigo-600" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <UserCheck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
                  <p className="text-base text-slate-600 font-semibold">
                    When you create an account, subscribe to our newsletter, or contact us, we may collect:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-base text-slate-600 font-semibold list-disc pl-5">
                    <li>Name and email address</li>
                    <li>Profile information (avatar, bio)</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Cookie className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Usage Data</h3>
                  <p className="text-base text-slate-600 font-semibold">
                    We automatically collect certain information when you visit our website:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-base text-slate-600 font-semibold list-disc pl-5">
                    <li>Pages visited and time spent</li>
                    <li>Browser type and device information</li>
                    <li>IP address and location data</li>
                    <li>Referring website and navigation paths</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Mail className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Communication Data</h3>
                  <p className="text-base text-slate-600 font-semibold">
                    Information you provide when contacting us:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-base text-slate-600 font-semibold list-disc pl-5">
                    <li>Email correspondence</li>
                    <li>Feedback and survey responses</li>
                    <li>Support requests and inquiries</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Eye className="h-6 w-6 text-teal-600" />
              How We Use Your Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Service Delivery</h3>
                <p className="text-base text-slate-600 font-semibold">
                  To provide and maintain our services, including:
                </p>
                <ul className="mt-2 space-y-1 text-base text-slate-600 font-semibold list-disc pl-5">
                  <li>Account creation and management</li>
                  <li>Comment and interaction features</li>
                  <li>Content delivery and personalization</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Communication</h3>
                <p className="text-base text-slate-600 font-semibold">
                  To keep you informed and engaged:
                </p>
                <ul className="mt-2 space-y-1 text-base text-slate-600 font-semibold list-disc pl-5">
                  <li>Newsletter delivery</li>
                  <li>Response to inquiries</li>
                  <li>Announcements and updates</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Improvement</h3>
                <p className="text-base text-slate-600 font-semibold">
                  To enhance our website and services:
                </p>
                <ul className="mt-2 space-y-1 text-base text-slate-600 font-semibold list-disc pl-5">
                  <li>Analytics and performance tracking</li>
                  <li>User experience optimization</li>
                  <li>Content strategy improvement</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Security</h3>
                <p className="text-base text-slate-600 font-semibold">
                  To protect our users and services:
                </p>
                <ul className="mt-2 space-y-1 text-base text-slate-600 font-semibold list-disc pl-5">
                  <li>Fraud prevention and detection</li>
                  <li>Security monitoring and incident response</li>
                  <li>Compliance with legal obligations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lock className="h-6 w-6 text-emerald-600" />
              Data Security
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed mb-3">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="space-y-2 text-base text-slate-600 font-semibold list-disc pl-5">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication protocols</li>
              <li>Secure data storage and backup procedures</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="h-6 w-6 text-rose-600" />
              Your Rights
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed mb-3">
              You have the right to:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-base font-bold text-slate-800">Access</p>
                <p className="text-sm text-slate-600 font-semibold">Request a copy of your personal data</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-base font-bold text-slate-800">Rectification</p>
                <p className="text-sm text-slate-600 font-semibold">Correct inaccurate or incomplete data</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-base font-bold text-slate-800">Erasure</p>
                <p className="text-sm text-slate-600 font-semibold">Request deletion of your data</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-base font-bold text-slate-800">Objection</p>
                <p className="text-sm text-slate-600 font-semibold">Object to certain data processing</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-base font-bold text-slate-800">Portability</p>
                <p className="text-sm text-slate-600 font-semibold">Transfer your data to another service</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-base font-bold text-slate-800">Withdrawal</p>
                <p className="text-sm text-slate-600 font-semibold">Withdraw consent at any time</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              Contact Us
            </h2>
            <p className="text-base text-slate-700 font-semibold leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
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