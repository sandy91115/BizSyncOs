import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Bot,
    CheckCircle2,
    RefreshCw,
    Send,
    Sparkles,
    X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { PublicRoute } from './PublicSite';
import './chatbot.css';

type Message = {
    id: string;
    role: 'bot' | 'user';
    content: string;
    timestamp: string;
    quickChips?: string[];
};

type AiChatbotWidgetProps = {
    navigate?: (route: PublicRoute) => void;
};

const INITIAL_CHIPS = [
    '⚡ How does sub-15ms stock lock work?',
    '💰 What are your pricing plans & trial?',
    '🔄 How do I migrate from Unicommerce / Odoo?',
    '📑 How does GST IRN e-invoicing work?',
    '📞 Talk to a Solutions Architect on WhatsApp',
];

const KNOWLEDGE_RESPONSES: Record<string, string> = {
    stock: `**Sub-15ms Real-Time Stock Lock**:
BizSyncOS replaces fragile 30-minute cron batch polling with an event-driven reactive mesh.

• Whenever an order is placed on **Shopify, Amazon, Flipkart, or Blinkit**, our atomic Redis reservation engine locks stock across all channels in **< 14.2 milliseconds**.
• Eliminates overselling and out-of-stock cancellation penalties completely.
• Supports multi-node regional hubs, dark stores, and retail stores from a single inventory ledger.`,

    price: `**Predictable, Scale-Tested Pricing (Billed Annually - Save 20%)**:

• **Starter Plan (₹2,399/mo)**: Up to 5 users, 1 warehouse, multi-channel order management & GST receipts.
• **Growth Plan (₹6,399/mo)**: Up to 20 users, multi-warehouse stock lock, Shopify & Amazon direct APIs, automated WhatsApp & Razorpay ledger. *(Most Popular)*
• **Scale Plan (₹11,999/mo)**: Up to 100 users, AI business assistant copilot, 2-way Tally & Zoho sync, priority 24/7 SLA.
• **Enterprise (Custom)**: Custom SLA, dedicated account manager, SAML SSO, and on-premise VPC.

Every plan comes with an instant **3-Day Full Product Trial** (No credit card required).`,

    migrate: `**48-Hour Zero-Downtime Migration Blueprint**:
Migrating from legacy systems (Unicommerce, Vinculum, Odoo, Zoho) is completely risk-free:

1. **Hour 0–12**: 1-Click Catalog & Order Schema Ingestion via CSV/API.
2. **Hour 12–24**: Dual-Write Shadow Mode running silently alongside your current OMS.
3. **Hour 24–36**: Automated 100% Ledger, Inventory & Tax Parity verification.
4. **Hour 36–48**: Zero-Downtime Instant Cutover.

Your orders never stop processing, and our dedicated migration engineers oversee the entire cutover.`,

    gst: `**Direct Government NIC GST & E-Way Bill Integration**:

• **Instant IRN & QR Generation**: Generates compliant B2B and B2C e-invoices with signed IRN in **< 2 seconds** directly through official NIC government APIs.
• **Automated E-Way Bills**: Direct generation with transporter doc mapping prevents roadside transit halts.
• **Zero Intermediary Taxes**: Cuts out paid 3rd-party aggregator toll-booths, saving brands up to ₹1.8L annually.
• **Automated GSTR-1 & 3B** export reports ready for audit.`,

    whatsapp: `**Connect Directly with our Senior Solutions Team**:

• 💬 **WhatsApp VIP Direct**: Click below to chat directly with an Enterprise Solutions Architect:
[Open WhatsApp Chat](https://wa.me/919876543210?text=Hi%20BizSyncOS%20Team%2C%20I%20would%20like%20to%20review%20our%20commerce%20architecture)
• 📞 **Direct Support**: +91 98765 43210 (24/7 Mon–Sat)
• Or toggle to the **"Lead / Demo"** tab in this widget to request an instant callback!`,

    default: `BizSyncOS is India's unified real-time operating system for modern omnichannel retail and D2C brands.

We orchestrate:
1. **Unified Multi-Channel Orders** (Shopify, Amazon, Flipkart, WhatsApp)
2. **Atomic Multi-Warehouse Stock Lock** (0% overselling)
3. **Automated GST E-Invoicing & E-Way Bills**
4. **Automated Courier Rate Shopping** (Shiprocket, Delhivery, Bluedart)
5. **2-Way Tally Prime & Zoho Ledger Sync**

Would you like to explore our pricing plans, test the 3-day demo, or speak with an architect?`,
};

