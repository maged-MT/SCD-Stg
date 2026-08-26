"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const SUBMIT_URL = "https://smartcardeals.net/apitestnew/submit_lead.php";

export default function ContactPageClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Sell My Car");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    let digits = phone.replace(/\D/g, "");
    if (digits.startsWith("971")) digits = digits.slice(3);
    if (digits.startsWith("0")) digits = digits.slice(1);
    if (digits.length < 9 || !digits.startsWith("5")) {
      setErrorMsg("⚠️ Please enter a valid UAE phone number (e.g. 5X XXX XXXX).");
      return;
    }

    const finalPhone = "971" + digits;
    setStatus("submitting");

    const payload = new URLSearchParams({
      company_name: name.trim(),
      phone: finalPhone,
      email: email.trim(),
      make: "Contact",
      model: subject,
      specs: message.trim(),
    });

    try {
      fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
        keepalive: true,
      }).catch(() => {});
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or call us directly.");
    }
  };

  const inputCls =
    "w-full px-4 py-3 border-[1.5px] border-border rounded-[10px] text-sm text-gray-text bg-light-bg outline-none transition-all focus:border-blue focus:bg-white focus:shadow-[0_0_0_3px_rgba(43,108,245,0.1)]";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff] border-b border-blue/10 py-16 px-6 text-center">
        <div className="max-w-[700px] mx-auto">
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-navy tracking-[-2px] mb-4">
            Get In <span className="text-blue">Touch</span>
          </h1>
          <p className="text-gray-text text-lg leading-7">
            Have a question or ready to sell? Our team responds within 30 minutes during business
            hours.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Info Cards */}
        <div className="space-y-5">
          {[
            {
              icon: Phone,
              bg: "bg-blue",
              title: "Call Us Direct",
              lines: ["052 249 9708", "058 152 2281"],
              note: "Available Sat – Thu, 10AM – 8PM",
            },
            {
              icon: Mail,
              bg: "bg-blue",
              title: "Email Us",
              lines: ["info@smartcardeals.net"],
              note: "We reply within 2 hours",
            },
            {
              icon: MapPin,
              bg: "bg-blue",
              title: "Head Office",
              lines: ["1st Floor, JAC Bldg, Al Safeena St,", "Nr. Oasis Center Mall, SZR, Dubai"],
              note: "",
            },
            {
              icon: Clock,
              bg: "bg-blue",
              title: "Working Hours",
              lines: ["Sat – Thu: 10AM – 8PM"],
              note: "Support team available 7 days",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex items-start gap-4 p-6 bg-light-bg border border-border rounded-2xl"
            >
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center text-white shrink-0`}>
                <card.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-navy mb-1">{card.title}</h4>
                {card.lines.map((l) => (
                  <p key={l} className="text-sm text-gray-text">{l}</p>
                ))}
                {card.note && <small className="text-xs text-blue font-semibold">{card.note}</small>}
              </div>
            </div>
          ))}

          {/* WhatsApp */}
          <a
            href="https://wa.me/971522499708"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] border-none rounded-2xl text-white hover:-translate-y-0.5 transition-all shadow-[0_8px_24px_rgba(37,211,102,0.25)]"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
              💬
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">WhatsApp</h4>
              <p className="text-white/90 text-sm">Chat with us now on WhatsApp →</p>
              <small className="text-white/70 text-xs">Usually replies in minutes</small>
            </div>
          </a>
        </div>

        {/* Form */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_40px_rgba(43,108,245,0.12)] border border-border">
          <h2 className="text-xl font-extrabold text-navy mb-1">Send Us a Message</h2>
          <p className="text-sm text-gray-text mb-6">
            Fill the form and our team will contact you within 30 minutes.
          </p>

          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-6 text-center font-semibold">
              ✅ Message sent! We&apos;ll contact you within 30 minutes.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Full Name *</label>
                  <input type="text" className={inputCls} placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Phone Number *</label>
                  <input type="tel" className={inputCls} placeholder="5X XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Email Address</label>
                <input type="email" className={inputCls} placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Subject</label>
                <div className="relative">
                  <select className={inputCls + " appearance-none cursor-pointer"} value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="Sell My Car">I want to sell my car</option>
                    <option value="Car Valuation">Car valuation inquiry</option>
                    <option value="General Inquiry">General inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">Message</label>
                <textarea
                  className={inputCls + " resize-none"}
                  rows={4}
                  placeholder="Tell us about your car or inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-semibold">
                  {errorMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-extrabold text-[15px] shadow-[0_8px_24px_rgba(43,108,245,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-70"
              >
                {status === "submitting" ? "⏳ Sending..." : "SEND MESSAGE →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Map */}
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(43,108,245,0.12)] h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.8!2d55.22!3d25.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzI0LjAiTiA1NcKwMTMnMTIuMCJF!5e0!3m2!1sen!2sae!4v1234567890"
            title="Smart Car Deals Location"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="border-0"
          />
        </div>
      </div>
    </>
  );
}
