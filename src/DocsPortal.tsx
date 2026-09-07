import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
    Activity,
    AlertCircle,
    AlertTriangle,
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Bot,
    Brain,
    BrainCircuit,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    CircleDollarSign,
    CircleHelp,
    ClipboardCheck,
    ClipboardList,
    Code2,
    Copy,
    CreditCard,
    Database,
    FileSpreadsheet,
    FileText,
    Flame,
    GitBranch,
    Globe,
    Globe2,
    HelpCircle,
    Info,
    KeyRound,
    Layers,
    Layers3,
    LayoutDashboard,
    Link2,
    Lock,
    LockKeyhole,
    MessageSquare,
    MessageSquareText,
    PackageCheck,
    PackageSearch,
    PlugZap,
    Search,
    Send,
    ShieldAlert,
    ShieldCheck,
    ShoppingCart,
    Sliders,
    Sparkles,
    Store,
    TrendingUp,
    Truck,
    Users,
    UsersRound,
    WalletCards,
    Warehouse,
    Workflow,
    Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import './docs-portal.css';

type DocsNavigate = (
    route: '/demo' | '/signup' | '/contact' | '/pricing',
) => void;

type GuideTopic = {
    id: string;
    group: string;
    label: string;
    description: string;
    icon: LucideIcon;
};

type DashboardSpec = {
    id: string;
    title: string;
    route: string;
    badge: string;
    icon: LucideIcon;
    purpose: string;
    kpis: string[];
    features: string[];
    technicalDetails: string;
    bestPractice: string;
};

type ModuleSpec = {
    id: string;
    category: 'commerce' | 'inventory' | 'crm' | 'finance' | 'governance';
    title: string;
    route: string;
    icon: LucideIcon;
    summary: string;
    keyFeatures: string[];
    lifecycle: string[];
    dataFields: string[];
    automationTriggers: string;
};

const guideGroups = [
    { id: 'start', label: '01. Get Started', note: 'Company, RBAC & First Run' },
    { id: 'dashboards', label: '02. Executive Dashboards', note: 'Command Center & AI Radar' },
    { id: 'modules', label: '03. Core Modules', note: 'Commerce, Stock, CRM, Billing' },
    { id: 'intelligence', label: '04. AI & Automations', note: 'Workflows & Copilot' },
    { id: 'connect', label: '05. Integrations & API', note: 'Channels, Webhooks & REST' },
    { id: 'billing', label: '06. Plans & Billing', note: 'Entitlements & Scaling' },
    { id: 'support', label: '07. Help & FAQs', note: 'Troubleshooting & Support' },
] as const;

const guideTopics: GuideTopic[] = [
    {
        id: 'setup',
        group: 'start',
        label: 'Set up your company',
        description: 'Configure legal entity, tax parameters, base currency, and operating warehouses.',
        icon: Building2,
    },
    {
        id: 'workspace',
        group: 'start',
        label: 'Invite your team & RBAC',
        description: 'Assign role-based access control (Owner, Admin, Sales, Warehouse, Finance).',
        icon: UsersRound,
    },
    {
        id: 'dashboards',
        group: 'dashboards',
        label: 'Executive & AI Dashboards',
        description: 'Explore Main Workspace Dashboard, AI Health Radar (0-100), and Copilot Brain.',
        icon: LayoutDashboard,
    },
    {
        id: 'modules',
        group: 'modules',
        label: 'Run your core modules',
        description: 'In-depth guide to Orders, Inventory, Fulfillment, Leads, Contacts, and Invoices.',
        icon: Layers3,
    },
    {
        id: 'automation',
        group: 'intelligence',
        label: 'Design safe automations',
        description: 'Turn business events into automated workflows with approval gates and audit logs.',
        icon: Workflow,
    },
    {
        id: 'copilot',
        group: 'intelligence',
        label: 'Use Business Copilot & AI Brain',
        description: 'Ask grounded questions, query company memory vault, and run what-if simulations.',
        icon: BrainCircuit,
    },
    {
        id: 'integrations',
        group: 'connect',
        label: 'Connect channels & REST API',
        description: 'Authorize Shopify, WooCommerce, WhatsApp, Razorpay, Tally, and REST webhooks.',
        icon: PlugZap,
    },
    {
        id: 'billing',
        group: 'billing',
        label: 'Plans, usage and billing',
        description: 'Understand trial entitlements, capability tiering, user seats, and subscription scaling.',
        icon: CircleDollarSign,
    },
    {
        id: 'help',
        group: 'support',
        label: 'Troubleshoot confidently',
        description: 'Resolve integration sync conflicts, approval holds, permission mismatches, and AI queries.',
        icon: CircleHelp,
    },
];

const dashboardSpecs: DashboardSpec[] = [
    {
        id: 'main-dash',
        title: 'Executive Operations Dashboard',
        route: '/dashboard',
        badge: 'Real-Time Command Center',
        icon: LayoutDashboard,
        purpose: 'Provides business owners, general managers, and team leads with a high-velocity, consolidated command view of revenue, incoming order pipelines, dispatch bottlenecks, and cross-team activity.',
        kpis: [
            'Gross Revenue (MTD & YTD)',
            'Daily Sales Velocity & Order Count',
            'Pending Fulfillment Queue',
            'Low-Stock / Reorder Warnings',
            'Receivables Past Due ($ / ₹)',
            'Real-Time Live Event Feed',
        ],
        features: [
            'Dynamic role-tailored view: Automatically adjusts cards and tables based on user permissions.',
            'Quick Action Command Bar: Create Sales Orders, Invoices, Stock Transfers, or Leads in 1 click.',
            'Channel Velocity Breakdown: Compare revenue across Shopify, WooCommerce, Amazon, and offline B2B.',
            'Active Dispatch Queue: Real-time counter of orders pending pick, pack, or courier handover.',
        ],
        technicalDetails: 'Aggregated via cached read-replicas with sub-50ms query execution. Event stream powered by internal database triggers and Redis cache warming.',
        bestPractice: 'Review at the start of each operating shift to identify dispatch holds or payment confirmations requiring urgent action.',
    },
    {
        id: 'ai-health',
        title: 'AI Executive Health Radar',
        route: '/ai-dashboard',
        badge: 'Predictive Risk Intelligence',
        icon: Activity,
        purpose: 'Continuously audits 100% of workspace records to calculate a single Executive Health Score (0-100) and routes operational threats into 4 severity-tiered risk queues.',
        kpis: [
            'Composite Health Index (0-100)',
            'Critical Stockout Projections (< 3 days)',
            'High-Risk Aging Receivables (> 30 days)',
            'Failed Integration Webhook Logs',
            'Slow-Moving Dead Inventory Value',
            'Automated AI Executive Report Generator',
        ],
        features: [
            'Health Driver Breakdown: Evaluates Inventory Turnover, Cashflow Liquidity, and Sync Reliability.',
            '4-Tiered Risk Queues: Critical (Red), High (Amber), Moderate (Yellow), and Low (Blue) with 1-click remediation paths.',
            'Executive AI Report Generator: Creates downloadable PDF/Markdown operational briefs with grounded AI narrative.',
            'Zero Empty States: Provides informative guidance, historical trends, and audit summaries even during clean operating states.',
        ],
        technicalDetails: 'Powered by asynchronous queue workers analyzing velocity moving averages (7d, 30d, 90d) without locking live transactional tables.',
        bestPractice: 'Resolve all items in the Critical Risk Queue daily before initiating bulk courier dispatches.',
    },
    {
        id: 'ai-brain',
        title: 'Business Copilot & AI Brain',
        route: '/ai-brain',
        badge: 'Conversational Advisor & Simulator',
        icon: Brain,
        purpose: 'An enterprise conversational AI advisor grounded in verified workspace data, equipped with Company Memory Vault and What-If Scenario Simulator.',
        kpis: [
            'Verified Evidence-Grounded Answers',
            'Company Memory Vault Rules & Facts',
            'What-If Scenario Simulation Engine',
            'Grounded Source Traceability',
            'Zero-Hallucination SQL/API Guardrails',
        ],
        features: [
            'Grounded Conversational Advisor: Ask questions in natural English/Hindi about profit margins, top buyers, stock runouts, and receive citations.',
            'Company Memory Vault: Store operational rules, regional tax policies, supplier discount terms, and custom SOPs that the AI incorporates into advice.',
            'What-If Simulator: Model price elasticity adjustments (+10% margin), ad spend expansion, or supplier lead-time delays to inspect forecast impacts.',
            'Human-in-the-loop Follow-ups: Transform AI recommendations directly into draft workflows or assigned tasks with required owner approvals.',
        ],
        technicalDetails: 'Strict tenant data isolation. Queries execute against schema-validated read views. Never trains public AI models on private tenant data.',
        bestPractice: 'Use the What-If Simulator before launching seasonal discounts or expanding bulk inventory procurement.',
    },
];