function getBotResponse(userText: string): string {
    const text = userText.toLowerCase();
    if (
        text.includes('stock') ||
        text.includes('inventory') ||
        text.includes('lock') ||
        text.includes('concurrency') ||
        text.includes('oversell')
    ) {
        return KNOWLEDGE_RESPONSES.stock;
    }
    if (
        text.includes('price') ||
        text.includes('cost') ||
        text.includes('pricing') ||
        text.includes('plan') ||
        text.includes('starter') ||
        text.includes('growth') ||
        text.includes('scale')
    ) {
        return KNOWLEDGE_RESPONSES.price;
    }
    if (
        text.includes('migrate') ||
        text.includes('migration') ||
        text.includes('unicommerce') ||
        text.includes('vinculum') ||
        text.includes('odoo') ||
        text.includes('zoho') ||
        text.includes('switch')
    ) {
        return KNOWLEDGE_RESPONSES.migrate;
    }
    if (
        text.includes('gst') ||
        text.includes('tax') ||
        text.includes('invoice') ||
        text.includes('e-way') ||
        text.includes('irn') ||
        text.includes('nic')
    ) {
        return KNOWLEDGE_RESPONSES.gst;
    }
    if (
        text.includes('whatsapp') ||
        text.includes('call') ||
        text.includes('human') ||
        text.includes('architect') ||
        text.includes('talk') ||
        text.includes('phone') ||
        text.includes('demo')
    ) {
        return KNOWLEDGE_RESPONSES.whatsapp;
    }
    return KNOWLEDGE_RESPONSES.default;
}

function renderFormattedContent(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={i} style={{ color: 'inherit', fontWeight: 650 }}>
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}

