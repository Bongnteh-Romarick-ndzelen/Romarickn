
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
              Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-slate-300">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">Email</h3>
                      <a href="mailto:your-email@example.com" className="hover:text-blue-400 transition-colors">your-email@example.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">Phone</h3>
                      <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">+1 (234) 567-890</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">Location</h3>
                      <p>Your City, Country</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-slate-900/50 border-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Send me a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                        <Input id="name" placeholder="Your Name" required className="bg-slate-800/50 border-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                        <Input id="email" type="email" placeholder="Your Email" required className="bg-slate-800/50 border-slate-700" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                      <Input id="subject" placeholder="What's this about?" required className="bg-slate-800/50 border-slate-700" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                      <Textarea id="message" placeholder="Your message..." required rows={5} className="bg-slate-800/50 border-slate-700" />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
