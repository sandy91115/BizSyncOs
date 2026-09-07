import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import type { LucideIcon } from 'lucide-react';
import {
    ArrowLeftRight,
    ArrowRight,
    BarChart3,
    BrainCircuit,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    CircleDollarSign,
    ClipboardList,
    CreditCard,
    Database,
    FileCheck2,
    Headphones,
    HeartPulse,
    MessageCircle,
    MessageSquareText,
    PackageCheck,
    PackageOpen,
    Play,
    ShieldAlert,
    ShieldCheck,
    ShoppingBag,
    ShoppingCart,
    Sparkles,
    Store,
    Target,
    TrendingUp,
    Truck,
    User,
    UsersRound,
    WalletCards,
    Warehouse,
    Workflow,
    Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    siRazorpay,
    siShopify,
    siStripe,
    siWhatsapp,
    siWoocommerce,
} from 'simple-icons';
import type { PublicRoute } from './PublicSite';
import './homepage-sections.css';
import './product-preview.css';

type PremiumHomeProps = {
    navigate: (route: PublicRoute) => void;
};

type FeatureCard = {
    icon: LucideIcon;
    title: string;
    description: string;
    tag: string;
    tagColor: 'teal' | 'blue' | 'violet' | 'amber' | 'cyan';
};

type DashboardTab = {
    id: 'executive' | 'sales' | 'inventory' | 'finance' | 'ai';
    label: string;
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    trend: string;
    accent: string;
    featureCards: FeatureCard[];
    stats: {
        label: string;
        value: string;
        change: string;
        type: 'up' | 'neutral' | 'alert';
    }[];
    orders: {
        id: string;
        channel: string;
        amount: string;
        status: string;
        statusType: 'success' | 'warning' | 'info';
    }[];
    aiAlert: {
        title: string;
        text: string;
        action: string;
    };
};

const dashboardTabs: DashboardTab[] = [
    {
        id: 'executive',
        label: 'Executive Command',
        icon: BarChart3,
        eyebrow: 'REAL-TIME UNIFIED COCKPIT',
        title: 'See your whole business before a small bottleneck becomes expensive.',
        description:
            'Eliminate fragmented spreadsheets and stale end-of-day reports. View live omnichannel revenue, active warehouse dispatches, uncollected COD balances, and net profit margins across all channels in one unified screen.',
        metric: '₹24,85,600',
        metricLabel: 'Consolidated Weekly GMV',
        trend: '+18.4% vs last week',
        accent: 'teal',
        featureCards: [
            {
                icon: ArrowLeftRight,
                title: 'Bi-Directional Channel Sync',
                description:
                    'Instant 2-way orders & stock sync across Shopify, Amazon & WhatsApp.',
                tag: 'Sub-15ms Live',
                tagColor: 'teal',
            },
            {
                icon: CircleDollarSign,
                title: 'Real-Time Net Margin Engine',
                description:
                    'True profitability calculated automatically after COGS, ad spend & courier fees.',
                tag: 'Auto-Calculated',
                tagColor: 'blue',
            },
            {
                icon: ShieldAlert,
                title: 'Proactive Escalation Radar',
                description:
                    'Auto-flags courier SLA delays, low inventory, and uncollected COD risk.',
                tag: 'Autonomous',
                tagColor: 'amber',
            },
        ],
        stats: [
            {
                label: "Today's Inflow",
                value: '₹3,48,200',
                change: '+22.4% vs yesterday',
                type: 'up',
            },
            {
                label: 'Live Dispatches',
                value: '284 Orders',
                change: '99.4% SLA Met',
                type: 'neutral',
            },
            {
                label: 'Cash-at-Risk (COD)',
                value: '₹42,800',
                change: 'Courier follow-up active',
                type: 'alert',
            },
            {
                label: 'Net Profit (MTD)',
                value: '₹5,22,540',
                change: '+16.8% vs last month',
                type: 'up',
            },
        ],
        orders: [
            {
                id: '#ORD-9428',
                channel: 'Shopify Store',
                amount: '₹4,250',
                status: 'Paid & Allocated',
                statusType: 'success',
            },
            {
                id: '#ORD-9427',
                channel: 'Amazon India FBA',
                amount: '₹8,990',
                status: 'Picklist Dispatched',
                statusType: 'info',
            },
            {
                id: '#ORD-9426',
                channel: 'WhatsApp Commerce',
                amount: '₹2,499',
                status: 'Payment Link Verified',
                statusType: 'success',
            },
            {
                id: '#ORD-9425',
                channel: 'B2B Wholesale PO',
                amount: '₹64,500',
                status: 'Credit Approved & Invoiced',
                statusType: 'success',
            },
        ],
        aiAlert: {
            title: 'Courier SLA Risk Flagged',
            text: '18 express orders to Mumbai/Pune zone are queued for dispatch. Switch from Bluedart Surface to Delhivery Air to guarantee next-day delivery?',
            action: 'Execute Air Routing',
        },
    },
    {
        id: 'sales',
        label: 'Omnichannel Sales',
        icon: TrendingUp,
        eyebrow: 'OMNICHANNEL COMMERCE & CRM',
        title: 'Turn sales inquiries into verified, dispatched orders in minutes.',
        description:
            'Capture customer intent across website, WhatsApp, Amazon, and offline retail. Share instant checkout links, manage custom B2B wholesale rate cards, and automatically recover abandoned checkouts.',
        metric: '4.92%',
        metricLabel: 'Checkout Conversion Rate',
        trend: '+1.2% higher vs industry avg',
        accent: 'blue',
        featureCards: [
            {
                icon: MessageCircle,
                title: 'WhatsApp Abandonment Recovery',
                description:
                    'Auto-triggers personalized recovery checkout links within 15 minutes of drop-off.',
                tag: '28.4% Recovery',
                tagColor: 'teal',
            },
            {
                icon: Target,
                title: 'B2B Wholesale Custom Rates',
                description:
                    'Tiered pricing, GST input credit verification, and instant PO approval.',
                tag: '1-Click Quote',
                tagColor: 'blue',
            },
            {
                icon: UsersRound,
                title: 'Unified Customer Profile',
                description:
                    'Track lifetime loyalty, order frequency, and cross-channel purchasing history.',
                tag: '360° Profile',
                tagColor: 'violet',
            },
        ],
        stats: [
            {
                label: 'WhatsApp Recoveries',
                value: '₹1,42,800',
                change: '28 carts saved today',
                type: 'up',
            },
            {
                label: 'Average Order Value',
                value: '₹3,840',
                change: '+14.6% via smart bundles',
                type: 'up',
            },
            {
                label: 'Lead Response Time',
                value: '2.8 Mins',
                change: 'Auto-routed to rep',
                type: 'neutral',
            },
        ],
        orders: [
            {
                id: '#ORD-9424',
                channel: 'WhatsApp Direct',
                amount: '₹5,800',
                status: 'Cart Recovered (15m)',
                statusType: 'success',
            },
            {
                id: '#ORD-9423',
                channel: 'Shopify VIP Tier',
                amount: '₹12,450',
                status: 'Prepaid (Razorpay)',
                statusType: 'success',
            },
            {
                id: '#ORD-9422',
                channel: 'Corporate Order',
                amount: '₹88,000',
                status: 'Quotation Approved',
                statusType: 'info',
            },
            {
                id: '#ORD-9421',
                channel: 'Retail Store POS',
                amount: '₹3,150',
                status: 'Counter Settled',
                statusType: 'success',
            },
        ],
        aiAlert: {
            title: 'High-Intent Customer Signal',
            text: 'Anika Sharma (LTV ₹46,200) added 3 premium SKUs to cart. Trigger personalized 5% loyalty coupon via WhatsApp?',
            action: 'Send WhatsApp Offer',
        },
    },
    {
        id: 'inventory',
        label: 'Smart Inventory',
        icon: Warehouse,
        eyebrow: 'MULTI-NODE STOCK ENGINE',
        title: 'Automated inventory allocation with zero dead-stock or stockouts.',
        description:
            'Coordinate live inventory across Bhiwandi, Delhi NCR, and Bengaluru hubs. Dynamic reorder alerts, automated batch picking, barcode-scanned pack stations, and 100% accurate channel reserves.',
        metric: '99.85%',
        metricLabel: 'Stock Accuracy Score',
        trend: '0 overselling incidents',
        accent: 'violet',
        featureCards: [
            {
                icon: Warehouse,
                title: 'Multi-Node Stock Allocation',
                description:
                    'Synchronized inventory across Bhiwandi, Delhi NCR & Bengaluru fulfillment hubs.',
                tag: 'Zero Overselling',
                tagColor: 'violet',
            },
            {
                icon: PackageCheck,
                title: 'Smart Barcode Scan & Pack',
                description:
                    'Error-proof barcode scanning with automated Shiprocket/Delhivery label generation.',
                tag: '<45s Pick SLA',
                tagColor: 'teal',
            },
            {
                icon: ShieldCheck,
                title: 'Predictive Safety Stock',
                description:
                    'Automated PO drafting when inventory run-rate approaches replenishment threshold.',
                tag: 'Auto-PO Ready',
                tagColor: 'amber',
            },
        ],
        stats: [
            {
                label: 'Total Active SKUs',
                value: '4,850 SKUs',
                change: '3 Hubs synced live',
                type: 'neutral',
            },
            {
                label: 'Fulfillment Velocity',
                value: '38 Mins',
                change: 'Order to packed box',
                type: 'up',
            },
            {
                label: 'Reorder Warning',
                value: '3 SKUs Low',
                change: 'PO auto-drafted',
                type: 'alert',
            },
        ],
        orders: [
            {
                id: '#STK-8012',
                channel: 'Bhiwandi Central',
                amount: '450 Units',
                status: 'Restocked & Synced',
                statusType: 'success',
            },
            {
                id: '#STK-8011',
                channel: 'Delhi NCR Hub',
                amount: '28 Units',
                status: 'Reorder Triggered',
                statusType: 'warning',
            },
            {
                id: '#STK-8010',
                channel: 'Bengaluru DC',
                amount: '185 Units',
                status: 'Batch Pick Active',
                statusType: 'info',
            },
            {
                id: '#STK-8009',
                channel: 'Amazon India FBA',
                amount: '600 Units',
                status: 'Inbound ASN Cleared',
                statusType: 'success',
            },
        ],
        aiAlert: {
            title: 'Stockout Prevention Trigger',
            text: 'Cotton Oversized Tee (Black, L) is selling at 22 units/day. Current stock (44 units) will stock out in 48 hours.',
            action: 'Create Supplier PO',
        },
    },
    {
        id: 'finance',
        label: 'Finance & Cash',
        icon: CircleDollarSign,
        eyebrow: 'AUTOMATED FINANCE & GST',
        title: 'Automated bank reconciliation, GST e-invoicing, and COD safety.',
        description:
            'Stop wasting 4 days a month matching payment gateway settlements and courier COD receipts. Instant GST IRN and e-Way bills generated upon packing, with 2-way bank balance matching.',
        metric: '99.2%',
        metricLabel: 'Automated Reconciliation Rate',
        trend: 'Razorpay + Stripe + COD',
        accent: 'orange',
        featureCards: [
            {
                icon: FileCheck2,
                title: 'Instant GST & E-Way Bills',
                description:
                    'Automated B2B & B2C GST IRN e-invoicing and e-Way generation at packing stage.',
                tag: '100% Compliant',
                tagColor: 'teal',
            },
            {
                icon: CreditCard,
                title: '2-Way Gateway Matching',
                description:
                    'Automated reconciliation for Razorpay, Stripe, and courier COD batch remittances.',
                tag: '99.2% Matched',
                tagColor: 'blue',
            },
            {
                icon: WalletCards,
                title: 'COD Courier Dispute Shield',
                description:
                    'Auto-detects short courier payouts and generates dispute manifest instantly.',
                tag: 'Zero Leakage',
                tagColor: 'amber',
            },
        ],
        stats: [
            {
                label: 'Matched Settlements',
                value: '₹18,45,200',
                change: 'Reconciled automatically',
                type: 'up',
            },
            {
                label: 'Pending COD Payouts',
                value: '₹64,300',
                change: 'Delivery confirmed (3d)',
                type: 'neutral',
            },
            {
                label: 'Gross Operating Margin',
                value: '34.8%',
                change: 'After logistics & COGS',
                type: 'up',
            },
        ],
        orders: [
            {
                id: '#TX-7741',
                channel: 'Razorpay PG',
                amount: '₹1,48,200',
                status: 'Settled to Bank',
                statusType: 'success',
            },
            {
                id: '#TX-7740',
                channel: 'Delhivery COD Batch',
                amount: '₹38,500',
                status: 'Remittance Matched',
                statusType: 'success',
            },
            {
                id: '#TX-7739',
                channel: 'GST IRN Portal',
                amount: 'Invoice #2841',
                status: 'E-Way Bill Active',
                statusType: 'info',
            },
            {
                id: '#TX-7738',
                channel: 'Stripe Global',
                amount: '$1,240 USD',
                status: 'Auto-Converted & Cleared',
                statusType: 'success',
            },
        ],
        aiAlert: {
            title: 'Unmatched Remittance Flag',
            text: 'Courier payout batch #DL-4819 is short by ₹3,240 against 2 delivered COD shipments. Send dispute manifest?',
            action: 'File Courier Dispute',
        },
    },
    {
        id: 'ai',
        label: 'AI Decision Brain',
        icon: BrainCircuit,
        eyebrow: 'PROACTIVE AI REVENUE DEFENSE',
        title: 'AI that flags risks, recovers revenue, and suggests exact next moves.',
        description:
            'Ask questions in plain English or Hindi. BizSyncOS analyzes 40,000+ data points across your catalog, past buying patterns, courier speeds, and dead stock to protect your bottom line.',
        metric: '₹1,84,000',
        metricLabel: 'Recovered Operating Value',
        trend: 'Saved this month',
        accent: 'cyan',
        featureCards: [
            {
                icon: BrainCircuit,
                title: 'Grounded Operational Copilot',
                description:
                    'Ask natural language questions in English or Hindi, backed by real live store data.',
                tag: '180ms Latency',
                tagColor: 'cyan',
            },
            {
                icon: ShieldAlert,
                title: 'Proactive COD RTO Defense',
                description:
                    'Calculates buyer return risk score before dispatch to prevent high-cost RTO losses.',
                tag: '91.4% Accuracy',
                tagColor: 'violet',
            },
            {
                icon: Sparkles,
                title: '1-Click Autonomous Actions',
                description:
                    'Approve AI recommendations (air courier rerouting, liquidation promos) in 1 click.',
                tag: 'Human-in-Loop',
                tagColor: 'teal',
            },
        ],
        stats: [
            {
                label: 'RTO Protection Score',
                value: '91.4% Accuracy',
                change: 'High-risk COD flagged',
                type: 'up',
            },
            {
                label: 'Revenue Opportunities',
                value: '5 Unlocked',
                change: 'Dead stock liquidation',
                type: 'up',
            },
            {
                label: 'Query Latency',
                value: '180 ms',
                change: 'Grounded in your data',
                type: 'neutral',
            },
        ],
        orders: [
            {
                id: '#AI-301',
                channel: 'High RTO Risk',
                amount: '#ORD-9430 COD',
                status: 'Verification Sent',
                statusType: 'warning',
            },
            {
                id: '#AI-300',
                channel: 'Cart Abandonment',
                amount: '₹8,400 In Bag',
                status: 'Recovered via WhatsApp',
                statusType: 'success',
            },
            {
                id: '#AI-299',
                channel: 'Inventory Optimize',
                amount: 'Slow Mover SKU',
                status: 'Clearance Promo Ready',
                statusType: 'info',
            },
            {
                id: '#AI-298',
                channel: 'Courier Efficiency',
                amount: 'South Zone Air',
                status: 'Transit Cut by 14h',
                statusType: 'success',
            },
        ],
        aiAlert: {
            title: 'RTO High-Risk Alert',
            text: 'Order #ORD-9430 (₹4,890 COD) is from a pincode with 42% historical return rate. Request WhatsApp prepaid conversion with 5% instant discount?',
            action: 'Convert to Prepaid',
        },
    },
];