const moduleSpecs: ModuleSpec[] = [
    {
        id: 'sales-orders',
        category: 'commerce',
        title: 'Sales Orders Engine',
        route: '/sales-orders',
        icon: ShoppingCart,
        summary: 'Complete multi-channel sales order orchestration engine managing the entire lifecycle from placement to fulfillment and invoice matching.',
        keyFeatures: [
            'Lifecycle States: Draft -> Pending -> Confirmed -> Processing -> Fulfilled -> Cancelled / Refunded.',
            'Automated Multi-Tier Tax Calculations (GST slabs 0/5/12/18/28%, VAT, regional sales tax).',
            'Line Item Reservations: Automatically holds available warehouse stock upon order confirmation.',
            'Split Fulfillment & Partial Shipment support across multiple dispatch locations.',
            'Direct integration with Invoices, Fulfillment Hub, and WhatsApp customer updates.',
        ],
        lifecycle: ['Draft / Quote Creation', 'Customer Confirmation', 'Inventory Reservation', 'Pick & Pack Dispatch', 'Invoice & Payment Settlement'],
        dataFields: ['order_number', 'customer_id', 'status', 'payment_status', 'subtotal', 'tax_amount', 'total_amount', 'items[]', 'shipping_address'],
        automationTriggers: 'Trigger workflows on order.created, order.confirmed, order.cancelled, or order.high_value.',
    },
    {
        id: 'quotations',
        category: 'commerce',
        title: 'Quotations & Estimates',
        route: '/quotations',
        icon: FileSpreadsheet,
        summary: 'Create professional, branded commercial quotations with flexible discount structures, validity dates, and one-click conversion to active Sales Orders.',
        keyFeatures: [
            'Customizable quote templates with company branding, terms & conditions, and payment schedules.',
            'Expiration Enforcement: Automatically flags or archives quotes past their validity window.',
            'One-Click Conversion: Instantly creates a confirmed Sales Order without re-entering line items.',
            'PDF Generation & Direct WhatsApp/Email sharing.',
        ],
        lifecycle: ['Draft Estimate', 'Internal Review', 'Sent to Prospect', 'Approved / Revised', 'Converted to Sales Order'],
        dataFields: ['quotation_number', 'lead_id', 'valid_until', 'discount_rate', 'total_value', 'terms_and_conditions'],
        automationTriggers: 'Trigger notifications on quotation.sent, quotation.expiring_soon, quotation.converted.',
    },
    {
        id: 'ecommerce',
        category: 'commerce',
        title: 'Multichannel Ecommerce Sync',
        route: '/ecommerce',
        icon: Store,
        summary: 'Centralized omnichannel connector integrating Shopify and WooCommerce stores with automatic product catalog syncing and live order ingestion.',
        keyFeatures: [
            'Bi-directional synchronization for products, stock levels, prices, and tracking numbers.',
            'Idempotent webhook ingestion: Guarantees zero duplicate orders during store sync bursts.',
            'Manual POS / Offline Order Entry modal for in-store sales or phone orders.',
            'Live connection status health check and sync diagnostics log viewer.',
        ],
        lifecycle: ['Store Credential Authorization', 'Initial Catalog Map', 'Real-Time Webhook Sync', 'Automated Stock Broadcast'],
        dataFields: ['store_id', 'platform', 'api_credentials', 'sync_frequency', 'last_sync_timestamp', 'webhook_secret'],
        automationTriggers: 'Trigger workflows on ecommerce.order_synced, ecommerce.sync_failed, ecommerce.stock_updated.',
    },
    {
        id: 'cart-recovery',
        category: 'commerce',
        title: 'Abandoned Cart Recovery',
        route: '/cart-recovery',
        icon: Flame,
        summary: 'Recovers lost checkout revenue by detecting abandoned shopping carts and triggering personalized WhatsApp and email recovery sequences.',
        keyFeatures: [
            'Real-time abandoned checkout detection with cart value, items, and customer contact details.',
            'Automated 3-Stage Recovery Sequences via WhatsApp Cloud API and transactional email.',
            'Dynamic coupon code generator to incentivize checkout completion.',
            'Recovery conversion rate and reclaimed revenue attribution reporting.',
        ],
        lifecycle: ['Cart Abandonment Detected', 'Wait Buffer (1-2 hours)', 'WhatsApp/Email Nudge', 'Checkout Completed or Expired'],
        dataFields: ['cart_id', 'customer_phone', 'cart_items[]', 'total_value', 'recovery_status', 'recovery_discount_code'],
        automationTriggers: 'Trigger sequences on cart.abandoned, cart.recovery_clicked, cart.recovered.',
    },
    {
        id: 'inventory',
        category: 'inventory',
        title: 'Multi-Warehouse Inventory',
        route: '/inventory',
        icon: Warehouse,
        summary: 'Enterprise stock management tracking real-time SKU balances, warehouse bins, batch lots, serial numbers, and inter-location stock transfers.',
        keyFeatures: [
            'Multi-Location Tracking: Manage stock across Central Warehouses, Retail Stores, and 3PL Hubs.',
            'Batch & Lot Traceability with manufacturing dates, expiry alerts, and FIFO allocation.',
            'Stock Reservation Engine: Distinguishes between Physical On-Hand vs. Available-to-Promise.',
            'Inter-Warehouse Stock Transfer Orders with in-transit tracking and receiving sign-off.',
        ],
        lifecycle: ['Goods Inward / Receiving', 'Bin / Aisle Put-Away', 'Stock Reservation', 'Pick & Dispatch', 'Cycle Count Reconcile'],
        dataFields: ['sku', 'product_id', 'warehouse_id', 'on_hand', 'reserved', 'available', 'reorder_level', 'unit_cost'],
        automationTriggers: 'Trigger alerts on stock.low, stock.depleted, stock.transfer_initiated, stock.batch_expiring.',
    },
    {
        id: 'smart-reorder',
        category: 'inventory',
        title: 'Smart Reorder & Procurement AI',
        route: '/smart-reorder',
        icon: TrendingUp,
        summary: 'Predictive replenishment engine calculating dynamic safety stock thresholds, consumption run-rates, and generating one-click draft Purchase Orders.',
        keyFeatures: [
            'Dynamic Run-Rate Forecasting based on 7, 30, and 90-day moving sales velocity.',
            'Supplier Lead Time Buffers: Automatically accounts for vendor delivery times to avoid stockouts.',
            'Automated Draft Purchase Order Generation: Pre-populates vendor, SKU quantities, and contracted rates.',
            'Seasonal Spike & Demand Surge Adjustments.',
        ],
        lifecycle: ['Velocity Calculation', 'Threshold Breach Alert', 'Draft PO Recommendation', 'Purchaser Approval', 'PO Dispatched'],
        dataFields: ['sku', 'daily_run_rate', 'days_of_supply_remaining', 'recommended_reorder_qty', 'primary_supplier_id'],
        automationTriggers: 'Trigger notifications on reorder.recommended, reorder.urgent_stockout_risk.',
    },
    {
        id: 'purchase-orders',
        category: 'inventory',
        title: 'Purchase Orders & Suppliers',
        route: '/purchase-orders',
        icon: PackageCheck,
        summary: 'Streamlined procurement management covering vendor records, itemized purchase orders, receiving inspection checklists, and bill reconciliation.',
        keyFeatures: [
            'Vendor Master Directory with credit terms, lead times, tax IDs (GSTIN/TRN), and past quality scores.',
            'Partial Receiving & Quality Inspection: Accept delivered quantities and flag damaged units.',
            'Landed Cost Calculation: Allocates freight, customs, and handling costs across item unit costs.',
            'Three-Way Matching: Verifies Purchase Order vs. Goods Receipt Note (GRN) vs. Supplier Invoice.',
        ],
        lifecycle: ['Draft PO', 'Manager Sign-Off', 'Sent to Vendor', 'Goods Received (GRN)', 'Finance Bill Matched'],
        dataFields: ['po_number', 'supplier_id', 'status', 'total_amount', 'expected_delivery_date', 'received_items[]'],
        automationTriggers: 'Trigger workflows on po.created, po.approved, po.goods_received, po.delayed.',
    },
    {
        id: 'fulfillment',
        category: 'inventory',
        title: 'Fulfillment & Logistics Hub',
        route: '/fulfillment',
        icon: Truck,
        summary: 'End-to-end dispatch execution engine with batch pick-lists, packing slip generation, and live courier API integrations (Shiprocket, Delhivery, BlueDart).',
        keyFeatures: [
            'Digital Pick-Lists & Packing Slips with barcode scanning verification.',
            'Courier API Integration: Instant AWB tracking number generation, rate comparison, and shipping labels.',
            'Automated Dispatch Tracking: Broadcasts tracking URL to customers via WhatsApp and SMS.',
            'RTO (Return to Origin) & Reverse Logistics management with return inspection grading.',
        ],
        lifecycle: ['Ready to Pick', 'Picked & Packed', 'Courier AWB Assigned', 'Dispatched / In Transit', 'Delivered / Signed'],
        dataFields: ['fulfillment_id', 'order_id', 'courier_name', 'awb_number', 'tracking_url', 'dispatch_status', 'weight_kg'],
        automationTriggers: 'Trigger updates on fulfillment.dispatched, fulfillment.out_for_delivery, fulfillment.delivered, fulfillment.rto.',
    },
    {
        id: 'products',
        category: 'inventory',
        title: 'Products Master Catalog',
        route: '/products',
        icon: PackageSearch,
        summary: 'Centralized product and variant repository with barcode/UPC indexing, multi-tier pricing, category taxonomies, and tax classification slabs.',
        keyFeatures: [
            'Multi-Variant Matrix: Manage parent-child variations across size, color, material, and pack size.',
            'Barcode & SKU Scanning support for warehouse scanners and mobile camera lookups.',
            'Tiered Pricing: Set distinct Wholesale B2B, Retail D2C, and Channel-specific selling prices.',
            'Bulk CSV Import / Export with automated schema validation and duplicate SKU guards.',
        ],
        lifecycle: ['Product Drafting', 'Variant & Barcode Setup', 'Pricing & Tax Matrix', 'Published Active', 'Archived / Discontinued'],
        dataFields: ['sku', 'name', 'barcode', 'category', 'cost_price', 'selling_price', 'tax_rate', 'variants[]'],
        automationTriggers: 'Trigger notifications on product.created, product.price_changed, product.archived.',
    },
    {
        id: 'leads',
        category: 'crm',
        title: 'Leads & CRM Pipeline',
        route: '/leads',
        icon: Users,
        summary: 'Visual sales pipeline and lead scoring system tracking prospect engagements, follow-up reminders, deal values, and conversion milestones.',
        keyFeatures: [
            'Visual Kanban & List Pipeline Views: New -> Contacted -> Qualified -> Proposal -> Won / Lost.',
            'Automated Lead Scoring based on deal value, company size, engagement frequency, and source.',
            'Follow-Up Task Scheduler with Google Calendar and WhatsApp reminder synchronization.',
            'One-Click Lead-to-Customer Conversion with complete history preservation.',
        ],
        lifecycle: ['Lead Ingested (Web/Ad/Form)', 'Sales Rep Assigned', 'Discovery / Qualification', 'Proposal Sent', 'Won / Converted'],
        dataFields: ['lead_name', 'email', 'phone', 'company', 'source', 'deal_value', 'stage', 'assigned_to'],
        automationTriggers: 'Trigger workflows on lead.captured, lead.stage_changed, lead.inactivity_warning, lead.won.',
    },
    {
        id: 'contacts',
        category: 'crm',
        title: 'Unified Contacts Directory',
        route: '/contacts',
        icon: UsersRound,
        summary: '360-degree buyer, supplier, and partner master registry consolidating credit limits, transaction histories, communications, and ledger balances.',
        keyFeatures: [
            'Unified Entity Profiles: Seamlessly handle contacts who act as both buyers and vendors.',
            'Credit Terms & Limits: Set payment terms (Net 15, Net 30, Net 60) and credit ceiling caps.',
            'Full Historical Ledger: Direct view of all past quotations, orders, invoices, and payments.',
            'Communication Timeline: Logs all WhatsApp messages, emails, and internal sales notes.',
        ],
        lifecycle: ['Contact Profile Created', 'Credit & Tax Verified', 'Active Commercial Trading', 'Periodic Review'],
        dataFields: ['contact_name', 'type (customer/vendor)', 'company_name', 'tax_number', 'credit_limit', 'outstanding_balance'],
        automationTriggers: 'Trigger alerts on contact.credit_limit_exceeded, contact.created, contact.inactive.',
    },
    {
        id: 'whatsapp',
        category: 'crm',
        title: 'WhatsApp Cloud API Hub',
        route: '/whatsapp',
        icon: MessageSquare,
        summary: 'Official Meta WhatsApp Cloud API integration for automated transactional alerts, 2-way live customer support chats, and marketing campaigns.',
        keyFeatures: [
            'Official Meta Cloud API: High-throughput delivery without third-party aggregator markups.',
            'Pre-Approved Template Messaging: Automated Order Confirmation, Dispatch Tracking, Payment Receipts.',
            'Shared Team Inbox for 2-way live customer support with role-based agent assignment.',
            'Consent-aware marketing broadcast sequences with opt-out safeguards.',
        ],
        lifecycle: ['Template Submitted to Meta', 'Template Approved', 'Triggered by Business Event', 'Delivered & Read', 'Reply in Inbox'],
        dataFields: ['phone_number', 'template_name', 'message_status', 'delivery_timestamp', 'conversation_id', 'assigned_agent'],
        automationTriggers: 'Trigger actions on whatsapp.message_received, whatsapp.delivery_failed, whatsapp.opt_out.',
    },
    {
        id: 'invoices',
        category: 'finance',
        title: 'Invoices, Billing & GST/VAT',
        route: '/invoices',
        icon: CreditCard,
        summary: 'Compliant tax invoicing and receivables system featuring automated invoice generation, payment reconciliation, and overdue collection reminders.',
        keyFeatures: [
            'GST & VAT Compliant Tax Invoices: Itemized HSN/SAC codes, CGST/SGST/IGST, and e-Invoice readiness.',
            'Automated Payment Logging: Partial payments, advance receipts, and multiple payment methods.',
            'Aging Receivables Tracking: Categorizes unpaid balances into 0-30, 31-60, 61-90, 90+ days.',
            'Automated Collection Reminders via WhatsApp and email with integrated payment links (Razorpay/Stripe).',
        ],
        lifecycle: ['Draft Invoice Created', 'Approved & Issued', 'Partial Payment Received', 'Fully Settled / Paid', 'Archived / Reconciled'],
        dataFields: ['invoice_number', 'order_id', 'customer_id', 'issue_date', 'due_date', 'total_amount', 'paid_amount', 'balance_due'],
        automationTriggers: 'Trigger workflows on invoice.issued, invoice.payment_received, invoice.overdue, invoice.partially_paid.',
    },
    {
        id: 'automation',
        category: 'governance',
        title: 'Automation Studio',
        route: '/automation',
        icon: Workflow,
        summary: 'Visual no-code event-driven workflow engine connecting business triggers, conditions, AI insights, human approval gates, and multi-channel actions.',
        keyFeatures: [
            'Visual Trigger-Condition-Action builder with intuitive branch logic.',
            'Human-in-the-Loop Approval Gates: Holds sensitive financial, pricing, or stock changes until authorized.',
            'Comprehensive Execution Run Logs: Inspect variables, execution times, error traces, and retry failed steps.',
            'Library of 20+ pre-built industry templates for retail, ecommerce, distribution, and manufacturing.',
        ],
        lifecycle: ['Select Trigger Event', 'Define Conditions & Filters', 'Set Approval Policy', 'Specify Multi-Channel Actions', 'Publish & Audit Runs'],
        dataFields: ['workflow_id', 'name', 'trigger_event', 'status (active/draft)', 'approval_required', 'execution_count'],
        automationTriggers: 'Executes across 50+ system events from orders, stock, payments, leads, and customer chats.',
    },
    {
        id: 'tasks',
        category: 'governance',
        title: 'Tasks & Team Collaboration',
        route: '/tasks',
        icon: ClipboardCheck,
        summary: 'Operational task management system linking cross-department to-dos directly to relevant orders, customers, invoices, and inventory items.',
        keyFeatures: [
            'Context-Linked Tasks: Every task links directly to its underlying order, lead, quotation, or SKU.',
            'Priority Tiers & Due Dates with automated escalation reminders for overdue assignments.',
            'Subtask checklists and department activity feeds.',
            'Automated Task Creation from workflow triggers or AI Copilot recommendations.',
        ],
        lifecycle: ['Task Assigned', 'In Progress', 'Under Review', 'Completed / Signed Off'],
        dataFields: ['task_id', 'title', 'assigned_user_id', 'priority (urgent/high/medium/low)', 'due_date', 'linked_record_type'],
        automationTriggers: 'Trigger alerts on task.created, task.overdue, task.completed.',
    },
    {
        id: 'onboarding',
        category: 'governance',
        title: 'Workspace Onboarding Wizard',
        route: '/onboarding',
        icon: Sparkles,
        summary: '5-step guided tenant setup wizard configuring company profile, connector staging, AI operating blueprint generation, and safe data import plans.',
        keyFeatures: [
            '5-Step Wizard: Discover -> Connect -> Blueprint -> Import Plan -> Launch Ready.',
            'Tailored Operating Blueprint: Automatically activates recommended modules and workflow draft packs.',
            'Safe Staging Guarantee: Staged connectors and data plans do not execute external actions without explicit owner sign-off.',
            'Resumable State: Progress is safely stored and can be resumed at any time.',
        ],
        lifecycle: ['Discovery Completed', 'Connectors Staged', 'Blueprint Generated', 'Import Plan Staged', 'Workspace Launched'],
        dataFields: ['current_step', 'discovery_data', 'selected_integrations', 'blueprint_data', 'status'],
        automationTriggers: 'Trigger audit logs on onboarding.started, onboarding.discovery_saved, onboarding.completed.',
    },
];