export function AiChatbotWidget({ navigate }: AiChatbotWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'lead'>('chat');
    const [hasInteracted, setHasInteracted] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [leadName, setLeadName] = useState('');
    const [leadEmail, setLeadEmail] = useState('');
    const [leadPhone, setLeadPhone] = useState('');
    const [leadSubmitted, setLeadSubmitted] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'bot',
            content: `Hi there! 👋 I'm **BizSync AI**, your enterprise commerce copilot.

Whether you need help preventing overselling on Amazon, automating GST IRN e-invoicing, or calculating your TCO savings — ask me anything!`,
            timestamp: 'Just now',
            quickChips: INITIAL_CHIPS,
        },
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && (messages.length > 1 || isTyping)) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = (textToSend?: string) => {
        const query = (textToSend || input).trim();
        if (!query) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: query,
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botReply = getBotResponse(query);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: botReply,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                quickChips: [
                    '💰 View Pricing Plans',
                    '📦 Start 3-Day Free Trial',
                    '📞 WhatsApp Solutions Architect',
                ],
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 600);
    };

    const handleChipClick = (chip: string) => {
        if (chip.includes('Pricing Plans')) {
            if (navigate) navigate('/pricing');
            setIsOpen(false);
            return;
        }
        if (chip.includes('Free Trial') || chip.includes('Live Demo')) {
            if (navigate) navigate('/signup');
            setIsOpen(false);
            return;
        }
        if (chip.includes('WhatsApp')) {
            window.open(
                'https://wa.me/919876543210?text=Hi%20BizSyncOS%20Team%2C%20I%20would%20like%20to%20review%20our%20commerce%20architecture',
                '_blank',
            );
            return;
        }
        handleSendMessage(chip.replace(/^[^\w]+/, '').trim());
    };

    const handleLeadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadName || !leadEmail || !leadPhone) return;

        setLeadSubmitted(true);
        setTimeout(() => {
            setActiveTab('chat');
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: 'bot',
                    content: `🎉 Thank you, **${leadName}**! We have received your request. A Senior Solutions Architect has been notified and will reach out via WhatsApp at **${leadPhone}** within 15 minutes.`,
                    timestamp: 'Just now',
                },
            ]);
        }, 1200);
    };

    return (
        <aside className="bzc-container" aria-label="BizSync AI Chatbot">
            {/* Launcher button when window is closed */}
            {!isOpen && (
                <div style={{ position: 'relative' }}>
                    {!hasInteracted && (
                        <div
                            className="bzc-greeting-callout"
                            onClick={() => {
                                setIsOpen(true);
                                setHasInteracted(true);
                            }}
                        >
                            <Sparkles size={14} color="#34d399" />
                            <span>Ask BizSync AI a question</span>
                        </div>
                    )}
                    <button
                        className="bzc-launcher"
                        onClick={() => {
                            setIsOpen(true);
                            setHasInteracted(true);
                        }}
                        aria-label="Open BizSync AI Chatbot"
                    >
                        <div className="bzc-launcher-avatar">
                            <Bot size={20} />
                            <span className="bzc-pulse-dot" />
                        </div>
                        <div className="bzc-launcher-text">
                            <span className="bzc-launcher-title">
                                BizSync AI
                            </span>
                            <span className="bzc-launcher-sub">
                                <span style={{ color: '#34d399' }}>●</span>{' '}
                                Online
                            </span>
                        </div>
                    </button>
                </div>
            )}

            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="bzc-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                        {/* Header */}
                        <div className="bzc-header">
                            <div className="bzc-header-left">
                                <div className="bzc-header-avatar">
                                    <Bot size={22} />
                                    <span className="bzc-pulse-dot" />
                                </div>
                                <div className="bzc-header-info">
                                    <strong>BizSync AI</strong>
                                    <span className="bzc-header-status">
                                        <span>●</span> Typically replies in
                                        seconds
                                    </span>
                                </div>
                            </div>
                            <div className="bzc-header-actions">
                                <button
                                    className="bzc-header-btn"
                                    onClick={() => {
                                        setMessages([
                                            {
                                                id: '1',
                                                role: 'bot',
                                                content: `Chat history reset. How can I help you scale today?`,
                                                timestamp: 'Just now',
                                                quickChips: INITIAL_CHIPS,
                                            },
                                        ]);
                                    }}
                                    title="Reset Conversation"
                                    aria-label="Reset Conversation"
                                >
                                    <RefreshCw size={14} />
                                </button>
                                <button
                                    className="bzc-header-btn"
                                    onClick={() => setIsOpen(false)}
                                    title="Minimize Chat"
                                    aria-label="Minimize Chat"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="bzc-nav-tabs">
                            <button
                                className={`bzc-nav-tab ${activeTab === 'chat' ? 'is-active' : ''}`}
                                onClick={() => setActiveTab('chat')}
                            >
                                Live Assistant
                            </button>
                            <button
                                className={`bzc-nav-tab ${activeTab === 'lead' ? 'is-active' : ''}`}
                                onClick={() => setActiveTab('lead')}
                            >
                                Let's get to know you!
                            </button>
                        </div>

                        {/* View 1: Live Chat */}
                        {activeTab === 'chat' && (
                            <>
                                <div className="bzc-body">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`bzc-message ${msg.role}`}
                                        >
                                            <div className="bzc-bubble">
                                                <div
                                                    style={{
                                                        whiteSpace: 'pre-line',
                                                    }}
                                                >
                                                    {renderFormattedContent(
                                                        msg.content,
                                                    )}
                                                </div>
                                                <span className="bzc-time">
                                                    {msg.timestamp}
                                                </span>

                                                {/* Optional Quick Action Chips attached to message */}
                                                {msg.quickChips &&
                                                    msg.quickChips.length >
                                                        0 && (
                                                        <div className="bzc-chips-section">
                                                            <span className="bzc-chips-title">
                                                                SUGGESTED
                                                                QUESTIONS
                                                            </span>
                                                            {msg.quickChips.map(
                                                                (chip, idx) => (
                                                                    <button
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="bzc-chip"
                                                                        onClick={() =>
                                                                            handleChipClick(
                                                                                chip,
                                                                            )
                                                                        }
                                                                    >
                                                                        <span>
                                                                            {
                                                                                chip
                                                                            }
                                                                        </span>
                                                                        <ArrowRight
                                                                            size={
                                                                                12
                                                                            }
                                                                            color="#008779"
                                                                        />
                                                                    </button>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing indicator */}
                                    {isTyping && (
                                        <div className="bzc-message bot">
                                            <div className="bzc-typing">
                                                <span className="bzc-typing-dot" />
                                                <span className="bzc-typing-dot" />
                                                <span className="bzc-typing-dot" />
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Footer Input */}
                                <form
                                    className="bzc-footer"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="bzc-chat-input"
                                        placeholder="Ask BizSync AI a question..."
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                    />
                                    <button
                                        type="submit"
                                        className="bzc-send-btn"
                                        disabled={!input.trim()}
                                        aria-label="Send message"
                                    >
                                        <Send size={15} />
                                    </button>
                                </form>
                            </>
                        )}

                        {/* View 2: Lead Capture Form (GrowBro Style) */}
                        {activeTab === 'lead' && (
                            <div
                                className="bzc-body"
                                style={{ justifyContent: 'center' }}
                            >
                                <div className="bzc-lead-form">
                                    <div className="bzc-lead-title">
                                        <Bot size={20} color="#008779" />
                                        <span>Let's get to know you!</span>
                                    </div>
                                    <p className="bzc-lead-desc">
                                        Share your business details to receive a
                                        personalized ROI estimate and an instant
                                        3-day full access demo.
                                    </p>

                                    {leadSubmitted ? (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                padding: '20px 0',
                                            }}
                                        >
                                            <CheckCircle2
                                                size={42}
                                                color="#10b981"
                                                style={{
                                                    margin: '0 auto 12px',
                                                }}
                                            />
                                            <h4
                                                style={{
                                                    margin: '0 0 6px',
                                                    color: '#0f172a',
                                                }}
                                            >
                                                You're all set!
                                            </h4>
                                            <p
                                                style={{
                                                    fontSize: 13,
                                                    color: '#64748b',
                                                    margin: 0,
                                                }}
                                            >
                                                Our solutions team is preparing
                                                your custom migration blueprint.
                                            </p>
                                        </div>
                                    ) : (
                                        <form
                                            onSubmit={handleLeadSubmit}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 12,
                                            }}
                                        >
                                            <div className="bzc-field">
                                                <label>Your Name *</label>
                                                <input
                                                    type="text"
                                                    className="bzc-input"
                                                    placeholder="e.g. Vikram Sharma"
                                                    value={leadName}
                                                    onChange={(e) =>
                                                        setLeadName(
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="bzc-field">
                                                <label>Work Email *</label>
                                                <input
                                                    type="email"
                                                    className="bzc-input"
                                                    placeholder="e.g. vikram@yourbrand.com"
                                                    value={leadEmail}
                                                    onChange={(e) =>
                                                        setLeadEmail(
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="bzc-field">
                                                <label>
                                                    WhatsApp / Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="bzc-input"
                                                    placeholder="+91 98765 43210"
                                                    value={leadPhone}
                                                    onChange={(e) =>
                                                        setLeadPhone(
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="bzc-submit-btn"
                                            >
                                                <span>
                                                    Start Chat &amp; Get Demo
                                                </span>
                                                <ArrowRight size={15} />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="bzc-powered">
                            Powered by <strong>BizSyncOS Neural Engine</strong>{' '}
                            ⚡
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}