const outcomes: {
    icon: LucideIcon;
    title: string;
    signal: string;
    impact: string;
    copy: string;
    outcome: string;
    tone: string;
}[] = [
    {
        icon: CircleDollarSign,
        title: 'Revenue leakage',
        signal: 'REVENUE & MARGINS',
        impact: 'Lost abandoned carts & margin leak',
        copy: 'Disconnected sales and finance mean unnoticed lost checkouts and unpaid balances.',
        outcome: 'Recover the next best opportunity.',
        tone: 'teal',
    },
    {
        icon: Workflow,
        title: 'Manual handoffs',
        signal: 'TEAM WORKFLOWS',
        impact: 'Work waits on people',
        copy: 'Teams copy data, chase updates, and wait for the next department to act.',
        outcome: 'Move approved work automatically.',
        tone: 'blue',
    },
    {
        icon: PackageCheck,
        title: 'Stock uncertainty',
        signal: 'INVENTORY SIGNALS',
        impact: 'Stockouts arrive late',
        copy: 'Inventory changes too late and customers discover the problem first.',
        outcome: 'Act before a stockout happens.',
        tone: 'violet',
    },
    {
        icon: BarChart3,
        title: 'Late decisions',
        signal: 'BUSINESS VISIBILITY',
        impact: 'Leaders react late',
        copy: 'Leaders switch tools to understand what changed and what needs attention.',
        outcome: 'See a trusted decision picture.',
        tone: 'amber',
    },
];

const recoveryOpportunities: {
    icon: LucideIcon;
    title: string;
    value: string;
    copy: string;
    tone: string;
    action: string;
}[] = [
    {
        icon: Store,
        title: 'Abandoned demand',
        value: '₹31,200',
        copy: 'Customers who started but did not finish.',
        tone: 'teal',
        action: 'Recover the checkout',
    },
    {
        icon: CircleDollarSign,
        title: 'Pending collections',
        value: '₹18,400',
        copy: 'Collections needing the right follow-up.',
        tone: 'amber',
        action: 'Prioritize collection',
    },
    {
        icon: PackageOpen,
        title: 'Timely reorders',
        value: '₹44,000',
        copy: 'Customers ready for a timely reorder.',
        tone: 'violet',
        action: 'Start reorder journey',
    },
    {
        icon: ShieldCheck,
        title: 'COD confirmation',
        value: '₹27,600',
        copy: 'High-value COD orders ready for verification.',
        tone: 'teal',
        action: 'Verify before dispatch',
    },
];

type ComparisonValue = 'complete' | 'limited' | 'separate' | 'manual' | 'rare';

const comparisonRows: {
    capability: string;
    traditional: ComparisonValue;
    multipleTools: ComparisonValue;
    bizsync: ComparisonValue;
}[] = [
    {
        capability: 'CRM & customer profiles',
        traditional: 'complete',
        multipleTools: 'separate',
        bizsync: 'complete',
    },
    {
        capability: 'Inventory & reorder control',
        traditional: 'limited',
        multipleTools: 'separate',
        bizsync: 'complete',
    },
    {
        capability: 'Warehouse workflows',
        traditional: 'limited',
        multipleTools: 'separate',
        bizsync: 'complete',
    },
    {
        capability: 'Finance & collections',
        traditional: 'separate',
        multipleTools: 'separate',
        bizsync: 'complete',
    },
    {
        capability: 'Automation & playbooks',
        traditional: 'rare',
        multipleTools: 'separate',
        bizsync: 'complete',
    },
    {
        capability: 'AI business insights',
        traditional: 'separate',
        multipleTools: 'separate',
        bizsync: 'complete',
    },
    {
        capability: 'Business health score',
        traditional: 'rare',
        multipleTools: 'rare',
        bizsync: 'complete',
    },
    {
        capability: 'One connected dashboard',
        traditional: 'limited',
        multipleTools: 'manual',
        bizsync: 'complete',
    },
    {
        capability: 'Single login & permissions',
        traditional: 'limited',
        multipleTools: 'separate',
        bizsync: 'complete',
    },
    {
        capability: 'Unified reports',
        traditional: 'limited',
        multipleTools: 'manual',
        bizsync: 'complete',
    },
    {
        capability: 'Full-product live demo',
        traditional: 'rare',
        multipleTools: 'rare',
        bizsync: 'complete',
    },
];

const comparisonLabels: Record<ComparisonValue, string> = {
    complete: 'Included',
    limited: 'Limited',
    separate: 'Separate tool',
    manual: 'Manual merge',
    rare: 'Rare',
};

const faqItems = [
    {
        category: 'Real-Time Sync',
        question:
            'How fast does inventory sync across Shopify, Amazon, and offline POS?',
        answer: 'Sub-15ms bi-directional lock. The moment a customer checks out on Shopify, Amazon India, or your retail counter POS, BizSyncOS locks the physical SKU in our centralized memory buffer in under 12 milliseconds. This eliminates double-selling, out-of-stock cancellations, and marketplace penalties completely.',
    },
    {
        category: 'Migration & Onboarding',
        question:
            'Can we migrate from our existing tools without pausing store operations?',
        answer: 'Yes, 100% zero operational downtime. Using our certified 1-click OAuth connectors, BizSyncOS ingests your historical product catalog, customer records, and active orders in parallel in the background. Your daily order dispatch continues uninterrupted until you are ready to switch in under 5 minutes.',
    },
    {
        category: 'Finance & COD',
        question:
            'How does automated COD & bank remittance reconciliation work?',
        answer: 'BizSyncOS links directly with your bank account statements, payment gateways (Razorpay, Cashfree, Stripe), and courier partner APIs (Delhivery, Shiprocket, BlueDart). Every morning, our reconciliation engine matches order invoices against courier cash remittances down to the single rupee, automatically filing courier weight discrepancies and payment shortfall disputes.',
    },
    {
        category: 'Pricing & Growth',
        question:
            'Do you charge any per-order transaction taxes or GMV take-rates?',
        answer: 'No, never. Unlike legacy tools like Unicommerce that take a 0.5% to 1.5% cut of every order as you scale, BizSyncOS operates on a transparent, predictable flat monthly subscription. You keep 100% of your margins and are never penalized for growing.',
    },
    {
        category: 'Scale & Peak Traffic',
        question:
            'What happens during high-volume festive flash sales (e.g. Diwali, Black Friday)?',
        answer: 'BizSyncOS is built on an auto-scaling distributed cloud cluster benchmarked to handle 50,000+ concurrent checkout requests per minute. During peak sales, our isolated inventory queues ensure zero latency degradation and 99.99% operational SLA uptime.',
    },
    {
        category: 'Security & Compliance',
        question: 'Where is our business and customer data stored?',
        answer: '100% of your business data is hosted strictly in India at AWS Mumbai data centers. All communications are encrypted with AES-256 at rest and TLS 1.3 in transit, fully compliant with Indian data sovereignty, GST audit guidelines, and SOC-2 Type II standards.',
    },
];

const heroFlowSteps: {
    icon: LucideIcon;
    label: string;
    detail: string;
    tone: string;
}[] = [
    {
        icon: ShoppingCart,
        label: 'Order placed',
        detail: 'Omnichannel sync',
        tone: 'indigo',
    },
    {
        icon: CreditCard,
        label: 'Payment verified',
        detail: 'Instant settlement',
        tone: 'cyan',
    },
    {
        icon: PackageCheck,
        label: 'Inventory reserved',
        detail: 'Stock allocated',
        tone: 'amber',
    },
    {
        icon: ShieldCheck,
        label: 'Approval',
        detail: 'Human verified',
        tone: 'emerald',
    },
    {
        icon: Workflow,
        label: 'Automation executed',
        detail: 'Action completed',
        tone: 'teal',
    },
    {
        icon: BrainCircuit,
        label: 'AI analyzing',
        detail: 'Analyzing patterns',
        tone: 'violet',
    },
    {
        icon: Sparkles,
        label: 'Recommendation',
        detail: 'Best action suggested',
        tone: 'amber',
    },
];

const heroIndustries: { icon: LucideIcon; label: string }[] = [
    { icon: Store, label: 'Retail' },
    { icon: ShoppingCart, label: 'Ecommerce' },
    { icon: PackageOpen, label: 'Wholesale' },
    { icon: Workflow, label: 'Manufacturing' },
    { icon: HeartPulse, label: 'Healthcare' },
    { icon: ClipboardList, label: 'Education' },
    { icon: UsersRound, label: 'Services' },
];

const heroRegions = [
    { flag: 'IN', label: 'India' },
    { flag: 'AE', label: 'UAE' },
    { flag: 'SA', label: 'Saudi Arabia' },
];

const operatingJourney: {
    icon: LucideIcon;
    module: string;
    title: string;
    copy: string;
    tone: string;
}[] = [
    {
        icon: Store,
        module: 'COMMERCE',
        title: 'Order received',
        copy: 'A store, marketplace, or sales order enters one workspace.',
        tone: 'indigo',
    },
    {
        icon: BrainCircuit,
        module: 'BUSINESS COPILOT',
        title: 'Priority checked',
        copy: 'AI prepares evidence and flags only the next relevant step.',
        tone: 'teal',
    },
    {
        icon: PackageCheck,
        module: 'INVENTORY',
        title: 'Stock reserved',
        copy: 'Availability and allocation update from the same order signal.',
        tone: 'cyan',
    },
    {
        icon: CircleDollarSign,
        module: 'FINANCE',
        title: 'Payment matched',
        copy: 'Billing stays connected to payment and collection context.',
        tone: 'amber',
    },
    {
        icon: Warehouse,
        module: 'WAREHOUSE',
        title: 'Work released',
        copy: 'Approved pick, pack, and dispatch work reaches the team.',
        tone: 'violet',
    },
    {
        icon: MessageSquareText,
        module: 'CUSTOMER EXPERIENCE',
        title: 'Customer updated',
        copy: 'Order tracking and notifications delivered to the buyer.',
        tone: 'teal',
    },
];

type IntegrationCard = {
    name: string;
    category: string;
    tone: string;
    icon?: any;
    iconUrl?: string;
};

const integrationCards: IntegrationCard[] = [
    {
        name: 'WooCommerce',
        category: 'Commerce',
        tone: 'woo',
        icon: siWoocommerce,
    },
    {
        name: 'Amazon',
        category: 'Marketplace',
        tone: 'amazon',
        iconUrl: 'https://www.amazon.in/favicon.ico',
    },
    {
        name: 'Razorpay',
        category: 'Payments',
        tone: 'razorpay',
        icon: siRazorpay,
    },
    { name: 'Stripe', category: 'Payments', tone: 'stripe', icon: siStripe },
    {
        name: 'WhatsApp',
        category: 'Communication',
        tone: 'whatsapp',
        icon: siWhatsapp,
    },
    {
        name: 'Shiprocket',
        category: 'Shipping',
        tone: 'shiprocket',
        iconUrl:
            'https://www.shiprocket.in/wp-content/uploads/2023/01/shiprocket_logo.svg',
    },
];

const automationWorkflow: {
    icon: LucideIcon;
    label: string;
    title: string;
    text: string;
    approval?: boolean;
}[] = [
    {
        icon: PackageCheck,
        label: 'Trigger',
        title: 'Order placed',
        text: 'New order received',
    },
    {
        icon: ClipboardList,
        label: 'Condition',
        title: 'Payment = COD',
        text: 'Amount above ₹3,000',
    },
    {
        icon: BrainCircuit,
        label: 'AI decision',
        title: 'Risk score',
        text: 'Confidence: 87%',
    },
    {
        icon: ShieldCheck,
        label: 'Approval',
        title: 'Owner review',
        text: 'Required before action',
        approval: true,
    },
    {
        icon: MessageSquareText,
        label: 'Action',
        title: 'WhatsApp verify',
        text: 'Customer confirmation',
    },
    {
        icon: UsersRound,
        label: 'Next step',
        title: 'Notify sales',
        text: 'No reply after 2 hours',
    },
];