const troubleshooting = [
    {
        question: 'A teammate cannot open our workspace. What should I check?',
        answer: 'Confirm they accepted the invitation email, selected the correct workspace slug, and have a role assigned with the necessary permissions. Owners and administrators can inspect and modify user seats in Team Settings.',
    },
    {
        question: 'Why is an integration showing a failed sync in Sync Logs?',
        answer: 'Open Sync Logs from Integration Hub. Check connector credentials, webhook error codes, and payload data. You can re-authenticate credentials and click "Replay Failed Job" to safely reprocess without creating duplicate records.',
    },
    {
        question: 'Why did an automation stop at approval?',
        answer: 'High-impact actions are intentionally held until an authorized person approves, rejects, delegates, or escalates the request. Review the execution history to see the approval policy and next owner.',
    },
    {
        question: 'Why can’t I use Business Copilot or see an AI feature?',
        answer: 'AI access depends on the active plan, company entitlement, and your role. A workspace owner can review subscription capabilities, while an administrator can confirm your workspace membership and access level.',
    },
    {
        question: 'How do stock reservations work during multi-channel sales surges?',
        answer: 'When a sales order is confirmed in BizSyncOS (or synced from Shopify/WooCommerce), the system immediately moves the required SKU count from "Available" to "Reserved". This prevents overselling even if physical dispatch happens hours later.',
    },
    {
        question: 'How do I configure GST/VAT rates and multi-currency exchange rates?',
        answer: 'Go to Company Profile in Settings. Select your base currency (INR, AED, USD, etc.) and configure your default tax slabs (e.g. GST 5%, 12%, 18%, 28%). Individual products and customer billing profiles can override tax rules as required.',
    },
];

