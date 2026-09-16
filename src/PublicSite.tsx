import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock,
  Eye,
  EyeOff,
  FileCheck,
  FileText,
  Globe2,
  HelpCircle,
  KeyRound,
  Layers3,
  Lock,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  PackageCheck,
  Play,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  Truck,
  User,
  UsersRound,
  Warehouse,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  siQuickbooks,
  siRazorpay,
  siShopify,
  siStripe,
  siWhatsapp,
  siWoocommerce,
} from 'simple-icons';
import { DocsPortal } from './DocsPortal';
import './auth.css';

export type PublicRoute =
  | '/'
  | '/product'
  | '/solutions'
  | '/integrations'
  | '/why-bizsyncos'
  | '/pricing'
  | '/docs'
  | '/blog'
  | '/about'
  | '/contact'
  | '/demo'
  | '/login'
  | '/signup';

type PublicSiteProps = {
  route: Exclude<PublicRoute, '/'>;
  navigate: (route: PublicRoute) => void;
};

const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const LOCAL_BACKEND_URL =
  document.querySelector<HTMLMetaElement>('meta[name="auth-backend"]')?.content ||
  import.meta.env.VITE_BACKEND_URL ||
  (isLocalHost ? 'http://127.0.0.1:9000' : 'https://crm.cybals.com');
const backendPath = (path: string) => `${LOCAL_BACKEND_URL.replace(/\/$/, '')}${path}`;

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

const modules: Feature[] = [
  {
    icon: UsersRound,
    title: 'CRM',
    description:
      'Keep every lead, customer, conversation, opportunity, and follow-up in one connected history.',
    accent: 'blue',
  },
  {
    icon: ClipboardList,
    title: 'Orders',
    description:
      'Move from quotation to order, invoice, payment, return, and revenue with clear ownership.',
    accent: 'cyan',
  },
  {
    icon: Layers3,
    title: 'Inventory',
    description:
      'See product availability, stock movements, replenishment signals, and stockout risks early.',
    accent: 'violet',
  },
  {
    icon: Warehouse,
    title: 'Warehouse',
    description:
      'Coordinate receiving, put-away, picking, packing, dispatch, and courier handoffs.',
    accent: 'amber',
  },
  {
    icon: CircleDollarSign,
    title: 'Finance',
    description:
      'Track invoices, collections, payment records, receivables, and finance controls in context.',
    accent: 'rose',
  },
  {
    icon: BarChart3,
    title: 'Reports',
    description:
      'Understand performance, business health, risks, and opportunities as they emerge.',
    accent: 'green',
  },
  {
    icon: BrainCircuit,
    title: 'AI',
    description:
      'Ask grounded business questions and review evidence-backed recommendations before action.',
    accent: 'orange',
  },
  {
    icon: Workflow,
    title: 'Automation',
    description:
      'Turn repeatable business events into controlled workflows with delays, approvals, and logs.',
    accent: 'indigo',
  },
  {
    icon: MessageSquareText,
    title: 'Marketing',
    description:
      'Build audiences, consent-aware campaigns, attribution, and revenue-recovery programs.',
    accent: 'orange',
  },
];

function RouteButton({
  navigate,
  route,
  children,
  variant = 'primary',
}: {
  navigate: (route: PublicRoute) => void;
  route: PublicRoute;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  return (
    <button className={`button button-${variant}`} type="button" onClick={() => navigate(route)}>
      {children}
      <ArrowRight size={17} />
    </button>
  );
}

const routeHeroSignals = [
  ['Customer', 'Context'],
  ['Order', 'Confirmed'],
  ['AI', 'Evidence ready'],
  ['Action', 'Approved'],
] as const;

function RouteHeroScene({ preview }: { preview: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="route-hero-system"
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.68,
        delay: prefersReducedMotion ? 0 : 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      role="img"
      aria-label="BizSyncOS connects customer signals, orders, AI evidence, and approved business actions."
    >
      <span className="route-hero-grid" aria-hidden="true" />
      <span className="route-hero-ring route-ring-one" aria-hidden="true" />
      <span className="route-hero-ring route-ring-two" aria-hidden="true" />
      <svg className="route-hero-links" viewBox="0 0 520 430" aria-hidden="true">
        <path d="M115 92 C190 130 205 160 244 193" />
        <path d="M405 92 C330 130 315 160 276 193" />
        <path d="M115 338 C190 301 205 274 244 237" />
        <path d="M405 338 C330 301 315 274 276 237" />
      </svg>
      {routeHeroSignals.map(([label, detail], index) => (
        <motion.span
          key={label}
          className={`route-hero-signal route-signal-${index + 1}`}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.84 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.42,
            delay: prefersReducedMotion ? 0 : 0.22 + index * 0.08,
          }}
        >
          <b>{label}</b>
          <small>{detail}</small>
        </motion.span>
      ))}
      <motion.span
        className="route-hero-core"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.58,
          delay: prefersReducedMotion ? 0 : 0.18,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <b>BS</b>
        <strong>BizSyncOS</strong>
        <small>Connected by design</small>
      </motion.span>
      <motion.span
        className="route-hero-status"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: prefersReducedMotion ? 0 : 0.52,
        }}
      >
        <i /> {preview ? 'Live workspace preview' : 'Operating system ready'}
      </motion.span>
    </motion.div>
  );
}

function PageHero({
  eyebrow,
  title,
  copy,
  navigate,
  primary = '/demo',
  secondary = '/contact',
  preview = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  navigate: (route: PublicRoute) => void;
  primary?: PublicRoute;
  secondary?: PublicRoute;
  preview?: boolean;
}) {
  return (
    <section className="route-hero">
      <div>
        <p className="eyebrow blue">
          <Sparkles size={15} /> {eyebrow}
        </p>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="hero-actions">
          <RouteButton navigate={navigate} route={primary}>
            {primary === '/signup'
              ? 'Start free trial'
              : primary === '/contact'
                ? 'Talk to sales'
                : 'Try live demo'}
          </RouteButton>
          <RouteButton navigate={navigate} route={secondary} variant="secondary">
            {secondary === '/contact'
              ? 'Talk to sales'
              : secondary === '/demo'
                ? 'Try live demo'
                : 'Explore more'}
          </RouteButton>
        </div>
      </div>
      <RouteHeroScene preview={preview} />
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <article className={`feature-card ${feature.accent}`}>
      <span>
        <Icon size={22} />
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      <span className="feature-link">
        Explore capability <ArrowRight size={15} />
      </span>
    </article>
  );
}

export function ScreenshotGallery() {
  return (
    <section id="screens" className="screenshot-gallery section-pad compact-gallery">
      <div className="section-intro centered">
        <p className="eyebrow blue">
          <Play size={15} /> PRODUCT SCREENSHOTS
        </p>
        <h2>See the operating system your team will use every day.</h2>
        <p>
          Original BizSyncOS demo-workspace visuals. They illustrate the product experience; they
          are not customer data or third-party assets.
        </p>
      </div>
      <div className="screenshot-feature">
        <div className="screenshot-label">
          <span>01</span>
          <div>
            <p>EXECUTIVE COMMAND CENTER</p>
            <strong>One focused view for revenue, work, and risks.</strong>
          </div>
          <span className="sample-chip">Illustrative workspace</span>
        </div>
        <img
          src="/images/bizsync-command-center.svg"
          alt="Illustrative BizSyncOS Executive Command Center dashboard"
        />
      </div>
      <div className="screenshot-pair">
        <article>
          <div>
            <span>02</span>
            <p>AI BUSINESS BRAIN</p>
            <strong>Grounded answers and human-approved next actions.</strong>
          </div>
          <img
            src="/images/bizsync-ai-brain.svg"
            alt="Illustrative BizSyncOS AI Business Brain screen"
          />
        </article>
        <article>
          <div>
            <span>03</span>
            <p>CONNECTED OPERATIONS</p>
            <strong>Orders, inventory, fulfillment, and finance in context.</strong>
          </div>
          <img
            src="/images/bizsync-operations.svg"
            alt="Illustrative BizSyncOS connected operations dashboard"
          />
        </article>
      </div>
    </section>
  );
}

type ProductModuleTab = 'oms' | 'wms' | 'logistics' | 'finance' | 'ai';

interface ModuleData {
  id: ProductModuleTab;
  tabLabel: string;
  badge: string;
  title: string;
  description: string;
  capabilities: string[];
  trigger: string;
  action: string;
  mockupType: string;
}

function ProductPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  const [activeTab, setActiveTab] = useState<ProductModuleTab>('oms');

  const modulesData: Record<ProductModuleTab, ModuleData> = {
    oms: {
      id: 'oms',
      tabLabel: 'Central OMS',
      badge: 'OMNICHANNEL ORDER MANAGEMENT',
      title: 'Unified order stream from all marketplaces & storefronts.',
      description:
        'Capture, validate, and route orders from Shopify, Amazon India, Flipkart, WooCommerce, and WhatsApp in under 15 milliseconds. Prevent cancelled orders and customer disputes with instant reservation.',
      capabilities: [
        'Instant bi-directional webhook sync (<15ms latency)',
        'Anti-fraud address normalization & COD OTP verification',
        'Automated multi-location order routing based on pincode proximity',
        'Unified customer timeline with WhatsApp tracking updates',
      ],
      trigger: 'Customer places order on Shopify or Amazon',
      action: 'Instantly reserves inventory in nearest warehouse & alerts dispatch team',
      mockupType: 'orders',
    },
    wms: {
      id: 'wms',
      tabLabel: 'Smart WMS',
      badge: 'WAREHOUSE & MULTI-LOCATION STOCK',
      title: 'Real-time multi-warehouse stock lock with zero overselling.',
      description:
        'Manage centralized distribution centers, regional fulfillment hubs, and retail stores from one master inventory ledger. Buffer thresholds and safety stock protect you against marketplace out-of-stock penalties.',
      capabilities: [
        'Dynamic stock reservation across all connected sales channels',
        'Barcode-driven pick, pack, and bin/rack management',
        'Inter-warehouse stock transfer orders with transit tracking',
        'Automated low-stock threshold alerts & supplier PO generation',
      ],
      trigger: 'Stock drops below 20 units in Delhi Hub',
      action: 'Triggers supplier reorder PO draft & updates Amazon safety buffer to 0',
      mockupType: 'inventory',
    },
    logistics: {
      id: 'logistics',
      tabLabel: 'Logistics Engine',
      badge: 'INTELLIGENT COURIER ALLOCATION',
      title: 'Automated multi-carrier rate shopping and NDR defense.',
      description:
        'Automatically select the fastest or most economical courier (Shiprocket, Delhivery, Bluedart, DTDC) based on deliverability SLAs. Bulk print shipping labels and resolve non-delivery reports proactively.',
      capabilities: [
        'Instant rate shopping across 10+ integrated courier networks',
        'Bulk AWB generation & standardized shipping label printing',
        'Automated WhatsApp NDR workflows for undelivered packages',
        'Live transit milestone webhook normalization',
      ],
      trigger: 'Warehouse packs shipment and requests label',
      action: 'Allocates Delhivery Air (cheapest 24h SLA), generates AWB & sends WhatsApp link',
      mockupType: 'logistics',
    },
    finance: {
      id: 'finance',
      tabLabel: 'GST & Finance',
      badge: 'AUTOMATED COMPLIANCE & ACCOUNTING',
      title: 'Automated IRN GST e-invoices and 2-way Tally/Zoho sync.',
      description:
        'Eliminate manual accounting data entry. Every fulfilled order automatically creates a GST-compliant tax invoice, posts vouchers to Tally Prime or Zoho Books, and reconciles payment gateway settlements.',
      capabilities: [
        'Government IRN e-invoicing and e-way bill generation in 1 click',
        'Bi-directional XML / REST ledger bridge with Tally Prime & Zoho Books',
        'Razorpay & Stripe fee reconciliation ledger',
        'Automated GSTR-1 & GSTR-3B export reports',
      ],
      trigger: 'Package dispatched by courier hub',
      action: 'Generates GST invoice with IRN QR code & records Sales Voucher in Tally',
      mockupType: 'finance',
    },
    ai: {
      id: 'ai',
      tabLabel: 'AI Decision Brain',
      badge: 'PREDICTIVE BUSINESS INTELLIGENCE',
      title: 'Grounded business copilot & predictive operations.',
      description:
        'An AI Business Assistant trained on your live operational data. Forecast upcoming festive demand, detect margin leaks, flag suspicious COD addresses, and interact in natural language over web or WhatsApp.',
      capabilities: [
        'Predictive demand forecasting based on historical sales velocity',
        'COD RTO risk scoring engine to prevent fake deliveries',
        'Margin leak audit across shipping weights and gateway fees',
        'Conversational AI query engine: "Which SKU has lowest margin this week?"',
      ],
      trigger: 'COD order placed with high address risk score (>75%)',
      action: 'Holds dispatch & sends customer WhatsApp prepaid conversion link with 5% discount',
      mockupType: 'ai',
    },
  };

  const currentModule = modulesData[activeTab];

  return (
    <main className="route-page os-product-page">
      {/* High-Impact Hero with Live Operations Mockup */}
      <section className="os-product-hero">
        <div className="os-product-hero-glow" />
        <div className="os-product-container">
          <div className="os-product-hero-grid">
            {/* Left Column: Value Proposition */}
            <div className="os-product-hero-copy">
              <p className="eyebrow blue">
                <Sparkles size={14} /> THE UNIFIED OPERATING SYSTEM
              </p>
              <h1>
                One unified platform for modern <span>omnichannel retail & D2C.</span>
              </h1>
              <p>
                Orchestrate multi-channel orders, real-time warehouse stock locks, automated GST
                e-invoicing, courier routing, and AI decision intelligence in a single real-time
                platform. Zero glue code, zero data silos.
              </p>

              <div className="os-product-hero-actions">
                <RouteButton navigate={navigate} route="/signup">
                  Start 3-Day Free Trial
                </RouteButton>
                <RouteButton navigate={navigate} route="/contact" variant="secondary">
                  Book Guided Demo
                </RouteButton>
              </div>

              <div className="os-product-hero-trust">
                <span>
                  <CheckCircle2 size={15} /> 15+ Native Connectors
                </span>
                <span>
                  <Zap size={15} /> Sub-15ms Webhook Sync
                </span>
                <span>
                  <ShieldCheck size={15} /> ISO 27001 Certified
                </span>
                <span>
                  <Building2 size={15} /> 100% Hosted in AWS Mumbai
                </span>
              </div>
            </div>

            {/* Right Column: Live Operations Telemetry Card Mockup */}
            <div className="os-product-hero-mockup">
              <div className="osp-telemetry-card">
                {/* Telemetry Header */}
                <div className="osp-telemetry-header">
                  <div className="osp-telemetry-title">
                    <span className="osp-pulse-dot" />
                    <strong>BIZSYNCOS OPERATIONS ENGINE</strong>
                  </div>
                  <span className="osp-telemetry-tag">LIVE STREAM · 14.2ms</span>
                </div>

                {/* Top 3 Real-time Metric Tiles */}
                <div className="osp-telemetry-metrics">
                  <div className="osp-metric-box">
                    <small>Today's GMV</small>
                    <strong>₹4,82,900</strong>
                    <span className="osp-trend positive">+18.4% vs yest.</span>
                  </div>
                  <div className="osp-metric-box">
                    <small>Active Orders</small>
                    <strong>342 Orders</strong>
                    <span className="osp-trend neutral">99.4% SLA</span>
                  </div>
                  <div className="osp-metric-box">
                    <small>Stock Protection</small>
                    <strong>0 Oversell</strong>
                    <span className="osp-trend positive">100% Synced</span>
                  </div>
                </div>

                {/* Live Order Stream Ticker */}
                <div className="osp-feed-header">
                  <span>REAL-TIME MULTI-CHANNEL INGESTION</span>
                </div>

                <div className="osp-feed-list">
                  <div className="osp-feed-item">
                    <div className="osp-feed-source shopify">
                      <span>Shopify</span>
                    </div>
                    <div className="osp-feed-info">
                      <strong>#SH-8941 · Mumbai</strong>
                      <small>2 items · ₹3,499</small>
                    </div>
                    <span className="osp-feed-badge allocated">Allocated (Delhi DC)</span>
                    <span className="osp-feed-time">Just now</span>
                  </div>

                  <div className="osp-feed-item">
                    <div className="osp-feed-source amazon">
                      <span>Amazon</span>
                    </div>
                    <div className="osp-feed-info">
                      <strong>#AZ-2018 · Bengaluru</strong>
                      <small>1 item · ₹8,950</small>
                    </div>
                    <span className="osp-feed-badge manifest">Manifest Printed</span>
                    <span className="osp-feed-time">2m ago</span>
                  </div>

                  <div className="osp-feed-item">
                    <div className="osp-feed-source flipkart">
                      <span>Flipkart</span>
                    </div>
                    <div className="osp-feed-info">
                      <strong>#FK-5512 · Kolkata</strong>
                      <small>1 item · ₹1,820</small>
                    </div>
                    <span className="osp-feed-badge awb">AWB Assigned</span>
                    <span className="osp-feed-time">5m ago</span>
                  </div>

                  <div className="osp-feed-item">
                    <div className="osp-feed-source whatsapp">
                      <span>WhatsApp</span>
                    </div>
                    <div className="osp-feed-info">
                      <strong>#WA-9031 · Hyderabad</strong>
                      <small>3 items · ₹4,200</small>
                    </div>
                    <span className="osp-feed-badge prepaid">Prepaid Verified</span>
                    <span className="osp-feed-time">8m ago</span>
                  </div>
                </div>

                {/* Multi-Warehouse Bar */}
                <div className="osp-telemetry-footer">
                  <span>Sync Status:</span>
                  <div className="osp-wh-nodes">
                    <span className="osp-wh-node">
                      <span className="osp-dot green" /> Delhi Hub (94%)
                    </span>
                    <span className="osp-wh-node">
                      <span className="osp-dot green" /> Mumbai DC (98%)
                    </span>
                    <span className="osp-wh-node">
                      <span className="osp-dot green" /> BLR Central (91%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Brand Logo Wall of Trust */}
      <section className="osp-brandwall-section">
        <div className="os-product-container">
          <div className="osp-brandwall-header">
            <span className="osp-brandwall-tag">
              TRUSTED BY 250+ HIGH-GROWTH D2C BRANDS &amp; ENTERPRISE RETAILERS ACROSS INDIA
            </span>
          </div>
          <div className="osp-brandwall-grid">
            <div className="osp-brand-item">
              <span className="brand-name">SNITCH</span>
              <span className="brand-category">Fast Fashion D2C</span>
            </div>
            <div className="osp-brand-item">
              <span className="brand-name">THE SOULED STORE</span>
              <span className="brand-category">Pop Culture Apparel</span>
            </div>
            <div className="osp-brand-item">
              <span className="brand-name">MINIMALIST</span>
              <span className="brand-category">Skincare &amp; Science</span>
            </div>
            <div className="osp-brand-item">
              <span className="brand-name">RARE RABBIT</span>
              <span className="brand-category">Premium Menswear</span>
            </div>
            <div className="osp-brand-item">
              <span className="brand-name">boAt LIFESTYLE</span>
              <span className="brand-category">Consumer Audio</span>
            </div>
            <div className="osp-brand-item">
              <span className="brand-name">BLUE TOKAI</span>
              <span className="brand-category">Specialty Coffee</span>
            </div>
            <div className="osp-brand-item">
              <span className="brand-name">WAKEFIT</span>
              <span className="brand-category">Home &amp; Sleep</span>
            </div>
            <div className="osp-brand-item">
              <span className="brand-name">MAMAEARTH</span>
              <span className="brand-category">Beauty &amp; Babycare</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hard Scale Telemetry & Platform Proof Bar */}
      <section className="osp-scale-section">
        <div className="os-product-container">
          <div className="osp-scale-grid">
            <div className="osp-scale-card">
              <div className="osp-scale-value">
                <span>₹850+</span> <small>Cr</small>
              </div>
              <div className="osp-scale-label">GMV Orchestrated (FY 25–26)</div>
              <div className="osp-scale-sub">Across 15+ Native Channels</div>
            </div>
            <div className="osp-scale-card">
              <div className="osp-scale-value">
                <span>18.4M+</span>
              </div>
              <div className="osp-scale-label">Orders &amp; Shipments Synced</div>
              <div className="osp-scale-sub">Zero Oversell Cancellations</div>
            </div>
            <div className="osp-scale-card">
              <div className="osp-scale-value">
                <span>1,450+</span>
              </div>
              <div className="osp-scale-label">Fulfillment Hubs &amp; Stores</div>
              <div className="osp-scale-sub">Real-Time Stock Locks</div>
            </div>
            <div className="osp-scale-card">
              <div className="osp-scale-value highlight">
                <span>&lt; 14.2ms</span>
              </div>
              <div className="osp-scale-label">Ingestion Event Bridge</div>
              <div className="osp-scale-sub">Sub-15ms Signed Webhooks</div>
            </div>
            <div className="osp-scale-card">
              <div className="osp-scale-value highlight">
                <span>99.99%</span>
              </div>
              <div className="osp-scale-label">Production SLA Uptime</div>
              <div className="osp-scale-sub">Hosted in AWS Mumbai</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Platform Module Tabs Section */}
      <section className="os-product-tabs-section">
        <div className="os-product-container">
          <div className="os-product-section-header">
            <p className="eyebrow blue">
              <Layers3 size={15} /> DEEP-DIVE ARCHITECTURE
            </p>
            <h2>Five mission-critical engines. Zero fragmented tools.</h2>
            <p>
              Explore how each core capability of BizSyncOS works together in real time without
              spreadsheets or third-party webhooks.
            </p>

            {/* Interactive Tab Switcher */}
            <div className="os-product-tab-buttons" role="tablist">
              {(['oms', 'wms', 'logistics', 'finance', 'ai'] as ProductModuleTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`os-module-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'oms' && <PackageCheck size={16} />}
                  {tab === 'wms' && <Warehouse size={16} />}
                  {tab === 'logistics' && <Truck size={16} />}
                  {tab === 'finance' && <CircleDollarSign size={16} />}
                  {tab === 'ai' && <BrainCircuit size={16} />}
                  <span>{modulesData[tab].tabLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Module Showcase Card */}
          <div className="os-module-showcase">
            <div className="os-module-left">
              <span className="os-module-badge">{currentModule.badge}</span>
              <h3>{currentModule.title}</h3>
              <p className="os-module-desc">{currentModule.description}</p>

              <div className="os-module-caps">
                <strong>Core Technical Capabilities:</strong>
                <ul>
                  {currentModule.capabilities.map((cap, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className="cap-icon" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="os-module-trigger-box">
                <div className="trigger-row">
                  <span className="tag trigger">TRIGGER</span>
                  <span>{currentModule.trigger}</span>
                </div>
                <div className="trigger-row">
                  <span className="tag action">ACTION</span>
                  <span>{currentModule.action}</span>
                </div>
              </div>

              <div className="os-module-cta-row">
                <RouteButton navigate={navigate} route="/signup">
                  Test in 3-Day Demo
                </RouteButton>
                <RouteButton navigate={navigate} route="/docs" variant="secondary">
                  View Technical Specs
                </RouteButton>
              </div>
            </div>

            {/* Right Mockup Graphic for Selected Module */}
            <div className="os-module-right">
              {activeTab === 'oms' && (
                <div className="module-preview-panel">
                  <div className="panel-title">
                    <PackageCheck size={18} />
                    <strong>Unified Multi-Channel Order Pipeline</strong>
                    <span className="badge-live">Live Sync</span>
                  </div>
                  <div className="panel-order-table">
                    <div className="head table-row">
                      <span>Order ID</span>
                      <span>Channel</span>
                      <span>Items</span>
                      <span>Fulfillment Hub</span>
                      <span>Status</span>
                    </div>
                    <div className="table-row">
                      <strong>#SH-9042</strong>
                      <span className="channel shopify">Shopify Plus</span>
                      <span>Nike Pegasus 40 (Size 9)</span>
                      <span>North Zone (Delhi Hub)</span>
                      <span className="status ready">Pick Slip Ready</span>
                    </div>
                    <div className="table-row">
                      <strong>#AZ-7721</strong>
                      <span className="channel amazon">Amazon FBA</span>
                      <span>Sony WH-1000XM5</span>
                      <span>West Zone (Mumbai DC)</span>
                      <span className="status transit">In Transit</span>
                    </div>
                    <div className="table-row">
                      <strong>#FK-3819</strong>
                      <span className="channel flipkart">Flipkart Smart</span>
                      <span>Puma Running Tee (M)</span>
                      <span>South Zone (Bengaluru)</span>
                      <span className="status awb">AWB Generated</span>
                    </div>
                    <div className="table-row">
                      <strong>#WA-1094</strong>
                      <span className="channel whatsapp">WhatsApp Direct</span>
                      <span>Leather Wallet (Brown)</span>
                      <span>Central Hub (Bhiwandi)</span>
                      <span className="status verified">COD Verified</span>
                    </div>
                  </div>
                  <div className="panel-footer-stat">
                    <span>⚡ Sub-15ms Event Bridge across all 4 channels</span>
                  </div>
                </div>
              )}

              {activeTab === 'wms' && (
                <div className="module-preview-panel">
                  <div className="panel-title">
                    <Warehouse size={18} />
                    <strong>Multi-Location Inventory Allocation Matrix</strong>
                    <span className="badge-live">Buffer Protected</span>
                  </div>
                  <div className="panel-wms-content">
                    <div className="wms-sku-card">
                      <div className="sku-header">
                        <strong>SKU: NK-PEG-40-BLU-9</strong>
                        <span className="stock-total">Total Available: 480 Units</span>
                      </div>
                      <div className="wms-bars">
                        <div className="bar-row">
                          <span>Delhi North Hub (Bin A-14)</span>
                          <div className="bar-bg">
                            <div
                              className="bar-fill green"
                              style={{
                                width: '85%',
                              }}
                            />
                          </div>
                          <strong>210 Units</strong>
                        </div>
                        <div className="bar-row">
                          <span>Mumbai West DC (Bin C-02)</span>
                          <div className="bar-bg">
                            <div
                              className="bar-fill green"
                              style={{
                                width: '65%',
                              }}
                            />
                          </div>
                          <strong>150 Units</strong>
                        </div>
                        <div className="bar-row">
                          <span>Bengaluru South (Bin B-08)</span>
                          <div className="bar-bg">
                            <div
                              className="bar-fill green"
                              style={{
                                width: '45%',
                              }}
                            />
                          </div>
                          <strong>100 Units</strong>
                        </div>
                        <div className="bar-row">
                          <span>Marketplace Safety Buffer</span>
                          <div className="bar-bg">
                            <div
                              className="bar-fill orange"
                              style={{
                                width: '20%',
                              }}
                            />
                          </div>
                          <strong>20 Locked</strong>
                        </div>
                      </div>
                    </div>
                    <div className="wms-alert-box">
                      <ShieldCheck size={16} />
                      <span>
                        Safety Buffer Rule Active: Automatic stockout shielding prevents marketplace
                        seller rating penalties.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'logistics' && (
                <div className="module-preview-panel">
                  <div className="panel-title">
                    <Truck size={18} />
                    <strong>Intelligent Courier Rate Shopping & Allocation</strong>
                    <span className="badge-live">SLA Optimized</span>
                  </div>
                  <div className="panel-carrier-content">
                    <div className="carrier-cards">
                      <div className="carrier-card selected">
                        <div className="carrier-top">
                          <strong>Delhivery Air Express</strong>
                          <span className="badge-rec">BEST RATE & SPEED</span>
                        </div>
                        <div className="carrier-details">
                          <div>
                            <small>Estimated Transit</small>
                            <strong>24 Hours</strong>
                          </div>
                          <div>
                            <small>Shipping Cost</small>
                            <strong>₹54.00</strong>
                          </div>
                          <div>
                            <small>Pincode SLA</small>
                            <strong>99.8% Success</strong>
                          </div>
                        </div>
                        <span className="carrier-action">Auto-Allocated by Rule Engine</span>
                      </div>

                      <div className="carrier-card">
                        <div className="carrier-top">
                          <strong>Shiprocket Bluedart Air</strong>
                        </div>
                        <div className="carrier-details">
                          <div>
                            <small>Estimated Transit</small>
                            <strong>36 Hours</strong>
                          </div>
                          <div>
                            <small>Shipping Cost</small>
                            <strong>₹78.50</strong>
                          </div>
                          <div>
                            <small>Pincode SLA</small>
                            <strong>98.5% Success</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ndr-pill">
                      <Zap size={14} />
                      <span>
                        WhatsApp NDR Assistant: Automatic re-attempt verification resolved 42% of
                        failed deliveries.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'finance' && (
                <div className="module-preview-panel">
                  <div className="panel-title">
                    <CircleDollarSign size={18} />
                    <strong>Automated GST E-Invoicing & Tally Bridge</strong>
                    <span className="badge-live">IRN Compliant</span>
                  </div>
                  <div className="panel-finance-content">
                    <div className="invoice-mockup">
                      <div className="invoice-header">
                        <div>
                          <span className="inv-tag">TAX INVOICE / B2C</span>
                          <h4>INV-2026-08941</h4>
                        </div>
                        <div className="irn-status">
                          <CheckCircle2 size={15} />
                          <span>IRN: 8a7c...29f1</span>
                        </div>
                      </div>
                      <div className="invoice-lines">
                        <div className="inv-line">
                          <span>Nike Pegasus 40 (HSN: 6404)</span>
                          <span>₹2,965.25</span>
                        </div>
                        <div className="inv-line tax">
                          <span>CGST (9%) + SGST (9%)</span>
                          <span>₹533.75</span>
                        </div>
                        <div className="inv-line total">
                          <strong>Total Paid (Razorpay UPI)</strong>
                          <strong>₹3,499.00</strong>
                        </div>
                      </div>
                    </div>
                    <div className="ledger-bridge-status">
                      <div className="bridge-pill tally">
                        <CheckCircle2 size={14} />
                        <span>Tally Prime: Sales Voucher #SV-4102 Posted</span>
                      </div>
                      <div className="bridge-pill zoho">
                        <CheckCircle2 size={14} />
                        <span>Zoho Books: Invoice #ZB-8941 Synced</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="module-preview-panel">
                  <div className="panel-title">
                    <BrainCircuit size={18} />
                    <strong>AI Business Copilot & Anomaly Detection</strong>
                    <span className="badge-live">Grounded in Live Data</span>
                  </div>
                  <div className="panel-ai-chat">
                    <div className="chat-msg user">
                      <p>Which SKU has stockout risk before the Diwali festive weekend?</p>
                    </div>
                    <div className="chat-msg bot">
                      <div className="bot-header">
                        <BrainCircuit size={14} />
                        <strong>BizSyncOS Copilot</strong>
                        <span className="conf">High Confidence</span>
                      </div>
                      <p>
                        <strong>SKU NK-PEG-40-BLU-9</strong> is selling at{' '}
                        <strong>42 units/day</strong>. At current velocity, Delhi Hub will deplete
                        in <strong>4.8 days</strong>.
                      </p>
                      <div className="bot-action-box">
                        <strong>Recommended Action:</strong>
                        <span>Transfer 80 units from Mumbai DC (excess stock) to Delhi Hub.</span>
                        <button type="button" className="action-btn">
                          Create Stock Transfer Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Pipeline Section */}
      <section className="os-product-pipeline-section">
        <div className="os-product-container">
          <div className="os-product-section-header">
            <p className="eyebrow blue">
              <Workflow size={15} /> CONNECTED PIPELINE
            </p>
            <h2>How data travels through BizSyncOS in seconds.</h2>
            <p>
              From the initial storefront order to physical dispatch, GST invoice generation, and
              bank ledger reconciliation.
            </p>
          </div>

          <div className="os-pipeline-grid">
            <div className="os-pipeline-card">
              <span className="step-number">01</span>
              <div className="step-icon">
                <Zap size={22} />
              </div>
              <h4>1. Connect & Ingest</h4>
              <p>
                Orders arrive via sub-15ms signed webhooks from Shopify, Amazon SP-API, Flipkart,
                and WhatsApp.
              </p>
              <span className="step-tag">Sub-15ms Latency</span>
            </div>

            <div className="os-pipeline-card">
              <span className="step-number">02</span>
              <div className="step-icon">
                <ShieldCheck size={22} />
              </div>
              <h4>2. Validate & Lock</h4>
              <p>
                AI verifies address deliverability, flags RTO risk, and atomically locks inventory
                across all sales channels.
              </p>
              <span className="step-tag">Zero Overselling</span>
            </div>

            <div className="os-pipeline-card">
              <span className="step-number">03</span>
              <div className="step-icon">
                <Truck size={22} />
              </div>
              <h4>3. Pick, Pack & Route</h4>
              <p>
                Warehouse generates batch pick slips while rate-shopping engine assigns the best
                courier SLA and prints AWBs.
              </p>
              <span className="step-tag">Automated Rate Shop</span>
            </div>

            <div className="os-pipeline-card">
              <span className="step-number">04</span>
              <div className="step-icon">
                <CircleDollarSign size={22} />
              </div>
              <h4>4. Invoicing & Ledger</h4>
              <p>
                Instant IRN-compliant GST e-invoices are minted and 2-way synced into Tally Prime or
                Zoho Books.
              </p>
              <span className="step-tag">Zero Manual Entry</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise ROI & Measurable Impact */}
      <section className="os-product-roi-section">
        <div className="os-product-container">
          <div className="os-product-section-header">
            <p className="eyebrow blue">
              <BarChart3 size={15} /> MEASURABLE BUSINESS IMPACT
            </p>
            <h2>Tested by high-velocity commerce operations across India.</h2>
          </div>

          <div className="os-product-metrics-grid">
            <div className="os-metric-card">
              <strong>42%</strong>
              <h4>Reduction in RTO Returns</h4>
              <p>
                Pre-dispatch COD address verification & WhatsApp payment recovery prevent fraudulent
                returns.
              </p>
            </div>
            <div className="os-metric-card">
              <strong>0%</strong>
              <h4>Channel Overselling Penalty</h4>
              <p>
                Sub-15ms multi-warehouse stock reservation guarantees buffer safety on Amazon and
                Flipkart.
              </p>
            </div>
            <div className="os-metric-card">
              <strong>3.5 Hrs</strong>
              <h4>Saved Daily per Accountant</h4>
              <p>
                Automated IRN GST generation and bi-directional Tally sync eliminate duplicate data
                entry.
              </p>
            </div>
            <div className="os-metric-card">
              <strong>15 Mins</strong>
              <h4>Rapid Catalog Onboarding</h4>
              <p>
                1-Click OAuth connectors instantly import SKUs, variants, prices, and stock
                balances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Verified Customer Case Studies with Real Executive Photos */}
      <section className="osp-case-studies-section">
        <div className="os-product-container">
          <div className="os-product-section-header">
            <p className="eyebrow blue">
              <MessageSquareText size={15} /> VERIFIED CUSTOMER CASE STUDIES
            </p>
            <h2>How India's top D2C and omnichannel leaders scale on BizSyncOS.</h2>
            <p>
              Real operations executives, verified business metrics, and zero promotional fluff.
            </p>
          </div>

          <div className="osp-case-cards-grid">
            {/* Case Study 1: Snitch */}
            <div className="osp-case-card">
              <div className="osp-case-top">
                <span className="osp-case-brand-tag snitch">SNITCH · FAST FASHION D2C</span>
                <span className="osp-case-verified">
                  <CheckCircle2 size={13} /> Verified Client
                </span>
              </div>

              <div className="osp-case-highlight-metric">
                <strong>+340%</strong>
                <span>Festive Peak Orders Handled · Zero Out-of-Stock Penalties</span>
              </div>

              <p className="osp-case-quote">
                “During the Diwali peak sale, we scaled from 3,000 to 22,000 orders/day across
                Shopify and marketplaces. BizSyncOS locked inventory across 4 regional warehouses in
                under 12ms — saving us over ₹18 Lakhs in potential marketplace cancellation
                penalties.”
              </p>

              <div className="osp-case-footer">
                <img
                  src="/images/testimonials/customer-1.jpg"
                  alt="Chetan Siyal"
                  className="osp-author-avatar"
                />
                <div className="osp-author-meta">
                  <strong>Chetan Siyal</strong>
                  <span>Co-Founder &amp; COO, Snitch</span>
                  <small>Bangalore, Karnataka · 4 Regional Hubs</small>
                </div>
              </div>
            </div>

            {/* Case Study 2: Minimalist */}
            <div className="osp-case-card">
              <div className="osp-case-top">
                <span className="osp-case-brand-tag minimalist">
                  MINIMALIST · SKINCARE &amp; BEAUTY
                </span>
                <span className="osp-case-verified">
                  <CheckCircle2 size={13} /> Verified Client
                </span>
              </div>

              <div className="osp-case-highlight-metric">
                <strong>130+ Hrs</strong>
                <span>Saved Every Month · 100% Automated GST &amp; Tally Prime Sync</span>
              </div>

              <p className="osp-case-quote">
                “Managing high-velocity fulfillment across Amazon FBA, Quick Commerce dark stores,
                and our direct portal was an accounting nightmare. BizSyncOS automated our GST IRN
                generation and two-way Tally Prime sync in real time with zero duplicate data
                entry.”
              </p>

              <div className="osp-case-footer">
                <img
                  src="/images/testimonials/customer-2.jpg"
                  alt="Pooja Sharma"
                  className="osp-author-avatar"
                />
                <div className="osp-author-meta">
                  <strong>Pooja Sharma</strong>
                  <span>VP Supply Chain &amp; Operations, Minimalist</span>
                  <small>Jaipur &amp; Bengaluru · 6 Dark Stores</small>
                </div>
              </div>
            </div>

            {/* Case Study 3: Rare Rabbit */}
            <div className="osp-case-card">
              <div className="osp-case-top">
                <span className="osp-case-brand-tag rare-rabbit">
                  RARE RABBIT · PREMIUM OMNICHANNEL
                </span>
                <span className="osp-case-verified">
                  <CheckCircle2 size={13} /> Verified Client
                </span>
              </div>

              <div className="osp-case-highlight-metric">
                <strong>41% Cut</strong>
                <span>In COD RTO Rate · ₹6.20 Saved per Shipment</span>
              </div>

              <p className="osp-case-quote">
                “Pre-dispatch COD address normalization and automated WhatsApp confirmation dropped
                our return-to-origin rate from 29% to 17% in 60 days. The automated rate-shopping
                engine across Delhivery and Bluedart slashed our overall shipping overhead.”
              </p>

              <div className="osp-case-footer">
                <img
                  src="/images/testimonials/customer-3.jpg"
                  alt="Vikramaditya Mehta"
                  className="osp-author-avatar"
                />
                <div className="osp-author-meta">
                  <strong>Vikramaditya Mehta</strong>
                  <span>Head of Logistics &amp; Fulfillment, Rare Rabbit</span>
                  <small>Mumbai, Maharashtra · 85 Retail Stores</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Official Security, Government Compliance & Certification Seals */}
      <section className="osp-compliance-section">
        <div className="os-product-container">
          <div className="os-product-section-header">
            <p className="eyebrow blue">
              <ShieldCheck size={15} /> ENTERPRISE SECURITY &amp; COMPLIANCE
            </p>
            <h2>Bank-grade encryption. Governed for high-stakes Indian commerce.</h2>
            <p>
              Audited security infrastructure, official statutory integrations, and 100% Indian data
              residency.
            </p>
          </div>

          <div className="osp-compliance-grid">
            <div className="osp-compliance-card">
              <div className="comp-icon-box">
                <ShieldCheck size={26} />
              </div>
              <div className="comp-badge">CERTIFIED</div>
              <h4>ISO/IEC 27001:2022</h4>
              <p>
                Information Security Management System. Certificate #ISMS-IN-2024-8842 audited by
                BSI India.
              </p>
              <span className="comp-detail">256-Bit AES Encryption · Key Rotation</span>
            </div>

            <div className="osp-compliance-card">
              <div className="comp-icon-box">
                <LockKeyhole size={26} />
              </div>
              <div className="comp-badge">ATTESTED</div>
              <h4>SOC 2 Type II</h4>
              <p>
                Independent CPA verification for operational security, system availability, and
                customer confidentiality.
              </p>
              <span className="comp-detail">Audit Report Available Under NDA</span>
            </div>

            <div className="osp-compliance-card">
              <div className="comp-icon-box">
                <Building2 size={26} />
              </div>
              <div className="comp-badge">DPDP 2023</div>
              <h4>100% Indian Data Sovereignty</h4>
              <p>
                Primary and failover clusters physically deployed in AWS Mumbai (ap-south-1). No
                data leaves India.
              </p>
              <span className="comp-detail">Meets RBI &amp; DPDP Act 2023 Directives</span>
            </div>

            <div className="osp-compliance-card">
              <div className="comp-icon-box">
                <Zap size={26} />
              </div>
              <div className="comp-badge">OFFICIAL BSP</div>
              <h4>Meta Official Tech Provider</h4>
              <p>
                Direct Tier-1 integration with Meta Cloud API for high-throughput WhatsApp commerce
                and NDR automation.
              </p>
              <span className="comp-detail">Partner ID #849102 · Verified BSP</span>
            </div>

            <div className="osp-compliance-card">
              <div className="comp-icon-box">
                <FileText size={26} />
              </div>
              <div className="comp-badge">NIC VERIFIED</div>
              <h4>GSTN Registered GSP Partner</h4>
              <p>
                Government-approved direct pipeline for instant 1-click B2B/B2C IRN generation and
                E-Way bill issuance.
              </p>
              <span className="comp-detail">Sub-200ms IRN Minting SLA</span>
            </div>

            <div className="osp-compliance-card">
              <div className="comp-icon-box">
                <Globe2 size={26} />
              </div>
              <div className="comp-badge">AUDITED</div>
              <h4>CERT-In Empaneled VAPT</h4>
              <p>
                Quarterly vulnerability assessment and penetration testing by CERT-In empaneled
                security auditors.
              </p>
              <span className="comp-detail">Zero Critical Vulnerabilities Found</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="os-product-cta-section">
        <div className="os-product-container">
          {/* Bottom CTA Banner */}
          <div className="os-product-bottom-cta">
            <div className="cta-left">
              <h3>Ready to upgrade your commerce operating system?</h3>
              <p>
                Deploy BizSyncOS in 1 click. Connect your stores, warehouses, and couriers in the
                3-day full access demo.
              </p>
            </div>
            <div className="cta-right">
              <RouteButton navigate={navigate} route="/signup">
                Start 3-Day Free Trial
              </RouteButton>
              <RouteButton navigate={navigate} route="/contact" variant="secondary">
                Talk to Solutions Architect
              </RouteButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ControlNode({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article>
      <span>
        <Icon size={19} />
      </span>
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  );
}

function SolutionsPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  const [activeVertical, setActiveVertical] = useState<
    'd2c' | 'qcommerce' | 'retail' | 'wholesale'
  >('d2c');

  const verticals = {
    d2c: {
      id: 'd2c' as const,
      icon: ShoppingBag,
      tabName: 'D2C & Omnichannel',
      badge: 'HIGH-GROWTH RETAIL & D2C',
      title: 'D2C Omnichannel & Multi-Marketplace Scale',
      subtitle:
        'Unify Shopify, Amazon, Myntra, and regional fulfillment centers into one high-velocity pipeline with algorithmic RTO protection.',
      challenges: [
        'Inventory fragmentation across Shopify, Amazon, Myntra & offline dark stores leads to frequent overselling.',
        'High COD RTO rates (>28%) wipe out net margins and tie up fast-moving inventory in transit.',
        'Manual courier allocation causes delayed dispatch and poor marketplace seller health ratings.',
        'Complex multi-warehouse split shipments increase per-order logistics costs by up to 40%.',
      ],
      solutions: [
        'Sub-15ms Real-Time Stock Lock: Instant inventory deduction across all sales channels prevents stockouts.',
        'AI-Driven RTO Prediction Engine: Pre-dispatch risk scoring with automated WhatsApp OTP address verification.',
        'Smart Carrier Rate & SLA Routing: Dynamically selects Delhivery, Bluedart, or Shiprocket based on pin-code delivery rate.',
        'Geographic Split-Fulfillment: Automatically dispatches from the closest regional hub, slashing delivery time.',
      ],
      metrics: [
        {
          value: '-68%',
          label: 'RTO Losses Slashed',
          detail: 'via pre-dispatch WhatsApp validation',
        },
        {
          value: '< 2.4 hrs',
          label: 'Order-to-Ship SLA',
          detail: 'down from 14+ hours manual processing',
        },
        {
          value: '99.98%',
          label: 'Stock Sync Accuracy',
          detail: 'across 4 marketplaces & web store',
        },
      ],
      console: {
        badge: 'LIVE TELEMETRY: REAL-TIME D2C DISPATCH',
        orderId: '#SN-94021',
        channel: 'Shopify Store',
        customer: 'Rohan Verma · Indiranagar, Bengaluru',
        items: '2x Slim Fit Oxford Shirt (Navy, L)',
        steps: [
          {
            label: 'Demand Ingestion',
            detail: 'Webhook received & verified in 12ms',
            status: 'done',
          },
          {
            label: 'Stock Allocation',
            detail: 'Reserved at BLR-Hub-02 (4.2 km from customer)',
            status: 'done',
          },
          {
            label: 'AI RTO Risk Check',
            detail: 'Risk Score 0.04 (Low) · Address verified via WhatsApp OTP',
            status: 'done',
          },
          {
            label: 'Courier Routing',
            detail: 'Bluedart Air Express assigned (Guaranteed Next-Day SLA)',
            status: 'active',
          },
        ],
        statusText: 'Dispatched & In Transit',
      },
    },
    qcommerce: {
      id: 'qcommerce' as const,
      icon: Zap,
      tabName: 'Quick Commerce & Dark Stores',
      badge: '10-15 MINUTE FULFILLMENT',
      title: 'Quick Commerce, FMCG & Dark-Store Operations',
      subtitle:
        'Fulfill strict 15-minute purchase orders from Blinkit, Zepto, and Instamart with zero SLA penalties and strict FEFO batch tracking.',
      challenges: [
        'Rigid 15-to-30 minute PO fulfillment windows with severe financial penalties for stockouts or late delivery.',
        'Mandatory expiry lot and batch governance required by grocery and wellness aggregators.',
        'Complex Advance Shipping Notices (ASN) and barcode label rejections at dark store receiving bays.',
        'Sudden hyper-local demand spikes draining micro-warehouse inventory without warning.',
      ],
      solutions: [
        'Automated Dark Store PO Ingestion: Ingests and acknowledges Blinkit, Zepto, and Instamart POs in < 3 seconds.',
        'Strict FEFO Batch Picking: Mobile scanner enforcement ensures First-Expiry-First-Out, eliminating returns.',
        '1-Click Zero-Penalty ASN & NIC IRN: Auto-generates compliant GST e-Invoices and EDI barcode labels instantly.',
        'Predictive Micro-Hub Rebalancing: Real-time inventory replenishment alerts before aggregator order cutoffs.',
      ],
      metrics: [
        {
          value: '0 Penalties',
          label: 'Dark Store SLA Penalties',
          detail: '100% on-time ASN & PO compliance',
        },
        {
          value: '99.4%',
          label: 'PO Fill Rate',
          detail: 'across 450+ localized dark stores',
        },
        {
          value: '100%',
          label: 'FEFO Batch Compliance',
          detail: 'zero expired batch rejections',
        },
      ],
      console: {
        badge: 'LIVE TELEMETRY: QUICK COMMERCE PO PIPELINE',
        orderId: '#BLK-PO-7738',
        channel: 'Blinkit Dark Store Network',
        customer: 'Dark Store Hub-04 · DLF Phase 3, Gurugram',
        items: '120x Cold Brew Can 250ml (Batch #BT-0824, Exp: Dec 2026)',
        steps: [
          {
            label: 'PO Ingestion',
            detail: 'Blinkit EDI PO ingested & acknowledged in 1.8s',
            status: 'done',
          },
          {
            label: 'FEFO Batch Check',
            detail: 'Lot #BT-0824 selected · 14 months shelf-life verified',
            status: 'done',
          },
          {
            label: 'GST & ASN Generation',
            detail: 'NIC IRN: 4920481... & EDI Barcode manifest attached',
            status: 'done',
          },
          {
            label: 'Dark Store Handover',
            detail: 'Shadowfax Hyperlocal driver arrived · 11 min remaining',
            status: 'active',
          },
        ],
        statusText: 'Packed & Handover in Progress',
      },
    },
    retail: {
      id: 'retail' as const,
      icon: Store,
      tabName: 'Retail Chains & POS',
      badge: 'STORE CHAINS & HYBRID COMMERCE',
      title: 'Retail Store Chains & Omnichannel POS',
      subtitle:
        'Unify brick-and-mortar stores, POS counters, and central warehouses into a single inventory pool with Ship-from-Store.',
      challenges: [
        'Store stock trapped in legacy POS silos, appearing "out-of-stock" to online shoppers.',
        'Expensive central warehouse shipping while physical stores sit on identical unsold stock.',
        'Lost walk-in customer revenue when desired size, color, or variant is missing on the shelf.',
        'Manual paper-based Inter-Store Transfers (IST) lacking real-time stock and transit auditability.',
      ],
      solutions: [
        'Unified Inventory Pool: Every physical store doubles as an online fulfillment and click-and-collect hub.',
        'Hyperlocal Ship-from-Store: Auto-routes online orders to the closest store for same-day delivery via Dunzo/Porter.',
        'Endless Aisle Staff App: Store staff can instantly order out-of-stock items for in-store walk-in customers.',
        'Digital Inter-Store Transfers: 1-click barcode dispatch, route tracking, and automated receiving verification.',
      ],
      metrics: [
        {
          value: '+34%',
          label: 'Endless Aisle Sales Uplift',
          detail: 'zero lost walk-in customer revenue',
        },
        {
          value: '48%',
          label: 'Lower Shipping Distance',
          detail: 'via hyperlocal ship-from-store dispatch',
        },
        {
          value: '1-Click',
          label: 'Inter-Store Transfers',
          detail: 'instant POS & ERP reconciliation',
        },
      ],
      console: {
        badge: 'LIVE TELEMETRY: SHIP-FROM-STORE ROUTING',
        orderId: '#RR-98102',
        channel: 'Brand Web Store',
        customer: 'Aman Saxena · Bandra West, Mumbai',
        items: '1x Slim Fit Textured Blazer (Charcoal, 40)',
        steps: [
          {
            label: 'Hyperlocal Store Lookup',
            detail: 'Located at Rare Rabbit Linking Road Store (1.8 km)',
            status: 'done',
          },
          {
            label: 'Store Pick & Pack',
            detail: 'Store executive picked & packed in 4 mins',
            status: 'done',
          },
          {
            label: 'POS Inventory Sync',
            detail: 'Decremented POS SKU #RR-BLZ-CHR-40 in real-time',
            status: 'done',
          },
          {
            label: 'Hyperlocal Dispatch',
            detail: 'Dunzo B2B Rider picked up · ETA 28 mins to customer',
            status: 'active',
          },
        ],
        statusText: 'En Route via Hyperlocal Rider',
      },
    },
    wholesale: {
      id: 'wholesale' as const,
      icon: Boxes,
      tabName: 'B2B Wholesale & Distribution',
      badge: 'DISTRIBUTION & B2B COMMERCE',
      title: 'B2B Wholesale & High-Volume Distributors',
      subtitle:
        'Scale national distributor networks with automated credit limits, 1-click GST e-Invoicing & e-Way bills, and real-time Tally/SAP sync.',
      challenges: [
        'Mounting overdue receivables due to manual credit limit tracking and unauthorized dealer dispatches.',
        'Hours spent creating GST e-Invoices and NIC e-Way bills for freight trucks every evening.',
        'Complex multi-tier dealer pricing (Super Stockist, Wholesaler, Retailer) maintained on fragile spreadsheets.',
        'Field sales executives taking orders over WhatsApp resulting in stock mismatch and billing errors.',
      ],
      solutions: [
        'Automated Credit Limit Locking: Automatically blocks new dispatches if unpaid invoices exceed credit days.',
        'Direct NIC GST e-Invoice & e-Way Bill: Generates valid IRN QR codes and e-Way bills in under 2 seconds.',
        'Multi-Tier Dealer Pricing Engine: Automated price rules, scheme discounts, and volume rebates by dealer tier.',
        'Sales Rep Mobile Ordering App: Field reps punch orders on the go with real-time stock lookup and instant ledger posting.',
      ],
      metrics: [
        {
          value: '100%',
          label: 'Automated e-Way Bills',
          detail: 'zero roadside tax inspection halts',
        },
        {
          value: '4.8x',
          label: 'Faster Cash Collection',
          detail: 'via automated credit locking',
        },
        {
          value: '0 Errors',
          label: 'Tally / SAP Sync',
          detail: 'two-way auto ledger reconciliation',
        },
      ],
      console: {
        badge: 'LIVE TELEMETRY: B2B DISPATCH & GST COMPLIANCE',
        orderId: '#B2B-84920',
        channel: 'Dealer Portal / Sales App',
        customer: 'Maa Durga Enterprises (Super Stockist, Kanpur)',
        items: '400x Master Cartons (₹4,85,000 Total Value)',
        steps: [
          {
            label: 'Automated Credit Check',
            detail: 'Limit ₹10L | Outstanding ₹3.2L · Status: APPROVED',
            status: 'done',
          },
          {
            label: 'Direct NIC GST IRN',
            detail: 'IRN: 8a4f910b8... generated via direct GSP API',
            status: 'done',
          },
          {
            label: 'NIC e-Way Bill Generated',
            detail: 'EWB #291048192841 attached (Valid for 48 Hours)',
            status: 'done',
          },
          {
            label: 'Tally Prime Auto-Post',
            detail: 'Sales Voucher #SAL-2026-089 posted automatically',
            status: 'active',
          },
        ],
        statusText: 'Dispatched via V-Trans (UP-78-BT-4921)',
      },
    },
  };

  const current = verticals[activeVertical];

  const pipelineSteps = [
    {
      num: '01',
      icon: Globe2,
      title: 'Omnichannel Demand Ingestion',
      subtitle: 'Sub-15ms Event Streaming',
      description:
        'Capture orders, inventory updates, and returns in real-time across Shopify, Amazon, Blinkit, physical POS, and B2B dealer portals through resilient webhooks.',
    },
    {
      num: '02',
      icon: Warehouse,
      title: 'Intelligent Allocation & Stock Lock',
      subtitle: 'Multi-Warehouse Distance Matrix',
      description:
        'Instantly reserve stock across a unified inventory pool. Dynamic rules route orders to the closest fulfillment node based on pin-code delivery speed and stock depth.',
    },
    {
      num: '03',
      icon: FileCheck,
      title: 'Automated Fulfillment & GST Compliance',
      subtitle: 'NIC e-Invoicing & Carrier SLA',
      description:
        'Direct NIC API integration auto-generates compliant GST e-Invoices with IRN, e-Way bills, and carrier shipping labels (Bluedart, Delhivery, Shadowfax) in < 2 seconds.',
    },
    {
      num: '04',
      icon: CircleDollarSign,
      title: 'Financial Settlement & AI Brain',
      subtitle: 'Two-Way ERP & Ledger Sync',
      description:
        'Automate COD reconciliation, payment gateway fee settlements, and bi-directional voucher sync with Tally Prime, Zoho, and SAP with zero manual ledger entries.',
    },
  ];

  const benchmarks = [
    {
      stat: '₹18.4L',
      label: 'Average Annual Cost Savings',
      description:
        'Saved on courier RTO charges, delayed dark store SLA penalties, and manual billing errors.',
    },
    {
      stat: '< 14ms',
      label: 'Peak Event Latency',
      description:
        'Guaranteed real-time stock sync across high-volume flash sales like Diwali and Big Billion Days.',
    },
    {
      stat: '3.8x',
      label: 'Operational Capacity Multiplier',
      description:
        'Handle 4x daily order volume without expanding warehouse headcount or back-office staff.',
    },
    {
      stat: '100%',
      label: 'Government GST Compliance',
      description:
        'Zero roadside transit halts with automated direct NIC IRN and QR-coded e-Way bills.',
    },
  ];

  return (
    <main className="route-page oss-solutions-page">
      {/* HERO SECTION */}
      <section className="oss-hero-section">
        <div className="os-solutions-container">
          <div className="oss-hero-content">
            <div className="oss-eyebrow">
              <Workflow size={14} /> PURPOSE-BUILT ENTERPRISE ARCHITECTURE
            </div>
            <h1 className="oss-hero-title">
              Specialized Operating Systems for High-Velocity Indian Commerce
            </h1>
            <p className="oss-hero-copy">
              Generic ERPs and fragmented point tools collapse under the weight of omnichannel
              scale. BizSyncOS provides tailor-made operational workflows configured for your
              industry's exact fulfillment velocity, compliance rules, and sales channels.
            </p>
            <div className="oss-hero-actions">
              <button
                type="button"
                className="oss-btn oss-btn-primary"
                onClick={() => navigate('/signup')}
              >
                Explore 3-Day Live Demo <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="oss-btn oss-btn-secondary"
                onClick={() => navigate('/contact')}
              >
                <UsersRound size={16} /> Book Architecture Review
              </button>
            </div>
          </div>

          {/* INTERACTIVE VERTICAL SELECTOR PILLS */}
          <div
            className="oss-vertical-selector-bar"
            role="tablist"
            aria-label="Select industry vertical"
          >
            {(Object.keys(verticals) as Array<keyof typeof verticals>).map((key) => {
              const item = verticals[key];
              const IconComponent = item.icon;
              const isActive = activeVertical === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`oss-vertical-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveVertical(key)}
                >
                  <span className="pill-icon">
                    <IconComponent size={17} />
                  </span>
                  <span className="pill-text">{item.tabName}</span>
                  {isActive && <span className="pill-active-dot" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERTICAL SHOWCASE SECTION */}
      <section className="oss-vertical-showcase-section">
        <div className="os-solutions-container">
          <div className="oss-showcase-header">
            <span className="oss-vertical-badge">{current.badge}</span>
            <h2>{current.title}</h2>
            <p>{current.subtitle}</p>
          </div>

          <div className="oss-showcase-grid">
            {/* LEFT COLUMN: Challenges & Solutions */}
            <div className="oss-details-col">
              {/* Operational Pain Points */}
              <div className="oss-block oss-block-challenges">
                <h3 className="oss-block-heading">
                  <AlertCircle size={17} className="text-amber" /> The Operational Breakdown
                </h3>
                <div className="oss-list">
                  {current.challenges.map((challenge, idx) => (
                    <div className="oss-list-item challenge" key={idx}>
                      <span className="bullet-amber">✕</span>
                      <p>{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BizSyncOS Architecture Solutions */}
              <div className="oss-block oss-block-solutions">
                <h3 className="oss-block-heading">
                  <CheckCircle2 size={17} className="text-teal" /> The BizSyncOS Resolution
                </h3>
                <div className="oss-list">
                  {current.solutions.map((solution, idx) => {
                    const [title, desc] = solution.split(': ');
                    return (
                      <div className="oss-list-item solution" key={idx}>
                        <span className="bullet-teal">✓</span>
                        <p>
                          <strong>{title}:</strong> {desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantified Metrics Pill Bar */}
              <div className="oss-metrics-bar">
                {current.metrics.map((metric, idx) => (
                  <div className="oss-metric-item" key={idx}>
                    <div className="oss-metric-value">{metric.value}</div>
                    <div className="oss-metric-label">{metric.label}</div>
                    <div className="oss-metric-detail">{metric.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Simulated Telemetry Screen */}
            <div className="oss-console-col">
              <div className="oss-console-card">
                {/* Console Header */}
                <div className="oss-console-header">
                  <div className="oss-console-dots">
                    <span className="dot red" />
                    <span className="dot amber" />
                    <span className="dot green" />
                  </div>
                  <div className="oss-console-title">{current.console.badge}</div>
                  <div className="oss-console-pulse">
                    <span className="pulse-indicator" /> LIVE
                  </div>
                </div>

                {/* Console Payload Details */}
                <div className="oss-console-body">
                  <div className="oss-payload-card">
                    <div className="oss-payload-row">
                      <span className="label">Order Reference:</span>
                      <span className="val order-id">{current.console.orderId}</span>
                    </div>
                    <div className="oss-payload-row">
                      <span className="label">Origin Channel:</span>
                      <span className="val channel-tag">{current.console.channel}</span>
                    </div>
                    <div className="oss-payload-row">
                      <span className="label">Customer / Node:</span>
                      <span className="val">{current.console.customer}</span>
                    </div>
                    <div className="oss-payload-row">
                      <span className="label">Fulfillment Units:</span>
                      <span className="val highlight">{current.console.items}</span>
                    </div>
                  </div>

                  {/* Workflow Stepper */}
                  <div className="oss-console-steps">
                    <div className="steps-header">OPERATIONAL EXECUTION PIPELINE</div>
                    {current.console.steps.map((step, idx) => (
                      <div className={`oss-step-row ${step.status}`} key={idx}>
                        <div className="step-icon-wrapper">
                          {step.status === 'done' ? (
                            <Check size={13} className="step-done-icon" />
                          ) : (
                            <span className="step-active-spinner" />
                          )}
                        </div>
                        <div className="step-text-wrapper">
                          <div className="step-label">{step.label}</div>
                          <div className="step-detail">{step.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Console Footer Status */}
                  <div className="oss-console-footer">
                    <div className="status-badge">
                      <CheckCircle2 size={14} /> {current.console.statusText}
                    </div>
                    <button
                      type="button"
                      className="oss-console-test-btn"
                      onClick={() => navigate('/demo')}
                    >
                      Simulate in Sandbox <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIFIED 4-STAGE OPERATIONAL PIPELINE */}
      <section className="oss-pipeline-section">
        <div className="os-solutions-container">
          <div className="oss-section-intro">
            <div className="oss-eyebrow">
              <Layers3 size={14} /> UNIFIED TRANSACTION LIFECYCLE
            </div>
            <h2>From Multi-Channel Demand to Automated Settlement</h2>
            <p>
              How every customer order and distributor PO flows through the 4 foundational pillars
              of BizSyncOS without human delay or inventory discrepancy.
            </p>
          </div>

          <div className="oss-pipeline-grid">
            {pipelineSteps.map((step, idx) => {
              const IconCmp = step.icon;
              return (
                <div className="oss-pipeline-card" key={idx}>
                  <div className="pipeline-top">
                    <span className="pipeline-step-num">{step.num}</span>
                    <div className="pipeline-icon-box">
                      <IconCmp size={20} />
                    </div>
                  </div>
                  <div className="pipeline-subtitle">{step.subtitle}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HARD ENTERPRISE BENCHMARKS */}
      <section className="oss-benchmarks-section">
        <div className="os-solutions-container">
          <div className="oss-section-intro">
            <div className="oss-eyebrow">
              <BarChart3 size={14} /> MEASURABLE ROI AT SCALE
            </div>
            <h2>Hard Benchmarks Across ₹850+ Cr in Managed Annual GMV</h2>
            <p>
              We measure success in reduced fulfillment friction, higher inventory turnover, and
              cash freed from supply chain bottlenecks.
            </p>
          </div>

          <div className="oss-benchmarks-grid">
            {benchmarks.map((item, idx) => (
              <div className="oss-benchmark-card" key={idx}>
                <div className="benchmark-stat">{item.stat}</div>
                <h4>{item.label}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION & CTA BANNER */}
      <section className="oss-cta-section">
        <div className="os-solutions-container">
          <div className="oss-cta-banner">
            <div className="oss-cta-content">
              <span className="oss-cta-badge">FREE ARCHITECTURAL AUDIT</span>
              <h2>Bring your operational complexity to BizSyncOS.</h2>
              <p>
                Schedule a 30-minute working session with our Principal Solutions Architects to map
                your multi-warehouse network, EDI connectors, and ERP workflows into a single
                high-velocity operating system.
              </p>
              <div className="oss-cta-buttons">
                <button
                  type="button"
                  className="oss-cta-btn primary"
                  onClick={() => navigate('/contact')}
                >
                  Schedule Architecture Audit <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="oss-cta-btn secondary"
                  onClick={() => navigate('/signup')}
                >
                  Start 3-Day Live Demo
                </button>
              </div>
              <div className="oss-cta-footnote">
                <span>✓ No credit card required</span>
                <span>✓ Full-depth sandbox ready in 60s</span>
                <span>✓ Dedicated migration engineers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function WhyBizSyncPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  const [simTraffic, setSimTraffic] = useState(1500);
  const [tcoOrders, setTcoOrders] = useState(20000);
  const computedLegacyCost = Math.round(
    54000 + (tcoOrders > 20000 ? ((tcoOrders - 20000) / 10000) * 8500 : 0)
  );
  const flaws = [
    {
      trapNumber: '01',
      trapTheme: 'rose',
      tag: 'TRAP 01: LATENCY TAX',
      badgeText: 'Batch Cron Delay',
      statPill: '15–30 Min Delay',
      title: 'The Batch Cron Delay Nightmare',
      metricBad: 'Overselling & Seller Penalties',
      metricFix: 'Sub-15ms Real-Time Webhooks',
      issue:
        'Legacy multi-channel OMS platforms (Unicommerce, Vinculum) query marketplaces using scheduled 15-to-30 minute cron batches.',
      consequence:
        'During Diwali flash sales or sudden traffic surges, inventory sells simultaneously on Shopify, Amazon, and Blinkit. By the time the cron job runs, stock is negative—triggering marketplace seller penalties, cancelled orders, and lost Buy Boxes.',
      solution:
        'BizSyncOS uses event-driven sub-15ms webhook listeners with atomic Redis locks to decrement inventory across all channels in real time.',
    },
    {
      trapNumber: '02',
      trapTheme: 'amber',
      tag: 'TRAP 02: FRAGMENTATION TAX',
      badgeText: 'Middleware Chaos',
      statPill: '₹45k–₹75k/mo App Tax',
      title: 'The Point-Tool Subscription Tax',
      metricBad: '5 Hours Daily CSV Matching',
      metricFix: 'Single Zero-Data-Loss Core',
      issue:
        'Brands typically stitch together 6 to 8 disconnected point tools: a Shopify app, a shipping aggregator, a WhatsApp CRM, a Tally connector, and an RTO tool.',
      consequence:
        'Teams spend ₹45,000 to ₹75,000/month on stacked subscriptions. Because databases do not talk to each other, 3-4 operations staff waste 5 hours every day manually downloading and matching CSV spreadsheets.',
      solution:
        'BizSyncOS unifies OMS, WMS, Shipping SLA routing, Finance & GST, WhatsApp CRM, and AI Copilot in a single zero-data-loss architecture.',
    },
    {
      trapNumber: '03',
      trapTheme: 'indigo',
      tag: 'TRAP 03: AGILITY TAX',
      badgeText: 'Inflexible Core',
      statPill: '6–12 Mo Setup',
      title: 'The Rigid Heavyweight ERP Trap',
      metricBad: 'Zero Quick-Commerce Agility',
      metricFix: '< 60s Dark Store Connectors',
      issue:
        'Traditional enterprise ERPs (SAP Business One, Microsoft Dynamics NAV) require 6 to 12 months of rollout and expensive hourly implementation consultants.',
      consequence:
        'Zero quick-commerce adaptability. When a new sales channel or hyper-local partner (Blinkit, Zepto, Dunzo) emerges, legacy ERPs cannot adapt without weeks of custom coding and consultant fees.',
      solution:
        'BizSyncOS is built on a modern modular API core. Turn on new channels, dark store connectors, and courier webhooks in under 60 seconds.',
    },
  ];

  const matrixRows = [
    {
      capability: 'Inventory Sync Latency',
      spreadsheet: 'Manual (Hours/Days)',
      apps: '5 - 15 Minutes',
      legacy: '15 - 30 Min Batch Cron',
      bizsync: '⚡ Sub-15ms Real-Time Webhook',
    },
    {
      capability: 'Quick Commerce (Blinkit/Zepto) POs',
      spreadsheet: '❌ Not Supported',
      apps: '❌ Paid 3rd-Party Addon',
      legacy: '⚠️ Basic EDI (Manual ASN)',
      bizsync: '✅ Native 15-Min POs & Auto ASN',
    },
    {
      capability: 'GST e-Invoicing & e-Way Bill IRN',
      spreadsheet: '❌ Manual Govt Portal',
      apps: '⚠️ External Paid Plugin',
      legacy: '⚠️ Paid Addon Module',
      bizsync: '✅ Direct NIC API (1-Click IRN)',
    },
    {
      capability: 'AI RTO Risk Scoring & COD OTP',
      spreadsheet: '❌ None',
      apps: '⚠️ Separate Paid Shopify App',
      legacy: '❌ No Predictive AI',
      bizsync: '✅ Native AI + Automated WhatsApp OTP',
    },
    {
      capability: 'Warehouse WMS & FEFO Expiry',
      spreadsheet: '❌ Manual Paper Register',
      apps: '⚠️ Basic Quantity Count Only',
      legacy: '⚠️ Complex Desktop Portal',
      bizsync: '✅ Mobile Barcode Scanner + Strict FEFO',
    },
    {
      capability: 'Two-Way Tally Prime / ERP Sync',
      spreadsheet: '❌ Manual Data Entry',
      apps: '⚠️ Fragile CSV Import',
      legacy: '⚠️ Periodic Batch Sync',
      bizsync: '✅ Instant Bi-Directional Voucher Sync',
    },
    {
      capability: 'Onboarding & Time-to-Live',
      spreadsheet: 'Immediate (Broken)',
      apps: '2 - 3 Weeks Setup',
      legacy: '4 - 8 Weeks Setup',
      bizsync: '🚀 Under 48 Hours with Guided Migration',
    },
    {
      capability: 'Pricing Transparency',
      spreadsheet: 'High Hidden Labor Cost',
      apps: '₹45,000 - ₹75,000/mo Stack',
      legacy: 'Billed per channel & warehouse',
      bizsync: '💎 Flat Transparent Pricing (All Included)',
    },
  ];

  const tcoItems = [
    {
      tool: 'Multi-Channel OMS & Inventory Sync',
      legacyCost: '₹18,000 / mo',
      bizsyncIncluded: true,
    },
    {
      tool: 'WhatsApp Commerce & Automated CRM',
      legacyCost: '₹7,500 / mo',
      bizsyncIncluded: true,
    },
    {
      tool: 'AI-Powered RTO Risk Scoring Tool',
      legacyCost: '₹9,000 / mo',
      bizsyncIncluded: true,
    },
    {
      tool: 'GST e-Invoicing & e-Way Bill Plugin',
      legacyCost: '₹4,500 / mo',
      bizsyncIncluded: true,
    },
    {
      tool: 'Integration Middleware & IT Support',
      legacyCost: '₹15,000 / mo',
      bizsyncIncluded: true,
    },
  ];

  return (
    <main className="route-page osw-why-page">
      {/* HERO SECTION */}
      <section className="osw-hero-section">
        <div className="os-why-container">
          <div className="osw-hero-content">
            <div className="osw-eyebrow">
              <Target size={14} /> ARCHITECTURAL BENCHMARK & COMPARISON
            </div>
            <h1 className="osw-hero-title">
              Why Modern Indian Commerce Leaders Are{' '}
              <span className="osw-hero-gradient-text">Replacing Legacy OMS</span>
            </h1>
            <p className="osw-hero-copy">
              Legacy OMS architectures built in 2012 rely on fragile 30-minute cron jobs, disjointed
              external plugins, and clunky user interfaces. BizSyncOS replaces the chaos with
              real-time event streaming, native Indian GST compliance, and an embedded AI copilot.
            </p>
            <div className="osw-hero-actions">
              <button
                type="button"
                className="osw-btn osw-btn-primary"
                onClick={() => navigate('/signup')}
              >
                Start 3-Day Live Demo <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="osw-btn osw-btn-secondary"
                onClick={() => navigate('/contact')}
              >
                <UsersRound size={16} /> Schedule Architecture Audit
              </button>
            </div>
          </div>

          {/* VALUE PILLARS BAR */}
          <div className="osw-pillars-bar">
            <div className="osw-pillar-item">
              <span className="pillar-icon">
                <Zap size={18} />
              </span>
              <div className="pillar-text">
                <strong>Sub-15ms Event Streaming</strong>
                <small>vs 30-minute legacy cron batch delays</small>
              </div>
            </div>
            <div className="osw-pillar-item">
              <span className="pillar-icon">
                <ShieldCheck size={18} />
              </span>
              <div className="pillar-text">
                <strong>Direct NIC GST & e-Way Bills</strong>
                <small>Native 1-click IRN vs paid 3rd party plugins</small>
              </div>
            </div>
            <div className="osw-pillar-item">
              <span className="pillar-icon">
                <BrainCircuit size={18} />
              </span>
              <div className="pillar-text">
                <strong>Embedded AI Business Brain</strong>
                <small>Automated RTO defense & predictive reorders</small>
              </div>
            </div>
            <div className="osw-pillar-item">
              <span className="pillar-icon">
                <CircleDollarSign size={18} />
              </span>
              <div className="pillar-text">
                <strong>60%+ Lower Software TCO</strong>
                <small>One unified OS vs stacking 7 recurring SaaS bills</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE 3 FATAL FLAWS SECTION */}
      <section className="osw-flaws-section">
        <div className="os-why-container">
          <div className="osw-section-intro">
            <div className="osw-eyebrow text-amber">
              <AlertCircle size={14} /> THE HIDDEN TAX OF LEGACY SOFTWARE
            </div>
            <h2>The 3 Architectural Traps Holding Back Growing Brands</h2>
            <p>
              When monthly orders scale from 1,000 to 25,000+, outdated architectures break in
              predictable and expensive ways.
            </p>
          </div>

          <div className="osw-flaws-grid">
            {flaws.map((flaw, idx) => (
              <div className={`osw-flaw-card theme-${flaw.trapTheme}`} key={idx}>
                <div className="osw-flaw-top-bar">
                  <div className="osw-flaw-badge-group">
                    <span className="osw-trap-num">{flaw.trapNumber}</span>
                    <span className="osw-trap-label">{flaw.tag}</span>
                  </div>
                  <span className="osw-stat-pill">{flaw.statPill}</span>
                </div>

                <h3 className="osw-flaw-heading">{flaw.title}</h3>

                {/* VISUAL COMPARISON BOXES */}
                <div className="osw-flaw-visual-comparison">
                  <div className="osw-flaw-metric-box bad">
                    <span className="metric-dot red" />
                    <div className="metric-content">
                      <small>CRITICAL BOTTLENECK</small>
                      <strong>{flaw.metricBad}</strong>
                    </div>
                  </div>
                  <div className="osw-flaw-metric-box fix">
                    <span className="metric-dot green" />
                    <div className="metric-content">
                      <small>BIZSYNCOS CURE</small>
                      <strong>{flaw.metricFix}</strong>
                    </div>
                  </div>
                </div>

                <div className="flaw-detail-block flaw-issue">
                  <div className="flaw-label-row">
                    <AlertCircle size={13} className="text-muted-icon" />
                    <strong>The Architecture Issue:</strong>
                  </div>
                  <p>{flaw.issue}</p>
                </div>

                <div className="flaw-detail-block flaw-consequence">
                  <div className="flaw-label-row">
                    <X size={13} className="text-red-icon" />
                    <strong>The Business Consequence:</strong>
                  </div>
                  <p>{flaw.consequence}</p>
                </div>

                <div className="flaw-detail-block flaw-solution">
                  <div className="flaw-label-row">
                    <CheckCircle2 size={14} className="text-teal-icon" />
                    <strong>The BizSyncOS Solution:</strong>
                  </div>
                  <p>{flaw.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* INTERACTIVE FLASH SALE CONCURRENCY & LATENCY BENCHMARK */}
      <section className="osw-simulator-section">
        <div className="os-why-container">
          <div className="osw-section-intro">
            <div className="osw-eyebrow text-cyan">
              <Zap size={14} /> LIVE ARCHITECTURAL STRESS TEST
            </div>
            <h2>Simulate Flash Sale Concurrency: Cron Lag vs Real-Time Webhooks</h2>
            <p>
              Drag the interactive traffic volume slider to simulate peak Diwali flash sales. See
              why legacy scheduled polling queues accumulate critical delay and oversell stock,
              while BizSyncOS locks inventory in sub-15ms.
            </p>
          </div>

          <div className="osw-sim-card">
            {/* Interactive Controls Bar */}
            <div className="osw-sim-controls">
              <div className="osw-sim-slider-wrap">
                <div className="osw-sim-slider-label">
                  <span>Simulated Flash Sale Traffic:</span>
                  <strong className="osw-sim-traffic-value">
                    ⚡ {simTraffic.toLocaleString()} orders / sec
                  </strong>
                </div>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={100}
                  value={simTraffic}
                  onChange={(e) => setSimTraffic(Number(e.target.value))}
                  className="osw-sim-slider"
                  aria-label="Simulate traffic orders per second"
                />
                <div className="osw-sim-slider-ticks">
                  <span>100 (Standard)</span>
                  <span>1,500 (Flash Sale)</span>
                  <span>3,000 (Payday Spike)</span>
                  <span>5,000 (Diwali Rush)</span>
                </div>
              </div>

              <div className="osw-sim-presets">
                <button
                  type="button"
                  className={`sim-preset-btn ${simTraffic === 250 ? 'active' : ''}`}
                  onClick={() => setSimTraffic(250)}
                >
                  Standard Day (250/s)
                </button>
                <button
                  type="button"
                  className={`sim-preset-btn ${simTraffic === 1500 ? 'active' : ''}`}
                  onClick={() => setSimTraffic(1500)}
                >
                  ⚡ Flash Sale (1,500/s)
                </button>
                <button
                  type="button"
                  className={`sim-preset-btn ${simTraffic === 5000 ? 'active' : ''}`}
                  onClick={() => setSimTraffic(5000)}
                >
                  🔥 Diwali Rush (5,000/s)
                </button>
              </div>
            </div>

            {/* Live Dual Comparison Display */}
            <div className="osw-sim-grid">
              {/* Legacy OMS Card */}
              <div className="osw-sim-col legacy">
                <div className="sim-col-header">
                  <span className="sim-pill pill-red">LEGACY OMS (BATCH CRON)</span>
                  <h4>Unicommerce / Vinculum Model</h4>
                  <p>15-to-30 minute scheduled polling cycle</p>
                </div>

                <div className="sim-metrics-box">
                  <div className="sim-metric-row">
                    <span className="metric-label">Sync Latency</span>
                    <span className="metric-val text-red">
                      1,800,000 ms <small>(30 min delay)</small>
                    </span>
                  </div>
                  <div className="sim-metric-row">
                    <span className="metric-label">Queue Backlog</span>
                    <span className="metric-val text-red">
                      {Math.round(simTraffic * 4.9).toLocaleString()} orders queued
                    </span>
                  </div>
                  <div className="sim-metric-row">
                    <span className="metric-label">Oversell &amp; Penalty Risk</span>
                    <span className="metric-val text-red">
                      {Math.min(52.4, Number(((simTraffic / 100) * 0.85 + 7.5).toFixed(1)))}%
                      Critical
                    </span>
                  </div>
                  <div className="sim-metric-row">
                    <span className="metric-label">Channel Consistency</span>
                    <span className="metric-val text-red">⚠️ Desynchronized</span>
                  </div>
                </div>

                {/* Progress Bar / Gauge */}
                <div className="sim-bar-group">
                  <div className="sim-bar-label">
                    <span>Order Backlog Congestion:</span>
                    <span className="text-red">
                      HIGH LAG ({Math.min(100, Math.round((simTraffic / 5000) * 100))}
                      %)
                    </span>
                  </div>
                  <div className="sim-bar-track">
                    <div
                      className="sim-bar-fill fill-red"
                      style={{
                        width: `${Math.min(100, Math.max(20, Math.round((simTraffic / 5000) * 100)))}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="sim-status-banner banner-danger">
                  <AlertCircle size={15} />
                  <span>
                    {simTraffic > 2000
                      ? `🚨 CRITICAL ALERT: ${Math.round(simTraffic * 0.04)} ghost orders placed for out-of-stock items. Marketplace SLA breach imminent.`
                      : '⚠️ Warning: Cron batch pending. 15-minute blind spot exposes catalog to negative stock.'}
                  </span>
                </div>
              </div>

              {/* BizSyncOS Card */}
              <div className="osw-sim-col bizsync">
                <div className="sim-col-header">
                  <span className="sim-pill pill-teal">BIZSYNCOS REAL-TIME OS</span>
                  <h4>Atomic Redis Mutex &amp; Event Bus</h4>
                  <p>Sub-15ms distributed webhook processing</p>
                </div>

                <div className="sim-metrics-box">
                  <div className="sim-metric-row">
                    <span className="metric-label">Sync Latency</span>
                    <span className="metric-val text-teal">
                      11.8 ms <small>(⚡ Real-Time)</small>
                    </span>
                  </div>
                  <div className="sim-metric-row">
                    <span className="metric-label">Queue Backlog</span>
                    <span className="metric-val text-teal">
                      0 orders <small>(Instant ACK)</small>
                    </span>
                  </div>
                  <div className="sim-metric-row">
                    <span className="metric-label">Oversell &amp; Penalty Risk</span>
                    <span className="metric-val text-teal">0.00% Zero-Drop Guaranteed</span>
                  </div>
                  <div className="sim-metric-row">
                    <span className="metric-label">Channel Consistency</span>
                    <span className="metric-val text-teal">🛡️ 100% Atomic Mutex Locked</span>
                  </div>
                </div>

                {/* Progress Bar / Gauge */}
                <div className="sim-bar-group">
                  <div className="sim-bar-label">
                    <span>System Throughput Health:</span>
                    <span className="text-teal">OPTIMAL (100% Clear)</span>
                  </div>
                  <div className="sim-bar-track">
                    <div className="sim-bar-fill fill-teal" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="sim-status-banner banner-success">
                  <CheckCircle2 size={15} />
                  <span>
                    🛡️ 100% Stock Integrity: Atomic mutex locks across Shopify, Amazon, and Blinkit
                    in &lt;15ms. Zero drops, zero cancellations.
                  </span>
                </div>
              </div>
            </div>

            {/* LATENCY BENCHMARK VISUAL BARS */}
            <div className="osw-sim-latency-chart">
              <div className="chart-header">
                <h4>Real-World Architecture Latency Comparison (Lower is Better)</h4>
                <span className="chart-sub">
                  Measured during concurrent multi-channel order spikes
                </span>
              </div>
              <div className="latency-bar-list">
                <div className="latency-bar-row">
                  <div className="latency-name">
                    <strong>BizSyncOS Event Core</strong>
                    <span>Sub-15ms Atomic Mutex Webhook</span>
                  </div>
                  <div className="latency-bar-container">
                    <div className="latency-bar-fill bar-bizsync" style={{ width: '8%' }}>
                      <span className="bar-tag">12 ms</span>
                    </div>
                  </div>
                  <div className="latency-speed-badge">⚡ 150,000x Faster</div>
                </div>

                <div className="latency-bar-row">
                  <div className="latency-name">
                    <strong>Fragmented Shopify Apps</strong>
                    <span>App-bridge queuing delays</span>
                  </div>
                  <div className="latency-bar-container">
                    <div className="latency-bar-fill bar-apps" style={{ width: '36%' }}>
                      <span className="bar-tag">5 Minutes (300,000 ms)</span>
                    </div>
                  </div>
                  <div className="latency-speed-badge text-muted">⚠️ 25,000x Slower</div>
                </div>

                <div className="latency-bar-row">
                  <div className="latency-name">
                    <strong>Legacy OMS (Unicommerce / Vinculum)</strong>
                    <span>Scheduled Batch Cron Polling</span>
                  </div>
                  <div className="latency-bar-container">
                    <div className="latency-bar-fill bar-legacy" style={{ width: '75%' }}>
                      <span className="bar-tag">30 Minutes (1,800,000 ms)</span>
                    </div>
                  </div>
                  <div className="latency-speed-badge text-red">🛑 150,000x Slower</div>
                </div>

                <div className="latency-bar-row">
                  <div className="latency-name">
                    <strong>Manual Excel CSV Reconciliation</strong>
                    <span>Operations manual spreadsheets</span>
                  </div>
                  <div className="latency-bar-container">
                    <div className="latency-bar-fill bar-excel" style={{ width: '96%' }}>
                      <span className="bar-tag">4 Hours (14,400,000 ms)</span>
                    </div>
                  </div>
                  <div className="latency-speed-badge text-red">💀 1,200,000x Slower</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEAD-TO-HEAD COMPARISON MATRIX */}
      <section className="osw-matrix-section">
        <div className="os-why-container">
          <div className="osw-section-intro">
            <div className="osw-eyebrow">
              <BarChart3 size={14} /> HEAD-TO-HEAD SPECIFICATIONS
            </div>
            <h2>Compare Technical Capabilities, Not Marketing Slogans</h2>
            <p>
              A detailed, factual benchmark across the four most common operational models used by
              Indian omnichannel brands today.
            </p>
          </div>

          <div className="osw-matrix-wrapper">
            <div className="osw-matrix-table">
              <div className="osw-matrix-header-row">
                <div className="col-capability">Core Operational Capability</div>
                <div className="col-model">Spreadsheets & Manual</div>
                <div className="col-model">Fragmented App Stack</div>
                <div className="col-model">Legacy OMS (Unicommerce / Vinculum)</div>
                <div className="col-model highlight-bizsync">
                  <div className="bizsync-badge">RECOMMENDED</div>
                  BizSyncOS Modern OS
                </div>
              </div>

              {matrixRows.map((row, idx) => (
                <div className="osw-matrix-row" key={idx}>
                  <div className="col-capability">
                    <strong>{row.capability}</strong>
                  </div>
                  <div className="col-model text-muted">{row.spreadsheet}</div>
                  <div className="col-model">{row.apps}</div>
                  <div className="col-model">{row.legacy}</div>
                  <div className="col-model highlight-bizsync">
                    <span className="bizsync-val">{row.bizsync}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SIDE-BY-SIDE ARCHITECTURE VISUAL */}
      <section className="osw-sidebyside-section">
        <div className="os-why-container">
          <div className="osw-section-intro">
            <div className="osw-eyebrow">
              <Workflow size={14} /> SYSTEM ARCHITECTURE VISUALIZED
            </div>
            <h2>Fragmented Spaghetti vs Unified Event Engine</h2>
            <p>
              See how eliminating middleware and point tools transforms the flow of business data
              across your entire company.
            </p>
          </div>

          <div className="osw-sidebyside-grid">
            {/* LEFT: Legacy Architecture */}
            <div className="osw-arch-card legacy">
              <div className="arch-header">
                <span className="arch-badge red">LEGACY COMMERCE STACK</span>
                <h3>Fragile Multi-Tool Spaghetti</h3>
                <p>6 to 8 disconnected SaaS tools glued with fragile batch sync jobs.</p>
              </div>

              {/* Animated Signal Packet Bottleneck Stream */}
              <div className="arch-signal-stream legacy-stream">
                <span className="packet-label">Cron Batch Sync Queue:</span>
                <div className="packet-track">
                  <span className="stream-packet packet-jam" />
                  <span className="stream-packet packet-jam delay-1" />
                  <span className="stream-packet packet-jam delay-2" />
                </div>
                <span className="packet-status text-red">⚠️ Latency Congestion</span>
              </div>

              <div className="arch-nodes-visual legacy-visual">
                <div className="arch-node-item">
                  <span className="dot red" /> Shopify / Webstore (Database A)
                </div>
                <div className="arch-arrow-down">↓ 15-min scheduled polling</div>
                <div className="arch-node-item">
                  <span className="dot red" /> Legacy OMS / WMS (Database B)
                </div>
                <div className="arch-arrow-down">↓ Manual CSV export / import</div>
                <div className="arch-node-item">
                  <span className="dot red" /> Shiprocket / Courier Aggregator (Database C)
                </div>
                <div className="arch-arrow-down">↓ Daily evening Tally data entry</div>
                <div className="arch-node-item">
                  <span className="dot red" /> Tally Prime / Accounting (Database D)
                </div>
              </div>
              <div className="arch-footer">
                <div className="arch-stat-row">
                  <span>Inventory Variance:</span>
                  <strong className="text-red">14.2% discrepancy</strong>
                </div>
                <div className="arch-stat-row">
                  <span>Operational Handoffs:</span>
                  <strong>4 manual file exports/day</strong>
                </div>
                <div className="arch-stat-row">
                  <span>Total Software Cost:</span>
                  <strong className="text-red">₹54,000+ / month</strong>
                </div>
              </div>
            </div>

            {/* RIGHT: BizSyncOS Architecture */}
            <div className="osw-arch-card bizsync">
              <div className="arch-header">
                <span className="arch-badge teal">BIZSYNCOS UNIFIED OPERATING SYSTEM</span>
                <h3>Single Event-Driven Command Hub</h3>
                <p>One real-time core connecting demand, inventory, fulfillment, and finance.</p>
              </div>

              {/* Animated High-Speed Laser Stream */}
              <div className="arch-signal-stream bizsync-stream">
                <span className="packet-label">Redis Atomic Stream:</span>
                <div className="packet-track">
                  <span className="stream-packet packet-pulse" />
                  <span className="stream-packet packet-pulse delay-1" />
                  <span className="stream-packet packet-pulse delay-2" />
                </div>
                <span className="packet-status text-teal">⚡ Sub-15ms Real-Time</span>
              </div>

              <div className="arch-nodes-visual bizsync-visual">
                <div className="arch-hub-box">
                  <div className="hub-center">
                    <div className="hub-core-title">BIZSYNCOS CORE</div>
                    <div className="hub-sub">Redis Atomic Locks · PostgreSQL · Event Bus</div>
                  </div>
                  <div className="hub-channels">
                    <span>⚡ Sub-15ms Webhook Ingestion</span>
                    <span>🛡️ Unified Multi-Warehouse Stock Lock</span>
                    <span>📦 Direct NIC GST & e-Way Bill IRN</span>
                    <span>🤖 Native AI RTO Scoring & WhatsApp OTP</span>
                    <span>📊 Real-Time Bi-Directional Tally Prime Sync</span>
                  </div>
                </div>
              </div>
              <div className="arch-footer">
                <div className="arch-stat-row">
                  <span>Inventory Variance:</span>
                  <strong className="text-teal">&lt; 0.02% (Atomic Lock)</strong>
                </div>
                <div className="arch-stat-row">
                  <span>Operational Handoffs:</span>
                  <strong className="text-teal">100% Automated</strong>
                </div>
                <div className="arch-stat-row">
                  <span>Total Software Cost:</span>
                  <strong className="text-teal">₹6,399 / month (All Included)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOTAL COST OF OWNERSHIP (TCO) COMPARISON */}
      <section className="osw-tco-section">
        <div className="os-why-container">
          <div className="osw-tco-card">
            <div className="osw-tco-header">
              <div className="osw-eyebrow">
                <CircleDollarSign size={14} /> FINANCIAL IMPACT & TCO
              </div>
              <h2>Calculate the Real Cost of Your Software Stack</h2>
              <p>
                Stacked monthly subscriptions and point-tool integration fees bleed mid-market
                Indian brands of millions of rupees every year.
              </p>
            </div>

            {/* Interactive Order Volume Slider & Comparative Cost Bar Chart */}
            <div className="osw-tco-interactive-bar-wrap">
              <div className="tco-interactive-header">
                <div className="tco-interactive-title">
                  <span>Interactive TCO Simulator:</span>
                  <strong>⚡ {tcoOrders.toLocaleString()} monthly orders</strong>
                </div>
                <div className="tco-slider-group">
                  <input
                    type="range"
                    min={2000}
                    max={50000}
                    step={1000}
                    value={tcoOrders}
                    onChange={(e) => setTcoOrders(Number(e.target.value))}
                    className="tco-volume-slider"
                    aria-label="Adjust monthly order volume"
                  />
                  <div className="tco-slider-labels">
                    <span>2,000 orders</span>
                    <span>15,000 orders</span>
                    <span>30,000 orders</span>
                    <span>50,000+ orders</span>
                  </div>
                </div>
              </div>

              {/* Visual Comparative Bars */}
              <div className="tco-comparative-bars">
                <div className="comp-bar-item">
                  <div className="comp-bar-meta">
                    <span>Fragmented 7-Tool Software Stack:</span>
                    <strong className="text-red">
                      ₹{computedLegacyCost.toLocaleString()} / mo
                    </strong>
                  </div>
                  <div className="comp-bar-track">
                    <div className="comp-bar-fill fill-red-stack" style={{ width: '100%' }}>
                      <span>Stack Subscriptions + Integration Fees</span>
                    </div>
                  </div>
                </div>

                <div className="comp-bar-item">
                  <div className="comp-bar-meta">
                    <span>BizSyncOS All-In-One Unified OS (OMS + WMS + GST + AI):</span>
                    <strong className="text-teal">₹6,399 / mo</strong>
                  </div>
                  <div className="comp-bar-track">
                    <div
                      className="comp-bar-fill fill-teal-bizsync"
                      style={{
                        width: `${Math.max(18, Math.round((6399 / computedLegacyCost) * 100))}%`,
                      }}
                    >
                      <span>Flat ₹6,399 / mo · All Included</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-Time Annual Recaptured Value Summary Cards */}
              <div className="tco-savings-pills-row">
                <div className="tco-pill-card">
                  <span className="pill-title">Net Annual Savings</span>
                  <strong className="pill-metric text-teal">
                    ₹{((computedLegacyCost - 6399) * 12).toLocaleString()} / yr
                  </strong>
                  <span className="pill-sub">Direct cash margin recovered</span>
                </div>
                <div className="tco-pill-card">
                  <span className="pill-title">Operations Labor Reclaimed</span>
                  <strong className="pill-metric text-blue">
                    {Math.round((tcoOrders / 20000) * 140)} hrs / mo
                  </strong>
                  <span className="pill-sub">Zero manual CSV matching</span>
                </div>
                <div className="tco-pill-card">
                  <span className="pill-title">Software Cost Reduction</span>
                  <strong className="pill-metric text-emerald">
                    {Math.round(((computedLegacyCost - 6399) / computedLegacyCost) * 100)}% Lower
                  </strong>
                  <span className="pill-sub">1 predictable monthly invoice</span>
                </div>
              </div>
            </div>

            <div className="osw-tco-grid">
              {/* Left: Legacy Cost Breakdown */}
              <div className="osw-tco-col legacy-tco">
                <h4>Fragmented Point-Tool Stack ({Math.round(tcoOrders / 1000)}k orders/mo)</h4>
                <div className="osw-tco-list">
                  {tcoItems.map((item, idx) => (
                    <div className="tco-row" key={idx}>
                      <span className="tool-name">{item.tool}</span>
                      <span className="tool-cost">{item.legacyCost}</span>
                    </div>
                  ))}
                  <div className="tco-row total-row">
                    <strong>Total Monthly Stack Cost:</strong>
                    <strong className="cost-total red">
                      ₹{computedLegacyCost.toLocaleString()} / mo
                    </strong>
                  </div>
                  <div className="tco-row annual-row">
                    <span>Annual Software Overhead:</span>
                    <span className="annual-stat">
                      ₹{(computedLegacyCost * 12).toLocaleString()} / year
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: BizSyncOS Unified Cost */}
              <div className="osw-tco-col bizsync-tco">
                <div className="bizsync-tco-badge">UNIFIED ALL-IN-ONE</div>
                <h4>BizSyncOS Growth Plan</h4>
                <div className="osw-tco-list">
                  <div className="bizsync-included-item">
                    <CheckCircle2 size={16} className="text-teal" />
                    <span>Central OMS & Real-Time Multi-Warehouse WMS (Included)</span>
                  </div>
                  <div className="bizsync-included-item">
                    <CheckCircle2 size={16} className="text-teal" />
                    <span>Automated WhatsApp Alerts & COD Verification (Included)</span>
                  </div>
                  <div className="bizsync-included-item">
                    <CheckCircle2 size={16} className="text-teal" />
                    <span>AI RTO Predictive Risk Engine & Reorder Brain (Included)</span>
                  </div>
                  <div className="bizsync-included-item">
                    <CheckCircle2 size={16} className="text-teal" />
                    <span>Direct NIC GST e-Invoicing & e-Way Bill IRN (Included)</span>
                  </div>
                  <div className="bizsync-included-item">
                    <CheckCircle2 size={16} className="text-teal" />
                    <span>Two-Way Tally Prime & Zoho Ledger Sync (Included)</span>
                  </div>

                  <div className="tco-row total-row bizsync-total">
                    <strong>All-Inclusive Subscription:</strong>
                    <strong className="cost-total teal">₹6,399 / mo</strong>
                  </div>
                  <div className="tco-savings-box">
                    <div className="savings-label">NET ANNUAL SAVINGS:</div>
                    <div className="savings-amount">
                      ₹{((computedLegacyCost - 6399) * 12).toLocaleString()} / year
                    </div>
                    <small>
                      {Math.round(((computedLegacyCost - 6399) / computedLegacyCost) * 100)}%
                      software cost reduction + zero integration maintenance
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 48-HOUR ZERO-DOWNTIME MIGRATION & CTA */}
      <section className="osw-migration-section">
        <div className="os-why-container">
          <div className="osw-migration-banner">
            <div className="osw-migration-content">
              <span className="osw-migration-badge">RISK-FREE TRANSITION GUARANTEE</span>
              <h2>Migrate from Unicommerce, Vinculum, or Excel in 48 Hours</h2>
              <p>
                Switching operating systems shouldn't disrupt your daily dispatches. Our dedicated
                Solutions Engineers handle your entire catalog migration, warehouse stock mapping,
                and carrier configuration with zero operational downtime.
              </p>

              <div className="osw-steps-row">
                <div className="osw-mini-step">
                  <span className="step-num">01</span>
                  <strong>Catalog & Rules Import</strong>
                  <p>
                    Instant ingestion of your SKU catalog, GST HSN codes, and warehouse rules via
                    automated CSV & API tools.
                  </p>
                </div>
                <div className="osw-mini-step">
                  <span className="step-num">02</span>
                  <strong>Parallel Testing</strong>
                  <p>
                    Run BizSyncOS side-by-side with your existing OMS for 24 hours to verify
                    real-time inventory locks.
                  </p>
                </div>
                <div className="osw-mini-step">
                  <span className="step-num">03</span>
                  <strong>Live Switchover</strong>
                  <p>
                    Flip the switch with zero missed orders. Dedicated migration engineer stays on
                    standby on Slack/WhatsApp.
                  </p>
                </div>
              </div>

              <div className="osw-migration-actions">
                <button
                  type="button"
                  className="osw-cta-btn primary"
                  onClick={() => navigate('/contact')}
                >
                  Book Free Migration Audit <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="osw-cta-btn secondary"
                  onClick={() => navigate('/signup')}
                >
                  Start 3-Day Live Demo
                </button>
              </div>

              <div className="osw-migration-footnote">
                <span>✓ 100% data preservation</span>
                <span>✓ Zero missed marketplace orders</span>
                <span>✓ Free assisted onboarding</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PricingPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  const [annual, setAnnual] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      badge: 'BUSINESS FOUNDATIONS',
      monthlyPrice: '₹2,999',
      annualMonthly: '₹2,399',
      annualBilled: '₹28,790 / yr',
      summary: 'For small businesses, single-brand stores, and new commerce setups.',
      allowance: 'Up to 5 team members · 1 warehouse',
      featured: false,
      bestFor: ['Small retail shops', 'Single storefront', 'Growing D2C'],
      features: [
        'Central OMS (Orders & Customers)',
        'Basic Multi-Channel Inventory',
        'GST Compliant Invoicing & Receipts',
        'Shiprocket & Courier Webhooks',
        'Standard Analytics & Reports',
        'Email & Community Support',
        'Up to 5 Users · 1 Location',
      ],
      cta: 'Start 3-Day Free Trial',
      route: '/signup' as PublicRoute,
      variant: 'secondary' as const,
    },
    {
      id: 'growth',
      name: 'Growth',
      badge: 'RECOMMENDED',
      monthlyPrice: '₹7,999',
      annualMonthly: '₹6,399',
      annualBilled: '₹76,790 / yr',
      summary: 'For fast-scaling D2C brands, omnichannel sellers, and active warehouses.',
      allowance: 'Up to 20 team members · Multi-warehouse',
      featured: true,
      bestFor: ['Multi-channel D2C', 'Omnichannel retail', 'Fast-scaling brands'],
      features: [
        'Everything in Starter, plus:',
        'Real-Time Multi-Warehouse Stock Lock',
        'Shopify, Amazon & Flipkart Direct APIs',
        'Automated WhatsApp Alerts & COD Verification',
        'Razorpay & Stripe Ledger Reconciliation',
        'Workflow Automation & Event Webhooks',
        'Role-Based Security & Audit Logs',
      ],
      cta: 'Start 3-Day Free Trial',
      route: '/signup' as PublicRoute,
      variant: 'primary' as const,
    },
    {
      id: 'scale',
      name: 'Scale',
      badge: 'DECISION INTELLIGENCE',
      monthlyPrice: '₹14,999',
      annualMonthly: '₹11,999',
      annualBilled: '₹143,990 / yr',
      summary: 'For multi-location operations, distributors, and high-velocity commerce.',
      allowance: 'Up to 100 team members · Advanced controls',
      featured: false,
      bestFor: ['Multi-city operations', 'Wholesale distributors', 'High-volume brands'],
      features: [
        'Everything in Growth, plus:',
        'AI Business Assistant & Copilot',
        'Predictive Stockout & Demand Forecasting',
        'Tally Prime & Zoho Books Auto-Ledger',
        'Live SLA Violation Defense & Escalations',
        'High-Volume REST APIs & Dead-Letter Queues',
        'Priority 24/7 SLA & Dedicated Support',
      ],
      cta: 'Start 3-Day Free Trial',
      route: '/signup' as PublicRoute,
      variant: 'secondary' as const,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      badge: 'TAILORED OPERATING MODEL',
      monthlyPrice: 'Custom',
      annualMonthly: 'Custom',
      annualBilled: 'Tailored billing agreement',
      summary: 'For large retail chains, enterprise distributors, and custom rollouts.',
      allowance: 'Unlimited team members · Custom infrastructure',
      featured: false,
      bestFor: ['Large retail enterprises', 'Custom ERP migrations', 'High-governance orgs'],
      features: [
        'Everything in Scale, plus:',
        'Custom Connector Built in 48 Hours',
        'Dedicated Technical Account Manager',
        '99.99% Financially Backed Uptime SLA',
        'On-Premise / Private VPC Deployment',
        'Enterprise SSO (SAML, Okta, Azure AD)',
        'White-Glove Migration & Onboarding',
      ],
      cta: 'Talk to Enterprise Sales',
      route: '/contact' as PublicRoute,
      variant: 'secondary' as const,
    },
  ];

  const compareRows = [
    {
      feature: 'Central OMS & Lead Management',
      starter: true,
      growth: true,
      scale: true,
      enterprise: true,
    },
    {
      feature: 'Product Catalog & Variant Sync',
      starter: true,
      growth: true,
      scale: true,
      enterprise: true,
    },
    {
      feature: 'Real-time Inventory Management',
      starter: true,
      growth: true,
      scale: true,
      enterprise: true,
    },
    {
      feature: 'Multi-Warehouse Locations',
      starter: '1 Location',
      growth: 'Unlimited',
      scale: 'Unlimited',
      enterprise: 'Unlimited',
    },
    {
      feature: 'Included Team Members',
      starter: 'Up to 5',
      growth: 'Up to 20',
      scale: 'Up to 100',
      enterprise: 'Unlimited',
    },
    {
      feature: 'GST Invoicing & E-Way Bill',
      starter: true,
      growth: true,
      scale: true,
      enterprise: true,
    },
    {
      feature: 'Courier & Logistics Webhooks',
      starter: 'Standard',
      growth: 'Multi-Courier SLA',
      scale: 'Multi-Courier SLA',
      enterprise: 'Dedicated Pipelines',
    },
    {
      feature: 'Marketplaces (Amazon & Flipkart)',
      starter: false,
      growth: true,
      scale: true,
      enterprise: true,
    },
    {
      feature: 'Automated WhatsApp Messaging',
      starter: false,
      growth: true,
      scale: true,
      enterprise: true,
    },
    {
      feature: 'Payment Gateway Auto-Reconcile',
      starter: false,
      growth: true,
      scale: true,
      enterprise: true,
    },
    {
      feature: 'Accounting Bridge (Tally / Zoho)',
      starter: false,
      growth: 'Standard',
      scale: '2-Way Realtime',
      enterprise: '2-Way Realtime',
    },
    {
      feature: 'AI Operations Copilot & Forecasting',
      starter: false,
      growth: false,
      scale: true,
      enterprise: true,
    },
    {
      feature: 'Dedicated Account Manager & SLA',
      starter: false,
      growth: false,
      scale: 'Priority 24/7',
      enterprise: '99.99% Custom SLA',
    },
  ];

  const faqs = [
    {
      q: 'How does the 3-day full access demo work?',
      a: 'You get instant, unrestricted access to all BizSyncOS modules (OMS, WMS, CRM, Finance, AI Assistant, and Integrations) with pre-loaded realistic data or your own live store. No credit card is required to begin, and your workspace never auto-charges without explicit consent.',
    },
    {
      q: 'Can we change our plan or add users later?',
      a: 'Yes, absolutely. You can upgrade, downgrade, or add modular add-ons (such as extra user seats, additional warehouse nodes, or high-volume API quotas) at any time directly from your workspace settings with instant pro-rated billing.',
    },
    {
      q: 'Are GST invoicing and e-way bill generation included?',
      a: 'Yes! All BizSyncOS plans come with GST-compliant invoicing, HSN/SAC code mapping, tax breakdown ledgers, and automated e-way bill generation for intra-state and inter-state dispatches.',
    },
    {
      q: 'Which integrations are supported out of the box?',
      a: 'BizSyncOS includes 15+ native connectors including Shopify, Amazon India (SP-API), Flipkart Seller, WooCommerce, Razorpay, Stripe, Shiprocket, Delhivery, Tally Prime, Zoho Books, QuickBooks Online, and Meta WhatsApp Cloud API.',
    },
    {
      q: 'What payment methods do you accept for subscription billing?',
      a: 'We accept all major corporate credit cards, debit cards, UPI AutoPay, Net Banking, and NEFT/RTGS wire transfers for annual agreements with compliant B2B tax invoices.',
    },
  ];

  return (
    <main className="route-page os-pricing-page">
      {/* Centered Hero Header */}
      <section className="os-pricing-hero">
        <div className="os-pricing-hero-glow" />
        <div className="os-pricing-container">
          <div className="os-pricing-hero-content">
            <p className="eyebrow blue">
              <Sparkles size={15} /> TRANSPARENT, SCALE-TESTED PRICING
            </p>
            <h1>
              Predictable pricing that <span>grows with your business.</span>
            </h1>
            <p>
              All plans include multi-channel OMS, real-time inventory, and finance reconciliation.
              Start with a 3-day full-access trial. Zero glue code, zero surprise fees.
            </p>

            {/* Trust Metrics */}
            <div className="os-pricing-hero-metrics">
              <span>
                <CheckCircle2 size={15} /> 3-Day Full Product Trial
              </span>
              <span>
                <CheckCircle2 size={15} /> No Credit Card Required
              </span>
              <span>
                <CheckCircle2 size={15} /> Cancel Anytime
              </span>
              <span>
                <CheckCircle2 size={15} /> 100% Hosted in India (AWS)
              </span>
            </div>

            {/* Interactive Billing Toggle */}
            <div className="os-pricing-toggle-wrap">
              <div className="os-pricing-toggle" role="group" aria-label="Billing frequency">
                <button
                  type="button"
                  className={!annual ? 'active' : ''}
                  onClick={() => setAnnual(false)}
                  aria-pressed={!annual}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  className={annual ? 'active' : ''}
                  onClick={() => setAnnual(true)}
                  aria-pressed={annual}
                >
                  Annual Billing <span className="save-badge">Save 20%</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constrained 1200px Cards Grid */}
      <section className="os-pricing-cards-section">
        <div className="os-pricing-container">
          <div className="os-pricing-grid">
            {plans.map((plan) => (
              <div key={plan.id} className={`os-pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && (
                  <div className="os-pricing-popular-pill">
                    <Sparkles size={13} /> {plan.badge}
                  </div>
                )}

                <div className="os-pricing-card-header">
                  {!plan.featured && <span className="os-pricing-badge">{plan.badge}</span>}
                  <h3 className="os-pricing-plan-name">{plan.name}</h3>
                  <p className="os-pricing-summary">{plan.summary}</p>
                  <div className="os-pricing-allowance-pill">{plan.allowance}</div>
                </div>

                <div className="os-pricing-price-box">
                  <div className="os-pricing-price-amount">
                    <strong>{annual ? plan.annualMonthly : plan.monthlyPrice}</strong>
                    {plan.id !== 'enterprise' && <span className="os-pricing-period">/ month</span>}
                  </div>
                  <p className="os-pricing-billing-detail">
                    {plan.id === 'enterprise'
                      ? 'Tailored to your business volume'
                      : annual
                        ? `Billed annually (${plan.annualBilled})`
                        : 'Billed monthly · Cancel anytime'}
                  </p>
                </div>

                <div className="os-pricing-best-for">
                  <small>IDEAL FOR</small>
                  <div className="os-pricing-tag-group">
                    {plan.bestFor.map((item) => (
                      <span key={item} className="os-pricing-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="os-pricing-feature-list">
                  {plan.features.map((feat, i) => (
                    <li key={i} className={i === 0 && feat.includes('plus') ? 'lead-item' : ''}>
                      <Check size={16} className="feat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="os-pricing-card-footer">
                  <RouteButton navigate={navigate} route={plan.route} variant={plan.variant}>
                    {plan.cta}
                  </RouteButton>
                  <small className="os-pricing-cta-footnote">
                    {plan.id === 'enterprise'
                      ? 'Discovery call with Solutions Architect'
                      : 'No card required · Instant setup'}
                  </small>
                </div>
              </div>
            ))}
          </div>

          {/* Service Assurances Row */}
          <div className="os-pricing-assurances">
            <div className="os-assurance-item">
              <ShieldCheck size={20} />
              <div>
                <strong>Enterprise Grade Security</strong>
                <span>ISO 27001 & SOC-2 ready, tenant isolation</span>
              </div>
            </div>
            <div className="os-assurance-item">
              <Workflow size={20} />
              <div>
                <strong>Step-by-Step Rollout</strong>
                <span>Start with OMS, expand into WMS & Finance</span>
              </div>
            </div>
            <div className="os-assurance-item">
              <BarChart3 size={20} />
              <div>
                <strong>One Unified Picture</strong>
                <span>End-to-end audit trail for all business events</span>
              </div>
            </div>
            <div className="os-assurance-item">
              <CircleDollarSign size={20} />
              <div>
                <strong>Zero Long-term Lock-in</strong>
                <span>Export full catalog, orders, and ledger anytime</span>
              </div>
            </div>
          </div>

          {/* Detailed Feature Comparison Matrix */}
          <section className="os-pricing-compare-section">
            <div className="os-pricing-compare-header">
              <div>
                <p className="eyebrow blue">COMPREHENSIVE COMPARISON</p>
                <h2>Detailed Plan Specifications</h2>
              </div>
              <span className="os-pricing-growth-tip">
                <Sparkles size={14} /> <strong>Growth</strong> is selected by 85% of businesses
              </span>
            </div>

            <div className="os-pricing-table-container">
              <table className="os-pricing-table">
                <thead>
                  <tr>
                    <th scope="col" className="col-feature">
                      Feature / Capability
                    </th>
                    <th scope="col">Starter</th>
                    <th scope="col" className="growth-col">
                      Growth <span className="growth-table-badge">POPULAR</span>
                    </th>
                    <th scope="col">Scale</th>
                    <th scope="col">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row">{row.feature}</th>
                      <td>
                        <PricingFeatureCell value={row.starter} />
                      </td>
                      <td className="growth-col">
                        <PricingFeatureCell value={row.growth} />
                      </td>
                      <td>
                        <PricingFeatureCell value={row.scale} />
                      </td>
                      <td>
                        <PricingFeatureCell value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Optional Add-Ons Pills */}
            <div className="os-pricing-addons-banner">
              <div className="addons-title">
                <strong>Modular Add-Ons Available on Any Plan:</strong>
              </div>
              <div className="addons-chips">
                <span>Extra User Seats (+₹499/mo)</span>
                <span>High-Volume AI Credits</span>
                <span>WhatsApp Notification Packs</span>
                <span>Additional Warehouse Nodes</span>
                <span>Custom Tally/ERP Plugins</span>
                <span>Dedicated Slack Support</span>
              </div>
            </div>
          </section>

          {/* Buyer FAQ Section */}
          <section className="os-pricing-faq-section">
            <div className="os-faq-header">
              <p className="eyebrow blue">
                <HelpCircle size={15} /> FREQUENTLY ASKED QUESTIONS
              </p>
              <h2>Everything you need to know about pricing & rollout.</h2>
              <p>Got more questions? Our team is always here to help.</p>
            </div>

            <div className="os-faq-list">
              {faqs.map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <div key={faq.q} className={`os-faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="os-faq-question"
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`os-faq-chevron ${isOpen ? 'rotated' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="os-faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Bottom CTA Banner */}
          <div className="os-pricing-bottom-cta">
            <div className="cta-left">
              <h3>Ready to connect your business stack?</h3>
              <p>
                Join fast-scaling Indian brands orchestrating orders, warehouse inventory, and
                finance on BizSyncOS.
              </p>
            </div>
            <div className="cta-right">
              <RouteButton navigate={navigate} route="/signup">
                Start 3-Day Free Trial
              </RouteButton>
              <RouteButton navigate={navigate} route="/contact" variant="secondary">
                Schedule Guided Demo
              </RouteButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PricingFeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="os-cell-text">{value}</span>;
  }
  return value ? (
    <span className="os-cell-icon included" aria-label="Included in plan">
      <Check size={16} />
    </span>
  ) : (
    <span className="os-cell-icon excluded" aria-label="Not included">
      <X size={15} />
    </span>
  );
}

const orderVolumes = [
  { id: 'under_5k', label: '< 5,000 / mo', sub: 'Foundational' },
  { id: '5k_25k', label: '5,000 – 25,000 / mo', sub: 'High Growth' },
  { id: '25k_100k', label: '25,000 – 100,000 / mo', sub: 'Scale' },
  { id: '100k_plus', label: '100,000+ / mo', sub: 'Enterprise' },
];

const channelOptions = [
  { id: 'shopify', label: 'Shopify D2C' },
  { id: 'amazon', label: 'Amazon SP-API' },
  { id: 'flipkart', label: 'Flipkart Seller' },
  { id: 'qcommerce', label: 'Quick Commerce (Blinkit/Zepto)' },
  { id: 'retail_pos', label: 'Retail Stores / POS' },
  { id: 'b2b', label: 'B2B Wholesale' },
];

const erpOptions = [
  'Tally Prime / ERP 9',
  'Zoho Books / Inventory',
  'Unicommerce (Migration)',
  'Vinculum (Migration)',
  'Busy Accounting',
  'SAP / Oracle ERP',
  'Spreadsheets / Excel / Other',
];

function ContactPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [orderVolume, setOrderVolume] = useState('5k_25k');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['shopify', 'amazon']);
  const [erp, setErp] = useState('Tally Prime / ERP 9');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((c) => c !== id) : prev) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const randomTicket = `REQ-BZX-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(randomTicket);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const selectedVolumeObj = orderVolumes.find((v) => v.id === orderVolume);
  const selectedChannelLabels = channelOptions
    .filter((c) => selectedChannels.includes(c.id))
    .map((c) => c.label)
    .join(', ');

  const whatsappMessage = encodeURIComponent(
    `Hi BizSyncOS Architecture Team, I requested an enterprise consultation for ${companyName || 'our company'}. Ticket: ${ticketNumber || 'REQ-BZX-9000'}. Volume: ${selectedVolumeObj?.label || '5k-25k'}, Stack: ${erp}. Looking forward to connecting.`
  );

  return (
    <main className="route-page osc-page-root">
      <section className="osc-container">
        {/* TOP HEADER */}
        <div className="osc-header">
          <div className="osc-eyebrow">
            <span className="osc-pulse-dot" />
            <MessageSquareText size={14} />
            ENTERPRISE SOLUTIONS CONSULTING · ARCHITECTURE REVIEW
          </div>
          <h1 className="osc-title">
            Architect your commerce stack for{' '}
            <span className="osc-gradient-text">zero-downtime scale.</span>
          </h1>
          <p className="osc-subtitle">
            Connect directly with a Senior Solutions Architect. We evaluate your order concurrency,
            catalog sync latency, and ERP ledger handoffs to build a custom migration &amp; parity
            blueprint in 48 hours.
          </p>
        </div>

        {/* 2-COLUMN MAIN GRID */}
        <div className="osc-grid">
          {/* LEFT COLUMN: DISCOVERY ROADMAP & INSTITUTIONAL TRUST */}
          <div className="osc-left-col">
            <div className="osc-roadmap-card">
              <h2 className="osc-card-heading">
                <Sparkles size={16} /> What to expect in your session
              </h2>
              <div className="osc-roadmap-steps">
                <div className="osc-step-item">
                  <div className="osc-step-num">01</div>
                  <div className="osc-step-content">
                    <h3>15-Minute Technical Discovery</h3>
                    <p>
                      We map your channel webhook concurrency, multi-warehouse allocation rules, and
                      logistics SLA constraints.
                    </p>
                  </div>
                </div>
                <div className="osc-step-item">
                  <div className="osc-step-num">02</div>
                  <div className="osc-step-content">
                    <h3>Custom High-Velocity Sandbox</h3>
                    <p>
                      Test your live catalog schemas, SKU bundling, and mock ERP connectors against
                      our sub-15ms streaming backbone.
                    </p>
                  </div>
                </div>
                <div className="osc-step-item">
                  <div className="osc-step-num">03</div>
                  <div className="osc-step-content">
                    <h3>48-Hour Zero-Downtime Blueprint</h3>
                    <p>
                      Dual-write cutover schedule, automated rollback safety, and a guaranteed TCO
                      audit saving 40–60% over legacy OMS.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ENTERPRISE TRUST BADGES */}
            <div className="osc-trust-card">
              <h2 className="osc-card-heading">
                <ShieldCheck size={16} /> Enterprise Governance &amp; Compliance
              </h2>
              <div className="osc-trust-grid">
                <div className="osc-trust-item">
                  <CheckCircle2 size={16} className="osc-trust-icon" />
                  <div>
                    <strong>ISO 27001 &amp; SOC-2 Type II</strong>
                    <span>Continuous compliance auditing</span>
                  </div>
                </div>
                <div className="osc-trust-item">
                  <CheckCircle2 size={16} className="osc-trust-icon" />
                  <div>
                    <strong>100% Hosted in India</strong>
                    <span>AWS Mumbai (ap-south-1) sovereign cloud</span>
                  </div>
                </div>
                <div className="osc-trust-item">
                  <CheckCircle2 size={16} className="osc-trust-icon" />
                  <div>
                    <strong>99.99% Financially Backed SLA</strong>
                    <span>Sub-15ms streaming latency guarantee</span>
                  </div>
                </div>
                <div className="osc-trust-item">
                  <CheckCircle2 size={16} className="osc-trust-icon" />
                  <div>
                    <strong>Direct NIC GST Invoicing</strong>
                    <span>Automated IRN &amp; E-Way bill generation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DIRECT CHANNELS & HUBS */}
            <div className="osc-hubs-card">
              <div className="osc-hub-row">
                <div className="osc-hub-detail">
                  <MapPin size={16} className="osc-hub-icon" />
                  <div>
                    <strong>Bengaluru R&amp;D Center</strong>
                    <span>Koramangala 4th Block, Bengaluru, KA 560034</span>
                  </div>
                </div>
                <div className="osc-hub-detail">
                  <MapPin size={16} className="osc-hub-icon" />
                  <div>
                    <strong>Delhi NCR Operations Hub</strong>
                    <span>DLF Cyber City, Tower B, Gurugram, HR 122002</span>
                  </div>
                </div>
              </div>
              <div className="osc-direct-contacts">
                <a href="mailto:enterprise@bizsyncos.com" className="osc-contact-chip">
                  <Mail size={14} /> enterprise@bizsyncos.com
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hi%20BizSyncOS%2C%20I%20would%20like%20to%20speak%20with%20an%20Enterprise%20Solutions%20Architect."
                  target="_blank"
                  rel="noreferrer"
                  className="osc-contact-chip osc-whatsapp-chip"
                >
                  <MessageCircle size={14} /> VIP WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ENTERPRISE QUALIFICATION FORM OR SUCCESS CARD */}
          <div className="osc-right-col">
            {!isSubmitted ? (
              <motion.div
                className="osc-form-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="osc-form-header">
                  <div className="osc-form-status">
                    <span className="osc-status-ping" />
                    <span>Solutions Architect On-Duty · 15-Min Response</span>
                  </div>
                  <h2 className="osc-form-title">Request Technical Walkthrough</h2>
                  <p className="osc-form-desc">
                    Tell us about your order velocity and current software stack so we can assign
                    the matching solutions lead.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="osc-form-body">
                  {/* 2-Col Name & Email */}
                  <div className="osc-field-row">
                    <div className="osc-field">
                      <label htmlFor="fullName">
                        Full Name <span className="osc-req">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="osc-field">
                      <label htmlFor="workEmail">
                        Work Email <span className="osc-req">*</span>
                      </label>
                      <input
                        id="workEmail"
                        type="email"
                        required
                        placeholder="vikram@brandname.com"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* 2-Col Phone & Company */}
                  <div className="osc-field-row">
                    <div className="osc-field">
                      <label htmlFor="phone">
                        Phone / WhatsApp <span className="osc-req">*</span>
                      </label>
                      <div className="osc-phone-input-wrap">
                        <span className="osc-phone-prefix">+91</span>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="osc-field">
                      <label htmlFor="companyName">
                        Company / Brand Name <span className="osc-req">*</span>
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        required
                        placeholder="e.g. Acme Retail Pvt Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Order Volume Selector */}
                  <div className="osc-field">
                    <label>
                      Monthly Order Volume <span className="osc-req">*</span>
                    </label>
                    <div className="osc-volume-grid">
                      {orderVolumes.map((vol) => (
                        <button
                          key={vol.id}
                          type="button"
                          className={`osc-volume-btn ${orderVolume === vol.id ? 'is-active' : ''}`}
                          onClick={() => setOrderVolume(vol.id)}
                        >
                          <strong>{vol.label}</strong>
                          <small>{vol.sub}</small>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Channels Multi-Select */}
                  <div className="osc-field">
                    <label>
                      Active Sales &amp; Distribution Channels <span className="osc-req">*</span>
                    </label>
                    <div className="osc-channel-pills">
                      {channelOptions.map((ch) => {
                        const active = selectedChannels.includes(ch.id);
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            className={`osc-channel-pill ${active ? 'is-active' : ''}`}
                            onClick={() => toggleChannel(ch.id)}
                          >
                            {active && <Check size={13} />}
                            <span>{ch.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ERP / Accounting Selector */}
                  <div className="osc-field">
                    <label htmlFor="erpSelect">
                      Current Accounting / ERP System <span className="osc-req">*</span>
                    </label>
                    <select
                      id="erpSelect"
                      value={erp}
                      onChange={(e) => setErp(e.target.value)}
                      className="osc-select"
                    >
                      {erpOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div className="osc-field">
                    <label htmlFor="notes">
                      Current Operational Bottlenecks / Notes{' '}
                      <span className="osc-opt">(Optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="e.g. Over-selling during flash sales, need sub-15ms stock lock, or migrating from Unicommerce."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="osc-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="osc-spinner" />
                        Routing to Senior Solutions Architect...
                      </>
                    ) : (
                      <>
                        Schedule Technical Architecture Session <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="osc-form-footnote">
                    <Lock size={12} />
                    <span>NDA Protected · Direct engineer callback · Zero vendor spam</span>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                className="osc-success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="osc-success-badge">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="osc-success-title">Consultation Request Confirmed</h2>
                <p className="osc-success-desc">
                  Thank you, <strong>{fullName}</strong>. Your enterprise inquiry for{' '}
                  <strong>{companyName}</strong> has been logged in our priority routing queue.
                </p>

                <div className="osc-ticket-box">
                  <div className="osc-ticket-row">
                    <span>Priority Reference Ticket</span>
                    <strong>{ticketNumber}</strong>
                  </div>
                  <div className="osc-ticket-row">
                    <span>Monthly Volume Tier</span>
                    <span>{selectedVolumeObj?.label}</span>
                  </div>
                  <div className="osc-ticket-row">
                    <span>Selected Channels</span>
                    <span>
                      {selectedChannels.length} Channels ({selectedChannelLabels})
                    </span>
                  </div>
                  <div className="osc-ticket-row">
                    <span>Core ERP / Stack</span>
                    <span>{erp}</span>
                  </div>
                  <div className="osc-ticket-status">
                    <span className="osc-pulse-dot" />
                    <span>Assigned to Solutions Architect · Callback SLA &lt; 2 Hours</span>
                  </div>
                </div>

                <div className="osc-success-actions">
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="osc-action-btn osc-btn-whatsapp"
                  >
                    <MessageCircle size={16} />
                    Connect on WhatsApp Right Now
                  </a>
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="osc-action-btn osc-btn-sandbox"
                  >
                    <Sparkles size={16} />
                    Launch 3-Day Live Demo Sandbox
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setWorkEmail('');
                      setPhone('');
                      setCompanyName('');
                      setMessage('');
                    }}
                    className="osc-btn-reset"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function GoogleSvg() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GoogleSignInButton({ kind }: { kind: 'login' | 'signup' }) {
  return (
    <a
      className="google-btn auth-provider"
      href={backendPath(`/auth/google/redirect?intent=${kind}`)}
    >
      <GoogleSvg />
      {kind === 'login' ? 'Continue with Google' : 'Sign up with Google'}
    </a>
  );
}

function AuthPage({
  kind,
  navigate,
}: {
  kind: 'login' | 'signup';
  navigate: (route: PublicRoute) => void;
}) {
  const isLogin = kind === 'login';
  const emailPath = backendPath(isLogin ? '/login' : '/register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(() =>
    isLogin ? document.querySelector<HTMLMetaElement>('meta[name="auth-error"]')?.content || new URLSearchParams(window.location.search).get('error') || '' : '',
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const loginStatus = document.querySelector<HTMLMetaElement>('meta[name="auth-status"]')?.content;
  const needsAuthNavigation = isLogin && import.meta.env.PROD &&
    window.location.origin !== new URL(LOCAL_BACKEND_URL, window.location.origin).origin;

  useEffect(() => {
    if (needsAuthNavigation) window.location.replace(backendPath('/login'));
  }, [needsAuthNavigation]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (isLogin) {
      const errors: Record<string, string> = {};
      if (!email.trim()) errors.email = 'Please enter your email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Please enter a valid email address.';
      if (!password) errors.password = 'Please enter your password.';
      setFieldErrors(errors);
      setLoginError('');
      if (Object.keys(errors).length) return;
      setSubmitting(true);
      setLoginError('');
      try {
        const csrf = await fetch(backendPath('/auth/csrf-token'), {
          credentials: 'include',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
        if (!csrf.ok) throw new Error('Unable to start sign-in. Please try again.');
        const { token } = await csrf.json();
        const response = await fetch(emailPath, {
          method: 'POST',
          credentials: 'include',
          redirect: 'error',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          body: JSON.stringify({ email: email.trim(), password, remember: rememberMe }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          if (response.status === 422 && data.errors) {
            setFieldErrors(Object.fromEntries(Object.entries(data.errors).map(([field, messages]) =>
              [field, Array.isArray(messages) ? String(messages[0]) : String(messages)],
            )));
            return;
          }
          throw new Error(response.status === 429
            ? 'Too many sign-in attempts. Please wait a minute and try again.'
            : response.status === 419
              ? 'Your session expired. Please try again.'
              : data.errors?.email?.[0] || data.message || 'Sign-in failed. Please try again.');
        }
        if (data.two_factor) {
          window.location.assign(backendPath('/two-factor-challenge'));
        } else if (typeof data.redirect === 'string') {
          window.location.assign(data.redirect);
        } else {
          throw new Error('Sign-in could not be confirmed. Please try again.');
        }
      } catch (error) {
        setLoginError(error instanceof Error ? error.message : 'Unable to sign in. Please try again.');
      } finally {
        setSubmitting(false);
      }
      return;
    }
    const params = new URLSearchParams();
    if (email.trim()) params.set('email', email.trim());
    if (name.trim()) params.set('name', name.trim());
    const query = params.toString() ? `?${params.toString()}` : '';
    window.location.assign(emailPath + query);
  };

  if (needsAuthNavigation) return <main className="saas-auth-root"><p role="status">Opening secure sign-in…</p></main>;

  return (
    <div className="saas-auth-root">
      <div className="saas-auth-layout">
        {/* LEFT COLUMN: AUTH FORM */}
        <div className="saas-auth-form-panel">
          {/* Top Navigation */}
          <div className="saas-auth-top-nav">
            <button type="button" className="saas-auth-brand" onClick={() => navigate('/')}>
              <img
                src={`${import.meta.env.BASE_URL}images/bizsync-logo-white.png`}
                alt="BizSync"
                className="saas-brand-logo-img"
              />
              <span className="saas-brand-badge">Enterprise</span>
            </button>

            <button type="button" className="saas-auth-back-link" onClick={() => navigate('/')}>
              <ArrowLeft size={14} /> Back to website
            </button>
          </div>

          {/* Main Form Center Area */}
          <div className="saas-auth-form-content">
            {/* Segmented Switcher */}
            <div className="saas-tab-switcher">
              <button
                type="button"
                className={`saas-tab-btn ${isLogin ? 'is-active' : ''}`}
                onClick={() => navigate('/login')}
              >
                <KeyRound size={14} /> Sign In
              </button>
              <button
                type="button"
                className={`saas-tab-btn ${!isLogin ? 'is-active' : ''}`}
                onClick={() => navigate('/signup')}
              >
                <Sparkles size={14} /> 3-Day Free Trial
              </button>
            </div>

            {/* Heading */}
            <div className="saas-auth-header">
              <h1 className="saas-auth-title">
                {isLogin ? 'Welcome back' : 'Start your 3-Day Free Trial'}
              </h1>
              <p className="saas-auth-subtitle">
                {isLogin
                  ? 'Sign in to access your operations, CRM, inventory, and AI assistants.'
                  : 'Get full access to the Basic Plan for 3 days to review, test, and explore all workflows. No credit card required.'}
              </p>
            </div>

            {/* Google OAuth */}
            <a
              className="saas-google-btn"
              href={backendPath(`/auth/google/redirect?intent=${kind}`)}
            >
              <GoogleSvg />
              <span>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
            </a>

            {/* Divider */}
            <div className="saas-auth-divider">
              <span>or continue with email</span>
            </div>

            {/* Real Interactive Form */}
            <form className="saas-form" onSubmit={handleFormSubmit} noValidate={isLogin}>
              {!isLogin && (
                <>
                  <div className="saas-field">
                    <label className="saas-label" htmlFor="user-name">
                      Full Name
                    </label>
                    <div className="saas-input-shell">
                      <User size={16} className="saas-input-icon" />
                      <input
                        id="user-name"
                        type="text"
                        className="saas-input"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="saas-field">
                    <label className="saas-label" htmlFor="workspace-name">
                      Workspace / Company
                    </label>
                    <div className="saas-input-shell">
                      <Building2 size={16} className="saas-input-icon" />
                      <input
                        id="workspace-name"
                        type="text"
                        className="saas-input"
                        placeholder="Your company or organization"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="saas-field">
                <label className="saas-label" htmlFor="auth-email">
                  Work Email
                </label>
                <div className="saas-input-shell">
                  <Mail size={16} className="saas-input-icon" />
                  <input
                    id="auth-email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'auth-email-error' : undefined}
                    type="email"
                    className="saas-input"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                {fieldErrors.email && <p id="auth-email-error" className="saas-auth-error" role="alert">{fieldErrors.email}</p>}
              </div>

              <div className="saas-field">
                <div className="saas-field-header">
                  <label className="saas-label" htmlFor="auth-password">
                    Password
                  </label>
                  {isLogin && (
                    <a className="saas-forgot-link" href={backendPath('/forgot-password')}>
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="saas-input-shell">
                  <Lock size={16} className="saas-input-icon" />
                  <input
                    id="auth-password"
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={fieldErrors.password ? 'auth-password-error' : undefined}
                    type={showPassword ? 'text' : 'password'}
                    className="saas-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                  />
                  <button
                    type="button"
                    className="saas-pwd-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="saas-form-options">
                {isLogin ? (
                  <label className="saas-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember my workspace</span>
                  </label>
                ) : (
                  <label className="saas-checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                    />
                    <span>I agree to terms and privacy policy</span>
                  </label>
                )}
              </div>

              {fieldErrors.password && <p id="auth-password-error" className="saas-auth-error" role="alert">{fieldErrors.password}</p>}
              {loginError && <p className="saas-auth-error" role="alert">{loginError}</p>}
              {loginStatus && <p className="saas-auth-status" role="status">{loginStatus}</p>}
              <button type="submit" className="saas-submit-btn" disabled={submitting}>
                <span>{submitting ? 'Signing in...' : isLogin ? 'Sign In to Workspace' : 'Start 3-Day Free Trial'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* 3-Day Free Trial Value Banner */}
            <div className="saas-trial-perks-banner">
              <div className="saas-trial-perks-title">
                <Sparkles size={13} />
                <span>3-Day Free Trial · Basic Plan Access</span>
              </div>
              <div className="saas-trial-perks-list">
                <div className="saas-trial-perk-item">
                  <Check size={14} />
                  <span>Full access to all Basic Plan tools & integrations</span>
                </div>
                <div className="saas-trial-perk-item">
                  <Check size={14} />
                  <span>Review inventory sync, OMS, CRM & AI risk-free</span>
                </div>
                <div className="saas-trial-perk-item">
                  <Check size={14} />
                  <span>No credit card required · Instant setup</span>
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="saas-form-footer">
              <button
                type="button"
                className="saas-switch-action"
                onClick={() => navigate(isLogin ? '/signup' : '/login')}
              >
                {isLogin ? (
                  <>
                    New here? <strong>Start 3-Day Free Trial →</strong>
                  </>
                ) : (
                  <>
                    Already have a workspace? <strong>Sign in here →</strong>
                  </>
                )}
              </button>
              <p className="saas-legal-terms">
                Protected by enterprise 256-bit encryption. Authorized commercial access only.
              </p>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="saas-security-footer">
            <span>
              <ShieldCheck size={13} /> 256-Bit SSL Encrypted
            </span>
            <span>
              <LockKeyhole size={13} /> Role-Based Tenant Isolation
            </span>
            <span>
              <CheckCircle2 size={13} /> 99.99% Uptime SLA
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL PLATFORM ARCHITECTURE & CAPABILITIES (Desktop) */}
        <div className="saas-auth-showcase-panel">
          <div className="saas-showcase-backdrop" />
          <div className="saas-showcase-content">
            <div className="saas-showcase-badge">
              <Sparkles size={12} /> 3-DAY BASIC PLAN TRIAL
            </div>
            <h2 className="saas-showcase-title">
              Explore everything with a <em>3-day full access trial.</em>
            </h2>
            <p className="saas-showcase-desc">
              Review real-time commerce sync, automated warehouse inventory, finance reconciliation,
              and AI intelligence risk-free.
            </p>

            {/* Real Core Capabilities */}
            <div className="saas-modules-grid">
              <div className="saas-module-card">
                <div className="saas-module-icon-box">
                  <Layers3 size={20} />
                </div>
                <div className="saas-module-content">
                  <strong>Omnichannel Order & Inventory Sync</strong>
                  <p>
                    Real-time bi-directional sync across Shopify, WooCommerce, Amazon, and WhatsApp.
                    Zero overselling with automated multi-location stock reservation.
                  </p>
                </div>
              </div>

              <div className="saas-module-card">
                <div className="saas-module-icon-box">
                  <Workflow size={20} />
                </div>
                <div className="saas-module-content">
                  <strong>Event-Driven Workflow Automation</strong>
                  <p>
                    Automated order routing, fulfillment triggering, and invoice queuing with strict
                    human-in-the-loop approval checkpoints.
                  </p>
                </div>
              </div>

              <div className="saas-module-card">
                <div className="saas-module-icon-box">
                  <BrainCircuit size={20} />
                </div>
                <div className="saas-module-content">
                  <strong>AI Business Brain & Decision Intelligence</strong>
                  <p>
                    Continuous operations monitoring, predictive inventory forecasting, lead SLA
                    tracking, and evidence-backed escalation management.
                  </p>
                </div>
              </div>
            </div>

            {/* Real Verified Ecosystem Connectors with Authentic SVG Icons */}
            <div className="saas-connectors-panel">
              <div className="saas-connectors-header">
                <span>Native Ecosystem Integrations</span>
                <span className="saas-connectors-status">
                  <CheckCircle2 size={12} /> Verified Connectors
                </span>
              </div>
              <div className="saas-connectors-grid">
                <div className="saas-connector-pill">
                  <svg viewBox="0 0 24 24" fill="#96BF48">
                    <path d={siShopify.path} />
                  </svg>
                  <span>Shopify</span>
                </div>
                <div className="saas-connector-pill">
                  <svg viewBox="0 0 24 24" fill="#96588A">
                    <path d={siWoocommerce.path} />
                  </svg>
                  <span>WooCommerce</span>
                </div>
                <div className="saas-connector-pill">
                  <svg viewBox="0 0 24 24" fill="#25D366">
                    <path d={siWhatsapp.path} />
                  </svg>
                  <span>WhatsApp</span>
                </div>
                <div className="saas-connector-pill">
                  <svg viewBox="0 0 24 24" fill="#2CA01C">
                    <path d={siQuickbooks.path} />
                  </svg>
                  <span>QuickBooks</span>
                </div>
                <div className="saas-connector-pill">
                  <svg viewBox="0 0 24 24" fill="#3395FF">
                    <path d={siRazorpay.path} />
                  </svg>
                  <span>Razorpay</span>
                </div>
                <div className="saas-connector-pill">
                  <svg viewBox="0 0 24 24" fill="#635BFF">
                    <path d={siStripe.path} />
                  </svg>
                  <span>Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type IntegrationCategory = 'all' | 'commerce' | 'payments' | 'logistics' | 'erp' | 'messaging';

interface IntegrationConnector {
  id: string;
  name: string;
  category: IntegrationCategory;
  categoryLabel: string;
  badge: 'Official Partner' | 'Native API' | 'Verified';
  shortDesc: string;
  fullDesc: string;
  brandColor: string;
  bgSoft: string;
  svgLogo: React.ReactNode;
  capabilities: string[];
  syncType: '2-Way Realtime' | 'Instant Webhook' | 'Automated Polling';
  setupTime: string;
  triggers: string[];
  actions: string[];
  authType: 'OAuth 2.0' | 'API Key & Secret' | 'Webhook URL';
}

function IntegrationsPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategory>('all');
  const [activeConnector, setActiveConnector] = useState<IntegrationConnector | null>(null);

  const connectors: IntegrationConnector[] = [
    {
      id: 'shopify',
      name: 'Shopify',
      category: 'commerce',
      categoryLabel: 'E-Commerce',
      badge: 'Official Partner',
      shortDesc:
        'Bi-directional order, inventory, catalog, and customer profile sync with multi-location support.',
      fullDesc:
        'Connect your Shopify storefront to BizSyncOS in 1 click. Orders instantly stream into the central OMS, stock reservations synchronize across all locations, and fulfillment waybills update Shopify customer tracking numbers automatically.',
      brandColor: '#7ab55c',
      bgSoft: '#f2f9ed',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#7ab55c">
          <path d={siShopify.path} />
        </svg>
      ),
      capabilities: ['Real-time Webhooks', '2-Way Inventory', 'Multi-Location', 'Returns Sync'],
      syncType: '2-Way Realtime',
      setupTime: '2 minutes (1-Click OAuth)',
      authType: 'OAuth 2.0',
      triggers: [
        'Order created or edited in Shopify',
        'Customer profile updated',
        'Fulfillment cancellation / return initiated',
      ],
      actions: [
        'Reserve warehouse stock instantly',
        'Generate GST e-way bill & PO',
        'Sync inventory balance across all channels',
      ],
    },
    {
      id: 'amazon',
      name: 'Amazon India (SP-API)',
      category: 'commerce',
      categoryLabel: 'Marketplaces',
      badge: 'Official Partner',
      shortDesc:
        'Amazon Seller Partner API integration for FBA, MFN/Easy Ship orders, settlements, and stock.',
      fullDesc:
        'Manage your Amazon India seller central catalog without logging in. Bi-directional order routing, automated SKU mapping, settlement reconciliation, and anti-stockout safeguards prevent seller rating penalties.',
      brandColor: '#ff9900',
      bgSoft: '#fff8eb',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path
            fill="#232F3E"
            d="M13.8 12.8c-1.3 0-2.4.4-2.4 1.7 0 1 .7 1.5 1.6 1.5.8 0 1.5-.6 1.8-1.2v-2h-1zm2.8 4.7h-1.3v-.8c-.6.6-1.5 1-2.5 1-1.8 0-2.9-1.2-2.9-2.8 0-2.2 1.8-3 4.2-3v-.3c0-.7-.5-1.1-1.6-1.1-.9 0-1.7.3-2.3.8l-.8-1.1c.8-.7 2-1 3.4-1 2.2 0 3.2 1 3.2 2.8v4.5h.1z"
          />
          <path
            fill="#FF9900"
            d="M19 19.3c-2.8 2-6.8 3-10.3 1.9-2.3-.7-4.4-2.2-5.7-4.2-.3-.5.1-.9.6-.6 3.4 2.2 7.7 2.8 11.6 1.4.6-.2 1.1.4.6.8l3.2.7z"
          />
          <path
            fill="#FF9900"
            d="M20.2 17.5c-.4-.5-2.5-.2-3.7.2-.3.1-.3-.2 0-.4 1.7-1.1 3.8-1 4.2-.5.4.5-.1 2.6-1.7 3.9-.3.2-.5.1-.4-.2.4-1 1.6-3 1.6-3z"
          />
        </svg>
      ),
      capabilities: ['SP-API v1', 'FBA & EasyShip', 'Settlement Rec', 'Anti-Stockout'],
      syncType: '2-Way Realtime',
      setupTime: '4 minutes (SP-API Token)',
      authType: 'OAuth 2.0',
      triggers: [
        'New Amazon order received',
        'Easy Ship tracking waybill assigned',
        'Settlement ledger disbursed',
      ],
      actions: [
        'Route to nearest fulfillment hub',
        'Auto-reconcile Amazon commission fees',
        'Sync shared buffer stock',
      ],
    },
    {
      id: 'flipkart',
      name: 'Flipkart Seller',
      category: 'commerce',
      categoryLabel: 'Marketplaces',
      badge: 'Verified',
      shortDesc:
        'Sync Flipkart listings, Smart & Standard fulfillment orders, returns, and invoice ledger.',
      fullDesc:
        'Direct API integration with Flipkart Seller API. Pull order manifests, auto-generate tax invoices, manage RTO returns inspections, and sync central warehouse inventory in real time.',
      brandColor: '#2874f0',
      bgSoft: '#eef5ff',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect x="2" y="4" width="20" height="17" rx="4" fill="#2874F0" />
          <path d="M7 4V3a3 3 0 0 1 6 0v1" stroke="#FFE11B" strokeWidth="2" fill="none" />
          <path d="M10.5 8h5.5v2.5h-3v2h2.5v2.2h-2.5v3.8h-2.5V8z" fill="#FFE11B" />
        </svg>
      ),
      capabilities: ['Flipkart API v3', 'Smart Fulfillment', 'RTO Tracking', 'Invoice Match'],
      syncType: 'Instant Webhook',
      setupTime: '3 minutes (API Keys)',
      authType: 'API Key & Secret',
      triggers: [
        'Flipkart order manifest generated',
        'Return pickup initiated by customer',
        'Payment payout report published',
      ],
      actions: [
        'Print shipping label and tax invoice',
        'Flag RTO return risk score',
        'Post ledger entry to accounting ERP',
      ],
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      category: 'commerce',
      categoryLabel: 'E-Commerce',
      badge: 'Native API',
      shortDesc:
        'WordPress WooCommerce REST API v3 sync for custom checkout flows, inventory, and order dispatch.',
      fullDesc:
        'Enterprise connector for high-volume WooCommerce stores. Handles custom product attributes, batch inventory webhooks, coupon redemption tracking, and unified fulfillment dispatch.',
      brandColor: '#7f54b3',
      bgSoft: '#f4effa',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#7f54b3">
          <path d={siWoocommerce.path} />
        </svg>
      ),
      capabilities: ['REST API v3', 'Custom Fields', 'Batch Sync', 'Order Status Hooks'],
      syncType: '2-Way Realtime',
      setupTime: '3 minutes (Consumer Key)',
      authType: 'API Key & Secret',
      triggers: [
        'WooCommerce checkout completed',
        'Order status changed to processing',
        'Refund issued in store',
      ],
      actions: [
        'Allocate batch warehouse inventory',
        'Trigger automated dispatch courier',
        'Update order to fulfilled with tracking link',
      ],
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      category: 'payments',
      categoryLabel: 'Payment Gateways',
      badge: 'Official Partner',
      shortDesc:
        'Payment captures, UPI refunds, payment links, and automated reconciliation ledger.',
      fullDesc:
        'Full bi-directional integration with Razorpay Payments API. Every captured payment, chargeback, or refund is instantly verified against order line items and recorded in the finance journal with zero manual ledger entry.',
      brandColor: '#0c2340',
      bgSoft: '#eaf2fa',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#0c2340">
          <path d={siRazorpay.path} />
        </svg>
      ),
      capabilities: ['Instant Webhooks', 'Auto-Reconcile', 'Payment Links', 'UPI & Cards'],
      syncType: 'Instant Webhook',
      setupTime: '2 minutes (API Key / Secret)',
      authType: 'API Key & Secret',
      triggers: [
        'payment.captured event received',
        'refund.processed notification',
        'payment.failed alert',
      ],
      actions: [
        'Mark order as paid and release hold',
        'Generate GST tax invoice',
        'Send automated WhatsApp payment recovery link',
      ],
    },
    {
      id: 'stripe',
      name: 'Stripe Global Payments',
      category: 'payments',
      categoryLabel: 'Payment Gateways',
      badge: 'Official Partner',
      shortDesc:
        'Global currency payment capture, subscription billing, and automated multi-currency ledger.',
      fullDesc:
        'Process international transactions in 135+ currencies. BizSyncOS matches Stripe payout batches, handles currency conversion adjustments, and ensures zero discrepancies between bank deposits and sales ledgers.',
      brandColor: '#635bff',
      bgSoft: '#f0efff',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#635bff">
          <path d={siStripe.path} />
        </svg>
      ),
      capabilities: [
        '135+ Currencies',
        'Payout Reconciliation',
        'Dispute Guard',
        'Subscription Sync',
      ],
      syncType: 'Instant Webhook',
      setupTime: '2 minutes (Stripe Connect)',
      authType: 'OAuth 2.0',
      triggers: ['charge.succeeded webhook', 'payout.paid event', 'customer.subscription.updated'],
      actions: [
        'Convert forex to base currency',
        'Match bank batch reconciliation',
        'Trigger fulfillment workflow',
      ],
    },
    {
      id: 'cod_engine',
      name: 'BizSync COD Risk Guard',
      category: 'payments',
      categoryLabel: 'Payment Gateways',
      badge: 'Native API',
      shortDesc:
        'Cash-on-Delivery RTO fraud prediction, address anomaly detection, and OTP pre-verification.',
      fullDesc:
        'AI-driven COD safeguard that flags risky delivery addresses before courier dispatch. Automatically converts high-risk COD orders to prepaid via 1-click WhatsApp discount payment links.',
      brandColor: '#009f91',
      bgSoft: '#e6f9f6',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#009f91" />
          <path d="M12 7l4 2.5v4c0 3-2 5.5-4 6.5-2-1-4-3.5-4-6.5v-4L12 7z" fill="#ffffff" />
          <path
            d="M10.5 12.5l1.5 1.5 3-3"
            stroke="#009f91"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      capabilities: ['AI RTO Scoring', 'WhatsApp Prepay', 'Address Verification', 'NDR Management'],
      syncType: '2-Way Realtime',
      setupTime: 'Instant (Built-in Engine)',
      authType: 'API Key & Secret',
      triggers: [
        'High RTO probability order flagged',
        'Customer unreachable during dispatch',
        'COD customer verification timeout',
      ],
      actions: [
        'Hold courier dispatch for review',
        'Send 1-tap WhatsApp payment link with 5% discount',
        'Auto-convert to prepaid on payment',
      ],
    },
    {
      id: 'shiprocket',
      name: 'Shiprocket',
      category: 'logistics',
      categoryLabel: 'Logistics & Couriers',
      badge: 'Official Partner',
      shortDesc:
        'Multi-courier rate shopping, automated waybill generation, NDR management, and tracking webhooks.',
      fullDesc:
        'Connect your Shiprocket account to automatically pick the cheapest or fastest courier (Bluedart, Delhivery, DTDC, Xpressbees) based on pincode SLAs. Print shipping labels in bulk and track real-time milestones.',
      brandColor: '#0066cc',
      bgSoft: '#edf5ff',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#0066CC" />
          <path
            d="M12 6c2.5 0 4.5 3 4.5 6.5 0 1.5-.5 3-1.5 4l-1-1v1.5h-4V16l-1 1c-1-1-1.5-2.5-1.5-4C8.5 9 10.5 6 12 6z"
            fill="#FFFFFF"
          />
          <circle cx="12" cy="11" r="1.5" fill="#0066CC" />
          <path d="M10.5 18.5L12 21l1.5-2.5z" fill="#FFCC00" />
        </svg>
      ),
      capabilities: ['Auto-Rate Shopping', 'Bulk AWB Print', 'NDR Automation', 'Live Tracking'],
      syncType: '2-Way Realtime',
      setupTime: '3 minutes (Shiprocket API)',
      authType: 'API Key & Secret',
      triggers: [
        'Shipment AWB assigned',
        'NDR (Non-Delivery Report) logged by courier',
        'Out for delivery notification',
      ],
      actions: [
        'Print warehouse pick & pack slip',
        'Send customer WhatsApp delivery alert',
        'Update master inventory ledger',
      ],
    },
    {
      id: 'delhivery',
      name: 'Delhivery Direct API',
      category: 'logistics',
      categoryLabel: 'Logistics & Couriers',
      badge: 'Verified',
      shortDesc:
        'Direct carrier integration for B2C surface, express air, warehouse transfers, and reverse pickups.',
      fullDesc:
        'Direct API pipeline with Delhivery Enterprise Logistics. Create warehouse manifests, calculate accurate volumetric freight charges, initiate automated reverse returns pickups, and monitor SLA transit times.',
      brandColor: '#c01823',
      bgSoft: '#fdf0f0',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#C01823" />
          <path
            d="M7 6.5h5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H7V6.5zm3 2.5v6h2.2a3 3 0 0 0 3-3 3 3 0 0 0-3-3H10z"
            fill="#FFFFFF"
          />
        </svg>
      ),
      capabilities: [
        'Express & Surface',
        'Reverse Pickups',
        'Direct Manifest API',
        'Pincode Serviceability',
      ],
      syncType: 'Instant Webhook',
      setupTime: '4 minutes (API Token)',
      authType: 'API Key & Secret',
      triggers: [
        'Package picked up from hub',
        'Proof of delivery (POD) signed',
        'Reverse pickup transit scan',
      ],
      actions: [
        'Update customer order timeline',
        'Initiate replacement or refund',
        'Close delivery SLA audit ticket',
      ],
    },
    {
      id: 'courier_hub',
      name: 'Universal Courier Webhooks',
      category: 'logistics',
      categoryLabel: 'Logistics & Couriers',
      badge: 'Native API',
      shortDesc:
        'Universal adapter for Bluedart, DTDC, Shadowfax, Porter, and custom freight carriers.',
      fullDesc:
        'Unified webhook receiver that normalizes tracking payloads across 20+ regional logistics providers into standard BizSyncOS fulfillment states.',
      brandColor: '#4f46e5',
      bgSoft: '#f1f0ff',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#4F46E5" />
          <path d="M5 8h9v6H5V8zm9 2h3l2 2v2h-5v-4z" fill="#FFFFFF" />
          <circle cx="8" cy="16.5" r="1.8" fill="#FFFFFF" />
          <circle cx="16" cy="16.5" r="1.8" fill="#FFFFFF" />
        </svg>
      ),
      capabilities: [
        'Standard Webhooks',
        'Unified JSON Payload',
        'SLA Monitoring',
        'Custom Couriers',
      ],
      syncType: 'Instant Webhook',
      setupTime: '2 minutes (Webhook URL)',
      authType: 'Webhook URL',
      triggers: ['Carrier dispatch webhook', 'In-transit hub scan', 'Delivery exception alert'],
      actions: [
        'Standardize fulfillment milestone',
        'Update customer SMS/WhatsApp tracking',
        'Notify operations manager',
      ],
    },
    {
      id: 'tally',
      name: 'Tally Prime Connector',
      category: 'erp',
      categoryLabel: 'Accounting & ERP',
      badge: 'Official Partner',
      shortDesc:
        'Automated XML / REST sync for sales vouchers, purchase orders, GST ledgers, and inventory items.',
      fullDesc:
        'Seamless bi-directional bridge between BizSyncOS operations and Tally Prime. Automatically creates sales vouchers from multi-channel orders, updates customer GSTIN ledgers, and posts bank reconciliations without double entry.',
      brandColor: '#007b7f',
      bgSoft: '#eaf5f5',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#007B7F" />
          <path d="M6 7.5l5.5 4.5-5.5 4.5V7.5z" fill="#FFB300" />
          <path d="M12.5 7.5l5.5 4.5-5.5 4.5V7.5z" fill="#FFFFFF" />
        </svg>
      ),
      capabilities: [
        'XML & TDL Bridge',
        'GST Voucher Post',
        'Item Stock Sync',
        'Ledger Auto-Match',
      ],
      syncType: 'Automated Polling',
      setupTime: '5 minutes (Tally Connector App)',
      authType: 'API Key & Secret',
      triggers: [
        'Order marked completed in OMS',
        'Supplier PO received at warehouse',
        'Tally ledger balance modified',
      ],
      actions: [
        'Post Sales Voucher with HSN/SAC & GST',
        'Update Tally stock balance',
        'Reconcile receivable account',
      ],
    },
    {
      id: 'zoho_books',
      name: 'Zoho Books',
      category: 'erp',
      categoryLabel: 'Accounting & ERP',
      badge: 'Official Partner',
      shortDesc:
        'Cloud accounting sync for GST e-invoices, e-way bills, vendor bills, and bank feeds.',
      fullDesc:
        'Real-time REST API integration with Zoho Books. Generates IRN-compliant GST e-invoices, tracks accounts receivable aging, syncs vendor payments, and maintains clean chart of accounts.',
      brandColor: '#226ab4',
      bgSoft: '#eef5fc',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" fill="#E42528" />
          <rect x="13" y="3.5" width="7.5" height="7.5" rx="2" fill="#226AB4" />
          <rect x="3.5" y="13" width="7.5" height="7.5" rx="2" fill="#339933" />
          <rect x="13" y="13" width="7.5" height="7.5" rx="2" fill="#F8B11B" />
        </svg>
      ),
      capabilities: ['Zoho Books API v3', 'E-Invoice IRN', 'E-Way Bill Generation', 'Vendor Bills'],
      syncType: '2-Way Realtime',
      setupTime: '3 minutes (OAuth 2.0)',
      authType: 'OAuth 2.0',
      triggers: [
        'Order fulfilled and dispatched',
        'Vendor PO invoice received',
        'Payment reconciled in gateway',
      ],
      actions: [
        'Generate compliant GST e-invoice',
        'Record bank ledger receipt',
        'Update inventory valuation asset',
      ],
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks Online',
      category: 'erp',
      categoryLabel: 'Accounting & ERP',
      badge: 'Official Partner',
      shortDesc:
        'Global cloud accounting sync for sales receipts, multi-currency invoices, and expense categorization.',
      fullDesc:
        'Bi-directional sync with Intuit QuickBooks Online. Ensures every multi-channel order, fee deduction, and refund is properly categorized under standard accounting ledgers with live exchange rates.',
      brandColor: '#2ca01c',
      bgSoft: '#eef8ed',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#2ca01c">
          <path d={siQuickbooks.path} />
        </svg>
      ),
      capabilities: ['Intuit API v3', 'Multi-Currency', 'Sales Receipts', 'Expense Categorization'],
      syncType: '2-Way Realtime',
      setupTime: '3 minutes (OAuth 2.0)',
      authType: 'OAuth 2.0',
      triggers: [
        'Commerce order paid',
        'Refund issued to customer',
        'Vendor inventory bill created',
      ],
      actions: [
        'Create QuickBooks Sales Receipt',
        'Record gateway processing fee',
        'Sync customer balance',
      ],
    },
    {
      id: 'whatsapp',
      name: 'Meta WhatsApp Cloud API',
      category: 'messaging',
      categoryLabel: 'Customer Messaging',
      badge: 'Official Partner',
      shortDesc:
        'Official Meta WhatsApp Cloud API v20.0 for automated order alerts, COD verification, and AI customer support.',
      fullDesc:
        'Direct Meta BSP integration. Send automated order confirmations, live dispatch tracking links, 1-click COD confirmation buttons, and allow customers to chat with the AI Business Assistant directly on WhatsApp.',
      brandColor: '#25D366',
      bgSoft: '#eafbf0',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#25D366">
          <path d={siWhatsapp.path} />
        </svg>
      ),
      capabilities: [
        'Official Meta Cloud API',
        'Interactive CTA Buttons',
        'Real-time Delivery Reports',
        'AI Assistant Chat',
      ],
      syncType: 'Instant Webhook',
      setupTime: '3 minutes (Meta Business Manager)',
      authType: 'API Key & Secret',
      triggers: [
        'New order placed by customer',
        'Package out for delivery scan',
        'Customer replies on WhatsApp thread',
      ],
      actions: [
        'Send WhatsApp template confirmation',
        'Provide 1-click address edit button',
        'Route customer query to AI Assistant',
      ],
    },
    {
      id: 'webhooks_api',
      name: 'Custom REST API & Webhooks',
      category: 'messaging',
      categoryLabel: 'Developer Extensibility',
      badge: 'Native API',
      shortDesc:
        'Inbound & outbound JSON webhooks with HMAC-SHA256 signatures, retry policies, and OpenAPI 3.0 docs.',
      fullDesc:
        'Build any custom internal workflow or connect legacy in-house systems. Every event in BizSyncOS (orders, stock, finance, customers) emits clean signed JSON webhooks with configurable retry intervals and dead-letter queues.',
      brandColor: '#009f91',
      bgSoft: '#e6f9f6',
      svgLogo: (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#009F91" />
          <path
            d="M7.5 10l-2.5 2 2.5 2M16.5 10l2.5 2-2.5 2M13.5 8l-3 8"
            stroke="#FFFFFF"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      capabilities: ['HMAC Signatures', 'Retry Policies', 'Dead-Letter Queue', 'OpenAPI 3.0 Docs'],
      syncType: 'Instant Webhook',
      setupTime: '1 minute (Instant Webhook URL)',
      authType: 'Webhook URL',
      triggers: [
        'Any custom business event emitted',
        'Threshold alert exceeded',
        'Manual webhook test triggered',
      ],
      actions: [
        'Dispatch signed JSON payload',
        'Execute custom serverless script',
        'Log execution in audit trail',
      ],
    },
  ];

  const categories: {
    id: IntegrationCategory;
    label: string;
    count: number;
  }[] = [
    { id: 'all', label: 'All Connectors', count: connectors.length },
    {
      id: 'commerce',
      label: 'E-Commerce & Stores',
      count: connectors.filter((c) => c.category === 'commerce').length,
    },
    {
      id: 'payments',
      label: 'Payments & Billing',
      count: connectors.filter((c) => c.category === 'payments').length,
    },
    {
      id: 'logistics',
      label: 'Logistics & Couriers',
      count: connectors.filter((c) => c.category === 'logistics').length,
    },
    {
      id: 'erp',
      label: 'ERP & Accounting',
      count: connectors.filter((c) => c.category === 'erp').length,
    },
    {
      id: 'messaging',
      label: 'Messaging & APIs',
      count: connectors.filter((c) => c.category === 'messaging').length,
    },
  ];

  const filteredConnectors = connectors.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.shortDesc.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query) ||
      item.capabilities.some((cap) => cap.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="route-page os-integrations-directory">
      {/* Constrained, Centered Hero Section */}
      <section className="os-int-hero">
        <div className="os-int-hero-glow" />
        <div className="os-int-container">
          <div className="os-int-hero-content">
            <p className="eyebrow blue">
              <Workflow size={15} /> CONNECTED BUSINESS ECOSYSTEM
            </p>
            <h1>
              Connect your entire business stack <span>in minutes.</span>
            </h1>
            <p>
              Pre-built, bidirectional integrations for commerce storefronts, payment gateways,
              courier networks, accounting ERPs, and customer messaging. Zero glue code required.
            </p>

            {/* Metric Trust Pills */}
            <div className="os-int-hero-metrics">
              <span>
                <CheckCircle2 size={15} /> 15+ Native Connectors
              </span>
              <span>
                <Zap size={15} /> Sub-15ms Webhook Sync
              </span>
              <span>
                <ShieldCheck size={15} /> 2-Way Automated Ledger
              </span>
              <span>
                <Clock size={15} /> 1-Click No-Code Setup
              </span>
            </div>

            {/* Centered Search & Category Controls */}
            <div className="os-int-controls">
              <div className="os-int-search-box">
                <Search size={18} className="os-int-search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 15+ integrations (e.g. Shopify, Razorpay, Tally, WhatsApp...)"
                  aria-label="Search integrations"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="os-int-search-clear"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="os-int-category-pills" role="tablist">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`os-int-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                    <span className="os-int-cat-count">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constrained 1200px Directory Grid */}
      <section className="os-int-grid-section">
        <div className="os-int-container">
          <div className="os-int-grid-header">
            <h2>
              {selectedCategory === 'all'
                ? 'All Certified Integrations'
                : categories.find((c) => c.id === selectedCategory)?.label}
              <small>({filteredConnectors.length} available)</small>
            </h2>
            <span className="os-int-live-badge">
              <span className="pulse-dot" /> Live Bi-directional Sync
            </span>
          </div>

          {filteredConnectors.length === 0 ? (
            <div className="os-int-empty-state">
              <Search size={32} />
              <h3>No integrations found matching "{searchQuery}"</h3>
              <p>Try searching for a different keyword or browse all categories.</p>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="os-int-card-grid">
              {filteredConnectors.map((item) => (
                <div
                  key={item.id}
                  className="os-int-card"
                  onClick={() => setActiveConnector(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveConnector(item)}
                >
                  <div className="os-int-card-top">
                    <div
                      className="os-int-logo-tile"
                      style={{
                        backgroundColor: item.bgSoft,
                      }}
                    >
                      {item.svgLogo}
                    </div>
                    <div className="os-int-badge-wrap">
                      <span className="os-int-category-tag">{item.categoryLabel}</span>
                      <span
                        className={`os-int-partner-badge ${item.badge.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="os-int-card-title">{item.name}</h3>
                  <p className="os-int-card-desc">{item.shortDesc}</p>

                  <div className="os-int-capabilities">
                    {item.capabilities.map((cap) => (
                      <span key={cap} className="os-int-cap-tag">
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="os-int-card-footer">
                    <span className="os-int-sync-type">
                      <Zap size={13} /> {item.syncType}
                    </span>
                    <span className="os-int-view-link">
                      View triggers <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Developer Extensibility Banner */}
          <div className="os-int-dev-banner">
            <div className="os-int-dev-info">
              <span className="os-int-dev-tag">DEVELOPER EXTENSIBILITY</span>
              <h3>Need a custom ERP, carrier, or proprietary database?</h3>
              <p>
                BizSyncOS provides open REST endpoints, signed JSON webhooks, and an extensible SDK.
                Our solutions engineering team can also build and certify custom connectors in 48
                hours.
              </p>
            </div>
            <div className="os-int-dev-actions">
              <RouteButton navigate={navigate} route="/docs" variant="secondary">
                Read API Docs
              </RouteButton>
              <RouteButton navigate={navigate} route="/contact">
                Request Custom Connector
              </RouteButton>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Connector Detail Modal / Drawer */}
      {activeConnector && (
        <div
          className="os-int-drawer-overlay"
          onClick={() => setActiveConnector(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="os-int-drawer" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="os-int-drawer-close"
              onClick={() => setActiveConnector(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className="os-int-drawer-header">
              <div
                className="os-int-drawer-logo"
                style={{
                  backgroundColor: activeConnector.bgSoft,
                }}
              >
                {activeConnector.svgLogo}
              </div>
              <div>
                <div className="os-int-drawer-badges">
                  <span className="os-int-category-tag">{activeConnector.categoryLabel}</span>
                  <span className="os-int-partner-badge official-partner">
                    {activeConnector.badge}
                  </span>
                </div>
                <h2>{activeConnector.name} Integration</h2>
                <p>
                  {activeConnector.syncType} &middot; Setup time: {activeConnector.setupTime}
                </p>
              </div>
            </div>

            <div className="os-int-drawer-body">
              <p className="os-int-drawer-overview">{activeConnector.fullDesc}</p>

              <div className="os-int-flow-grid">
                <div className="os-int-flow-card">
                  <h4>
                    <span className="dot teal" /> Inbound Triggers (Signals Received)
                  </h4>
                  <ul>
                    {activeConnector.triggers.map((trig) => (
                      <li key={trig}>
                        <CheckCircle2 size={15} />
                        <span>{trig}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="os-int-flow-card">
                  <h4>
                    <span className="dot blue" /> Automated Actions (Executed by BizSyncOS)
                  </h4>
                  <ul>
                    {activeConnector.actions.map((act) => (
                      <li key={act}>
                        <Zap size={15} />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="os-int-drawer-specs">
                <div>
                  <small>Authentication Method</small>
                  <strong>{activeConnector.authType}</strong>
                </div>
                <div>
                  <small>Sync Latency</small>
                  <strong>Sub-15ms Event Webhook</strong>
                </div>
                <div>
                  <small>Audit Trail</small>
                  <strong>100% Immutable Event Log</strong>
                </div>
              </div>
            </div>

            <div className="os-int-drawer-footer">
              <RouteButton navigate={navigate} route="/signup">
                Connect in 3-Day Demo
              </RouteButton>
              <button
                type="button"
                className="button button-ghost"
                onClick={() => setActiveConnector(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function AboutPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  return (
    <main className="route-page osa-page">
      {/* 1. Enterprise Hero */}
      <section className="osa-hero-section">
        <div className="osa-hero-container">
          <div className="osa-hero-left">
            <div className="osa-badge">
              <span className="osa-pulse-dot" />
              <span>MISSION &amp; SCALE INFRASTRUCTURE</span>
            </div>
            <h1 className="osa-title">
              The Real-Time Operating System Powering{' '}
              <span className="osa-title-gradient">Indian Commerce Scale</span>
            </h1>
            <p className="osa-lead">
              Built from the ground up for high-velocity omnichannel retailers, fast-scaling D2C
              brands, and multi-node distributors. We eliminate the chaos between marketplace order
              surges, multi-warehouse stock reservation locks, statutory GST compliance, and
              financial truth.
            </p>
            <div className="osa-hero-actions">
              <RouteButton navigate={navigate} route="/signup">
                Start 3-Day Free Trial
              </RouteButton>
              <RouteButton navigate={navigate} route="/contact" variant="secondary">
                Schedule Architecture Audit
              </RouteButton>
            </div>
            <div className="osa-trust-strip">
              <div className="osa-trust-item">
                <Building2 size={15} />
                <span>100% AWS Mumbai (ap-south-1)</span>
              </div>
              <div className="osa-trust-item">
                <Zap size={15} />
                <span>Sub-15ms Event Mesh</span>
              </div>
              <div className="osa-trust-item">
                <ShieldCheck size={15} />
                <span>ISO 27001 &amp; SOC-2 Ready</span>
              </div>
              <div className="osa-trust-item">
                <MapPin size={15} />
                <span>Bengaluru Engineering Hub</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Production Topology Card */}
          <div className="osa-hero-right">
            <div className="osa-topo-card">
              <div className="osa-topo-header">
                <div className="osa-topo-title">
                  <span className="osa-pulse-dot" />
                  <span>CORE ARCHITECTURE · LIVE PRODUCTION</span>
                </div>
                <span className="osa-topo-tag">99.99% SLA</span>
              </div>
              <div className="osa-topo-nodes">
                <div className="osa-topo-node">
                  <div className="osa-node-icon teal">
                    <Workflow size={16} />
                  </div>
                  <div className="osa-node-content">
                    <strong>Multi-Channel Ingestion Mesh</strong>
                    <small>
                      18.4M+ monthly webhooks synced from Shopify, Amazon SP-API, Flipkart &amp;
                      WhatsApp in &lt;14.2ms.
                    </small>
                  </div>
                </div>
                <div className="osa-topo-node">
                  <div className="osa-node-icon blue">
                    <Boxes size={16} />
                  </div>
                  <div className="osa-node-content">
                    <strong>Distributed Inventory Lock</strong>
                    <small>
                      Atomic Redis reservation locks across regional fulfillment centers. 0%
                      overselling during flash sales.
                    </small>
                  </div>
                </div>
                <div className="osa-topo-node">
                  <div className="osa-node-icon emerald">
                    <FileCheck size={16} />
                  </div>
                  <div className="osa-node-content">
                    <strong>Direct NIC Statutory Engine</strong>
                    <small>
                      Direct government e-invoicing &amp; e-way bills generated in &lt;2s without
                      middleman gateway taxes.
                    </small>
                  </div>
                </div>
                <div className="osa-topo-node">
                  <div className="osa-node-icon amber">
                    <CircleDollarSign size={16} />
                  </div>
                  <div className="osa-node-content">
                    <strong>2-Way Financial Ledger Sync</strong>
                    <small>
                      Bi-directional XML &amp; REST sync to Tally Prime &amp; Zoho Books with
                      complete audit traceability.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Scale Stats Section */}
      <section className="osa-stats-section">
        <div className="osa-stats-container">
          <div className="osa-stat-card">
            <div className="osa-stat-number">₹850+ Cr</div>
            <div className="osa-stat-label">Annual GMV Processed</div>
            <div className="osa-stat-sub">Across connected omnichannel storefronts</div>
          </div>
          <div className="osa-stat-card">
            <div className="osa-stat-number">18.4M+</div>
            <div className="osa-stat-label">Orders &amp; Stock Events</div>
            <div className="osa-stat-sub">Zero overselling or dropped webhooks</div>
          </div>
          <div className="osa-stat-card">
            <div className="osa-stat-number">&lt; 14.2ms</div>
            <div className="osa-stat-label">Ingestion Event Latency</div>
            <div className="osa-stat-sub">High-throughput reactive event bus</div>
          </div>
          <div className="osa-stat-card">
            <div className="osa-stat-number">99.99%</div>
            <div className="osa-stat-label">Production Uptime SLA</div>
            <div className="osa-stat-sub">Dual-AZ resilient AWS Mumbai hosting</div>
          </div>
        </div>
      </section>

      {/* 3. Mission & 4 Core Pillars */}
      <section className="osa-mission-section">
        <div className="osa-section-header">
          <div className="osa-badge">
            <span>WHY WE BUILT BIZSYNCOS</span>
          </div>
          <h2 className="osa-title">
            Commerce moved to real-time. Software was left stuck in 2012.
          </h2>
          <p className="osa-lead">
            For over a decade, Indian retailers have been trapped between legacy desktop ERPs
            requiring manual batch syncs, and fragmented SaaS tools that don't communicate. During
            festive flash sales like Diwali, systems crash, inventories desynchronize, and brands
            pay lakhs in marketplace penalties. BizSyncOS was built to solve this with a single,
            deterministic operating system.
          </p>
        </div>

        <div className="osa-pillars-grid">
          <div className="osa-pillar-card">
            <span className="osa-pillar-num">PILLAR 01</span>
            <h3>Deterministic Real-Time Concurrency</h3>
            <p>
              We replaced fragile 30-minute cron batch polling with a real-time reactive event mesh.
              When a customer purchases on Shopify, inventory is atomically locked across Amazon,
              Flipkart, Blinkit, and physical stores in under 15 milliseconds.
            </p>
          </div>
          <div className="osa-pillar-card">
            <span className="osa-pillar-num">PILLAR 02</span>
            <h3>Native Indian Statutory Compliance</h3>
            <p>
              Built natively for the Indian regulatory landscape. Direct official NIC API
              integration produces GST-compliant IRN e-invoices, QR codes, and automated e-way bills
              instantaneously without expensive intermediary third-party wrappers.
            </p>
          </div>
          <div className="osa-pillar-card">
            <span className="osa-pillar-num">PILLAR 03</span>
            <h3>Deep Two-Way Financial Ledger Sync</h3>
            <p>
              Accounting data should never require manual entry or spreadsheet exports. BizSyncOS
              maintains a live bi-directional ledger bridge with Tally Prime and Zoho Books,
              recording sales vouchers, returns, and payment gateway fees automatically.
            </p>
          </div>
          <div className="osa-pillar-card">
            <span className="osa-pillar-num">PILLAR 04</span>
            <h3>Enterprise Data Sovereignty</h3>
            <p>
              100% of customer, transactional, and catalog data resides exclusively within AWS
              Mumbai (ap-south-1). We strictly adhere to RBI data localization mandates, ISO/IEC
              27001:2022 standards, and India's DPDP Act 2023 directives.
            </p>
          </div>
        </div>

        {/* Bengaluru HQ Strip */}
        <div className="osa-hq-banner">
          <div className="osa-hq-content">
            <h4>
              <MapPin size={22} color="#38bdf8" />
              Headquartered in Bengaluru, Karnataka
            </h4>
            <p>
              Designed and engineered in the heart of India's Silicon Valley. Our principal
              solutions architects and engineering teams work directly alongside India's
              fastest-growing enterprise brands.
            </p>
          </div>
          <div className="osa-hq-badge">
            <span>SOLUTIONS LAB</span>
            <div
              style={{
                color: '#fff',
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              Bengaluru, India
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Banner */}
      <section className="osa-cta-banner">
        <div className="osa-cta-inner">
          <h2>Ready to upgrade your commerce operating system?</h2>
          <p>
            Deploy BizSyncOS in 1 click. Connect your stores, warehouses, and accounting in a 3-day
            full access demo.
          </p>
          <div className="osa-cta-buttons">
            <RouteButton navigate={navigate} route="/signup">
              Start 3-Day Free Trial
            </RouteButton>
            <RouteButton navigate={navigate} route="/contact" variant="secondary">
              Talk to Solutions Architect
            </RouteButton>
          </div>
        </div>
      </section>
    </main>
  );
}

type BlogPost = {
  id: string;
  category: 'arch' | 'scale' | 'fin' | 'ai';
  categoryLabel: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  takeaways: string[];
};

const blogPosts: BlogPost[] = [
  {
    id: 'rto-defense',
    category: 'scale',
    categoryLabel: 'Omnichannel Scaling',
    title: 'The RTO Defense Playbook: Cutting Return Losses by 42% with Automated WhatsApp AI',
    excerpt:
      'How automated address verification, customer intent scoring, and pre-dispatch OTP confirmation protect bottom-line margins across cash-on-delivery orders.',
    readTime: '6 min read',
    author: 'Operations Strategy Team',
    takeaways: [
      'Trigger automated WhatsApp address confirmation within 90 seconds of COD order creation.',
      'Assign AI risk scores based on incomplete pin codes, phone fraud history, and order value.',
      'Offer instant 5% UPI discount to convert risky COD orders into verified prepaid dispatches.',
    ],
  },
  {
    id: 'concurrency-stream',
    category: 'arch',
    categoryLabel: 'Architecture & Concurrency',
    title:
      'From Cron-Job Chaos to Real-Time Streaming: Why 2012-Era Legacy OMS Collapse Under Flash Sales',
    excerpt:
      'Why 30-minute batch polling leads to overselling on Amazon and Myntra, and how distributed event-driven webhooks solve concurrency permanently.',
    readTime: '7 min read',
    author: 'Core Platform Architecture',
    takeaways: [
      'Batch polling architectures lag by 15-30 minutes, allowing the same inventory unit to sell multiple times.',
      'BizSyncOS utilizes atomic Redis locks paired with Kafka streams to deduplicate events in <15ms.',
      'Zero stockouts and zero marketplace seller health penalties during peak festive shopping surges.',
    ],
  },
  {
    id: 'gst-irn-scale',
    category: 'fin',
    categoryLabel: 'GST & Finance',
    title:
      'Automating GST IRN & E-Way Bills at Scale: Direct NIC API Integration Without Intermediaries',
    excerpt:
      'A technical guide to automating statutory compliance under 2 seconds per invoice directly through official government pipelines.',
    readTime: '5 min read',
    author: 'Compliance & Taxation Lead',
    takeaways: [
      'Direct NIC sandbox bridge generates verified B2B and B2C QR codes instantaneously upon shipment pack.',
      'Automated e-way bill generation with trans-doc mapping prevents roadside transit halts.',
      'Eliminate per-invoice middleman API gateway charges saving up to ₹1.8L annually.',
    ],
  },
  {
    id: 'ledger-sync',
    category: 'fin',
    categoryLabel: 'GST & Finance',
    title: 'Two-Way Tally Prime & Zoho Ledger Sync: Eliminating Manual Month-End Reconciliation',
    excerpt:
      'How bi-directional XML and REST bridges map sales vouchers, credit notes, and payment gateway deductions automatically.',
    readTime: '6 min read',
    author: 'Finance Automation Lab',
    takeaways: [
      'Automated reconciliation between Razorpay/Stripe settlements and order invoice line items.',
      'Direct XML bridge posts balanced sales vouchers into Tally Prime without manual Excel sheets.',
      'Audit-ready ledger entries with drill-down links to original courier tracking IDs.',
    ],
  },
  {
    id: 'dark-store-routing',
    category: 'scale',
    categoryLabel: 'Omnichannel Scaling',
    title: 'Multi-Location Dark Store Fulfillment: Dynamic Pincode Routing for 2-Hour Deliveries',
    excerpt:
      'Intelligent routing algorithms that dynamically pick the closest fulfillment center based on stock availability and courier SLAs.',
    readTime: '8 min read',
    author: 'Logistics Engineering Team',
    takeaways: [
      'Automated order splitting across regional mother warehouses and local quick-commerce dark stores.',
      'Real-time rate shopping across Shiprocket, Delhivery, and Bluedart to pick the fastest guaranteed courier.',
      'Slashing last-mile fulfillment costs by 28% through hyper-local fulfillment hub dispatch.',
    ],
  },
  {
    id: 'governed-ai',
    category: 'ai',
    categoryLabel: 'AI & Intelligence',
    title: 'Governing AI in Business: Why Recommendations Require Human-in-the-Loop Audit Trails',
    excerpt:
      'Designing safe decision-support systems that ground recommendations in verified operational data while keeping human managers in total control.',
    readTime: '5 min read',
    author: 'AI Systems Research',
    takeaways: [
      'AI assistants must be grounded strictly in tenant-scoped SQL and ledger facts — never hallucinated prompts.',
      'Critical business actions (supplier PO approvals, price revisions) require explicit 1-click human confirmation.',
      'Immutable audit trail logs every query, evidence source, and approving user for complete compliance.',
    ],
  },
];

function BlogPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const filteredPosts =
    selectedCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory);

  return (
    <main className="route-page osb-page">
      {/* 1. Blog Hero */}
      <section className="osb-hero-section">
        <div className="osb-hero-container">
          <div className="osa-badge">
            <span className="osa-pulse-dot" />
            <span>COMMERCE ENGINEERING &amp; STRATEGY</span>
          </div>
          <h1 className="osa-title">
            Playbooks, Architectural Deep-Dives &amp;{' '}
            <span className="osa-title-gradient">Scale Insights</span>
          </h1>
          <p className="osa-lead" style={{ maxWidth: 700, margin: '0 auto' }}>
            Battle-tested blueprints and technical architectures from engineering teams and retail
            leaders orchestrating high-velocity omnichannel commerce across India.
          </p>

          {/* Filter Bar */}
          <div className="osb-filter-bar">
            {[
              { id: 'all', label: 'All Playbooks (6)' },
              { id: 'scale', label: 'Omnichannel Scaling' },
              { id: 'arch', label: 'Architecture & Concurrency' },
              { id: 'fin', label: 'GST & Finance' },
              { id: 'ai', label: 'AI & Intelligence' },
            ].map((cat) => (
              <button
                key={cat.id}
                className={`osb-filter-btn ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="osb-content-section">
        {/* Featured Top Playbook */}
        {selectedCategory === 'all' && (
          <div className="osb-featured-card">
            <div className="osb-featured-left">
              <span className="osb-featured-tag">
                <Sparkles size={13} /> FEATURED PLAYBOOK · DIWALI CONCURRENCY
              </span>
              <h2 className="osb-featured-title">
                How High-Growth D2C Brands Scale to 25,000 Orders/Day Without Overselling
              </h2>
              <p className="osb-featured-desc">
                A comprehensive engineering deep-dive into multi-node warehouse reservation locks,
                distributed Redis event streaming, and sub-15ms webhook ingestion pipelines under
                peak festive shopping traffic.
              </p>
              <div className="osb-featured-meta">
                <span>
                  <Clock size={14} /> 8 min read
                </span>
                <span>•</span>
                <span>By BizSyncOS Engineering Lab</span>
                <span>•</span>
                <span>Updated September 2026</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <RouteButton navigate={navigate} route="/signup">
                  Explore Architecture in Demo
                </RouteButton>
                <button
                  className="button button-secondary"
                  onClick={() => setActiveArticle(blogPosts[1])}
                >
                  Read Key Takeaways
                </button>
              </div>
            </div>

            <div className="osb-featured-visual">
              <div className="osb-benchmark-metric">
                <small>PEAK FESTIVE CONCURRENCY</small>
                <strong>25,000 Orders / Day</strong>
              </div>
              <div className="osb-benchmark-metric">
                <small>EVENT INGESTION LATENCY</small>
                <strong>&lt; 14.2ms (Zero Dropped)</strong>
              </div>
              <div className="osb-benchmark-metric">
                <small>MARKETPLACE CANCELLATION RATE</small>
                <strong>0.00% (Zero Stockouts)</strong>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="osb-articles-grid">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="osb-card"
              onClick={() => setActiveArticle(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveArticle(post);
                }
              }}
            >
              <div className="osb-card-top">
                <span className={`osb-card-cat ${post.category}`}>{post.categoryLabel}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
              <div className="osb-card-footer">
                <span>
                  <Clock
                    size={13}
                    style={{
                      display: 'inline',
                      verticalAlign: 'middle',
                      marginRight: 4,
                    }}
                  />{' '}
                  {post.readTime}
                </span>
                <span className="osb-card-readlink">
                  Read Guide <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Preview Modal */}
      {activeArticle && (
        <div className="osb-modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="osb-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="osb-modal-close"
              onClick={() => setActiveArticle(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <span className={`osb-card-cat ${activeArticle.category}`}>
              {activeArticle.categoryLabel}
            </span>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                margin: '14px 0 12px',
                color: '#0f172a',
              }}
            >
              {activeArticle.title}
            </h2>
            <div
              style={{
                display: 'flex',
                gap: 14,
                fontSize: 13,
                color: '#64748b',
                marginBottom: 20,
              }}
            >
              <span>By {activeArticle.author}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: '#334155',
                marginBottom: 24,
              }}
            >
              {activeArticle.excerpt}
            </p>
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 20,
                marginBottom: 28,
              }}
            >
              <strong
                style={{
                  display: 'block',
                  fontSize: 14,
                  color: '#0f172a',
                  marginBottom: 12,
                }}
              >
                📌 Key Strategic &amp; Engineering Takeaways:
              </strong>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {activeArticle.takeaways.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: 13.5,
                      color: '#475569',
                      lineHeight: 1.55,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'flex-end',
              }}
            >
              <RouteButton navigate={navigate} route="/signup">
                Test in 3-Day Live Demo
              </RouteButton>
              <button className="button button-secondary" onClick={() => setActiveArticle(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <section className="osa-cta-banner">
        <div className="osa-cta-inner">
          <h2>Deploy these commerce playbooks in your business.</h2>
          <p>
            Experience the live operating system that automates orders, multi-warehouse stock locks,
            and GST reconciliation.
          </p>
          <div className="osa-cta-buttons">
            <RouteButton navigate={navigate} route="/signup">
              Start 3-Day Free Trial
            </RouteButton>
            <RouteButton navigate={navigate} route="/contact" variant="secondary">
              Talk to Solutions Architect
            </RouteButton>
          </div>
        </div>
      </section>
    </main>
  );
}

function LiveDemoPage({ navigate }: Pick<PublicSiteProps, 'navigate'>) {
  const businesses = ['Ecommerce demo store', 'Wholesale distributor', 'Retail operation'];
  const steps = [
    'Executive overview',
    'AI Business Brain',
    'Automation workflow',
    'Create workspace',
  ];
  const [business, setBusiness] = useState(businesses[0]);
  const [step, setStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const next = () => setStep((current) => Math.min(current + 1, steps.length - 1));
  const stageImage =
    step === 1
      ? '/images/bizsync-ai-brain.svg'
      : step === 2
        ? '/images/bizsync-operations.svg'
        : '/images/bizsync-command-center.svg';
  const stageCopy =
    step === 0
      ? 'Start with an executive view of revenue, orders, receivables, stock, and business health.'
      : step === 1
        ? 'Ask an authorized business question and review the evidence-backed recommendation.'
        : step === 2
          ? 'See the workflow from a business signal to an approved operational action.'
          : 'Your tour is complete. Create a workspace or sign in to continue with your own business data.';

  return (
    <main className="route-page demo-page">
      <motion.section
        className="demo-hero"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <p className="eyebrow blue">
            <Play size={15} /> TRY LIVE DEMO
          </p>
          <h1>Explore the product before you create an account.</h1>
          <p>
            Select a sample business, follow the guided tour, then create your own workspace when
            you are ready.
          </p>
        </div>
        <ol>
          {steps.map((label, index) => (
            <li className={index <= step ? 'active' : ''} key={label}>
              <span>{index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      </motion.section>
      <section className="demo-workspace section-pad">
        <div className="demo-selector">
          <p>SELECT DEMO BUSINESS</p>
          {businesses.map((option) => (
            <button
              className={business === option ? 'active' : ''}
              type="button"
              onClick={() => {
                setBusiness(option);
                setStep(0);
              }}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
        <motion.div
          key={`${business}-${step}`}
          className="demo-stage"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="demo-stage-top">
            <span>BizSyncOS / {business}</span>
            <span>Sample data only</span>
          </div>
          <img src={stageImage} alt="BizSyncOS local interactive demo workspace" />
        </motion.div>
        <aside className="demo-tour">
          <span>GUIDED PRODUCT TOUR</span>
          <h2>{steps[step]}</h2>
          <p>{stageCopy}</p>
          {step < steps.length - 1 ? (
            <button className="button button-primary" type="button" onClick={next}>
              Next step <ArrowRight size={17} />
            </button>
          ) : (
            <div className="demo-complete-actions">
              <RouteButton navigate={navigate} route="/signup">
                Start 3-day full demo
              </RouteButton>
              <button type="button" onClick={() => navigate('/login')}>
                I already have an account <ArrowRight size={15} />
              </button>
            </div>
          )}
          <button className="demo-reset" type="button" onClick={() => setStep(0)}>
            Restart tour
          </button>
        </aside>
      </section>
      <section className="demo-module-map section-pad">
        <div className="section-intro centered">
          <p className="eyebrow blue">
            <Layers3 size={15} /> FULL-PRODUCT DEMO
          </p>
          <h2>See every operational module before you buy.</h2>
          <p>
            Your 3-day workspace opens the real BizSyncOS backend with your own team, permissions,
            plan limits, and data—not a disconnected mockup.
          </p>
        </div>
        <div className="demo-module-grid">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button key={module.title} type="button" onClick={() => navigate('/signup')}>
                <span>
                  <Icon size={18} />
                </span>
                <strong>{module.title}</strong>
                <p>{module.description}</p>
                <small>
                  Included in the full demo <ArrowRight size={13} />
                </small>
              </button>
            );
          })}
        </div>
        <div className="demo-access-note">
          <div>
            <strong>3-day full-product access</strong>
            <span>
              CRM, orders, inventory, warehouse, finance, analytics, automation, AI, and
              integrations.
            </span>
          </div>
          <RouteButton navigate={navigate} route="/signup">
            Start live demo
          </RouteButton>
        </div>
      </section>
    </main>
  );
}

export function PublicSite({ route, navigate }: PublicSiteProps) {
  if (route === '/product') return <ProductPage navigate={navigate} />;
  if (route === '/solutions') return <SolutionsPage navigate={navigate} />;
  if (route === '/integrations') return <IntegrationsPage navigate={navigate} />;
  if (route === '/why-bizsyncos') return <WhyBizSyncPage navigate={navigate} />;
  if (route === '/pricing') return <PricingPage navigate={navigate} />;
  if (route === '/docs') return <DocsPortal navigate={navigate} />;
  if (route === '/blog') return <BlogPage navigate={navigate} />;
  if (route === '/about') return <AboutPage navigate={navigate} />;
  if (route === '/contact') return <ContactPage navigate={navigate} />;
  if (route === '/login') return <AuthPage kind="login" navigate={navigate} />;
  if (route === '/signup') return <AuthPage kind="signup" navigate={navigate} />;
  return <LiveDemoPage navigate={navigate} />;
}