function fadeUp(delay = 0) {
    return {
        // Keep content visible before IntersectionObserver reports. This avoids
        // blank sections during fast navigation, print capture, and screenshots.
        initial: { opacity: 1, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
    } as const;
}

export default function PremiumHome({ navigate }: PremiumHomeProps) {
    const [activeTab, setActiveTab] = useState<DashboardTab['id']>('executive');
    const [activeHeroStep, setActiveHeroStep] = useState(0);
    const [activeAutomationStep, setActiveAutomationStep] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [autoPlayPreview, setAutoPlayPreview] = useState(true);
    const [tabProgress, setTabProgress] = useState(0);
    const reducedMotion = useReducedMotion();
    const aiBrainRef = useRef<HTMLElement>(null);
    const switchExperienceRef = useRef<HTMLElement>(null);
    const aiVideoRef = useRef<HTMLVideoElement>(null);
    const dashboard =
        dashboardTabs.find((tab) => tab.id === activeTab) ?? dashboardTabs[0];

    // Smooth auto-advancing tabs with visual progress and manual override
    useEffect(() => {
        if (reducedMotion || !autoPlayPreview) {
            return undefined;
        }

        const stepInterval = 50; // ms
        const totalDuration = 4800; // 4.8s per tab
        const progressDelta = (stepInterval / totalDuration) * 100;

        const timer = window.setInterval(() => {
            setTabProgress((prev) => {
                if (prev >= 100) {
                    setActiveTab((currentTab) => {
                        const currentIndex = dashboardTabs.findIndex(
                            (t) => t.id === currentTab,
                        );
                        const nextIndex =
                            (currentIndex + 1) % dashboardTabs.length;
                        return dashboardTabs[nextIndex].id;
                    });
                    return 0;
                }
                return prev + progressDelta;
            });
        }, stepInterval);

        return () => window.clearInterval(timer);
    }, [autoPlayPreview, reducedMotion]);

    const handleManualTabSelect = (tabId: DashboardTab['id']) => {
        setActiveTab(tabId);
        setTabProgress(0);
    };

    const dashboardContentRef = useRef<HTMLDivElement>(null);

    // GSAP Motion and Animation when switching tabs or viewing dashboard
    useEffect(() => {
        if (reducedMotion || !dashboardContentRef.current) {
            return undefined;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.os-pro-left',
                { opacity: 0, x: -16 },
                { opacity: 1, x: 0, duration: 0.42, ease: 'power2.out' },
            );

            gsap.fromTo(
                '.os-pro-dashboard-window',
                { opacity: 0, x: 16, scale: 0.98 },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.45,
                    ease: 'power2.out',
                },
            );

            gsap.fromTo(
                '.os-pro-stat-pill',
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    stagger: 0.05,
                    delay: 0.05,
                    ease: 'power2.out',
                },
            );

            gsap.fromTo(
                '.os-pro-order-row',
                { opacity: 0, x: -8 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    stagger: 0.04,
                    delay: 0.1,
                    ease: 'power2.out',
                },
            );

            gsap.fromTo(
                '.os-pro-ai-card',
                { opacity: 0, scale: 0.96 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.35,
                    delay: 0.15,
                    ease: 'back.out(1.4)',
                },
            );
        }, dashboardContentRef);

        return () => ctx.revert();
    }, [activeTab, reducedMotion]);

    useEffect(() => {
        if (reducedMotion) {
            return undefined;
        }

        const flowCycle = window.setInterval(() => {
            setActiveHeroStep(
                (currentStep: number) =>
                    (currentStep + 1) % heroFlowSteps.length,
            );
        }, 2800);

        return () => window.clearInterval(flowCycle);
    }, [reducedMotion]);

    useEffect(() => {
        const video = aiVideoRef.current;
        if (!video) {
            return undefined;
        }

        video.muted = true;
        video.defaultMuted = true;
        video.play().catch(() => {
            // Muted autoplay can still be blocked by a browser policy. The
            // posterless video remains available once the user interacts.
        });

        return undefined;
    }, []);

    useEffect(() => {
        if (reducedMotion || !aiBrainRef.current) {
            return undefined;
        }

        const section = aiBrainRef.current;
        const context = gsap.context(() => {
            const entry = gsap.timeline({ defaults: { ease: 'power3.out' } });
            entry.from('.os-ai-panel > *', {
                opacity: 0,
                y: 16,
                duration: 0.48,
                stagger: 0.07,
            });
        }, section);

        return () => context.revert();
    }, [reducedMotion]);

    useEffect(() => {
        if (reducedMotion || !switchExperienceRef.current) {
            return undefined;
        }

        const section = switchExperienceRef.current;
        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: { ease: 'power3.out' },
            });

            timeline
                .from('.os-switch-header > *', {
                    opacity: 0,
                    y: 22,
                    duration: 0.65,
                    stagger: 0.12,
                })
                .from(
                    '.os-switch-bridge, .os-switch-connected',
                    {
                        opacity: 0,
                        y: 34,
                        scale: 0.975,
                        duration: 0.75,
                        stagger: 0.14,
                    },
                    '-=0.28',
                )
                .from(
                    '.os-switch-outcome-row',
                    {
                        opacity: 0,
                        x: 18,
                        duration: 0.42,
                        stagger: 0.08,
                    },
                    '-=0.36',
                );

            gsap.to('.os-switch-signal', {
                y: -5,
                duration: 1.8,
                ease: 'sine.inOut',
                stagger: { each: 0.16, yoyo: true, repeat: -1 },
                repeat: -1,
                yoyo: true,
            });
        }, section);

        return () => context.revert();
    }, [reducedMotion]);

    useEffect(() => {
        if (reducedMotion) {
            return undefined;
        }

        const workflowCycle = window.setInterval(() => {
            setActiveAutomationStep(
                (currentStep) => (currentStep + 1) % automationWorkflow.length,
            );
        }, 1850);

        return () => window.clearInterval(workflowCycle);
    }, [reducedMotion]);

    const productTour = () =>
        document
            .getElementById('product-preview')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <main className="premium-home">
            <section className="os-hero os-hero-workflow-pattern">
                <video
                    className="os-hero-video-background"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/images/hero-wave.mp4" type="video/mp4" />
                </video>
                <div className="os-hero-video-overlay" aria-hidden="true" />
                <div className="os-hero-grid" aria-hidden="true" />
                <div
                    className="os-hero-glow os-hero-glow-one"
                    aria-hidden="true"
                />
                <div
                    className="os-hero-glow os-hero-glow-two"
                    aria-hidden="true"
                />
                <div className="os-hero-orbit-stage" aria-hidden="true">
                    <i className="os-hero-orbit os-hero-orbit-one" />
                    <i className="os-hero-orbit os-hero-orbit-two" />
                    <i className="os-hero-orbit os-hero-orbit-three" />
                    <i className="os-hero-orbit os-hero-orbit-four" />
                    <span className="os-hero-orbit-plus os-hero-orbit-plus-one">
                        +
                    </span>
                    <span className="os-hero-orbit-plus os-hero-orbit-plus-two">
                        +
                    </span>
                    <span className="os-hero-orbit-plus os-hero-orbit-plus-three">
                        +
                    </span>
                    <span className="os-hero-orbit-dot os-hero-orbit-dot-one" />
                    <span className="os-hero-orbit-dot os-hero-orbit-dot-two" />
                    <span className="os-hero-orbit-ring os-hero-orbit-ring-one" />
                    <span className="os-hero-orbit-ring os-hero-orbit-ring-two" />
                </div>
                <div className="os-shell os-hero-inner">
                    <motion.div
                        className="os-hero-copy"
                        initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="os-eyebrow">
                            <Sparkles size={15} /> ALL-IN-ONE BUSINESS OPERATING
                            SYSTEM
                        </p>
                        <h1>
                            Run your entire{' '}
                            <br className="os-hero-desktop-break" />
                            business from one{' '}
                            <br className="os-hero-desktop-break" />
                            <span>intelligent platform.</span>
                        </h1>
                        <p className="os-hero-lede">
                            Manage CRM, orders, inventory, warehouse, finance,
                            marketing, automation, and AI from one connected
                            operating system.
                        </p>
                        <div className="os-hero-actions">
                            <button
                                className="os-button os-button-primary"
                                type="button"
                                onClick={() => navigate('/signup')}
                            >
                                <Sparkles size={17} /> Start 3-Day Free Trial{' '}
                                <ArrowRight size={18} />
                            </button>
                            <button
                                className="os-button os-button-secondary"
                                type="button"
                                onClick={productTour}
                            >
                                <Play size={16} fill="currentColor" /> Watch
                                2-min product tour
                            </button>
                        </div>
                        <p className="os-hero-cta-note">
                            No credit card &middot; 3-day full Basic Plan access
                            &middot; Cancel anytime
                        </p>
                        <div className="os-trust-row">
                            <span>
                                <CheckCircle2 size={15} /> Setup in minutes
                            </span>
                            <span>
                                <Zap size={15} /> One connected workspace
                            </span>
                            <span>
                                <ShieldCheck size={15} /> Approval-controlled
                                actions
                            </span>
                            <span>
                                <Sparkles size={15} /> AI-ready from day one
                            </span>
                        </div>
                        <div className="os-hero-proof">
                            <strong>
                                Built for businesses that want one source of
                                operational truth.
                            </strong>
                        </div>
                    </motion.div>

                    <motion.div
                        className="os-hero-flow-stage"
                        initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.72,
                            delay: reducedMotion ? 0 : 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div className="os-hero-flow-heading">
                            <span aria-hidden="true" />
                            <p>
                                <i aria-hidden="true" /> END-TO-END OPERATING
                                FLOW · LIVE
                            </p>
                            <span aria-hidden="true" />
                        </div>
                        <div className="os-hero-flow-bar">
                            {heroFlowSteps.map(
                                (
                                    { icon: Icon, label, detail, tone },
                                    index,
                                ) => (
                                    <div
                                        className="os-hero-flow-unit"
                                        key={label}
                                    >
                                        <button
                                            className={`os-hero-flow-step ${tone} ${activeHeroStep === index ? 'active' : ''}`}
                                            type="button"
                                            onClick={() =>
                                                setActiveHeroStep(index)
                                            }
                                            aria-pressed={
                                                activeHeroStep === index
                                            }
                                        >
                                            <span>
                                                <Icon size={20} />
                                            </span>
                                            <b>{label}</b>
                                        </button>
                                        {index < heroFlowSteps.length - 1 ? (
                                            <span
                                                className={`os-hero-flow-connector ${tone}`}
                                            >
                                                <i />
                                            </span>
                                        ) : null}
                                    </div>
                                ),
                            )}
                        </div>
                        <div
                            className="os-hero-flow-caption"
                            aria-live="polite"
                        >
                            <Sparkles size={15} />
                            <span>{heroFlowSteps[activeHeroStep].detail}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="os-hero-industry-strip"
                        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.58,
                            delay: reducedMotion ? 0 : 0.34,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <p>Built for growing businesses across industries</p>
                        <div className="os-hero-industry-groups">
                            <div
                                className="os-hero-industry-list"
                                aria-label="Industries supported by BizSyncOS"
                            >
                                {heroIndustries.map(({ icon: Icon, label }) => (
                                    <span key={label}>
                                        <Icon size={16} aria-hidden="true" />
                                        {label}
                                    </span>
                                ))}
                            </div>
                            <div
                                className="os-hero-region-list"
                                aria-label="Regional focus"
                            >
                                <span className="os-hero-region-prefix">
                                    Across
                                </span>
                                {heroRegions.map(({ flag, label }) => (
                                    <span key={label}>
                                        <i aria-hidden="true">{flag}</i>
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="os-command-scene"
                        initial={
                            reducedMotion
                                ? false
                                : { opacity: 0, scale: 0.94, x: 28 }
                        }
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                            duration: 0.78,
                            delay: reducedMotion ? 0 : 0.12,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div
                            className="os-scene-ring os-scene-ring-one"
                            aria-hidden="true"
                        />
                        <div
                            className="os-scene-ring os-scene-ring-two"
                            aria-hidden="true"
                        />
                        <div className="os-dashboard-window">
                            <div className="os-window-bar">
                                <div className="os-window-brand">
                                    <span className="os-mini-logo">BS</span>
                                    <b>BizSyncOS</b>
                                </div>
                                <span>
                                    Illustrative demo workspace · May 20–26,
                                    2026
                                </span>
                                <i>AR</i>
                            </div>
                            <div className="os-window-body">
                                <aside className="os-dashboard-nav">
                                    <strong>Executive Dashboard</strong>
                                    <span>CRM</span>
                                    <span>Orders</span>
                                    <span>Inventory</span>
                                    <span>Warehouse</span>
                                    <span>Finance</span>
                                    <span>Marketing</span>
                                    <span>Reports</span>
                                    <span>Automation</span>
                                    <span>AI Assistant</span>
                                </aside>
                                <div className="os-dashboard-main">
                                    <div className="os-dashboard-greeting">
                                        <div>
                                            <small>BUSINESS OVERVIEW</small>
                                            <h2>
                                                Good morning, Aria{' '}
                                                <span>👋</span>
                                            </h2>
                                        </div>
                                        <div className="os-dashboard-demo-state">
                                            <span>Sample data</span>
                                            <button type="button">
                                                This week{' '}
                                                <ChevronDown size={13} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="os-dashboard-kpis">
                                        <Metric
                                            icon={CircleDollarSign}
                                            label="Revenue this week"
                                            value="₹24,820"
                                            trend="↑ 12.8% vs last week"
                                            tone="teal"
                                        />
                                        <Metric
                                            icon={ClipboardList}
                                            label="Orders today"
                                            value="328"
                                            trend="↑ 8.4% vs yesterday"
                                            tone="blue"
                                        />
                                        <Metric
                                            icon={CreditCard}
                                            label="Payments to review"
                                            value="42"
                                            trend="₹9,280 outstanding"
                                            tone="orange"
                                        />
                                    </div>
                                    <div className="os-dashboard-lower">
                                        <div className="os-revenue-panel">
                                            <div>
                                                <strong>
                                                    Revenue performance
                                                </strong>
                                                <span>Live</span>
                                            </div>
                                            <MiniChart />
                                        </div>
                                        <div className="os-channel-panel">
                                            <div>
                                                <strong>Top channels</strong>
                                                <button type="button">
                                                    All
                                                </button>
                                            </div>
                                            <Channel
                                                name="Online Store"
                                                value="₹14,100"
                                                change="↑ 18.2%"
                                            />
                                            <Channel
                                                name="WhatsApp"
                                                value="₹6,740"
                                                change="↑ 14.6%"
                                            />
                                            <Channel
                                                name="Marketplace"
                                                value="₹3,980"
                                                change="↑ 9.8%"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.aside
                            className="os-hero-float-card"
                            animate={reducedMotion ? {} : { y: [0, -9, 0] }}
                            transition={{
                                duration: 4.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <span>
                                <BrainCircuit size={15} /> AI insight
                            </span>
                            <strong>
                                Three priorities are ready for review.
                            </strong>
                            <p>
                                Sales are up 12.8%. One stock risk needs
                                attention.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate('/signup')}
                            >
                                View full insight <ArrowRight size={14} />
                            </button>
                        </motion.aside>
                        <motion.div
                            className="os-live-signal"
                            animate={reducedMotion ? {} : { y: [0, 7, 0] }}
                            transition={{
                                duration: 3.6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.4,
                            }}
                        >
                            <i /> Live workspace
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="os-partners-section" id="partners">
                <div className="os-shell">
                    <div className="os-partners-header">
                        <div className="os-partners-pill">
                            <span className="os-partners-pill-dot" />
                            <span>OFFICIAL TECHNOLOGY PARTNERS</span>
                        </div>
                        <h2 className="os-partners-title">
                            Built on the platforms your customers{' '}
                            <span className="os-partners-gradient">
                                already trust
                            </span>
                        </h2>
                        <p className="os-partners-desc">
                            BizSyncOS is an officially verified partner with
                            India's and the world's largest messaging, cloud,
                            and payment providers &mdash; so every order,
                            inventory sync, and payout is direct, secure, and
                            approved.
                        </p>
                    </div>

                    {/* 6 Verified Partner Cards (Exact 3x2 Grid) */}
                    <div className="os-partners-grid">
                        <div className="os-partner-card">
                            <div className="os-partner-info">
                                <div
                                    className="os-partner-icon-box"
                                    style={{ color: '#1877f2' }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                                    </svg>
                                </div>
                                <div className="os-partner-texts">
                                    <div className="os-partner-name">
                                        Meta Business Partner
                                    </div>
                                    <div className="os-partner-sub">
                                        WhatsApp &middot; Instagram &middot;
                                        Messenger
                                    </div>
                                </div>
                            </div>
                            <span className="os-partner-verified-badge">
                                <CheckCircle2 size={11} /> VERIFIED
                            </span>
                        </div>

                        <div className="os-partner-card">
                            <div className="os-partner-info">
                                <div
                                    className="os-partner-icon-box"
                                    style={{ color: '#ea4335' }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                    </svg>
                                </div>
                                <div className="os-partner-texts">
                                    <div className="os-partner-name">
                                        Google Cloud Partner
                                    </div>
                                    <div className="os-partner-sub">
                                        BigQuery &middot; Gemini AI &middot;
                                        Workspace
                                    </div>
                                </div>
                            </div>
                            <span className="os-partner-verified-badge">
                                <CheckCircle2 size={11} /> VERIFIED
                            </span>
                        </div>

                        <div className="os-partner-card">
                            <div className="os-partner-info">
                                <div
                                    className="os-partner-icon-box"
                                    style={{ color: '#0c2340' }}
                                >
                                    <svg viewBox="0 0 24 24" fill="#0c2340">
                                        <path d={siRazorpay.path} />
                                    </svg>
                                </div>
                                <div className="os-partner-texts">
                                    <div className="os-partner-name">
                                        Razorpay Partner
                                    </div>
                                    <div className="os-partner-sub">
                                        Payments &middot; Subscriptions &middot;
                                        Payouts
                                    </div>
                                </div>
                            </div>
                            <span className="os-partner-verified-badge">
                                <CheckCircle2 size={11} /> VERIFIED
                            </span>
                        </div>

                        <div className="os-partner-card">
                            <div className="os-partner-info">
                                <div
                                    className="os-partner-icon-box"
                                    style={{ color: '#25d366' }}
                                >
                                    <svg viewBox="0 0 24 24" fill="#25d366">
                                        <path d={siWhatsapp.path} />
                                    </svg>
                                </div>
                                <div className="os-partner-texts">
                                    <div className="os-partner-name">
                                        WhatsApp BSP
                                    </div>
                                    <div className="os-partner-sub">
                                        Official Cloud API Solution Provider
                                    </div>
                                </div>
                            </div>
                            <span className="os-partner-verified-badge">
                                <CheckCircle2 size={11} /> VERIFIED
                            </span>
                        </div>

                        <div className="os-partner-card">
                            <div className="os-partner-info">
                                <div
                                    className="os-partner-icon-box"
                                    style={{ color: '#96bf48' }}
                                >
                                    <svg viewBox="0 0 24 24" fill="#96bf48">
                                        <path d={siShopify.path} />
                                    </svg>
                                </div>
                                <div className="os-partner-texts">
                                    <div className="os-partner-name">
                                        Shopify Partner
                                    </div>
                                    <div className="os-partner-sub">
                                        Real-time Stock &amp; Order Sync
                                    </div>
                                </div>
                            </div>
                            <span className="os-partner-verified-badge">
                                <CheckCircle2 size={11} /> VERIFIED
                            </span>
                        </div>

                        <div className="os-partner-card">
                            <div className="os-partner-info">
                                <div
                                    className="os-partner-icon-box"
                                    style={{ color: '#0284c7' }}
                                >
                                    <Truck size={26} />
                                </div>
                                <div className="os-partner-texts">
                                    <div className="os-partner-name">
                                        Delhivery &amp; Shiprocket
                                    </div>
                                    <div className="os-partner-sub">
                                        29,000+ Pincodes &middot; Automated SLA
                                    </div>
                                </div>
                            </div>
                            <span className="os-partner-verified-badge">
                                <CheckCircle2 size={11} /> VERIFIED
                            </span>
                        </div>
                    </div>

                    {/* Client Brand Ticker */}
                    <div className="os-client-ticker-wrap">
                        <p className="os-client-ticker-heading">
                            Trusted by 1,000+ High-Growth Indian Brands &amp;
                            Wholesalers
                        </p>
                        <div className="os-client-ticker-row">
                            <span className="os-client-brand-chip">
                                The Souled Store
                            </span>
                            <span className="os-client-brand-chip">&bull;</span>
                            <span className="os-client-brand-chip">
                                Mamaearth
                            </span>
                            <span className="os-client-brand-chip">&bull;</span>
                            <span className="os-client-brand-chip">
                                boAt Lifestyle
                            </span>
                            <span className="os-client-brand-chip">&bull;</span>
                            <span className="os-client-brand-chip">Snitch</span>
                            <span className="os-client-brand-chip">&bull;</span>
                            <span className="os-client-brand-chip">
                                Bewakoof
                            </span>
                            <span className="os-client-brand-chip">&bull;</span>
                            <span className="os-client-brand-chip">
                                Rare Rabbit
                            </span>
                            <span className="os-client-brand-chip">&bull;</span>
                            <span className="os-client-brand-chip">
                                Sugar Cosmetics
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <ConnectedMap />

            {/* 3. Does This Sound Familiar? (Compact 4-Column Grid) */}
            <section className="os-sound-familiar-section" id="sound-familiar">
                <div className="os-shell">
                    <div className="os-sound-familiar-header">
                        <div
                            className="os-pro-badge"
                            style={{
                                background: 'rgba(239, 68, 68, 0.08)',
                                borderColor: 'rgba(239, 68, 68, 0.28)',
                                color: '#dc2626',
                            }}
                        >
                            <ShieldAlert size={13} />
                            <span>DOES THIS SOUND FAMILIAR?</span>
                        </div>
                        <h2 className="os-pro-title">
                            The everyday operational friction{' '}
                            <span
                                style={{
                                    background:
                                        'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                quietly eating your profits.
                            </span>
                        </h2>
                        <p className="os-pro-desc">
                            When your sales channels and warehouse don't talk in
                            sub-second real-time, small daily delays turn into
                            expensive cancellations.
                        </p>
                    </div>

                    <div className="os-sound-familiar-grid">
                        {/* Card 1: Stock Desync */}
                        <div className="os-pain-card">
                            <div>
                                <div className="os-pain-card-header">
                                    <div className="os-pain-badge">
                                        <Store size={18} />
                                    </div>
                                    <span className="os-pain-stat-pill">
                                        15–45m Lag
                                    </span>
                                </div>
                                <span className="os-pain-tag">
                                    INVENTORY DESYNC
                                </span>
                                <h3 className="os-pain-quote">
                                    &ldquo;Guessing stock across 3 different
                                    open browser tabs.&rdquo;
                                </h3>
                                <p className="os-pain-consequence">
                                    Shopify orders clear warehouse stock before
                                    Amazon updates, causing painful out-of-stock
                                    cancellations.
                                </p>
                            </div>
                            <div className="os-pain-solution-box">
                                <CheckCircle2 size={16} />
                                <span>
                                    Sub-15ms bi-directional universal stock lock
                                </span>
                            </div>
                        </div>

                        {/* Card 2: Abandoned WhatsApp */}
                        <div className="os-pain-card">
                            <div>
                                <div className="os-pain-card-header">
                                    <div className="os-pain-badge">
                                        <MessageCircle size={18} />
                                    </div>
                                    <span className="os-pain-stat-pill">
                                        68% Drop-Off
                                    </span>
                                </div>
                                <span className="os-pain-tag">
                                    WHATSAPP LEAK
                                </span>
                                <h3 className="os-pain-quote">
                                    &ldquo;Cart abandoned on WhatsApp, follow-up
                                    sent 6 hours late.&rdquo;
                                </h3>
                                <p className="os-pain-consequence">
                                    Manual sales reps follow up too late. By
                                    then, high-intent buyers have already
                                    purchased from a competitor.
                                </p>
                            </div>
                            <div className="os-pain-solution-box">
                                <CheckCircle2 size={16} />
                                <span>
                                    Autonomous 15-min AI Razorpay checkout links
                                </span>
                            </div>
                        </div>

                        {/* Card 3: COD Reconciliation */}
                        <div className="os-pain-card">
                            <div>
                                <div className="os-pain-card-header">
                                    <div className="os-pain-badge">
                                        <CreditCard size={18} />
                                    </div>
                                    <span className="os-pain-stat-pill">
                                        4 Days Excel
                                    </span>
                                </div>
                                <span className="os-pain-tag">
                                    COD RECONCILIATION
                                </span>
                                <h3 className="os-pain-quote">
                                    &ldquo;Month-end COD matching takes days of
                                    manual Excel sheets.&rdquo;
                                </h3>
                                <p className="os-pain-consequence">
                                    Uncollected courier cash float sits idle
                                    while weight overcharges and remittance
                                    shortfalls go undetected.
                                </p>
                            </div>
                            <div className="os-pain-solution-box">
                                <CheckCircle2 size={16} />
                                <span>
                                    Daily automated 2-way bank &amp; UTR audit
                                </span>
                            </div>
                        </div>

                        {/* Card 4: Logistics SLA */}
                        <div className="os-pain-card">
                            <div>
                                <div className="os-pain-card-header">
                                    <div className="os-pain-badge">
                                        <Truck size={18} />
                                    </div>
                                    <span className="os-pain-stat-pill">
                                        28% RTO Return
                                    </span>
                                </div>
                                <span className="os-pain-tag">
                                    LOGISTICS SLA
                                </span>
                                <h3 className="os-pain-quote">
                                    &ldquo;Finding out about delayed shipments
                                    only after 1-star reviews.&rdquo;
                                </h3>
                                <p className="os-pain-consequence">
                                    Surface route blockages go unnoticed until
                                    customer disputes spike and return freight
                                    costs pile up.
                                </p>
                            </div>
                            <div className="os-pain-solution-box">
                                <CheckCircle2 size={16} />
                                <span>
                                    Proactive AI air/surface re-routing defense
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="product-preview"
                className="os-product-section os-section"
                onMouseEnter={() => setAutoPlayPreview(false)}
                onMouseLeave={() => setAutoPlayPreview(true)}
            >
                <video
                    className="os-pro-video-background"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/images/hero-wave.mp4" type="video/mp4" />
                </video>
                <div className="os-pro-video-overlay" aria-hidden="true" />
                <div className="os-shell">
                    <div className="os-pro-header">
                        <div className="os-pro-badge">
                            <Sparkles size={13} />
                            <span>ALL-IN-ONE REAL-TIME OPERATING ENGINE</span>
                        </div>
                        <h2 className="os-pro-title">
                            One Command Center.{' '}
                            <span className="os-pro-gradient">
                                Zero Operational Blind Spots.
                            </span>
                        </h2>
                        <p className="os-pro-desc">
                            Stop losing revenue to scattered spreadsheets,
                            oversold stock, and manual dispatch delays.
                            BizSyncOS synchronizes multi-channel sales,
                            inventory reservations, payments, and AI
                            intelligence into one live decision-ready cockpit.
                        </p>
                        <div className="os-pro-pills-row">
                            <div className="os-pro-micro-pill">
                                <Database size={13} />
                                <span>Connected Multi-Store Sync</span>
                            </div>
                            <div className="os-pro-micro-pill">
                                <Zap size={13} />
                                <span>Sub-15ms Stock Allocation</span>
                            </div>
                            <div className="os-pro-micro-pill">
                                <ShieldCheck size={13} />
                                <span>Automated GST &amp; E-Way</span>
                            </div>
                            <div className="os-pro-micro-pill">
                                <BrainCircuit size={13} />
                                <span>Proactive Revenue Guardrails</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Tab Bar */}
                    <div className="os-pro-controls-row">
                        <div className="os-pro-tab-bar" role="tablist">
                            {dashboardTabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = tab.id === activeTab;
                                return (
                                    <button
                                        className={`os-pro-tab-btn ${isActive ? 'is-active' : ''}`}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        key={tab.id}
                                        onClick={() =>
                                            handleManualTabSelect(tab.id)
                                        }
                                    >
                                        <Icon size={16} />
                                        <span>{tab.label}</span>
                                        {isActive && autoPlayPreview && (
                                            <span
                                                className="os-tab-progress"
                                                style={{
                                                    width: `${tabProgress}%`,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2-Column Cockpit Stage */}
                    <div
                        className="os-pro-stage"
                        ref={dashboardContentRef}
                        key={activeTab}
                    >
                        {/* Left Column: Client-Centric Value & Action */}
                        <div className="os-pro-left">
                            <div>
                                <div className="os-pro-tagline">
                                    <Zap size={13} />
                                    <span>{dashboard.eyebrow}</span>
                                </div>
                                <h3 className="os-pro-headline">
                                    {dashboard.title}
                                </h3>
                                <p className="os-pro-copy">
                                    {dashboard.description}
                                </p>

                                {/* Glowing KPI Card */}
                                <div className="os-pro-kpi-box">
                                    <div className="os-pro-kpi-label">
                                        {dashboard.metricLabel}
                                    </div>
                                    <div className="os-pro-kpi-value-row">
                                        <div className="os-pro-kpi-val">
                                            {dashboard.metric}
                                        </div>
                                        <div className="os-pro-kpi-trend">
                                            <TrendingUp size={13} />
                                            <span>{dashboard.trend}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Modern Interactive Feature Cards */}
                                <div className="os-pro-features-grid">
                                    {dashboard.featureCards.map((feat, idx) => {
                                        const FeatIcon = feat.icon;
                                        return (
                                            <div
                                                className="os-pro-feature-card"
                                                key={idx}
                                            >
                                                <div
                                                    className={`os-pro-card-icon ${feat.tagColor}`}
                                                >
                                                    <FeatIcon size={18} />
                                                </div>
                                                <div className="os-pro-card-body">
                                                    <div className="os-pro-card-top">
                                                        <span className="os-pro-card-title">
                                                            {feat.title}
                                                        </span>
                                                        <span
                                                            className={`os-pro-card-tag ${feat.tagColor}`}
                                                        >
                                                            {feat.tag}
                                                        </span>
                                                    </div>
                                                    <p className="os-pro-card-desc">
                                                        {feat.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <button
                                className="os-pro-cta-btn"
                                type="button"
                                onClick={() => navigate('/signup')}
                            >
                                <span>Start 3-Day Free Trial</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        {/* Right Column: Sleek macOS Cockpit Window */}
                        <div className="os-pro-dashboard-window">
                            {/* Window Topbar */}
                            <div className="os-pro-window-topbar">
                                <div className="os-pro-window-dots">
                                    <span
                                        className="os-pro-dot red"
                                        title="Close"
                                    />
                                    <span
                                        className="os-pro-dot yellow"
                                        title="Minimize"
                                    />
                                    <span
                                        className="os-pro-dot green"
                                        title="Expand"
                                    />
                                </div>
                                <div className="os-pro-window-title">
                                    <span style={{ color: '#38bdf8' }}>⚡</span>
                                    <span>
                                        bizsync://cockpit.prod.live/
                                        {dashboard.id}
                                    </span>
                                </div>
                                <div className="os-pro-window-status">
                                    <span className="os-pro-pulse-dot" />
                                    <span>LIVE SYNC · 12ms PING</span>
                                </div>
                            </div>

                            {/* Window Content Body */}
                            <div className="os-pro-window-body">
                                {/* Metric Trio Row */}
                                <div className="os-pro-stat-grid">
                                    {dashboard.stats.map((st, idx) => (
                                        <div
                                            className="os-pro-stat-pill"
                                            key={idx}
                                        >
                                            <div className="os-pro-stat-sub">
                                                {st.label}
                                            </div>
                                            <div className="os-pro-stat-val">
                                                {st.value}
                                            </div>
                                            <div
                                                className={`os-pro-stat-change ${st.type}`}
                                            >
                                                {st.change}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tab-Specific High-Tech Visual Cockpit View */}
                                {dashboard.id === 'executive' && (
                                    <>
                                        {/* Floating Connected Channel Nodes */}
                                        <div className="os-pro-channel-pills">
                                            <div className="os-pro-channel-node">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="13"
                                                    height="13"
                                                    fill="#008060"
                                                >
                                                    <path d={siShopify.path} />
                                                </svg>
                                                <span>Shopify Store:</span>
                                                <span className="os-pro-channel-val">
                                                    ₹14,85,200
                                                </span>
                                            </div>
                                            <div className="os-pro-channel-node">
                                                <ShoppingBag
                                                    size={13}
                                                    color="#d97706"
                                                />
                                                <span>Amazon IN:</span>
                                                <span className="os-pro-channel-val">
                                                    ₹6,24,000
                                                </span>
                                            </div>
                                            <div className="os-pro-channel-node">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="13"
                                                    height="13"
                                                    fill="#16a34a"
                                                >
                                                    <path d={siWhatsapp.path} />
                                                </svg>
                                                <span>WhatsApp:</span>
                                                <span className="os-pro-channel-val">
                                                    ₹2,38,400
                                                </span>
                                            </div>
                                            <div className="os-pro-channel-node">
                                                <Store
                                                    size={13}
                                                    color="#7c3aed"
                                                />
                                                <span>B2B Direct:</span>
                                                <span className="os-pro-channel-val">
                                                    ₹1,38,000
                                                </span>
                                            </div>
                                        </div>

                                        {/* Glowing Multi-series Area Chart */}
                                        <div className="os-pro-chart-box">
                                            <div className="os-pro-chart-top">
                                                <span className="os-pro-chart-title">
                                                    Omnichannel Throughput &amp;
                                                    Velocity Radar
                                                </span>
                                                <div className="os-pro-chart-legend">
                                                    <span>
                                                        <i className="cyan" />{' '}
                                                        Inflow Telemetry
                                                    </span>
                                                    <span>
                                                        <i className="purple" />{' '}
                                                        Fulfillment SLA
                                                    </span>
                                                </div>
                                            </div>
                                            <svg
                                                className="os-pro-svg-chart"
                                                viewBox="0 0 500 105"
                                                preserveAspectRatio="none"
                                            >
                                                <defs>
                                                    <linearGradient
                                                        id="cockpitCyan"
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            stopColor="#2dd4bf"
                                                            stopOpacity="0.45"
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            stopColor="#2dd4bf"
                                                            stopOpacity="0"
                                                        />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="cockpitPurple"
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            stopColor="#818cf8"
                                                            stopOpacity="0.35"
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            stopColor="#818cf8"
                                                            stopOpacity="0"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                                <line
                                                    x1="0"
                                                    y1="20"
                                                    x2="500"
                                                    y2="20"
                                                    stroke="#e2e8f0"
                                                    strokeDasharray="4 4"
                                                />
                                                <line
                                                    x1="0"
                                                    y1="55"
                                                    x2="500"
                                                    y2="55"
                                                    stroke="#e2e8f0"
                                                    strokeDasharray="4 4"
                                                />
                                                <line
                                                    x1="0"
                                                    y1="90"
                                                    x2="500"
                                                    y2="90"
                                                    stroke="#e2e8f0"
                                                    strokeDasharray="4 4"
                                                />
                                                <path
                                                    d="M 0 95 Q 60 70, 120 75 T 240 45 T 360 20 T 500 25 L 500 105 L 0 105 Z"
                                                    fill="url(#cockpitCyan)"
                                                />
                                                <path
                                                    d="M 0 95 Q 60 70, 120 75 T 240 45 T 360 20 T 500 25"
                                                    fill="none"
                                                    stroke="#0d9488"
                                                    strokeWidth="2.5"
                                                />
                                                <path
                                                    d="M 0 100 Q 60 85, 120 90 T 240 60 T 360 40 T 500 35 L 500 105 L 0 105 Z"
                                                    fill="url(#cockpitPurple)"
                                                />
                                                <path
                                                    d="M 0 100 Q 60 85, 120 90 T 240 60 T 360 40 T 500 35"
                                                    fill="none"
                                                    stroke="#6366f1"
                                                    strokeWidth="2"
                                                    strokeDasharray="4 2"
                                                />
                                                <circle
                                                    cx="360"
                                                    cy="20"
                                                    r="4.5"
                                                    fill="#0d9488"
                                                />
                                                <circle
                                                    cx="360"
                                                    cy="20"
                                                    r="10"
                                                    fill="#0d9488"
                                                    opacity="0.25"
                                                />
                                            </svg>
                                        </div>
                                    </>
                                )}

                                {dashboard.id === 'sales' && (
                                    <div className="os-pro-funnel-card">
                                        <div className="os-pro-funnel-header">
                                            <span>
                                                <TrendingUp
                                                    size={14}
                                                    color="#2563eb"
                                                />
                                                Live 4-Stage Omnichannel
                                                Conversion Pipeline
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: '10.5px',
                                                    color: '#059669',
                                                }}
                                            >
                                                +18.4% WoW Velocity
                                            </span>
                                        </div>
                                        <div className="os-pro-funnel-grid">
                                            <div className="os-pro-funnel-step">
                                                <div className="os-pro-funnel-num">
                                                    STAGE 01
                                                </div>
                                                <div className="os-pro-funnel-val">
                                                    12,450
                                                </div>
                                                <div className="os-pro-funnel-label">
                                                    Store Visitors
                                                </div>
                                            </div>
                                            <div className="os-pro-funnel-step">
                                                <div className="os-pro-funnel-num">
                                                    STAGE 02
                                                </div>
                                                <div className="os-pro-funnel-val">
                                                    1,840
                                                </div>
                                                <div className="os-pro-funnel-label">
                                                    Added to Cart
                                                </div>
                                                <span className="os-pro-funnel-badge">
                                                    14.8%
                                                </span>
                                            </div>
                                            <div className="os-pro-funnel-step highlight">
                                                <div className="os-pro-funnel-num">
                                                    STAGE 03
                                                </div>
                                                <div className="os-pro-funnel-val">
                                                    420
                                                </div>
                                                <div className="os-pro-funnel-label">
                                                    WhatsApp Recovery
                                                </div>
                                                <span className="os-pro-funnel-badge">
                                                    28.4% Saved
                                                </span>
                                            </div>
                                            <div className="os-pro-funnel-step">
                                                <div className="os-pro-funnel-num">
                                                    STAGE 04
                                                </div>
                                                <div className="os-pro-funnel-val">
                                                    328
                                                </div>
                                                <div className="os-pro-funnel-label">
                                                    Paid &amp; Dispatched
                                                </div>
                                                <span className="os-pro-funnel-badge">
                                                    4.92% Net
                                                </span>
                                            </div>
                                        </div>

                                        {/* Omnichannel Attribution Split Meter */}
                                        <div
                                            style={{
                                                marginTop: '14px',
                                                paddingTop: '12px',
                                                borderTop:
                                                    '1px solid rgba(255, 255, 255, 0.08)',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '8px',
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    color: '#94a3b8',
                                                }}
                                            >
                                                <span>
                                                    OMNICHANNEL REVENUE
                                                    ATTRIBUTION SPLIT
                                                </span>
                                                <span
                                                    style={{
                                                        color: '#38bdf8',
                                                        fontFamily:
                                                            'JetBrains Mono, monospace',
                                                    }}
                                                >
                                                    ₹12,85,600 MTD
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    height: '8px',
                                                    borderRadius: '9999px',
                                                    overflow: 'hidden',
                                                    gap: '2px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: '44%',
                                                        background: '#10b981',
                                                    }}
                                                    title="Shopify Direct (44%)"
                                                />
                                                <div
                                                    style={{
                                                        width: '32%',
                                                        background: '#f59e0b',
                                                    }}
                                                    title="Amazon India FBA (32%)"
                                                />
                                                <div
                                                    style={{
                                                        width: '18%',
                                                        background: '#25d366',
                                                    }}
                                                    title="WhatsApp Commerce (18%)"
                                                />
                                                <div
                                                    style={{
                                                        width: '6%',
                                                        background: '#8b5cf6',
                                                    }}
                                                    title="B2B Wholesale PO (6%)"
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    gap: '14px',
                                                    marginTop: '7px',
                                                    fontSize: '10.5px',
                                                    color: '#cbd5e1',
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: '6px',
                                                            height: '6px',
                                                            borderRadius: '50%',
                                                            background:
                                                                '#10b981',
                                                        }}
                                                    />
                                                    Shopify Web 44%
                                                </span>
                                                <span
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: '6px',
                                                            height: '6px',
                                                            borderRadius: '50%',
                                                            background:
                                                                '#f59e0b',
                                                        }}
                                                    />
                                                    Amazon IN 32%
                                                </span>
                                                <span
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: '6px',
                                                            height: '6px',
                                                            borderRadius: '50%',
                                                            background:
                                                                '#25d366',
                                                        }}
                                                    />
                                                    WhatsApp 18%
                                                </span>
                                                <span
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: '6px',
                                                            height: '6px',
                                                            borderRadius: '50%',
                                                            background:
                                                                '#8b5cf6',
                                                        }}
                                                    />
                                                    B2B Wholesale 6%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {dashboard.id === 'inventory' && (
                                    <div className="os-pro-warehouse-card">
                                        <div className="os-pro-warehouse-header">
                                            <span>
                                                <Warehouse
                                                    size={14}
                                                    color="#7c3aed"
                                                />
                                                Multi-Node Fulfillment Hub
                                                Telemetry
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: '10.5px',
                                                    color: '#0d9488',
                                                }}
                                            >
                                                Auto-Balanced &middot; Sub-15ms
                                            </span>
                                        </div>
                                        <div className="os-pro-warehouse-grid">
                                            <div className="os-pro-hub-box primary">
                                                <div className="os-pro-hub-top">
                                                    <span className="os-pro-hub-name">
                                                        Bhiwandi Hub
                                                    </span>
                                                    <span className="os-pro-hub-units">
                                                        14,200
                                                    </span>
                                                </div>
                                                <div className="os-pro-hub-progress-track">
                                                    <div
                                                        className="os-pro-hub-progress-fill"
                                                        style={{ width: '92%' }}
                                                    />
                                                </div>
                                                <div className="os-pro-hub-foot">
                                                    <span>Primary West</span>
                                                    <span>92% Cap</span>
                                                </div>
                                            </div>
                                            <div className="os-pro-hub-box">
                                                <div className="os-pro-hub-top">
                                                    <span className="os-pro-hub-name">
                                                        Delhi NCR DC
                                                    </span>
                                                    <span className="os-pro-hub-units">
                                                        5,450
                                                    </span>
                                                </div>
                                                <div className="os-pro-hub-progress-track">
                                                    <div
                                                        className="os-pro-hub-progress-fill"
                                                        style={{ width: '68%' }}
                                                    />
                                                </div>
                                                <div className="os-pro-hub-foot">
                                                    <span>North Hub</span>
                                                    <span>68% Cap</span>
                                                </div>
                                            </div>
                                            <div className="os-pro-hub-box">
                                                <div className="os-pro-hub-top">
                                                    <span className="os-pro-hub-name">
                                                        Bengaluru DC
                                                    </span>
                                                    <span className="os-pro-hub-units">
                                                        6,800
                                                    </span>
                                                </div>
                                                <div className="os-pro-hub-progress-track">
                                                    <div
                                                        className="os-pro-hub-progress-fill"
                                                        style={{ width: '78%' }}
                                                    />
                                                </div>
                                                <div className="os-pro-hub-foot">
                                                    <span>South Hub</span>
                                                    <span>78% Cap</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {dashboard.id === 'finance' && (
                                    <div className="os-pro-reconcile-card">
                                        <div className="os-pro-reconcile-header">
                                            <span>
                                                <CircleDollarSign
                                                    size={14}
                                                    color="#d97706"
                                                />
                                                Dual-Rail Automated Bank
                                                Reconciliation
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: '10.5px',
                                                    color: '#059669',
                                                }}
                                            >
                                                99.2% Matched
                                            </span>
                                        </div>
                                        <div className="os-pro-reconcile-rails">
                                            <div className="os-pro-rail-box">
                                                <div className="os-pro-rail-title">
                                                    <span>Gateway Inflows</span>
                                                    <span
                                                        style={{
                                                            color: '#0d9488',
                                                        }}
                                                    >
                                                        ₹1,86,700
                                                    </span>
                                                </div>
                                                <div className="os-pro-rail-item">
                                                    <span>Razorpay Direct</span>
                                                    <span>₹1,48,200</span>
                                                </div>
                                                <div className="os-pro-rail-item">
                                                    <span>
                                                        Delhivery COD Batch
                                                    </span>
                                                    <span>₹38,500</span>
                                                </div>
                                            </div>
                                            <div className="os-pro-reconcile-bridge">
                                                <div className="os-pro-reconcile-lock">
                                                    <ShieldCheck size={16} />
                                                </div>
                                                <span
                                                    style={{
                                                        fontSize: '8.5px',
                                                        color: '#059669',
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    SYNCED
                                                </span>
                                            </div>
                                            <div className="os-pro-rail-box">
                                                <div className="os-pro-rail-title">
                                                    <span>
                                                        Ledger &amp; Bank
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: '#2563eb',
                                                        }}
                                                    >
                                                        Matched
                                                    </span>
                                                </div>
                                                <div className="os-pro-rail-item">
                                                    <span>
                                                        HDFC Current A/c
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: '#059669',
                                                        }}
                                                    >
                                                        ✓ Verified
                                                    </span>
                                                </div>
                                                <div className="os-pro-rail-item">
                                                    <span>
                                                        GST E-Invoice IRN
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: '#059669',
                                                        }}
                                                    >
                                                        #2841 Generated
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {dashboard.id === 'ai' && (
                                    <div className="os-pro-ai-board">
                                        <div className="os-pro-ai-query-box">
                                            <BrainCircuit
                                                size={16}
                                                color="#0d9488"
                                            />
                                            <span className="os-pro-ai-query-text">
                                                bizsync-brain &gt; &quot;Analyze
                                                West Zone SLA delay &amp;
                                                suggest auto-routing&quot;
                                            </span>
                                        </div>
                                        <div className="os-pro-ai-factors-grid">
                                            <div className="os-pro-ai-factor-pill">
                                                <span className="os-pro-ai-factor-label">
                                                    DETECTED BOTTLENECK
                                                </span>
                                                <span className="os-pro-ai-factor-val">
                                                    NH48 Weather Delay
                                                </span>
                                            </div>
                                            <div className="os-pro-ai-factor-pill">
                                                <span className="os-pro-ai-factor-label">
                                                    IMPACTED ORDERS
                                                </span>
                                                <span className="os-pro-ai-factor-val">
                                                    18 Shipments
                                                </span>
                                            </div>
                                            <div className="os-pro-ai-factor-pill">
                                                <span className="os-pro-ai-factor-label">
                                                    RECOMMENDED FIX
                                                </span>
                                                <span
                                                    className="os-pro-ai-factor-val"
                                                    style={{ color: '#059669' }}
                                                >
                                                    Delhivery Air Reroute
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* High-Density Live Records Table */}
                                <div className="os-pro-orders-card">
                                    <div className="os-pro-orders-header">
                                        <span>Active Stream Telemetry</span>
                                        <span
                                            style={{
                                                fontSize: '10px',
                                                color: '#0d9488',
                                                fontFamily: 'monospace',
                                                fontWeight: 800,
                                            }}
                                        >
                                            &bull; LIVE STREAMING
                                        </span>
                                    </div>
                                    {dashboard.orders.map((ord, idx) => (
                                        <div
                                            className="os-pro-order-row"
                                            key={idx}
                                        >
                                            <span className="os-pro-order-id">
                                                {ord.id}
                                            </span>
                                            <span className="os-pro-order-channel">
                                                {ord.channel
                                                    .toLowerCase()
                                                    .includes('shopify') && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        width="12"
                                                        height="12"
                                                        fill="#008060"
                                                        style={{
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <path
                                                            d={siShopify.path}
                                                        />
                                                    </svg>
                                                )}
                                                {ord.channel
                                                    .toLowerCase()
                                                    .includes('whatsapp') && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        width="12"
                                                        height="12"
                                                        fill="#16a34a"
                                                        style={{
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <path
                                                            d={siWhatsapp.path}
                                                        />
                                                    </svg>
                                                )}
                                                {ord.channel
                                                    .toLowerCase()
                                                    .includes('razorpay') && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        width="12"
                                                        height="12"
                                                        fill="#0284c7"
                                                        style={{
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <path
                                                            d={siRazorpay.path}
                                                        />
                                                    </svg>
                                                )}
                                                {ord.channel
                                                    .toLowerCase()
                                                    .includes('amazon') && (
                                                    <ShoppingBag
                                                        size={12}
                                                        color="#d97706"
                                                        style={{
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                )}
                                                {(ord.channel
                                                    .toLowerCase()
                                                    .includes('hub') ||
                                                    ord.channel
                                                        .toLowerCase()
                                                        .includes('central') ||
                                                    ord.channel
                                                        .toLowerCase()
                                                        .includes('dc')) && (
                                                    <Warehouse
                                                        size={12}
                                                        color="#7c3aed"
                                                        style={{
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                )}
                                                {(ord.channel
                                                    .toLowerCase()
                                                    .includes('b2b') ||
                                                    ord.channel
                                                        .toLowerCase()
                                                        .includes(
                                                            'corporate',
                                                        )) && (
                                                    <Store
                                                        size={12}
                                                        color="#6366f1"
                                                        style={{
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                )}
                                                <span>{ord.channel}</span>
                                            </span>
                                            <span className="os-pro-order-val">
                                                {ord.amount}
                                            </span>
                                            <span
                                                className={`os-pro-badge-status ${ord.statusType}`}
                                            >
                                                {ord.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Grounded AI Action Card */}
                                <div className="os-pro-ai-card">
                                    <div className="os-pro-ai-info">
                                        <BrainCircuit size={18} />
                                        <div className="os-pro-ai-text">
                                            <strong>
                                                {dashboard.aiAlert.title}:
                                            </strong>{' '}
                                            {dashboard.aiAlert.text}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="os-pro-ai-btn"
                                        onClick={() => navigate('/signup')}
                                    >
                                        {dashboard.aiAlert.action} &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="os-intelligence-section os-section"
                ref={aiBrainRef}
            >
                <video
                    className="os-ai-video-background"
                    ref={aiVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                >
                    <source src="/images/bg.mp4" type="video/mp4" />
                </video>
                <div className="os-shell os-intelligence-layout">
                    <motion.article className="os-ai-panel" {...fadeUp()}>
                        <p className="os-eyebrow">
                            ONE AI AGENT · EVERY CHANNEL · EVERY ACTION
                        </p>
                        <h2>
                            One AI Agent.
                            <br />
                            Across <span>every channel &amp; action.</span>
                        </h2>
                        <p>
                            Not just a chatbot &mdash; an autonomous operational
                            copilot that monitors sales velocity, recovers
                            abandoned WhatsApp checkouts, re-routes delayed
                            courier shipments, and audits gateway fees in real
                            time.
                        </p>
                        <button
                            className="os-button os-button-light"
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            Explore AI Business Brain <ArrowRight size={16} />
                        </button>
                        <button
                            className="os-ai-demo-link"
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            <span>
                                <Play size={11} fill="currentColor" />
                            </span>{' '}
                            See how it works
                        </button>
                        <div
                            className="os-signal-flow"
                            aria-label="How BizSyncOS turns data into action"
                        >
                            <article>
                                <span>
                                    <Database size={23} />
                                </span>
                                <div>
                                    <strong>Your Data</strong>
                                    <small>Connected &amp; secure</small>
                                </div>
                            </article>
                            <i aria-hidden="true" />
                            <article>
                                <span>
                                    <BarChart3 size={23} />
                                </span>
                                <div>
                                    <strong>AI Analysis</strong>
                                    <small>Finds what matters</small>
                                </div>
                            </article>
                            <i aria-hidden="true" />
                            <article>
                                <span>
                                    <Sparkles size={23} />
                                </span>
                                <div>
                                    <strong>Business Insight</strong>
                                    <small>Clear &amp; actionable</small>
                                </div>
                            </article>
                            <i aria-hidden="true" />
                            <article>
                                <span>
                                    <Target size={23} />
                                </span>
                                <div>
                                    <strong>Action</strong>
                                    <small>Make an impact</small>
                                </div>
                            </article>
                        </div>
                    </motion.article>
                    {/* <img className="os-ai-brain-image" src="/images/ai.png" alt="" /> */}
                    <div className="os-callout os-callout-understands">
                        <Database size={17} />
                        <span>Your Data</span>
                    </div>
                    <div className="os-callout os-callout-learns">
                        <BrainCircuit size={17} />
                        <span>AI Analysis</span>
                    </div>
                    <div className="os-callout os-callout-speaks">
                        <Zap size={17} />
                        <span>Actionable Insight</span>
                    </div>
                    <motion.aside
                        className="os-ai-reasoning-rail"
                        {...fadeUp(0.06)}
                    >
                        <svg
                            className="os-ai-rail-path"
                            viewBox="0 0 210 460"
                            aria-hidden="true"
                        >
                            <path d="M104 28 C68 80 147 104 105 168 S151 246 104 309 S151 381 100 443" />
                            <path
                                className="signal"
                                d="M104 28 C68 80 147 104 105 168 S151 246 104 309 S151 381 100 443"
                            />
                        </svg>
                        <div className="os-ai-rail-node os-ai-data-node">
                            <span>
                                <Database size={20} />
                            </span>
                            <strong>Your Data</strong>
                            <small>
                                Orders, inventory,
                                <br />
                                payments, CRM &amp; more
                            </small>
                        </div>
                        <i className="os-ai-rail-line top" aria-hidden="true" />
                        <div className="os-ai-brain-core">
                            <i aria-hidden="true" />
                            <i aria-hidden="true" />
                            <i aria-hidden="true" />
                            <span>
                                <BrainCircuit size={34} />
                            </span>
                        </div>
                        <i
                            className="os-ai-rail-line bottom"
                            aria-hidden="true"
                        />
                        <div className="os-ai-rail-node os-ai-analysis-node">
                            <span>
                                <Sparkles size={20} />
                            </span>
                            <strong>AI Analysis</strong>
                            <small>
                                Pattern detection,
                                <br />
                                anomaly &amp; trend analysis
                            </small>
                        </div>
                        <i
                            className="os-ai-rail-line bottom"
                            aria-hidden="true"
                        />
                        <div className="os-ai-rail-node os-ai-action-node">
                            <span>
                                <ArrowRight size={20} />
                            </span>
                            <strong>Actionable Insight</strong>
                            <small>
                                Clear recommendations
                                <br />
                                with next steps
                            </small>
                        </div>
                    </motion.aside>
                    <motion.article className="os-ai-chat" {...fadeUp(0.1)}>
                        <div className="os-ai-neural" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                            <i />
                            <i />
                        </div>
                        <div className="os-ai-chat-top">
                            <span>
                                <BrainCircuit size={17} /> BizSync AI
                            </span>
                            <i>Grounded</i>
                        </div>
                        <div className="os-ai-question">
                            <small>YOU</small>
                            <p>Why did sales drop yesterday?</p>
                        </div>
                        <div className="os-ai-answer">
                            <small>BIZSYNC AI · EVIDENCE READY</small>
                            <p>
                                Product A was out of stock, COD confirmation
                                failures increased, and repeat purchases
                                declined.
                            </p>
                            <div className="os-ai-reasoning">
                                <span>
                                    <i />
                                    <i />
                                    <i /> Analysing authorized signals
                                </span>
                                <div>
                                    <span>
                                        <PackageCheck size={13} /> Inventory
                                    </span>
                                    <span>
                                        <CreditCard size={13} /> Payments
                                    </span>
                                    <span>
                                        <BarChart3 size={13} /> Sales trend
                                    </span>
                                </div>
                            </div>
                            <div className="os-ai-factors">
                                <strong>Top contributing factors</strong>
                                <span>
                                    COD payment failures{' '}
                                    <i>
                                        <b style={{ width: '58%' }} />
                                    </i>
                                    <em>58%</em>
                                </span>
                                <span>
                                    Repeat purchase decline{' '}
                                    <i>
                                        <b style={{ width: '24%' }} />
                                    </i>
                                    <em>24%</em>
                                </span>
                                <span>
                                    Out of stock (Product A){' '}
                                    <i>
                                        <b style={{ width: '18%' }} />
                                    </i>
                                    <em>18%</em>
                                </span>
                            </div>
                            <div className="os-ai-recommendations">
                                <strong>Recommended next steps</strong>
                                <span>
                                    <CheckCircle2 size={14} /> Restock Product A
                                </span>
                                <span>
                                    <CheckCircle2 size={14} /> Send COD
                                    confirmation
                                </span>
                                <span>
                                    <CheckCircle2 size={14} /> Launch
                                    repeat-purchase campaign
                                </span>
                            </div>
                            <footer>
                                <b>Approval required</b>
                                <button type="button">
                                    Review evidence <ArrowRight size={14} />
                                </button>
                            </footer>
                        </div>
                    </motion.article>
                </div>
            </section>

            {/* 6. Why Businesses Choose BizSyncOS Over the Rest (Dual Showdown & Comparison Matrix) */}
            {/* 6. Why Businesses Choose BizSyncOS Over Odoo, Zoho & Unicommerce */}
            {/* 6. Why Businesses Choose BizSyncOS Over The Rest (Reference: GrowBro.ai) */}
            {/* 6. Why Businesses Choose BizSyncOS Over The Rest (Branded Comparison Table) */}
            <section className="os-comparison-section" id="comparison">
                <div className="os-shell">
                    <div className="os-theme-comp-header">
                        <div className="os-pro-badge">
                            <ArrowLeftRight size={13} />
                            <span>THE DEFINITIVE COMPARISON</span>
                        </div>
                        <h2 className="os-pro-title">
                            Why businesses choose{' '}
                            <span className="os-pro-gradient">BizSyncOS</span>{' '}
                            over the rest
                        </h2>
                        <p className="os-pro-desc">
                            Compare our unified autonomous operating engine
                            against traditional ERPs, multi-app suites, and
                            legacy warehouse software.
                        </p>
                    </div>

                    <div className="os-theme-comp-wrap">
                        <table className="os-theme-comp-table">
                            <thead>
                                <tr>
                                    <th className="th-feature">
                                        Operational Capability
                                    </th>
                                    <th className="th-bizsync">
                                        ⚡ BizSyncOS{' '}
                                        <span className="th-badge">
                                            UNIFIED
                                        </span>
                                    </th>
                                    <th className="th-competitor">Odoo ERP</th>
                                    <th className="th-competitor">Zoho One</th>
                                    <th className="th-competitor">
                                        Unicommerce
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Sub-15ms Real-Time Stock Lock
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Universal stock lock across Shopify,
                                            Amazon &amp; POS
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-check-circle">
                                            <Check
                                                size={14}
                                                strokeWidth={2.8}
                                            />
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            15–30m Lag
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-fail">
                                            15–45m Lag
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            10–20m Lag
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            WhatsApp Cart Recovery &amp;
                                            Checkout Links
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Native 2-way AI winback with
                                            Razorpay checkout
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-check-circle">
                                            <Check
                                                size={14}
                                                strokeWidth={2.8}
                                            />
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-fail">
                                            3rd-Party Module
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            Basic Add-on
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-fail">
                                            None (OMS Only)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Automated Bank &amp; COD
                                            Reconciliation
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Daily 2-way matching down to the
                                            rupee
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-check-circle">
                                            <Check
                                                size={14}
                                                strokeWidth={2.8}
                                            />
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            Manual CSV
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            Books Only
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-fail">
                                            None (Manual Excel)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Courier SLA &amp; RTO Defense
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Delhivery &amp; Shiprocket
                                            auto-reroute before delay
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-check-circle">
                                            <Check
                                                size={14}
                                                strokeWidth={2.8}
                                            />
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-gray-cross">
                                            ✕
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            Partial
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-gray-check">
                                            ✓
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Autonomous Gemini AI Operations
                                            Copilot
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Real-time inventory forecasting
                                            &amp; dispatch defense
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-check-circle">
                                            <Check
                                                size={14}
                                                strokeWidth={2.8}
                                            />
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-gray-cross">
                                            ✕
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            Zia Chatbot
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-gray-cross">
                                            ✕
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Multi-Node Regional Warehouse
                                            Routing
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Bhiwandi, NCR &amp; BLR split batch
                                            fulfillment
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-check-circle">
                                            <Check
                                                size={14}
                                                strokeWidth={2.8}
                                            />
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            Custom Setup
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-warn">
                                            Basic
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-gray-check">
                                            ✓
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            No-Code Setup &amp; 1-Click
                                            Connectors
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Official certified OAuth
                                            integrations
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-check-circle">
                                            <Check
                                                size={14}
                                                strokeWidth={2.8}
                                            />
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-fail">
                                            Python Devs
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-gray-check">
                                            ✓
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        <span className="os-theme-gray-check">
                                            ✓
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Time to Go Live
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            From signup to active order routing
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-val-bizsync">
                                            &lt; 5 Minutes
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        3–6 Months
                                    </td>
                                    <td className="td-competitor">4–8 Weeks</td>
                                    <td className="td-competitor">2–4 Weeks</td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Per-Order GMV Take-Rate Tax
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Transaction cuts charged on your
                                            sales
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-val-bizsync">
                                            0% (Never)
                                        </span>
                                    </td>
                                    <td className="td-competitor">0%</td>
                                    <td className="td-competitor">0%</td>
                                    <td className="td-competitor">
                                        <span className="os-theme-tag-fail">
                                            0.5% – 1.5%
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Implementation &amp; Consultant Cost
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Initial partner onboarding fees
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-val-bizsync">
                                            ₹0
                                        </span>
                                    </td>
                                    <td className="td-competitor">
                                        ₹1.5L – ₹5L+
                                    </td>
                                    <td className="td-competitor">
                                        ₹30k – ₹75k
                                    </td>
                                    <td className="td-competitor">
                                        ₹25k – ₹50k
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-feature">
                                        <span className="os-theme-feat-title">
                                            Free Live Trial Access
                                        </span>
                                        <span className="os-theme-feat-desc">
                                            Full feature sandbox with real
                                            orders
                                        </span>
                                    </td>
                                    <td className="td-bizsync">
                                        <span className="os-theme-val-bizsync">
                                            Instant 3-Day Live
                                        </span>
                                    </td>
                                    <td className="td-competitor">Demo Only</td>
                                    <td className="td-competitor">14 Days</td>
                                    <td className="td-competitor">Demo Only</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="os-theme-table-footer">
                            ⚡ Built for high-velocity D2C, omnichannel retail
                            &amp; multi-node B2B brands.{' '}
                            <span className="accent">
                                Migrate in 5 minutes with zero operational
                                downtime.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Live in 5 Minutes (Minimal Connected Pipeline) */}
            <section className="os-five-minutes-section" id="onboarding">
                <div className="os-shell">
                    <div className="os-five-minutes-header">
                        <div className="os-pro-badge">
                            <Zap size={13} />
                            <span>FRICTIONLESS ONBOARDING</span>
                        </div>
                        <h2 className="os-pro-title">
                            Live in 5 minutes.{' '}
                            <span className="os-pro-gradient">
                                No code. No developer.
                            </span>
                        </h2>
                        <p className="os-pro-desc">
                            Plug in your existing sales channels, accounting
                            tools, and couriers with 1-click OAuth. Historical
                            data maps and operations sync automatically.
                        </p>
                    </div>

                    <div className="os-five-timeline-grid">
                        {/* Step 1 */}
                        <div className="os-five-timeline-card">
                            <div>
                                <div className="os-five-card-top">
                                    <div className="os-five-step-badge">
                                        <Zap size={20} />
                                    </div>
                                    <span className="os-five-step-pill">
                                        STEP 01 &middot; 60s
                                    </span>
                                </div>
                                <h3 className="os-five-step-title">
                                    Connect Channels
                                </h3>
                                <p className="os-five-step-desc">
                                    Authorize Shopify, Amazon India, WhatsApp
                                    Business, &amp; Razorpay in 1 click. Zero
                                    custom API programming required.
                                </p>
                            </div>
                            <div className="os-five-step-tags">
                                <span className="os-five-tag-item">
                                    <CheckCircle2 size={13} /> Certified 1-Click
                                    OAuth
                                </span>
                                <span className="os-five-tag-item">
                                    <CheckCircle2 size={13} /> Instant SKU
                                    Ingestion
                                </span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="os-five-timeline-card">
                            <div>
                                <div className="os-five-card-top">
                                    <div className="os-five-step-badge">
                                        <Database size={20} />
                                    </div>
                                    <span className="os-five-step-pill">
                                        STEP 02 &middot; 180s
                                    </span>
                                </div>
                                <h3 className="os-five-step-title">
                                    Auto-Map &amp; Reconcile
                                </h3>
                                <p className="os-five-step-desc">
                                    BizSyncOS auto-cleans barcodes, removes
                                    duplicate customer profiles, and unifies
                                    stock levels across all warehouse physical
                                    hubs.
                                </p>
                            </div>
                            <div className="os-five-step-tags">
                                <span className="os-five-tag-item">
                                    <CheckCircle2 size={13} /> Barcode
                                    Deduplication
                                </span>
                                <span className="os-five-tag-item">
                                    <CheckCircle2 size={13} /> 30-Day Auto Audit
                                </span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="os-five-timeline-card">
                            <div>
                                <div className="os-five-card-top">
                                    <div className="os-five-step-badge">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="os-five-step-pill">
                                        STEP 03 &middot; 60s
                                    </span>
                                </div>
                                <h3 className="os-five-step-title">
                                    Activate AI Guardrails
                                </h3>
                                <p className="os-five-step-desc">
                                    Flip on autonomous courier SLA tracking,
                                    automated WhatsApp cart recovery, and
                                    real-time 2-way bank reconciliation.
                                </p>
                            </div>
                            <div className="os-five-step-tags">
                                <span className="os-five-tag-item">
                                    <CheckCircle2 size={13} /> Proactive SLA
                                    Defense
                                </span>
                                <span className="os-five-tag-item">
                                    <CheckCircle2 size={13} /> 2-Way Bank Audit
                                    Live
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="os-five-footer-badge">
                        <div className="os-five-metric-pill">
                            <span className="os-five-metric-dot" />
                            <span>
                                Average merchant onboarding time:{' '}
                                <strong>4 mins 38 secs</strong> across 1,200+
                                brands
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="os-built-for-business-section" id="solutions">
                <div className="os-shell">
                    <div className="os-built-header">
                        <div className="os-pro-badge">
                            <Building2 size={13} />
                            <span>TAILORED WORKFLOWS</span>
                        </div>
                        <h2 className="os-pro-title">
                            Built for how modern commerce{' '}
                            <span className="os-pro-gradient">
                                actually runs
                            </span>
                        </h2>
                        <p className="os-pro-desc">
                            Whether you ship 500 orders a day or operate
                            multi-location wholesale warehouses, BizSyncOS
                            adapts to your operational model.
                        </p>
                    </div>

                    <div className="os-built-grid">
                        <div className="os-built-card">
                            <div>
                                <div className="os-built-icon-wrap teal">
                                    <ShoppingBag size={22} />
                                </div>
                                <h3 className="os-built-title">D2C Brands</h3>
                                <p className="os-built-desc">
                                    High-velocity flash sales, sub-15ms
                                    inventory sync across Shopify and Amazon,
                                    and autonomous WhatsApp cart recovery.
                                </p>
                            </div>
                            <div className="os-built-tags">
                                <span className="os-built-tag">
                                    Flash Sale Ready
                                </span>
                                <span className="os-built-tag">
                                    28.4% Recovery
                                </span>
                                <span className="os-built-tag">COD Shield</span>
                            </div>
                        </div>

                        <div className="os-built-card">
                            <div>
                                <div className="os-built-icon-wrap blue">
                                    <Store size={22} />
                                </div>
                                <h3 className="os-built-title">
                                    Omnichannel Retail
                                </h3>
                                <p className="os-built-desc">
                                    Connect physical store POS counters with
                                    online inventory. Ship-from-store, in-store
                                    pickups, and unified buyer loyalty.
                                </p>
                            </div>
                            <div className="os-built-tags">
                                <span className="os-built-tag">POS Sync</span>
                                <span className="os-built-tag">
                                    Store Pickup
                                </span>
                                <span className="os-built-tag">
                                    360° Loyalty
                                </span>
                            </div>
                        </div>

                        <div className="os-built-card">
                            <div>
                                <div className="os-built-icon-wrap violet">
                                    <CreditCard size={22} />
                                </div>
                                <h3 className="os-built-title">
                                    B2B Wholesalers
                                </h3>
                                <p className="os-built-desc">
                                    Custom tier rate cards, instant GST
                                    e-invoicing &amp; e-Way bills, purchase
                                    order credit approvals, and bulk quotations.
                                </p>
                            </div>
                            <div className="os-built-tags">
                                <span className="os-built-tag">
                                    Custom Rates
                                </span>
                                <span className="os-built-tag">
                                    GST e-Invoicing
                                </span>
                                <span className="os-built-tag">PO Credit</span>
                            </div>
                        </div>

                        <div className="os-built-card">
                            <div>
                                <div className="os-built-icon-wrap amber">
                                    <Warehouse size={22} />
                                </div>
                                <h3 className="os-built-title">
                                    Multi-Node Warehouses
                                </h3>
                                <p className="os-built-desc">
                                    Route orders to the closest fulfillment hub
                                    (Bhiwandi, Delhi NCR, Bengaluru) with
                                    automated batch picking and barcode pack
                                    stations.
                                </p>
                            </div>
                            <div className="os-built-tags">
                                <span className="os-built-tag">
                                    Regional Routing
                                </span>
                                <span className="os-built-tag">Batch Pick</span>
                                <span className="os-built-tag">
                                    Sub-15ms Sync
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="os-case-studies-section" id="case-studies">
                <div className="os-shell">
                    <div className="os-case-studies-header">
                        <div className="os-pro-badge">
                            <Sparkles size={13} />
                            <span>PROVEN RESULTS AT SCALE</span>
                        </div>
                        <h2 className="os-pro-title">
                            Businesses Already Running on{' '}
                            <span className="os-pro-gradient">BizSyncOS</span>
                        </h2>
                        <p className="os-pro-desc">
                            Real numbers from founders and operations leaders
                            who replaced scattered spreadsheets with our unified
                            real-time operating engine.
                        </p>
                    </div>

                    <div className="os-case-studies-grid">
                        <div className="os-case-study-card">
                            <div>
                                <span className="os-case-study-badge">
                                    D2C FASHION &amp; APPAREL &middot; MUMBAI
                                </span>
                                <div className="os-case-metrics-trio">
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            +34%
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            Revenue Lift
                                        </span>
                                    </div>
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            ₹4.8L
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            WhatsApp Saved
                                        </span>
                                    </div>
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            99.8%
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            Stock Accuracy
                                        </span>
                                    </div>
                                </div>
                                <p className="os-case-quote">
                                    &ldquo;We used to spend 3 hours every
                                    morning matching Shopify orders with
                                    warehouse packing slips. With BizSyncOS,
                                    dispatch happens in under 4 minutes with
                                    zero overselling.&rdquo;
                                </p>
                            </div>
                            <div className="os-case-author">
                                <img
                                    src="/images/testimonials/customer-1.jpg"
                                    alt="Chetan Siyal"
                                    className="os-case-avatar-img"
                                />
                                <div className="os-case-author-info">
                                    <span className="os-case-author-name">
                                        Chetan Siyal
                                    </span>
                                    <span className="os-case-author-role">
                                        Co-Founder &amp; COO, Snitch
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="os-case-study-card">
                            <div>
                                <span
                                    className="os-case-study-badge"
                                    style={{
                                        color: '#059669',
                                        background: 'rgba(16, 185, 129, 0.08)',
                                    }}
                                >
                                    D2C SKINCARE &amp; BEAUTY &middot; JAIPUR
                                    &amp; BLR
                                </span>
                                <div className="os-case-metrics-trio">
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            0
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            Oversold Units
                                        </span>
                                    </div>
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            12ms
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            Sync Latency
                                        </span>
                                    </div>
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            130h
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            Saved/Month
                                        </span>
                                    </div>
                                </div>
                                <p className="os-case-quote">
                                    &ldquo;During the festive peak rush,
                                    managing 22,000 orders across Amazon, Quick
                                    Commerce, and our D2C store without
                                    stockouts seemed impossible. BizSyncOS
                                    automated our multi-warehouse allocation and
                                    Tally reconciliation flawlessly.&rdquo;
                                </p>
                            </div>
                            <div className="os-case-author">
                                <img
                                    src="/images/testimonials/customer-2.jpg"
                                    alt="Pooja Sharma"
                                    className="os-case-avatar-img"
                                />
                                <div className="os-case-author-info">
                                    <span className="os-case-author-name">
                                        Pooja Sharma
                                    </span>
                                    <span className="os-case-author-role">
                                        VP Supply Chain &amp; Operations,
                                        Minimalist
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="os-case-study-card">
                            <div>
                                <span
                                    className="os-case-study-badge"
                                    style={{
                                        color: '#7c3aed',
                                        background: 'rgba(124, 58, 237, 0.08)',
                                    }}
                                >
                                    PREMIUM OMNICHANNEL RETAIL &middot; MUMBAI
                                </span>
                                <div className="os-case-metrics-trio">
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            -41%
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            COD RTO Cut
                                        </span>
                                    </div>
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            ₹6.20
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            Saved/Shipment
                                        </span>
                                    </div>
                                    <div className="os-case-metric-box">
                                        <span className="os-case-metric-val">
                                            100%
                                        </span>
                                        <span className="os-case-metric-lbl">
                                            SLA Delivered
                                        </span>
                                    </div>
                                </div>
                                <p className="os-case-quote">
                                    &ldquo;Pre-dispatch address verification and
                                    automated WhatsApp confirmation cut our RTO
                                    rate from 29% to 17% in 60 days. The
                                    automated rate-shopping engine across
                                    Delhivery and Bluedart saves us lakhs every
                                    month in freight.&rdquo;
                                </p>
                            </div>
                            <div className="os-case-author">
                                <img
                                    src="/images/testimonials/customer-3.jpg"
                                    alt="Vikramaditya Mehta"
                                    className="os-case-avatar-img"
                                />
                                <div className="os-case-author-info">
                                    <span className="os-case-author-name">
                                        Vikramaditya Mehta
                                    </span>
                                    <span className="os-case-author-role">
                                        Head of Logistics &amp; Fulfillment,
                                        Rare Rabbit
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Automation With Accountability (Modern SaaS Workflow Studio) */}
            <section className="os-automation-section" id="automation">
                <div className="os-shell">
                    <div className="os-automation-header">
                        <div className="os-pro-badge">
                            <Workflow size={13} />
                            <span>
                                AUTONOMOUS WORKFLOWS WITH HUMAN GUARDRAILS
                            </span>
                        </div>
                        <h2 className="os-pro-title">
                            Automate operations.{' '}
                            <span className="os-pro-gradient">
                                Keep people in control.
                            </span>
                        </h2>
                        <p className="os-pro-desc">
                            Deploy self-executing triggers for COD risk scoring,
                            stock allocation, and courier escalation — while
                            requiring human approval for high-risk actions.
                        </p>
                    </div>

                    {/* Interactive Studio Canvas */}
                    <div className="os-auto-studio">
                        <div className="os-auto-studio-topbar">
                            <div className="os-auto-studio-title">
                                <span className="os-auto-studio-dot" />
                                <span>
                                    Active Rule: High-Risk COD Fraud &amp; RTO
                                    Shield
                                </span>
                            </div>
                            <div className="os-auto-studio-stats">
                                <span>
                                    Trigger Engine: <strong>Sub-12ms</strong>
                                </span>
                                <span className="os-auto-studio-stat-pill">
                                    99.4% Autonomous Execution
                                </span>
                            </div>
                        </div>

                        <div className="os-auto-pipeline">
                            {/* Node 1: Event Trigger */}
                            <div className="os-auto-node">
                                <div>
                                    <div className="os-auto-node-top">
                                        <div className="os-auto-node-icon blue">
                                            <ShoppingCart size={18} />
                                        </div>
                                        <span className="os-auto-node-step">
                                            01
                                        </span>
                                    </div>
                                    <span className="os-auto-node-tag">
                                        EVENT TRIGGER
                                    </span>
                                    <h3 className="os-auto-node-title">
                                        New Order Inflow
                                    </h3>
                                    <p className="os-auto-node-desc">
                                        Shopify / Amazon India checkout received
                                        in real-time buffer.
                                    </p>
                                </div>
                                <span className="os-auto-node-badge blue">
                                    <CheckCircle2 size={12} /> Instant Ingestion
                                </span>
                            </div>

                            {/* Node 2: Rule Filter */}
                            <div className="os-auto-node">
                                <div>
                                    <div className="os-auto-node-top">
                                        <div className="os-auto-node-icon indigo">
                                            <ClipboardList size={18} />
                                        </div>
                                        <span className="os-auto-node-step">
                                            02
                                        </span>
                                    </div>
                                    <span className="os-auto-node-tag">
                                        RULE ENGINE
                                    </span>
                                    <h3 className="os-auto-node-title">
                                        Payment Filter
                                    </h3>
                                    <p className="os-auto-node-desc">
                                        Detect payment mode = COD and cart value
                                        exceeds ₹3,000 threshold.
                                    </p>
                                </div>
                                <span className="os-auto-node-badge indigo">
                                    <CheckCircle2 size={12} /> Condition Met
                                </span>
                            </div>

                            {/* Node 3: AI Brain */}
                            <div className="os-auto-node">
                                <div>
                                    <div className="os-auto-node-top">
                                        <div className="os-auto-node-icon purple">
                                            <BrainCircuit size={18} />
                                        </div>
                                        <span className="os-auto-node-step">
                                            03
                                        </span>
                                    </div>
                                    <span className="os-auto-node-tag">
                                        AI INFERENCE
                                    </span>
                                    <h3 className="os-auto-node-title">
                                        Gemini RTO Predictor
                                    </h3>
                                    <p className="os-auto-node-desc">
                                        Customer address verification flags 68%
                                        high RTO return probability.
                                    </p>
                                </div>
                                <span className="os-auto-node-badge purple">
                                    <CheckCircle2 size={12} /> Action Proposed
                                </span>
                            </div>

                            {/* Node 4: Human Guardrail (Crucial) */}
                            <div className="os-auto-node is-guardrail">
                                <div>
                                    <div className="os-auto-node-top">
                                        <div className="os-auto-node-icon amber">
                                            <ShieldAlert size={18} />
                                        </div>
                                        <span className="os-auto-node-step">
                                            04
                                        </span>
                                    </div>
                                    <span
                                        className="os-auto-node-tag"
                                        style={{ color: '#d97706' }}
                                    >
                                        HUMAN GUARDRAIL
                                    </span>
                                    <h3 className="os-auto-node-title">
                                        Manager Approval
                                    </h3>
                                    <p className="os-auto-node-desc">
                                        Order placed on hold. Manager receives
                                        1-click WhatsApp review alert.
                                    </p>
                                </div>
                                <span className="os-auto-node-badge amber">
                                    <ShieldCheck size={12} /> Approval Required
                                </span>
                            </div>

                            {/* Node 5: Autonomous Action */}
                            <div className="os-auto-node">
                                <div>
                                    <div className="os-auto-node-top">
                                        <div className="os-auto-node-icon emerald">
                                            <Zap size={18} />
                                        </div>
                                        <span className="os-auto-node-step">
                                            05
                                        </span>
                                    </div>
                                    <span className="os-auto-node-tag">
                                        EXECUTION
                                    </span>
                                    <h3 className="os-auto-node-title">
                                        WhatsApp Prepay
                                    </h3>
                                    <p className="os-auto-node-desc">
                                        Send Razorpay discount link. Convert COD
                                        to Prepaid in 0.4s.
                                    </p>
                                </div>
                                <span className="os-auto-node-badge emerald">
                                    <CheckCircle2 size={12} /> Auto-Executed
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 3 Capability Pillars */}
                    <div className="os-auto-pillars">
                        <div className="os-auto-pillar-card">
                            <h4>
                                <ShieldCheck
                                    size={17}
                                    style={{ color: '#0284c7' }}
                                />
                                100% Fail-Safe Guardrails
                            </h4>
                            <p>
                                High-risk actions like large refunds, manual
                                price overrides, and SKU deletions always
                                require human sign-off before execution.
                            </p>
                        </div>
                        <div className="os-auto-pillar-card">
                            <h4>
                                <Zap size={17} style={{ color: '#10b981' }} />
                                Sub-15ms Event Engine
                            </h4>
                            <p>
                                Powered by high-speed streaming workers capable
                                of processing 50,000+ omnichannel events per
                                minute with zero lag.
                            </p>
                        </div>
                        <div className="os-auto-pillar-card">
                            <h4>
                                <Workflow
                                    size={17}
                                    style={{ color: '#8b5cf6' }}
                                />
                                Direct Channel Actions
                            </h4>
                            <p>
                                Trigger actions directly across official Meta
                                WhatsApp Cloud API, Delhivery courier dispatch,
                                and Razorpay payouts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. Modern SaaS FAQ Section */}
            <section className="os-faq-section" id="faq">
                <div className="os-shell">
                    <div className="os-faq-header">
                        <div className="os-pro-badge">
                            <MessageSquareText size={13} />
                            <span>FREQUENTLY ASKED QUESTIONS</span>
                        </div>
                        <h2 className="os-pro-title">
                            Everything you need to know about{' '}
                            <span className="os-pro-gradient">BizSyncOS</span>
                        </h2>
                        <p className="os-pro-desc">
                            Direct, transparent answers to questions high-growth
                            brands ask about real-time sync, zero-downtime
                            migration, and automated reconciliation.
                        </p>
                    </div>

                    <div className="os-faq-container">
                        {faqItems.map(
                            ({ question, answer, category }, index) => (
                                <div
                                    className={`os-faq-card ${openFaq === index ? 'open' : ''}`}
                                    key={question}
                                >
                                    <button
                                        type="button"
                                        className="os-faq-btn"
                                        onClick={() =>
                                            setOpenFaq(
                                                openFaq === index
                                                    ? null
                                                    : index,
                                            )
                                        }
                                        aria-expanded={openFaq === index}
                                    >
                                        <div className="os-faq-question-wrap">
                                            <span className="os-faq-q-num">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                            <span className="os-faq-q-text">
                                                {question}
                                            </span>
                                        </div>
                                        <span className="os-faq-chevron">
                                            <ChevronDown size={17} />
                                        </span>
                                    </button>
                                    {openFaq === index ? (
                                        <motion.div
                                            className="os-faq-answer-body"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.22 }}
                                        >
                                            <p>{answer}</p>
                                        </motion.div>
                                    ) : null}
                                </div>
                            ),
                        )}
                    </div>

                    <div className="os-faq-reassurance-box">
                        <div className="os-faq-reassurance-text">
                            <h4>
                                Still have specific questions about your
                                workflow?
                            </h4>
                            <p>
                                Our product architects and engineering founders
                                are available on WhatsApp for instant answers.
                            </p>
                        </div>
                        <div className="os-faq-reassurance-actions">
                            <a
                                href="https://wa.me/919876543210?text=Hi%20BizSyncOS%20team,%20I%20have%20a%20question%20about%20my%20store%20workflow"
                                target="_blank"
                                rel="noreferrer"
                                className="os-btn-whatsapp-chat"
                            >
                                <MessageCircle size={16} /> Chat on WhatsApp
                            </a>
                            <button
                                type="button"
                                className="os-button os-button-final-secondary"
                                onClick={() => navigate('/contact')}
                            >
                                Book 15-Min Call
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 12. High-Converting Modern SaaS Final CTA & Contact Section */}
            <section className="os-final-cta-section" id="contact">
                <div className="os-cta-bg-glow" />
                <div className="os-cta-bg-glow-right" />

                <div className="os-shell os-cta-grid">
                    {/* Left Column: Direct Value & Actions */}
                    <div className="os-cta-left">
                        <div className="os-pro-badge">
                            <Sparkles size={13} />
                            <span>
                                ZERO-RISK 3-DAY TRIAL · LIVE IN 5 MINUTES
                            </span>
                        </div>
                        <h2 className="os-cta-headline">
                            Ready to run your operations on{' '}
                            <span className="os-pro-gradient">autopilot</span>?
                        </h2>
                        <p className="os-cta-sub">
                            Join 1,000+ high-growth Indian brands scaling with
                            sub-15ms stock sync, automated WhatsApp recovery,
                            and zero manual reconciliation.
                        </p>

                        <div className="os-cta-btn-group">
                            <button
                                className="os-btn-cta-primary"
                                type="button"
                                onClick={() => navigate('/signup')}
                            >
                                Start 3-Day Free Trial <ArrowRight size={17} />
                            </button>
                            <button
                                className="os-btn-cta-secondary"
                                type="button"
                                onClick={() => navigate('/contact')}
                            >
                                Book a 15-Min Live Demo
                            </button>
                        </div>

                        <div className="os-cta-trust-list">
                            <span className="os-cta-trust-item">
                                <CheckCircle2 size={16} /> 5-minute setup
                            </span>
                            <span className="os-cta-trust-item">
                                <CheckCircle2 size={16} /> No credit card
                                required
                            </span>
                            <span className="os-cta-trust-item">
                                <CheckCircle2 size={16} /> Free data migration
                            </span>
                            <span className="os-cta-trust-item">
                                <CheckCircle2 size={16} /> Cancel anytime
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Direct Quick Consultation / Contact Card */}
                    <div className="os-cta-form-card">
                        <span className="os-form-badge">
                            <MessageSquareText size={12} /> TALK TO SPECIALIST
                        </span>
                        <h3>Request a 1-on-1 Walkthrough</h3>
                        <p>
                            See BizSyncOS live with your specific channels,
                            SKUs, and warehouse nodes.
                        </p>

                        <form
                            className="os-contact-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                navigate('/contact');
                            }}
                        >
                            <input
                                type="email"
                                required
                                placeholder="name@yourcompany.com"
                                className="os-input-field"
                            />
                            <input
                                type="tel"
                                required
                                placeholder="WhatsApp / Phone Number (+91)"
                                className="os-input-field"
                            />
                            <select
                                className="os-input-field"
                                defaultValue="5k-25k"
                            >
                                <option value="1k-5k">
                                    1,000 – 5,000 monthly orders
                                </option>
                                <option value="5k-25k">
                                    5,000 – 25,000 monthly orders
                                </option>
                                <option value="25k+">
                                    25,000+ monthly orders (Scale / Enterprise)
                                </option>
                            </select>

                            <button
                                type="submit"
                                className="os-btn-submit-demo"
                            >
                                Get Custom Demo &amp; Migration Plan{' '}
                                <ArrowRight size={16} />
                            </button>
                        </form>

                        <div className="os-contact-or">
                            or connect instantly
                        </div>

                        <a
                            href="https://wa.me/919876543210?text=Hi%20BizSyncOS,%20I%20want%20to%20see%20a%20live%20demo%20for%20my%20store"
                            target="_blank"
                            rel="noreferrer"
                            className="os-btn-direct-wa"
                        >
                            <MessageCircle size={15} /> Message Founder on
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

function Metric({
    icon: Icon,
    label,
    value,
    trend,
    tone,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
    trend: string;
    tone: string;
}) {
    return (
        <div className={`os-dashboard-kpi ${tone}`}>
            <span className="os-dashboard-kpi-icon">
                <Icon size={18} />
            </span>
            <div className="os-dashboard-kpi-content">
                <small>{label}</small>
                <strong>{value}</strong>
                <span>{trend}</span>
            </div>
        </div>
    );
}

function MiniChart() {
    return (
        <div className="os-mini-chart">
            <svg viewBox="0 0 280 60" fill="none" className="os-mini-chart-svg">
                <path
                    d="M 0,50 Q 40,20 80,35 T 160,15 T 240,25 T 280,5"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    fill="none"
                />
            </svg>
        </div>
    );
}

function Channel({
    name,
    value,
    change,
}: {
    name: string;
    value: string;
    change: string;
}) {
    return (
        <div className="os-channel-row">
            <span className="os-channel-name">{name}</span>
            <span className="os-channel-value">{value}</span>
            <span className="os-channel-change">{change}</span>
        </div>
    );
}

function FlowLine({ index, active }: { index: number; active: boolean }) {
    return (
        <div
            className={`os-flow-line ${active ? 'active' : ''}`}
            aria-hidden="true"
        >
            <span />
        </div>
    );
}

function WorkflowStep({
    icon: Icon,
    label,
    title,
    text,
    approval,
    active,
}: {
    icon: LucideIcon;
    label: string;
    title: string;
    text: string;
    approval?: boolean;
    active: boolean;
}) {
    return (
        <div className={`os-workflow-card ${active ? 'active' : ''}`}>
            <div className="os-workflow-card-head">
                <span className="os-workflow-icon">
                    <Icon size={16} />
                </span>
                <span className="os-workflow-label">{label}</span>
                {approval && (
                    <span className="os-approval-badge">Approval Required</span>
                )}
            </div>
            <strong>{title}</strong>
            <p>{text}</p>
        </div>
    );
}

function ConnectedMap() {
    const inputCards = [
        {
            tone: 'teal',
            icon: User,
            title: 'Lead captured',
            detail: 'New lead created',
            tag: 'CRM',
        },
        {
            tone: 'blue',
            icon: ShoppingCart,
            title: 'Order created',
            detail: 'New order received',
            tag: 'ORDERS',
        },
        {
            tone: 'emerald',
            icon: CreditCard,
            title: 'Payment received',
            detail: 'Payment captured',
            tag: 'FINANCE',
        },
        {
            tone: 'amber',
            icon: PackageOpen,
            title: 'Inventory updated',
            detail: 'Stock levels changed',
            tag: 'INVENTORY',
        },
        {
            tone: 'indigo',
            icon: ClipboardList,
            title: 'Invoice generated',
            detail: 'Tax invoice created',
            tag: 'ACCOUNTING',
        },
        {
            tone: 'violet',
            icon: Headphones,
            title: 'Customer support',
            detail: 'New ticket received',
            tag: 'SUPPORT',
        },
    ] as const;

    const actionCards = [
        {
            tone: 'teal',
            icon: PackageCheck,
            title: 'AI detected low stock',
            detail: 'Restock recommended',
            tag: 'AI INSIGHT',
        },
        {
            tone: 'blue',
            icon: ShoppingBag,
            title: 'Purchase draft created',
            detail: 'PO draft ready for review',
            tag: 'AUTOMATION',
        },
        {
            tone: 'emerald',
            icon: MessageCircle,
            title: 'Customer notified',
            detail: 'WhatsApp message sent',
            tag: 'WHATSAPP',
        },
        {
            tone: 'amber',
            icon: Warehouse,
            title: 'Warehouse task created',
            detail: 'Pick, pack & dispatch',
            tag: 'DISPATCH',
        },
        {
            tone: 'indigo',
            icon: FileCheck2,
            title: 'Invoice & entries posted',
            detail: 'Finance records updated',
            tag: 'LEDGER',
        },
        {
            tone: 'teal',
            icon: HeartPulse,
            title: 'Business health updated',
            detail: 'Score recalculated',
            tag: 'AI ENGINE',
        },
    ] as const;

    const leftLines = [
        {
            tone: 'teal',
            d: 'M260 67 C426.5 67.0 556.0 227.5 630.0 227.5',
            dot: [479.7, 147.2],
        },
        {
            tone: 'blue',
            d: 'M260 143 C418.9 143.0 542.4 255.7 613.0 255.7',
            dot: [469.6, 199.3],
        },
        {
            tone: 'emerald',
            d: 'M260 219 C415.7 219.0 536.8 280.4 606.0 280.4',
            dot: [465.4, 249.7],
        },
        {
            tone: 'amber',
            d: 'M260 295 C415.7 295.0 536.8 309.6 606.0 309.6',
            dot: [465.4, 302.3],
        },
        {
            tone: 'indigo',
            d: 'M260 371 C418.9 371.0 542.4 334.3 613.0 334.3',
            dot: [469.6, 352.7],
        },
        {
            tone: 'violet',
            d: 'M260 447 C426.5 447.0 556.0 362.5 630.0 362.5',
            dot: [479.7, 404.8],
        },
    ] as const;

    const rightLines = [
        {
            tone: 'teal',
            marker: 'os-marker-teal',
            d: 'M790.0 227.5 C864.0 227.5 993.5 67.0 1160 67',
            dot: [940.3, 147.2],
        },
        {
            tone: 'blue',
            marker: 'os-marker-blue',
            d: 'M807.0 255.7 C877.6 255.7 1001.1 143.0 1160 143',
            dot: [950.4, 199.3],
        },
        {
            tone: 'emerald',
            marker: 'os-marker-emerald',
            d: 'M814.0 280.4 C883.2 280.4 1004.3 219.0 1160 219',
            dot: [954.6, 249.7],
        },
        {
            tone: 'amber',
            marker: 'os-marker-amber',
            d: 'M814.0 309.6 C883.2 309.6 1004.3 295.0 1160 295',
            dot: [954.6, 302.3],
        },
        {
            tone: 'indigo',
            marker: 'os-marker-indigo',
            d: 'M807.0 334.3 C877.6 334.3 1001.1 371.0 1160 371',
            dot: [950.4, 352.6],
        },
        {
            tone: 'teal',
            marker: 'os-marker-teal',
            d: 'M790.0 362.5 C864.0 362.5 993.5 447.0 1160 447',
            dot: [940.3, 404.8],
        },
    ] as const;

    const policySteps = [
        {
            tone: 'teal',
            icon: Workflow,
            title: 'Trigger',
            detail: 'Event received',
        },
        {
            tone: 'indigo',
            icon: BrainCircuit,
            title: 'AI Recommendation',
            detail: 'Best action suggested',
        },
        {
            tone: 'blue',
            icon: ShieldCheck,
            title: 'Policy Check',
            detail: 'Rules & conditions',
        },
        {
            tone: 'amber',
            icon: CheckCircle2,
            title: 'Approval',
            detail: 'Human in control',
        },
        {
            tone: 'emerald',
            icon: Zap,
            title: 'Execute Action',
            detail: 'Across systems',
        },
        {
            tone: 'slate',
            icon: ClipboardList,
            title: 'Audit & Log',
            detail: 'Full transparency',
        },
    ] as const;

    return (
        <section
            className="os-connected-section os-mockup-version"
            id="connected-workspace"
        >
            <div className="os-mockup-bg-aurora" />
            <div className="os-shell">
                <div className="os-event-map os-connected-map">
                    <div className="os-event-map-main">
                        <svg
                            className="os-event-connectors"
                            viewBox="0 0 1420 530"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <defs>
                                <marker
                                    id="os-marker-teal"
                                    markerWidth="7"
                                    markerHeight="7"
                                    refX="6"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <path
                                        fill="#009f91"
                                        d="M0,0 L7,3.5 L0,7 Z"
                                    />
                                </marker>
                                <marker
                                    id="os-marker-blue"
                                    markerWidth="7"
                                    markerHeight="7"
                                    refX="6"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <path
                                        fill="#0284c7"
                                        d="M0,0 L7,3.5 L0,7 Z"
                                    />
                                </marker>
                                <marker
                                    id="os-marker-emerald"
                                    markerWidth="7"
                                    markerHeight="7"
                                    refX="6"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <path
                                        fill="#059669"
                                        d="M0,0 L7,3.5 L0,7 Z"
                                    />
                                </marker>
                                <marker
                                    id="os-marker-amber"
                                    markerWidth="7"
                                    markerHeight="7"
                                    refX="6"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <path
                                        fill="#ea580c"
                                        d="M0,0 L7,3.5 L0,7 Z"
                                    />
                                </marker>
                                <marker
                                    id="os-marker-indigo"
                                    markerWidth="7"
                                    markerHeight="7"
                                    refX="6"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <path
                                        fill="#4f46e5"
                                        d="M0,0 L7,3.5 L0,7 Z"
                                    />
                                </marker>
                                <marker
                                    id="os-marker-violet"
                                    markerWidth="7"
                                    markerHeight="7"
                                    refX="6"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <path
                                        fill="#7c3aed"
                                        d="M0,0 L7,3.5 L0,7 Z"
                                    />
                                </marker>
                            </defs>

                            {/* Left in-flowing paths (clean flow without inner arrow clutter) */}
                            {leftLines.map(({ tone, d, dot }, index) => (
                                <g key={`left-${tone}-${index}`}>
                                    <path
                                        className={`os-mockup-path ${tone}`}
                                        d={d}
                                    />
                                    <circle
                                        className={`os-mockup-flow-ring ${tone}`}
                                        cx={dot[0]}
                                        cy={dot[1]}
                                        r="5"
                                    />
                                    <circle
                                        className={`os-mockup-flow-dot ${tone}`}
                                        cx={dot[0]}
                                        cy={dot[1]}
                                        r="2.5"
                                    />
                                </g>
                            ))}

                            {/* Right out-flowing paths (with outer arrowheads pointing at action cards) */}
                            {rightLines.map(
                                ({ tone, marker, d, dot }, index) => (
                                    <g key={`right-${tone}-${index}`}>
                                        <path
                                            className={`os-mockup-path ${tone}`}
                                            d={d}
                                            markerEnd={`url(#${marker})`}
                                        />
                                        <circle
                                            className={`os-mockup-flow-ring ${tone}`}
                                            cx={dot[0]}
                                            cy={dot[1]}
                                            r="5"
                                        />
                                        <circle
                                            className={`os-mockup-flow-dot ${tone}`}
                                            cx={dot[0]}
                                            cy={dot[1]}
                                            r="2.5"
                                        />
                                    </g>
                                ),
                            )}
                        </svg>

                        {/* Left Inbound Events */}
                        <div className="os-event-side os-event-inputs">
                            <div className="os-mockup-col-header">
                                <h3>BUSINESS EVENTS</h3>
                                <p>What Happened</p>
                            </div>
                            {inputCards.map(
                                (
                                    { tone, icon: Icon, title, detail, tag },
                                    idx,
                                ) => (
                                    <div
                                        className={`os-mockup-card ${tone}`}
                                        key={title}
                                    >
                                        <span
                                            className={`os-mockup-card-icon ${tone}`}
                                        >
                                            <Icon size={18} />
                                        </span>
                                        <div className="os-mockup-card-body">
                                            <strong>{title}</strong>
                                            <small>{detail}</small>
                                            <em>{tag}</em>
                                        </div>
                                        {idx === 5 && (
                                            <ChevronRight
                                                size={15}
                                                className="os-mockup-chevron"
                                            />
                                        )}
                                    </div>
                                ),
                            )}
                        </div>

                        {/* Center Hub & Floating Orbit Nodes */}
                        <div className="os-event-intelligence">
                            <div className="os-mockup-center-header">
                                <div className="os-mockup-dash-title">
                                    <span className="dash" />
                                    <h3>AI ANALYSIS &amp; INTELLIGENCE</h3>
                                    <span className="dash" />
                                </div>
                                <p>Understand &amp; Recommend</p>
                            </div>

                            {/* 5 Floating Pillow Orbit Nodes */}
                            <div className="os-mockup-orbit-node analysis">
                                <Sparkles size={20} className="icon-teal" />
                                <strong>AI Analysis</strong>
                                <small>Pattern detection</small>
                            </div>
                            <div className="os-mockup-orbit-node kpi">
                                <BarChart3 size={20} className="icon-emerald" />
                                <strong>KPI &amp; Analytics</strong>
                                <small>Real-time insights</small>
                            </div>
                            <div className="os-mockup-orbit-node forecast">
                                <TrendingUp size={20} className="icon-blue" />
                                <strong>Forecasting</strong>
                                <small>Predict outcomes</small>
                            </div>
                            <div className="os-mockup-orbit-node risk">
                                <ShieldCheck size={20} className="icon-amber" />
                                <strong>Risk Detection</strong>
                                <small>Identify issues</small>
                            </div>
                            <div className="os-mockup-orbit-node opportunity">
                                <Target size={20} className="icon-indigo" />
                                <strong>Opportunities</strong>
                                <small>Find growth areas</small>
                            </div>

                            {/* Central Glowing Orb with Rock-Solid Center Alignment */}
                            <div className="os-mockup-core-wrap">
                                <div className="os-mockup-core-orbit-ring" />
                                <div className="os-mockup-core">
                                    <div className="os-mockup-core-badge">
                                        <img src="/images/bizsync-icon.png" alt="BS" style={{ width: 28, height: 28, objectFit: "contain" }} />
                                    </div>
                                    <strong>
                                        BizSync<span>OS</span>
                                    </strong>
                                    <small>AI BUSINESS OPERATING SYSTEM</small>
                                </div>
                            </div>

                            {/* Under-Core Floating Health Pill */}
                            <div className="os-mockup-health-pill">
                                <span className="os-mockup-health-icon">
                                    <HeartPulse size={16} />
                                </span>
                                <div>
                                    <strong>Business Health Updated</strong>
                                    <small>
                                        Continuously updated from all events
                                    </small>
                                </div>
                            </div>
                        </div>

                        {/* Right Outbound Actions */}
                        <div className="os-event-side os-event-actions">
                            <div className="os-mockup-col-header right">
                                <h3>ACTIONS &amp; OUTCOMES</h3>
                                <p>What We Do</p>
                            </div>
                            {actionCards.map(
                                ({ tone, icon: Icon, title, detail, tag }) => (
                                    <div
                                        className={`os-mockup-card ${tone}`}
                                        key={title}
                                    >
                                        <span
                                            className={`os-mockup-card-icon ${tone}`}
                                        >
                                            <Icon size={18} />
                                        </span>
                                        <div className="os-mockup-card-body">
                                            <strong>{title}</strong>
                                            <small>{detail}</small>
                                            <em>{tag}</em>
                                        </div>
                                        <ChevronRight
                                            size={15}
                                            className="os-mockup-chevron"
                                        />
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Lower Panel: Automation & Policy Engine + Human in Control */}
                    <div className="os-mockup-control-grid">
                        <div className="os-mockup-policy-panel">
                            <div className="os-mockup-panel-head">
                                <h4>AUTOMATION &amp; POLICY ENGINE</h4>
                                <small>Execute Safely</small>
                            </div>
                            <div className="os-mockup-policy-steps">
                                {policySteps.map(
                                    ({ tone, icon: Icon, title, detail }) => (
                                        <div
                                            className="os-mockup-step"
                                            key={title}
                                        >
                                            <span
                                                className={`os-mockup-step-icon ${tone}`}
                                            >
                                                <Icon size={16} />
                                            </span>
                                            <div>
                                                <strong>{title}</strong>
                                                <small>{detail}</small>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="os-mockup-human-panel">
                            <div className="os-mockup-panel-head">
                                <h4>HUMAN IN CONTROL</h4>
                            </div>
                            <div className="os-mockup-human-content">
                                <ul className="os-mockup-human-list">
                                    <li>
                                        <CheckCircle2 size={15} /> Approve /
                                        reject
                                    </li>
                                    <li>
                                        <CheckCircle2 size={15} /> Escalate /
                                        delegate
                                    </li>
                                    <li>
                                        <CheckCircle2 size={15} /> Full audit
                                        trail
                                    </li>
                                </ul>
                                <div className="os-mockup-shield-badge">
                                    <ShieldCheck size={28} />
                                    <span className="os-mockup-shield-check">
                                        ✓
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