const apiExamples = {
    orders: `// Create a Sales Order via BizSyncOS REST API
const response = await fetch('https://api.bizsyncos.com/v1/workspaces/northstar/sales-orders', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customer_id: 'cust_84729',
    currency: 'INR',
    items: [
      { sku: 'SKU-SHIRT-BLU-M', quantity: 2, unit_price: 1299.00, tax_rate: 12 },
      { sku: 'SKU-BELT-LEA-BLK', quantity: 1, unit_price: 899.00, tax_rate: 18 }
    ],
    shipping_address: {
      address_line1: '42 MG Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postal_code: '560038',
      country: 'India'
    }
  })
});
const data = await response.json();
console.log('Order created:', data.order_number);`,

    inventory: `// Query Real-Time Multi-Warehouse SKU Stock Levels
curl -X GET "https://api.bizsyncos.com/v1/workspaces/northstar/inventory/SKU-SHIRT-BLU-M" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"

// Response:
// {
//   "sku": "SKU-SHIRT-BLU-M",
//   "on_hand": 140,
//   "reserved": 18,
//   "available_to_promise": 122,
//   "reorder_threshold": 30,
//   "warehouses": [
//     { "id": "wh_blr_main", "name": "Bengaluru Central", "available": 90 },
//     { "id": "wh_mum_hub", "name": "Mumbai Logistics Hub", "available": 32 }
//   ]
// }`,

    webhook: `// Webhook Payload Example: order.created Event
{
  "event": "order.created",
  "workspace_slug": "northstar-retail",
  "timestamp": "2026-09-05T18:40:00Z",
  "data": {
    "order_id": "ord_918237",
    "order_number": "SO-2026-0492",
    "total_amount": 3497.00,
    "currency": "INR",
    "payment_method": "Razorpay_UPI",
    "customer": {
      "name": "Arjun Sharma",
      "phone": "+919876543210"
    }
  }
}`
};

function scrollToGuide(id: string) {
    document
        .getElementById(id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function DocsSectionHeading({
    eyebrow,
    title,
    copy,
}: {
    eyebrow: string;
    title: string;
    copy: string;
}) {
    return (
        <div className="docs-section-heading">
            <p>{eyebrow}</p>
            <h2>{title}</h2>
            <span>{copy}</span>
        </div>
    );
}

export function DocsPortal({ navigate }: { navigate: DocsNavigate }) {
    const prefersReducedMotion = useReducedMotion();
    const [query, setQuery] = useState('');
    const [activeNavGroup, setActiveNavGroup] = useState('start');
    const [activeDashboardTab, setActiveDashboardTab] = useState('main-dash');
    const [activeModuleCat, setActiveModuleCat] = useState<'all' | 'commerce' | 'inventory' | 'crm' | 'finance' | 'governance'>('all');
    const [openTroubleIndex, setOpenTroubleIndex] = useState<number | null>(0); // Default open to approval question
    const [activeApiTab, setActiveApiTab] = useState<'orders' | 'inventory' | 'webhook'>('orders');
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const copyCode = (key: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const matchingTopics = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return guideTopics;
        return guideTopics.filter((t) =>
            `${t.label} ${t.description} ${t.group}`.toLowerCase().includes(q),
        );
    }, [query]);

    const filteredModules = useMemo(() => {
        if (activeModuleCat === 'all') return moduleSpecs;
        return moduleSpecs.filter((m) => m.category === activeModuleCat);
    }, [activeModuleCat]);

    const selectedDashboard = useMemo(() => {
        return dashboardSpecs.find((d) => d.id === activeDashboardTab) ?? dashboardSpecs[0];
    }, [activeDashboardTab]);

    const chooseTopic = (topic: GuideTopic) => {
        setActiveNavGroup(topic.group);
        setQuery('');
        scrollToGuide(topic.id);
    };

    const sectionMotion = (delay = 0) =>
        prefersReducedMotion
            ? {}
            : {
                  initial: { opacity: 0, y: 18 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.1 },
                  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
              };

    return (
        <main className="docs-portal">
            {/* 1. HERO SECTION */}
            <section className="docs-hero-modern" aria-labelledby="docs-title">
                <span className="docs-hero-grid-bg" aria-hidden="true" />
                <div className="docs-layout">
                    <div className="docs-hero-inner">
                        <div>
                            <span className="docs-hero-eyebrow">
                                <FileText size={14} className="mr-1 inline" /> PRODUCT &amp; ARCHITECTURE MANUAL
                            </span>
                            <h1 id="docs-title" className="docs-hero-title">
                                Build a connected business, <em>one confident step</em> at a time.
                            </h1>
                            <p className="docs-hero-desc">
                                The comprehensive operating handbook and developer reference for BizSyncOS.
                                Detailed lifecycles, data models, AI health scoring, automation gates, and API specs for every module and dashboard.
                            </p>

                            {/* Search Box */}
                            <div className="docs-search-box-modern">
                                <div className="docs-search-input-shell">
                                    <Search size={18} className="text-slate-400" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search modules, dashboards, automations, invoices, API..."
                                        aria-label="Search BizSyncOS documentation"
                                    />
                                    <span className="docs-kbd-tag">⌘ K</span>
                                </div>

                                {query ? (
                                    <div className="docs-search-dropdown-menu" role="list">
                                        {matchingTopics.length ? (
                                            matchingTopics.map((topic) => {
                                                const Icon = topic.icon;
                                                return (
                                                    <button
                                                        key={topic.id}
                                                        type="button"
                                                        onClick={() => chooseTopic(topic)}
                                                        className="docs-search-result-btn"
                                                    >
                                                        <Icon size={18} className="text-sky-400 shrink-0" />
                                                        <div className="docs-search-item-info">
                                                            <strong>{topic.label}</strong>
                                                            <small>{topic.description}</small>
                                                        </div>
                                                        <ArrowRight size={14} className="text-slate-500 shrink-0" />
                                                    </button>
                                                );
                                            })
                                        ) : (
                                            <p className="p-3 text-xs text-slate-400 text-center">
                                                No direct matches for "{query}". Try "orders", "inventory", "AI", "approvals", or "API".
                                            </p>
                                        )}
                                    </div>
                                ) : null}
                            </div>

                            {/* Quick Jump Chips */}
                            <div className="docs-quick-jump-chips">
                                <span className="text-xs font-semibold text-slate-400 mr-2">Quick Jump:</span>
                                <button type="button" onClick={() => scrollToGuide('dashboards')} className="docs-jump-chip">
                                    <LayoutDashboard size={13} /> Dashboards
                                </button>
                                <button type="button" onClick={() => scrollToGuide('modules')} className="docs-jump-chip">
                                    <Layers3 size={13} /> All 16+ Modules
                                </button>
                                <button type="button" onClick={() => scrollToGuide('automation')} className="docs-jump-chip">
                                    <Workflow size={13} /> Automations
                                </button>
                                <button type="button" onClick={() => scrollToGuide('copilot')} className="docs-jump-chip">
                                    <BrainCircuit size={13} /> Copilot AI
                                </button>
                                <button type="button" onClick={() => scrollToGuide('integrations')} className="docs-jump-chip">
                                    <Code2 size={13} /> REST API
                                </button>
                            </div>

                            {/* Hero Action Buttons */}
                            <div className="docs-hero-action-row">
                                <button
                                    type="button"
                                    className="docs-btn-primary-glow"
                                    onClick={() => scrollToGuide('setup')}
                                >
                                    Start with company setup <ArrowRight size={16} />
                                </button>
                                <button
                                    type="button"
                                    className="docs-btn-secondary-outline"
                                    onClick={() => navigate('/demo')}
                                >
                                    Explore the live demo <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Right Quickstart Checklist */}
                        <aside className="docs-quickstart-card">
                            <span className="docs-quickstart-badge">
                                <Sparkles size={14} className="mr-1 inline" /> YOUR FIRST 30 MINUTES
                            </span>
                            <h3>Turn the demo into your operating system</h3>
                            <ul className="docs-quickstart-steps">
                                <li className="docs-quickstart-step-item">
                                    <span className="docs-qs-num">01</span>
                                    <div className="docs-qs-text">
                                        <strong>Shape the company</strong>
                                        <small>Currency, tax rules, fiscal year, and warehouse addresses.</small>
                                    </div>
                                </li>
                                <li className="docs-quickstart-step-item">
                                    <span className="docs-qs-num">02</span>
                                    <div className="docs-qs-text">
                                        <strong>Bring in the right people</strong>
                                        <small>Assign strict roles (Owner, Admin, Sales, Warehouse, Finance).</small>
                                    </div>
                                </li>
                                <li className="docs-quickstart-step-item">
                                    <span className="docs-qs-num">03</span>
                                    <div className="docs-qs-text">
                                        <strong>Start your core flow</strong>
                                        <small>Lead &rarr; Quotation &rarr; Sales Order &rarr; Stock &rarr; Invoice.</small>
                                    </div>
                                </li>
                                <li className="docs-quickstart-step-item">
                                    <span className="docs-qs-num">04</span>
                                    <div className="docs-qs-text">
                                        <strong>Connect intelligence safely</strong>
                                        <small>Review AI health radar, approval gates, and draft workflows.</small>
                                    </div>
                                </li>
                            </ul>
                            <div className="docs-quickstart-foot">
                                <Check size={16} /> Full-product demo access with verified zero-risk sandbox
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* 2. STICKY CATEGORY NAV */}
            <nav className="docs-nav-bar-sticky" aria-label="Documentation sections">
                <div className="docs-layout">
                    <div className="docs-nav-bar-scroll">
                        {guideGroups.map((group) => (
                            <button
                                key={group.id}
                                type="button"
                                className={`docs-nav-tab-btn ${activeNavGroup === group.id ? 'is-active' : ''}`}
                                onClick={() => {
                                    setActiveNavGroup(group.id);
                                    scrollToGuide(group.id);
                                }}
                            >
                                {group.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* 3. SECTION 01: COMPANY SETUP */}
            <section id="setup" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="01 / COMPANY SETUP"
                        title="Give every record a business context from day one."
                        copy="Your workspace is the single source of truth for your company's operational rules, localized fiscal defaults, team roles, and multi-channel catalogs. Complete these core foundations before staging transactional records."
                    />

                    <div className="docs-setup-grid">
                        {[
                            {
                                num: '01',
                                icon: Building2,
                                title: 'Company Profile & Tax',
                                text: 'Configure legal name, operating address, currency (INR, AED, USD), timezone, and regional tax registrations (GSTIN, TRN, VAT slabs).',
                            },
                            {
                                num: '02',
                                icon: Layers,
                                title: 'Workspace Defaults & SKUs',
                                text: 'Standardize SKU naming prefixes, customer account numbering, sales quotation prefixes, and custom order reference schemes.',
                            },
                            {
                                num: '03',
                                icon: Warehouse,
                                title: 'Multi-Location Warehouses',
                                text: 'Define physical warehouses, 3PL fulfillment hubs, and retail points before incoming shipments arrive to maintain complete traceability.',
                            },
                            {
                                num: '04',
                                icon: Sparkles,
                                title: '5-Step Guided Onboarding',
                                text: 'Run the /onboarding wizard to answer business operational parameters, stage connectors, and generate a tailored operating blueprint.',
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={item.num} className="docs-setup-step-card" {...sectionMotion(index * 0.05)}>
                                    <div className="docs-setup-card-num">{item.num}</div>
                                    <Icon size={22} className="text-sky-400" />
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="docs-callout-modern">
                        <LockKeyhole size={22} />
                        <div>
                            <strong>Strict Tenant Boundary & Multi-Tenant Isolation</strong>
                            <p>
                                All product records, customer histories, ledger balances, AI memory embeddings, and audit logs are strictly tenant-isolated. Zero cross-workspace data leakage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SECTION 02: PEOPLE & RBAC */}
            <section id="workspace" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="02 / PEOPLE AND ACCESS"
                        title="Make ownership obvious before work begins."
                        copy="Invite team members and assign explicit roles rather than sharing master credentials. BizSyncOS enforces strict Role-Based Access Control (RBAC) across all views and API mutations."
                    />

                    <div className="docs-rbac-grid">
                        <div className="docs-role-card-list">
                            {[
                                {
                                    icon: Building2,
                                    title: 'Owner',
                                    desc: 'Company strategy, subscription management, tenant exports, and critical financial approval sign-offs.',
                                },
                                {
                                    icon: ShieldCheck,
                                    title: 'Administrator',
                                    desc: 'Workspace configuration, user seats, integration credentials, webhook settings, and custom module fields.',
                                },
                                {
                                    icon: ShoppingCart,
                                    title: 'Sales & CRM Team',
                                    desc: 'Manage leads, create quotations, confirm sales orders, review customer accounts, and send WhatsApp messages.',
                                },
                                {
                                    icon: Warehouse,
                                    title: 'Warehouse & Fulfillment Lead',
                                    desc: 'Execute stock inwarding (GRN), inventory adjustments, pick-pack-ship pipelines, and courier dispatches.',
                                },
                                {
                                    icon: CreditCard,
                                    title: 'Finance & Accounts Officer',
                                    desc: 'Generate GST/VAT tax invoices, record payment receipts, review aging receivables, and reconcile ledger accounts.',
                                },
                            ].map((role, idx) => {
                                const RoleIcon = role.icon;
                                return (
                                    <motion.div key={role.title} className="docs-role-item-card" {...sectionMotion(idx * 0.04)}>
                                        <div className="docs-role-icon-box">
                                            <RoleIcon size={18} />
                                        </div>
                                        <div className="docs-role-info">
                                            <strong>{role.title}</strong>
                                            <p>{role.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="docs-operating-loop-diagram">
                            <div className="docs-loop-title">Workspace Operating Loop</div>
                            <div className="docs-loop-node-list">
                                <div className="docs-loop-node-row">
                                    <b>01. Leadership / Owner</b>
                                    <small>Defines Policies &amp; Goals</small>
                                </div>
                                <div className="docs-loop-node-row">
                                    <b>02. System Admin</b>
                                    <small>Configures Channels &amp; RBAC</small>
                                </div>
                                <div className="docs-loop-node-row">
                                    <b>03. Functional Teams</b>
                                    <small>Executes Daily Orders &amp; Stock</small>
                                </div>
                                <div className="docs-loop-node-row">
                                    <b>04. AI Health Radar</b>
                                    <small>Audits Risks &amp; Synthesizes Data</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. SECTION 03: EXECUTIVE & AI DASHBOARDS */}
            <section id="dashboards" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="03 / EXECUTIVE &amp; AI DASHBOARDS"
                        title="Command centers built for real-time clarity and predictive health."
                        copy="BizSyncOS provides three purpose-built dashboard interfaces: the high-velocity operational command center, the AI-driven 0-100 health radar, and the conversational AI advisor."
                    />

                    {/* Dashboard Tab Selector */}
                    <div className="docs-dashboard-tabs-wrap">
                        {dashboardSpecs.map((dash) => {
                            const DashIcon = dash.icon;
                            return (
                                <button
                                    key={dash.id}
                                    type="button"
                                    className={`docs-dashboard-tab-trigger ${activeDashboardTab === dash.id ? 'is-active' : ''}`}
                                    onClick={() => setActiveDashboardTab(dash.id)}
                                >
                                    <DashIcon size={16} />
                                    <span>{dash.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected Dashboard Specification Detail */}
                    <div className="docs-dashboard-detail-card">
                        <div className="docs-dash-spec-grid">
                            <div>
                                <div className="docs-dash-header">
                                    <div className="docs-dash-icon-badge">
                                        <selectedDashboard.icon size={24} />
                                    </div>
                                    <div className="docs-dash-title-block">
                                        <h3>{selectedDashboard.title}</h3>
                                        <span className="docs-dash-route-tag">{selectedDashboard.route}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                                    {selectedDashboard.purpose}
                                </p>

                                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">Key Dashboard Capabilities</h4>
                                <ul className="docs-dash-feature-points">
                                    {selectedDashboard.features.map((feat, idx) => (
                                        <li key={idx}>
                                            <CheckCircle2 size={16} />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">Tracked Metric Signals</h4>
                                    <div className="docs-kpi-pill-group">
                                        {selectedDashboard.kpis.map((kpi, idx) => (
                                            <span key={idx} className="docs-kpi-pill">{kpi}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                        <Sparkles size={14} /> Operational Best Practice
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed m-0">
                                        {selectedDashboard.bestPractice}
                                    </p>
                                </div>

                                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-400">
                                    <span className="text-slate-200 font-semibold block mb-1">Architecture Note:</span>
                                    {selectedDashboard.technicalDetails}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. SECTION 04: CORE OPERATIONS & ALL 16+ MODULES */}
            <section id="modules" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="03 / DAILY OPERATIONS"
                        title="Every module keeps the next team informed."
                        copy="BizSyncOS connects 16+ specialized operational engines into a single transactional graph. An inquiry moves into a quote, converts to a sales order, reserves stock, dispatches via courier, and posts to invoices without redundant spreadsheets."
                    />

                    {/* Category Filter */}
                    <div className="docs-module-cat-nav">
                        {[
                            { id: 'all', label: 'All 16 Modules' },
                            { id: 'commerce', label: 'Commerce & Sales' },
                            { id: 'inventory', label: 'Inventory & Logistics' },
                            { id: 'crm', label: 'CRM & WhatsApp' },
                            { id: 'finance', label: 'Finance & Invoices' },
                            { id: 'governance', label: 'Automation & Governance' },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                className={`docs-module-cat-btn ${activeModuleCat === cat.id ? 'is-active' : ''}`}
                                onClick={() => setActiveModuleCat(cat.id as typeof activeModuleCat)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Modules Grid */}
                    <div className="docs-module-card-grid">
                        {filteredModules.map((mod, idx) => {
                            const ModIcon = mod.icon;
                            return (
                                <motion.article key={mod.id} className="docs-module-item-box" {...sectionMotion(idx * 0.03)}>
                                    <div>
                                        <div className="docs-mod-top">
                                            <div className="docs-mod-icon">
                                                <ModIcon size={20} />
                                            </div>
                                            <div className="docs-mod-titles">
                                                <h4>{mod.title}</h4>
                                                <span className="docs-mod-route">{mod.route}</span>
                                            </div>
                                        </div>

                                        <p className="docs-mod-desc">{mod.summary}</p>

                                        <h5 className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-2">Key Features</h5>
                                        <ul className="docs-mod-key-points">
                                            {mod.keyFeatures.slice(0, 3).map((kf, i) => (
                                                <li key={i}>
                                                    <Check size={13} />
                                                    <span>{kf}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 my-3 text-[11px]">
                                            <span className="text-sky-400 font-semibold block mb-0.5">Automation Signal:</span>
                                            <code className="text-slate-300 font-mono text-[10.5px]">{mod.automationTriggers}</code>
                                        </div>

                                        <div className="docs-mod-tag-bar">
                                            <span className="docs-mod-badge-pill uppercase tracking-wider font-mono text-[10px]">
                                                {mod.category}
                                            </span>
                                            <span className="text-slate-400 text-xs">
                                                {mod.lifecycle.length} Lifecycle Steps
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* Operational Path Ribbon */}
                    <div className="docs-operating-flow-ribbon">
                        <span className="docs-flow-label">Standard Order-to-Cash Flow:</span>
                        {[
                            'Lead Captured',
                            'Quotation Sent',
                            'Sales Order Confirmed',
                            'Stock Reserved',
                            'Courier Dispatched',
                            'Tax Invoice Generated',
                            'Payment Settled',
                            'AI Health Updated',
                        ].map((step, idx) => (
                            <div key={step} className="docs-flow-step-pill">
                                <b>{step}</b>
                                {idx < 7 ? <ArrowRight size={14} className="text-slate-500" /> : null}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. SECTION 05: AUTOMATION WITH ACCOUNTABILITY */}
            <section id="automation" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="04 / AUTOMATION WITH ACCOUNTABILITY"
                        title="Automate repeatable work. Keep people in control."
                        copy="Every workflow starts from a business event, evaluates strict policy rules, and executes controlled multi-channel actions. When an action impacts money, inventory reservations, or external customer messaging, an explicit human approval gate is enforced."
                    />

                    <div className="docs-automation-pipeline-board">
                        <div className="docs-pipeline-title">High-Value Cash-On-Delivery Order Verification Workflow</div>
                        <div className="docs-pipeline-steps-wrap">
                            {[
                                { label: 'Trigger', title: 'order.created', icon: ShoppingCart },
                                { label: 'Condition', title: 'Payment = COD && Total > ₹5,000', icon: Layers },
                                { label: 'Intelligence', title: 'Risk Score Calculated', icon: BrainCircuit },
                                { label: 'Approval Gate', title: 'Owner Review Required', icon: ShieldCheck, isApproval: true },
                                { label: 'Action', title: 'Send WhatsApp OTP', icon: MessageSquare },
                                { label: 'Audit Trail', title: 'Execution Logged', icon: FileText },
                            ].map((step, idx) => {
                                const StepIcon = step.icon;
                                return (
                                    <div key={step.title} className="flex items-center gap-3">
                                        <div className={`docs-pipeline-card ${step.isApproval ? 'is-approval' : ''}`}>
                                            <small>{step.label}</small>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <StepIcon size={14} className="text-sky-400" />
                                                <strong>{step.title}</strong>
                                            </div>
                                        </div>
                                        {idx < 5 ? <ArrowRight size={16} className="text-slate-600 shrink-0" /> : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                <Zap size={16} className="text-sky-400" /> Pre-Built Automation Packs
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed m-0">
                                Deploy ready-to-run templates for Low Stock Alerts, Abandoned Cart WhatsApp Nudges, Delayed Shipment Alerts, and Overdue Invoice Reminders in 1 click.
                            </p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-emerald-400" /> Approval Safeguards
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed m-0">
                                High-impact actions are held in pending queue until authorized by designated department heads. Unapproved tasks automatically timeout or escalate.
                            </p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                <FileText size={16} className="text-purple-400" /> Immutable Run History
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed m-0">
                                Inspect input variables, timestamp logs, execution payloads, and retry failed API webhooks without risking duplicate external side effects.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. SECTION 06: BUSINESS COPILOT & AI ARCHITECTURE */}
            <section id="copilot" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="05 / BUSINESS COPILOT"
                        title="Ask questions. Inspect the evidence. Decide with confidence."
                        copy="Business Copilot synthesizes live transactional tables, customer communications, and company policy rules. It provides evidence-backed explanations and decision recommendations without ever guessing or hallucinating numbers."
                    />

                    <div className="docs-copilot-container">
                        <div className="space-y-4">
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                                <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm mb-1">
                                    <BrainCircuit size={18} />
                                    <span>Grounded RAG Architecture</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed m-0">
                                    Every calculation is derived from validated database SQL queries, velocity moving averages, and ledger balances. The AI provides explicit source links for every insight.
                                </p>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm mb-1">
                                    <Database size={18} />
                                    <span>Company Memory Vault</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed m-0">
                                    Store company operational policies, vendor discount contracts, regional tax notes, and custom SOPs. The AI leverages this memory to deliver tailored advice.
                                </p>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
                                    <Sliders size={18} />
                                    <span>What-If Scenario Simulator</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed m-0">
                                    Model operational shocks before taking action: simulate a 15% raw material cost increase, supplier delivery delays, or advertising budget scale to predict inventory and margin impacts.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Copilot Preview Box */}
                        <div className="docs-copilot-card-preview">
                            <div className="docs-copilot-card-top">
                                <span className="flex items-center gap-2">
                                    <Brain size={16} className="text-sky-400" />
                                    <span>BIZSYNCOS COPILOT ADVISOR</span>
                                </span>
                                <span className="text-[11px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                                    Grounded in Live Database
                                </span>
                            </div>

                            <div className="docs-copilot-chat-bubble">
                                <p className="text-xs text-slate-400 font-medium mb-1">User Inquiry:</p>
                                <p className="text-sm text-white font-semibold m-0">
                                    "What inventory and cashflow risks require immediate attention before today's dispatch cutoff?"
                                </p>
                            </div>

                            <div className="docs-copilot-response">
                                <p className="text-xs text-slate-200 font-medium mb-2">
                                    Executive Synthesis (3 Critical Signals Found):
                                </p>
                                <ul>
                                    <li className="text-xs text-slate-300">
                                        <AlertTriangle size={14} className="text-rose-400 shrink-0" />
                                        <span><strong>SKU-DENIM-32-BLU</strong> is at 12 units (Run-rate = 8 units/day). Projected stockout in 36 hours.</span>
                                    </li>
                                    <li className="text-xs text-slate-300">
                                        <AlertCircle size={14} className="text-amber-400 shrink-0" />
                                        <span>2 Overdue B2B Invoices totalling <strong>₹1,42,000</strong> past due 15+ days (Acme Retailers).</span>
                                    </li>
                                    <li className="text-xs text-slate-300">
                                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                                        <span>Shopify Webhook sync operating normally (0 failed jobs in last 24h).</span>
                                    </li>
                                </ul>

                                <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                                    <span>Evidence: Inventory Master + Receivables Ledger</span>
                                    <span className="text-sky-400 font-medium">Recommended Action Staged</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. SECTION 07: INTEGRATIONS & REST API REFERENCE */}
            <section id="integrations" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="06 / INTEGRATION HUB"
                        title="Connect channels without losing the source of truth."
                        copy="Integrate your commerce channels, payment gateways, messaging tools, and custom ERP software using the BizSyncOS REST API and real-time Webhook system."
                    />

                    {/* Supported Integrations Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <Store size={20} className="text-emerald-400 mb-2" />
                            <h4 className="text-sm font-bold text-white">Commerce</h4>
                            <p className="text-xs text-slate-400 m-0">Shopify, WooCommerce, Amazon, Flipkart</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <CreditCard size={20} className="text-sky-400 mb-2" />
                            <h4 className="text-sm font-bold text-white">Payments &amp; ERP</h4>
                            <p className="text-xs text-slate-400 m-0">Razorpay, Stripe, Tally Prime, QuickBooks</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <MessageSquare size={20} className="text-purple-400 mb-2" />
                            <h4 className="text-sm font-bold text-white">Communications</h4>
                            <p className="text-xs text-slate-400 m-0">Meta WhatsApp Cloud, Gmail, Outlook, Slack</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <Truck size={20} className="text-amber-400 mb-2" />
                            <h4 className="text-sm font-bold text-white">Logistics &amp; Courier</h4>
                            <p className="text-xs text-slate-400 m-0">Shiprocket, Delhivery, BlueDart</p>
                        </div>
                    </div>

                    {/* REST API & Code Samples */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                            <div>
                                <h3 className="text-lg font-bold text-white">Developer REST API &amp; Webhooks</h3>
                                <p className="text-xs text-slate-400 m-0">
                                    Authenticate via Bearer API Token. Full OpenAPI 3.0 compatible.
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeApiTab === 'orders' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                                    onClick={() => setActiveApiTab('orders')}
                                >
                                    POST /sales-orders
                                </button>
                                <button
                                    type="button"
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeApiTab === 'inventory' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                                    onClick={() => setActiveApiTab('inventory')}
                                >
                                    GET /inventory/:sku
                                </button>
                                <button
                                    type="button"
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeApiTab === 'webhook' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                                    onClick={() => setActiveApiTab('webhook')}
                                >
                                    Webhook Payload
                                </button>
                            </div>
                        </div>

                        <div className="docs-code-container">
                            <div className="docs-code-bar">
                                <span>{activeApiTab === 'orders' ? 'JavaScript / Node.js' : activeApiTab === 'inventory' ? 'cURL' : 'JSON Event Schema'}</span>
                                <button
                                    type="button"
                                    className="docs-copy-code-btn"
                                    onClick={() => copyCode(activeApiTab, apiExamples[activeApiTab])}
                                >
                                    {copiedKey === activeApiTab ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                                    <span>{copiedKey === activeApiTab ? 'Copied' : 'Copy Code'}</span>
                                </button>
                            </div>
                            <pre className="docs-code-pre">
                                <code>{apiExamples[activeApiTab]}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. SECTION 08: SUBSCRIPTIONS & BILLING */}
            <section id="billing" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="07 / SUBSCRIPTIONS AND BILLING"
                        title="Choose capabilities that match the business you run today."
                        copy="A subscription belongs to one company workspace. It defines the active modules, user seats, monthly order volume, and AI capabilities available to that tenant."
                    />

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">3-Day Full Demo</div>
                            <h3 className="text-xl font-bold text-white mb-2">Sandbox Exploration</h3>
                            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                                Complete access to all 16 modules, AI Copilot, and automation builder to evaluate fit for your business.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate('/demo')}
                                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                            >
                                Launch 3-Day Demo
                            </button>
                        </div>

                        <div className="bg-slate-900 border border-sky-500/30 rounded-xl p-6 relative">
                            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Growth &amp; Scale</div>
                            <h3 className="text-xl font-bold text-white mb-2">Commercial Production</h3>
                            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                                High-velocity multi-store sync, unlimited sales orders, AI health radar, and WhatsApp Cloud API automations.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate('/pricing')}
                                className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-md"
                            >
                                View Pricing Plans
                            </button>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Enterprise Dedicated</div>
                            <h3 className="text-xl font-bold text-white mb-2">Custom Governance</h3>
                            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                                Dedicated DB read-replicas, custom ERP integrations (SAP, Oracle), custom AI model fine-tuning, and 99.99% SLA.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate('/contact')}
                                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                            >
                                Contact Enterprise Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. SECTION 09: HELP CENTRE & TROUBLESHOOTING */}
            <section id="help" className="docs-content-section">
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="08 / HELP CENTRE"
                        title="Resolve the issue with context, not guesswork."
                        copy="Start with the underlying record, audit log, or integration sync status. Most operational exceptions become self-evident when viewing the immutable event history."
                    />

                    <div className="docs-trouble-accordion-group">
                        {troubleshooting.map((item, index) => {
                            const isOpen = openTroubleIndex === index;
                            return (
                                <article key={item.question} className={isOpen ? 'is-open' : ''}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenTroubleIndex(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{item.question}</span>
                                        <ChevronDown size={18} />
                                    </button>
                                    {isOpen ? <p>{item.answer}</p> : null}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 12. SECTION 10: FINAL CTA */}
            <section className="docs-final-cta-section">
                <div className="docs-layout">
                    <div className="docs-final-cta-box">
                        <span className="docs-quickstart-badge">
                            <Sparkles size={14} className="mr-1 inline" /> READY TO PUT THE PLAYBOOK INTO PRACTICE?
                        </span>
                        <h2>See the complete operating system before you commit.</h2>
                        <p>
                            Open the 3-day demo to follow a live customer, order, inventory movement, approval gate, and executive business insight from one connected workspace.
                        </p>
                        <div className="docs-final-btn-group">
                            <button
                                type="button"
                                className="docs-btn-primary-glow"
                                onClick={() => navigate('/signup')}
                            >
                                Start 3-day demo <ArrowRight size={16} />
                            </button>
                            <button
                                type="button"
                                className="docs-btn-secondary-outline"
                                onClick={() => navigate('/contact')}
                            >
                                Plan a custom rollout <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}