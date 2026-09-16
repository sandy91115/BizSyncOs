import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  BrainCircuit,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  ClipboardList,
  Clock,
  Cloud,
  CreditCard,
  FileText,
  Globe2,
  Layers3,
  LockKeyhole,
  Menu,
  MessageSquareText,
  PackageCheck,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  UsersRound,
  Warehouse,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AiChatbotWidget } from './AiChatbotWidget';
import PremiumHome from './PremiumHome';
import { PublicSite, type PublicRoute } from './PublicSite';

const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL ||
  (isLocalHost ? 'http://127.0.0.1:9000' : 'https://crm.cybals.com')
).replace(/\/$/, '');

const directAccessRoutes: Partial<Record<Route, string>> = {};

type Route = PublicRoute;

const publicRoutes: Route[] = [
  '/',
  '/product',
  '/solutions',
  '/integrations',
  '/why-bizsyncos',
  '/pricing',
  '/docs',
  '/blog',
  '/about',
  '/contact',
  '/demo',
  '/login',
  '/signup',
];
const isPublicRoute = (value: string): value is Route => publicRoutes.includes(value as Route);
const legacyRouteRedirects: Record<string, Route> = {
  '/features': '/product',
  '/compare': '/why-bizsyncos',
  '/live-demo': '/signup',
  '/demo': '/signup',
};
const resolvePublicRoute = (pathname: string): Route => {
  const route = legacyRouteRedirects[pathname] ?? pathname;
  return isPublicRoute(route) ? route : '/';
};
const resolveCurrentRoute = (): Route => {
  const route = resolvePublicRoute(window.location.pathname);
  if (window.location.pathname !== route) {
    window.history.replaceState({}, '', route);
  }
  return route;
};

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

const features: Feature[] = [
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
      'Understand sales, operations, finance, inventory, business health, risks, and opportunities.',
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
    icon: Zap,
    title: 'Automation',
    description:
      'Turn repeatable business events into controlled workflows with delays, approvals, and logs.',
    accent: 'indigo',
  },
  {
    icon: MessageSquareText,
    title: 'Marketing',
    description:
      'Build audiences, consent-aware campaigns, attribution, repeat-purchase, and recovery programs.',
    accent: 'orange',
  },
];

const productViews = [
  {
    id: 'executive',
    label: 'Executive',
    metric: 'Business health',
    value: '89',
    description:
      'See revenue, orders, receivables, inventory, risks, and priorities in one focused view.',
  },
  {
    id: 'sales',
    label: 'Sales',
    metric: 'Sales this week',
    value: '328',
    description:
      'Compare pipeline, orders, conversion, and revenue so the sales team knows where to act next.',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    metric: 'Inventory health',
    value: '92%',
    description:
      'Detect stockout risk, reorder needs, and fulfilment blockers before revenue is lost.',
  },
  {
    id: 'finance',
    label: 'Finance',
    metric: 'Receivables due',
    value: '₹4.2L',
    description:
      'Review collections, invoice status, payment exceptions, and cash-flow risks in one workspace.',
  },
  {
    id: 'ai',
    label: 'AI Brain',
    metric: 'AI priorities',
    value: '04',
    description:
      'Surface evidence-backed risks and opportunities, then route the next step for review.',
  },
];

const faqs = [
  {
    q: 'What is BizSyncOS?',
    a: 'BizSyncOS is an AI-powered business operating system that connects customer, commerce, inventory, finance, automation, and intelligence workflows in one platform.',
  },
  {
    q: 'Is onboarding difficult?',
    a: 'No. Start with a guided workspace, selected modules, and the operating workflows your team uses first. Growth and Scale plans add implementation support.',
  },
  {
    q: 'Can I import my data?',
    a: 'Yes. Customer, product, and operational data can be prepared for a guided import from spreadsheets or a previous system.',
  },
  {
    q: 'Does it support multiple warehouses?',
    a: 'Yes. Growth and Scale plans support multi-warehouse operations, allocations, transfers, fulfillment work, and inventory visibility.',
  },
  {
    q: 'Is there an API?',
    a: 'Growth, Scale, and Enterprise plans include governed API access for approved integrations and operational workflows.',
  },
  {
    q: 'How secure is my data?',
    a: 'BizSyncOS includes workspace isolation, role-based access, audit history, encrypted sensitive data, and approval controls built at the product level.',
  },
  {
    q: 'Can I migrate from my current system?',
    a: 'We provide guided migration support for customers moving from spreadsheets, legacy ERP, or disconnected tool sets.',
  },
  {
    q: 'What kind of support do you offer?',
    a: 'All plans include product documentation and community access. Growth and Scale plans include dedicated implementation and success support.',
  },
];

// ===== ANIMATION HOOK =====
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedSection({
  children,
  className = '',
  variant = 'fade-up',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'fade-scale' | 'slide-left' | 'slide-right';
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useInView();
  const cls = `animate-on-scroll ${variant} ${visible ? 'visible' : ''} ${className}`;
  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
}

function AnimatedStagger({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useInView();
  const cls = `stagger-children ${visible ? 'visible' : ''} ${className}`;
  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}

// ===== COUNTER HOOK =====
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, start]);
  return count;
}

function StatItem({
  icon: Icon,
  target,
  label,
  suffix = '',
}: {
  icon: LucideIcon;
  target: number;
  label: string;
  suffix?: string;
}) {
  const { ref, visible } = useInView(0.4);
  const count = useCountUp(target, 2200, visible);
  return (
    <div ref={ref} className={`stat-item ${visible ? 'visible' : ''}`}>
      <div className="stat-icon">
        <Icon size={22} />
      </div>
      <p className="stat-number">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

// ===== COMPONENTS =====

function BrandMark() {
  return (
    <a className="brand" href="/" aria-label="BizSync home">
      <img src="/images/bizsync-logo-transparent.png" alt="BizSync" className="brand-logo-img" />
    </a>
  );
}

function ButtonLink({
  onClick,
  children,
  variant = 'primary',
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  return (
    <button className={`button button-${variant}`} onClick={onClick}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </button>
  );
}

function Header({
  navigate,
  currentRoute,
}: {
  navigate: (route: Route) => void;
  currentRoute: Route;
}) {
  const [openMenu, setOpenMenu] = useState<'resources' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const isActive = (...routes: Route[]) => routes.includes(currentRoute);
  const go = (route: Route) => {
    navigate(route);
    setMobileOpen(false);
    setOpenMenu(null);
  };

  return (
    <header className="site-header">
      {announcementOpen ? (
        <div className="announcement">
          <span>
            <Sparkles size={14} /> New: AI Business Assistant is now live. Smarter insights. Better
            decisions.
          </span>
          <button onClick={() => navigate('/product')}>
            Explore now <ArrowRight size={14} />
          </button>
          <button
            className="announcement-close"
            aria-label="Dismiss announcement"
            onClick={() => setAnnouncementOpen(false)}
          >
            <X size={16} />
          </button>
        </div>
      ) : null}
      <div className="nav-shell">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <button
            className={`nav-link ${isActive('/product') ? 'is-active' : ''}`}
            onClick={() => go('/product')}
            aria-current={isActive('/product') ? 'page' : undefined}
          >
            Product
          </button>
          <button
            className={`nav-link ${isActive('/solutions') ? 'is-active' : ''}`}
            onClick={() => go('/solutions')}
            aria-current={isActive('/solutions') ? 'page' : undefined}
          >
            Solutions
          </button>
          <button
            className={`nav-link ${isActive('/integrations') ? 'is-active' : ''}`}
            onClick={() => go('/integrations')}
            aria-current={isActive('/integrations') ? 'page' : undefined}
          >
            Integrations
          </button>
          <button
            className={`nav-link ${isActive('/why-bizsyncos') ? 'is-active' : ''}`}
            onClick={() => go('/why-bizsyncos')}
            aria-current={isActive('/why-bizsyncos') ? 'page' : undefined}
          >
            Why BizSyncOS
          </button>
          <button
            className={`nav-link ${isActive('/pricing') ? 'is-active' : ''}`}
            onClick={() => go('/pricing')}
            aria-current={isActive('/pricing') ? 'page' : undefined}
          >
            Pricing
          </button>
          <div
            className="nav-dropdown nav-resources"
            onMouseEnter={() => setOpenMenu('resources')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              className={`nav-link ${isActive('/docs', '/blog', '/contact') ? 'is-active' : ''} ${openMenu === 'resources' ? 'is-open' : ''}`}
              onClick={() => setOpenMenu(openMenu === 'resources' ? null : 'resources')}
              aria-expanded={openMenu === 'resources'}
              aria-current={isActive('/docs', '/blog', '/contact') ? 'page' : undefined}
            >
              Resources <ChevronDown size={15} />
            </button>
            {openMenu === 'resources' ? (
              <motion.div
                className="resource-menu"
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18 }}
              >
                <span className="menu-eyebrow">RESOURCES &amp; SUPPORT</span>
                <button onClick={() => go('/docs')}>
                  <FileText size={17} />
                  <span>
                    Documentation
                    <small>Platform setup, catalog ingestion &amp; guides.</small>
                  </span>
                </button>
                <button onClick={() => go('/integrations')}>
                  <Workflow size={17} />
                  <span>
                    API &amp; Webhook Reference
                    <small>REST endpoints, schemas &amp; 15+ connectors.</small>
                  </span>
                </button>
                <button onClick={() => go('/blog')}>
                  <Sparkles size={17} />
                  <span>
                    Retail Insights &amp; Playbooks
                    <small>Omnichannel case studies &amp; scale strategies.</small>
                  </span>
                </button>
                <button onClick={() => go('/contact')}>
                  <MessageSquareText size={17} />
                  <span>
                    Help Center &amp; Support
                    <small>24/7 dedicated support &amp; enterprise advisory.</small>
                  </span>
                </button>
              </motion.div>
            ) : null}
          </div>
        </nav>
        <div className="nav-actions">
          <button
            className="login-link login-button"
            onClick={() => go('/login')}
            aria-current={isActive('/login') ? 'page' : undefined}
          >
            Login
          </button>
          <button className="button button-primary" onClick={() => go('/signup')}>
            Start 3-Day Trial <ArrowRight size={17} />
          </button>
          <button
            className="mobile-menu"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div className="mobile-nav">
          <button
            className={isActive('/product') ? 'is-active' : ''}
            onClick={() => go('/product')}
          >
            Product
          </button>
          <button
            className={isActive('/solutions') ? 'is-active' : ''}
            onClick={() => go('/solutions')}
          >
            Solutions
          </button>
          <button
            className={isActive('/integrations') ? 'is-active' : ''}
            onClick={() => go('/integrations')}
          >
            Integrations
          </button>
          <button
            className={isActive('/pricing') ? 'is-active' : ''}
            onClick={() => go('/pricing')}
          >
            Pricing
          </button>
          <button className={isActive('/docs') ? 'is-active' : ''} onClick={() => go('/docs')}>
            Documentation
          </button>
          <button className={isActive('/blog') ? 'is-active' : ''} onClick={() => go('/blog')}>
            Insights
          </button>
          <button
            className={isActive('/why-bizsyncos') ? 'is-active' : ''}
            onClick={() => go('/why-bizsyncos')}
          >
            Why BizSyncOS
          </button>
          <button className={isActive('/about') ? 'is-active' : ''} onClick={() => go('/about')}>
            About
          </button>
          <button
            className={isActive('/contact') ? 'is-active' : ''}
            onClick={() => go('/contact')}
          >
            Contact
          </button>
          <button className={isActive('/login') ? 'is-active' : ''} onClick={() => go('/login')}>
            Login
          </button>
          <button className="button button-primary" onClick={() => go('/signup')}>
            Start 3-Day Trial <ArrowRight size={17} />
          </button>
        </div>
      ) : null}
    </header>
  );
}

function MetricCard({
  label,
  value,
  trend,
  tone,
}: {
  label: string;
  value: string;
  trend: string;
  tone: string;
}) {
  return (
    <article className={`metric-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{trend}</small>
    </article>
  );
}

// ===== TRUST BAR =====
export function TrustBar() {
  const logos = [
    { initial: 'CRM', name: 'Customer context' },
    { initial: 'OMS', name: 'Orders' },
    { initial: 'INV', name: 'Inventory' },
    { initial: 'WMS', name: 'Warehouse' },
    { initial: 'FIN', name: 'Finance' },
    { initial: 'AI', name: 'Automation' },
  ];
  return (
    <section className="trust-bar">
      <AnimatedSection>
        <p>ONE CONNECTED OPERATING WORKSPACE</p>
        <div className="trust-bar-logos">
          {logos.map((logo) => (
            <span key={logo.initial} className="trust-logo hover-lift">
              <span>{logo.initial}</span> {logo.name}
            </span>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

// ===== STATS SECTION =====
export function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <StatItem icon={Activity} target={3} label="day full demo" />
        <StatItem icon={Award} target={9} label="connected modules" />
        <StatItem icon={UsersRound} target={1} label="shared operating picture" />
        <StatItem
          icon={Clock}
          target={100}
          label="owner approval for high-impact actions"
          suffix="%"
        />
      </div>
    </section>
  );
}

// ===== TESTIMONIALS =====
function TestimonialsSection() {
  const testimonials = [
    {
      text: 'Every customer, order, stock movement, payment, and task should carry the context the next team needs.',
      name: 'Shared context',
      role: 'No duplicate entry or disconnected handoffs',
      color: '#1a73e8',
      initials: '01',
    },
    {
      text: 'Routine work should be triggered, prepared, routed, logged, and approved without relying on memory or spreadsheet follow-ups.',
      name: 'Governed automation',
      role: 'Approvals for finance, stock, and customer impact',
      color: '#0d9488',
      initials: '02',
    },
    {
      text: 'Business questions should be answered from authorised data, with the evidence and next decision visible to the right owner.',
      name: 'Evidence-led intelligence',
      role: 'Grounded analysis before action',
      color: '#7c3aed',
      initials: '03',
    },
  ];
  return (
    <section className="testimonials-section">
      <AnimatedSection
        className="section-intro centered"
        style={
          {
            maxWidth: 640,
            margin: '0 auto',
            textAlign: 'center',
          } as React.CSSProperties
        }
      >
        <p className="eyebrow blue">
          <MessageSquareText size={15} /> THE BIZSYNCOS DIFFERENCE
        </p>
        <h2>Not another tool. A connected operating model.</h2>
        <p>
          The platform is designed to replace fragmented operational work with accountable workflows
          and trusted decisions.
        </p>
      </AnimatedSection>
      <AnimatedStagger className="testimonials-grid">
        {testimonials.map((t) => (
          <article key={t.name} className="testimonial-card hover-lift">
            <p>{t.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar" style={{ background: t.color }}>
                {t.initials}
              </div>
              <div>
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </div>
            </div>
          </article>
        ))}
      </AnimatedStagger>
    </section>
  );
}

export function BusinessHealthSection() {
  const dimensions = [
    ['Sales', 82],
    ['Inventory', 74],
    ['Operations', 88],
    ['Finance', 79],
    ['Customers', 84],
  ];
  return (
    <section className="health-section section-pad">
      <AnimatedSection className="section-intro centered">
        <p className="eyebrow blue">
          <Activity size={15} /> BUSINESS HEALTH SCORE
        </p>
        <h2>One score that explains where the business needs attention.</h2>
        <p>
          BizSyncOS combines authorized operational signals into an explainable health view. This
          visual is an illustrative demo, not a live customer score.
        </p>
      </AnimatedSection>
      <div className="health-layout">
        <div className="health-score">
          <span>ILLUSTRATIVE SCORE</span>
          <strong>81</strong>
          <b>/ 100</b>
          <p>Healthy, with two priorities to review</p>
        </div>
        <div className="health-breakdown">
          {dimensions.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <div>
                <i style={{ width: `${value}%` }} />
              </div>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RoiCalculator() {
  const [orders, setOrders] = useState(1000);
  const [employees, setEmployees] = useState(8);
  const [warehouses, setWarehouses] = useState(1);
  const [softwareSpend, setSoftwareSpend] = useState(25000);
  const hoursSaved = Math.round((orders / 125) * 1.2 + employees * 2 + warehouses * 4);
  const consolidation = Math.round(softwareSpend * 0.18);
  const improvement = Math.min(42, Math.round(orders / 100 + warehouses * 4));
  return (
    <section className="roi-section section-pad">
      <div className="roi-copy">
        <p className="eyebrow blue">
          <CircleDollarSign size={15} /> ROI CALCULATOR
        </p>
        <h2>Estimate the operational impact of a connected system.</h2>
        <p>
          Use your own inputs to explore a directional estimate. Results are transparent estimates,
          not a promise of savings or revenue.
        </p>
      </div>
      <div className="roi-calculator">
        <div className="roi-inputs">
          <label>
            Orders per month
            <input
              type="number"
              min="0"
              value={orders}
              onChange={(event) => setOrders(Math.max(0, Number(event.target.value)))}
            />
          </label>
          <label>
            Team members
            <input
              type="number"
              min="0"
              value={employees}
              onChange={(event) => setEmployees(Math.max(0, Number(event.target.value)))}
            />
          </label>
          <label>
            Warehouses
            <input
              type="number"
              min="0"
              value={warehouses}
              onChange={(event) => setWarehouses(Math.max(0, Number(event.target.value)))}
            />
          </label>
          <label>
            Current software spend / month (INR)
            <input
              type="number"
              min="0"
              value={softwareSpend}
              onChange={(event) => setSoftwareSpend(Math.max(0, Number(event.target.value)))}
            />
          </label>
        </div>
        <div className="roi-results">
          <article>
            <span>Estimated hours redirected</span>
            <strong>{hoursSaved}</strong>
            <small>hours / month</small>
          </article>
          <article>
            <span>Software consolidation potential</span>
            <strong>₹{consolidation.toLocaleString('en-IN')}</strong>
            <small>estimated / month</small>
          </article>
          <article>
            <span>Operational improvement range</span>
            <strong>{improvement}%</strong>
            <small>illustrative potential</small>
          </article>
        </div>
      </div>
    </section>
  );
}

type EcosystemNode = {
  id: string;
  title: string;
  detail: string;
  icon: LucideIcon;
};

const ecosystemNodes: EcosystemNode[] = [
  {
    id: 'stores',
    title: 'Stores & channels',
    detail: 'Shopify · WooCommerce · marketplaces',
    icon: Layers3,
  },
  {
    id: 'crm',
    title: 'CRM',
    detail: 'Leads · customers · follow-ups',
    icon: UsersRound,
  },
  {
    id: 'orders',
    title: 'Orders',
    detail: 'Quotes · sales · returns',
    icon: ClipboardList,
  },
  {
    id: 'inventory',
    title: 'Inventory',
    detail: 'Stock · lots · reorder rules',
    icon: PackageCheck,
  },
  {
    id: 'warehouse',
    title: 'Warehouse',
    detail: 'Pick · pack · dispatch',
    icon: Warehouse,
  },
  {
    id: 'finance',
    title: 'Finance',
    detail: 'Invoices · payments · collections',
    icon: CircleDollarSign,
  },
  {
    id: 'marketing',
    title: 'Marketing',
    detail: 'Campaigns · consent · recovery',
    icon: MessageSquareText,
  },
  {
    id: 'reports',
    title: 'Reports & BI',
    detail: 'KPIs · forecasts · business health',
    icon: BarChart3,
  },
  {
    id: 'ai',
    title: 'AI Business Brain',
    detail: 'Grounded insight · recommendations',
    icon: BrainCircuit,
  },
  {
    id: 'automation',
    title: 'Automation',
    detail: 'Triggers · approvals · actions',
    icon: Workflow,
  },
];

export function ConnectedEcosystem() {
  const graphRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !graphRef.current) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import('gsap').then(({ gsap }) => {
      if (cancelled || !graphRef.current) return;

      const context = gsap.context(() => {
        gsap.fromTo(
          '.ecosystem-node',
          { autoAlpha: 0, scale: 0.9, y: 18 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.68,
            ease: 'power3.out',
            stagger: 0.055,
          }
        );
        gsap.to('.ecosystem-core', {
          y: -7,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to('.ecosystem-links path', {
          strokeDashoffset: -18,
          duration: 1.7,
          repeat: -1,
          ease: 'none',
          stagger: 0.12,
        });
      }, graphRef);
      cleanup = () => context.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={graphRef}
      className="ecosystem-map"
      role="img"
      aria-label="BizSyncOS connects stores, CRM, orders, inventory, warehouse, finance, marketing, reports, AI, and automation in one operating system."
    >
      <svg className="ecosystem-links" viewBox="0 0 1000 640" aria-hidden="true">
        <defs>
          <marker
            id="ecosystem-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <path d="M500 82 C500 172 500 205 500 248" />
        <path d="M190 115 C285 185 357 225 437 274" />
        <path d="M810 115 C715 185 643 225 563 274" />
        <path d="M100 285 C245 290 335 300 427 305" />
        <path d="M900 285 C755 290 665 300 573 305" />
        <path d="M155 458 C285 415 360 370 438 340" />
        <path d="M845 458 C715 415 640 370 562 340" />
        <path d="M300 555 C365 480 410 412 455 355" />
        <path d="M500 588 C500 500 500 421 500 370" />
        <path d="M700 555 C635 480 590 412 545 355" />
      </svg>
      <div className="ecosystem-core">
        <span>BS</span>
        <strong>BizSyncOS</strong>
        <small>One connected operating system</small>
      </div>
      {ecosystemNodes.map((node) => {
        const Icon = node.icon;
        return (
          <article className={`ecosystem-node node-${node.id}`} key={node.id}>
            <span>
              <Icon size={17} />
            </span>
            <div>
              <strong>{node.title}</strong>
              <small>{node.detail}</small>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function HeroProductStage() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sceneRef.current) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import('gsap').then(({ gsap }) => {
      if (cancelled || !sceneRef.current) return;

      const context = gsap.context(() => {
        gsap.to('.hero-product-insight', {
          y: -7,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to('.hero-product-halo', {
          scale: 1.12,
          opacity: 0.72,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }, sceneRef);
      cleanup = () => context.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={sceneRef}
      className="hero-product-stage"
      role="img"
      aria-label="BizSyncOS Executive Command Center interface with AI and automation signals."
    >
      <span className="hero-product-halo" aria-hidden="true" />
      <span className="hero-product-halo hero-product-halo-secondary" aria-hidden="true" />
      <motion.div
        className="hero-product-window"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 25, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.72,
          delay: prefersReducedMotion ? 0 : 0.32,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="hero-product-windowbar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <strong>BizSyncOS / Executive Command Center</strong>
          <b>
            <i /> Live workspace
          </b>
        </div>
        <img
          src="/images/bizsync-command-center.svg"
          alt="BizSyncOS Executive Command Center product interface"
        />
      </motion.div>
      <motion.div
        className="hero-product-insight"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: prefersReducedMotion ? 0 : 0.54,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="hero-console-top">
          <span>BUSINESS PULSE</span>
          <b>
            <i /> Live sample
          </b>
        </div>
        <div className="hero-console-body">
          <div>
            <small>Revenue protected</small>
            <strong>₹18.5L</strong>
            <em>+12.8% potential</em>
          </div>
          <div className="hero-console-chart" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>
            <BrainCircuit size={14} /> AI has prepared the next approved action.
          </p>
        </div>
        <span className="hero-product-insight-icon">
          <BrainCircuit size={18} />
        </span>
        <div className="hero-product-insight-copy">
          <small>AI operational brief</small>
          <strong>3 priorities are ready for review</strong>
          <p>Grounded in your live sales, stock, and collections data.</p>
        </div>
        <ArrowRight size={16} aria-hidden="true" />
      </motion.div>
    </div>
  );
}

// ===== HOME PAGE =====
export function LegacyHome({ navigate }: { navigate: (route: Route) => void }) {
  const [activeView, setActiveView] = useState(productViews[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();
  const activeProduct = productViews.find((view) => view.id === activeView) ?? productViews[0];
  const showProductTour = () =>
    document.getElementById('screens')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main>
      <section className="hero hero-product-hero section-grid">
        <motion.div
          className="hero-copy hero-product-copy"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="eyebrow"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.42,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
          >
            <Sparkles size={15} /> AI-POWERED BUSINESS OPERATING SYSTEM
          </motion.p>
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: prefersReducedMotion ? 0 : 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Run your entire
            <br />
            business from one
            <br />
            <em className="gradient-text">intelligent platform.</em>
          </motion.h1>
          <motion.p
            className="hero-lede"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: prefersReducedMotion ? 0 : 0.22,
            }}
          >
            Manage CRM, orders, inventory, warehouse, finance, marketing, and AI automation from one
            place. Built for modern businesses that want to scale.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: prefersReducedMotion ? 0 : 0.3,
            }}
          >
            <ButtonLink onClick={() => navigate('/demo')}>
              <Sparkles size={16} /> Try live demo
            </ButtonLink>
            <ButtonLink onClick={showProductTour} variant="secondary">
              <Play size={16} fill="currentColor" /> Watch 2-min product tour
            </ButtonLink>
          </motion.div>
          <motion.p
            className="trust-copy"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.45,
              delay: prefersReducedMotion ? 0 : 0.38,
            }}
          >
            <span>
              <CheckCircle2 size={15} /> No credit card
            </span>
            <span>
              <Zap size={14} /> Live in minutes
            </span>
            <span>
              <ShieldCheck size={14} /> Secure by default
            </span>
          </motion.p>
          <motion.p
            className="hero-proof"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.42,
              delay: prefersReducedMotion ? 0 : 0.44,
            }}
          >
            Built for teams replacing disconnected business tools.
          </motion.p>
        </motion.div>
        <motion.div
          className="hero-visual hero-product-visual"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, x: 22 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.82,
            delay: prefersReducedMotion ? 0 : 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <HeroProductStage />
        </motion.div>
      </section>

      <section id="integrations" className="integration-strip">
        <AnimatedSection>
          <div className="integration-proof">
            <div className="proof-avatars" aria-hidden="true">
              <span>BS</span>
              <span>OP</span>
              <span>AI</span>
              <span>CRM</span>
            </div>
            <strong>Built for growing business teams</strong>
          </div>
          <p>CONNECT THE TOOLS YOUR BUSINESS ALREADY USES</p>
          <div className="placeholder-logos">
            <span className="hover-lift">
              <b>01</b> Shopify
            </span>
            <span className="hover-lift">
              <b>02</b> WooCommerce
            </span>
            <span className="hover-lift">
              <b>03</b> Razorpay
            </span>
            <span className="hover-lift">
              <b>04</b> Stripe
            </span>
            <span className="hover-lift">
              <b>05</b> WhatsApp
            </span>
            <span className="hover-lift">
              <b>06</b> Shiprocket
            </span>
            <span className="hover-lift">
              <b>07</b> Delhivery
            </span>
            <span className="hover-lift">
              <b>08</b> Amazon
            </span>
            <span className="hover-lift">
              <b>09</b> Flipkart
            </span>
          </div>
          <small>
            Connector names describe supported or planned workflows; they do not claim a partnership
            or endorsement.
          </small>
        </AnimatedSection>
      </section>

      <section className="problem section-pad">
        <AnimatedSection className="section-intro narrow">
          <p className="eyebrow blue">
            <Target size={15} /> THE COST OF DISCONNECTED WORK
          </p>
          <h2>Your business. Your hustle. These should not slow you down.</h2>
          <p>
            When every team uses a different tool, the business loses time, trust in the numbers,
            and the ability to act early.
          </p>
        </AnimatedSection>
        <AnimatedStagger className="problem-grid">
          <ProblemCard
            icon={CircleDollarSign}
            title="Lost revenue"
            text="Missed follow-ups, failed payments, and abandoned carts keep valuable revenue from being recovered."
          />
          <ProblemCard
            icon={CalendarClock}
            title="Manual work"
            text="Teams spend hours updating records, chasing follow-ups, and moving data between systems."
          />
          <ProblemCard
            icon={Warehouse}
            title="Inventory errors"
            text="Stock is updated too late, causing overselling, stockouts, and avoidable buying decisions."
          />
          <ProblemCard
            icon={Truck}
            title="Delayed dispatch"
            text="Orders wait for handoffs when warehouse tasks and shipping events are not connected."
          />
          <ProblemCard
            icon={ShieldCheck}
            title="COD risk"
            text="High-risk cash-on-delivery orders need a repeatable verification and escalation workflow."
          />
          <ProblemCard
            icon={Search}
            title="Poor visibility"
            text="Different teams see different numbers, making it hard to spot a problem before it grows."
          />
        </AnimatedStagger>
        <p className="problem-closing">
          BizSyncOS connects your entire business into one intelligent operating system.
        </p>
      </section>

      <section id="solutions" className="system section-pad">
        <AnimatedSection className="section-intro centered">
          <p className="eyebrow">
            <Globe2 size={15} /> ONE CONNECTED SYSTEM
          </p>
          <h2>One operating system. Every team, tool, and decision connected.</h2>
          <p>
            BizSyncOS sits at the center: every store, team, module, signal, and approved action
            shares the same business context.
          </p>
        </AnimatedSection>
        <ConnectedEcosystem />
        <p className="ecosystem-note">
          A customer order can update CRM, reserve inventory, create warehouse work, record finance
          events, trigger automation, and give AI the evidence to recommend the next step.
        </p>
      </section>

      <section id="product" className="features section-pad">
        <AnimatedSection className="section-intro">
          <p className="eyebrow blue">
            <Layers3 size={15} /> CONNECTED BY DESIGN
          </p>
          <h2>The all-in-one operating system for modern businesses.</h2>
          <p>
            Start with the workflows your team needs today, then grow without changing platforms.
          </p>
        </AnimatedSection>
        <AnimatedStagger className="feature-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              onClick={() => navigate('/product')}
            />
          ))}
        </AnimatedStagger>
      </section>

      <section className="product-showcase section-pad" aria-hidden="true">
        <AnimatedSection className="section-intro centered">
          <p className="eyebrow blue">
            <Play size={15} /> INTERACTIVE PRODUCT TOUR
          </p>
          <h2>See your entire business in one place.</h2>
          <p>
            Move across the operating system and see the context every team needs to act with
            confidence.
          </p>
        </AnimatedSection>
        <div className="showcase-shell">
          <div className="showcase-tabs" role="tablist">
            {productViews.map((view) => (
              <button
                key={view.id}
                className={activeView === view.id ? 'active' : ''}
                onClick={() => setActiveView(view.id)}
                role="tab"
                aria-selected={activeView === view.id}
              >
                {view.label}
              </button>
            ))}
          </div>
          <div className={`showcase-panel view-${activeProduct.id}`}>
            <div className="showcase-side">
              <span className="panel-badge">BIZSYNCOS / {activeProduct.label.toUpperCase()}</span>
              <h3>
                {activeProduct.metric}
                <strong>{activeProduct.value}</strong>
              </h3>
              <p>{activeProduct.description}</p>
              <button onClick={() => navigate('/demo')}>
                Explore in live demo <ArrowRight size={16} />
              </button>
            </div>
            <div className="showcase-screen">
              <div className="screen-top">
                <span>Workspace overview</span>
                <span className="screen-user" />
              </div>
              <div className="screen-kpis">
                <MetricCard label="Revenue today" value="$24,820" trend="+12.8%" tone="blue" />
                <MetricCard label="Open work" value="46" trend="Needs review" tone="amber" />
              </div>
              <div className="screen-chart">
                <div className="screen-chart-head">
                  <span>{activeProduct.label} performance</span>
                  <b>Live workspace view</b>
                </div>
                <div className="line-chart">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="screen-list">
                <span>
                  <i className="list-icon" />
                  Actionable priority <b>Review now</b>
                </span>
                <span>
                  <i className="list-icon" />
                  Operational signal <b>Evidence ready</b>
                </span>
                <span>
                  <i className="list-icon" />
                  Recommended next step <b>Approval required</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="intelligence-suite section-pad">
        <section id="ai" className="ai-section">
          <div className="ai-orb orb-one float-orb" style={{ animationDuration: '8s' }} />
          <div
            className="ai-orb orb-two float-orb"
            style={{
              animationDuration: '6s',
              animationDelay: '-2s',
            }}
          />
          <div className="ai-copy">
            <p className="eyebrow light">
              <BrainCircuit size={15} /> BIZSYNC AI BUSINESS BRAIN
            </p>
            <h2>
              AI that works like <em>your business analyst.</em>
            </h2>
            <p>
              BizSync AI analyses authorized operations, customers, inventory, revenue, and
              performance to surface risks and recommend the next best action.
            </p>
            <ul>
              <li>
                <Check /> Grounded answers with evidence
              </li>
              <li>
                <Check /> Clear confidence and impact signals
              </li>
              <li>
                <Check /> Owner approval before high-impact action
              </li>
            </ul>
            <ButtonLink onClick={() => navigate('/demo')} variant="secondary">
              Explore AI Business Brain
            </ButtonLink>
          </div>
          <div className="ai-conversation">
            <div className="ai-conversation-head">
              <span>
                <span className="brain-dot">
                  <BrainCircuit size={17} />
                </span>{' '}
                BizSync AI
              </span>
              <span>Grounded</span>
            </div>
            <div className="chat-question">
              <span>You</span>
              <p>Why did sales drop yesterday?</p>
            </div>
            <div className="chat-answer">
              <span>BizSync AI</span>
              <p>
                Sales dropped because Product A was out of stock, COD failures increased, and repeat
                purchases declined. Verified evidence is ready for review.
              </p>
              <div className="recommendations">
                <p>RECOMMENDED NEXT STEPS</p>
                <span>
                  <CheckCircle2 /> Restock Product A
                </span>
                <span>
                  <CheckCircle2 /> Trigger WhatsApp reminder
                </span>
                <span>
                  <CheckCircle2 /> Launch repeat-purchase campaign
                </span>
              </div>
              <div className="impact">
                <span>ESTIMATED OPPORTUNITY</span>
                <b>Evidence-backed</b>
                <small>Approval required for action</small>
              </div>
            </div>
          </div>
        </section>

        <section id="automation" className="automation">
          <AnimatedSection className="section-intro">
            <p className="eyebrow blue">
              <Workflow size={15} /> AUTOMATION ENGINE
            </p>
            <h2>Build workflows that run the routine work.</h2>
            <p>
              Compose reliable business workflows with event triggers, conditions, approvals, waits,
              and complete execution history.
            </p>
          </AnimatedSection>
          <div className="automation-layout">
            <div className="workflow-board">
              <WorkflowNode
                icon={PackageCheck}
                title="Order placed"
                subtitle="New order received"
              />
              <WorkflowLine />
              <WorkflowNode icon={CreditCard} title="Payment success" subtitle="Payment verified" />
              <WorkflowLine />
              <WorkflowNode
                icon={FileText}
                title="Invoice generated"
                subtitle="Draft invoice recorded"
              />
              <WorkflowLine />
              <WorkflowNode
                icon={Warehouse}
                title="Warehouse notified"
                subtitle="Pick and pack task created"
              />
              <WorkflowLine />
              <WorkflowNode
                icon={MessageSquareText}
                title="WhatsApp sent"
                subtitle="Customer update prepared"
              />
              <WorkflowLine />
              <WorkflowNode
                icon={Truck}
                title="Delivery tracking started"
                subtitle="Courier event connected"
              />
            </div>
            <div className="automation-list">
              <span className="number-chip">01</span>
              <h3>Automate the handoffs that slow teams down.</h3>
              <p>
                High-impact actions can require explicit policy checks and authorized human
                approval.
              </p>
              <ul>
                <li>
                  <Check /> Event-based triggers and schedules
                </li>
                <li>
                  <Check /> Nested conditions and typed variables
                </li>
                <li>
                  <Check /> Retries, waits, and execution history
                </li>
                <li>
                  <Check /> Templates to get teams started fast
                </li>
              </ul>
              <ButtonLink onClick={() => navigate('/demo')} variant="ghost">
                Explore automation
              </ButtonLink>
            </div>
          </div>
        </section>
      </section>

      <section className="recovery section-pad">
        <AnimatedSection className="section-intro centered">
          <p className="eyebrow blue">
            <CircleDollarSign size={15} /> REVENUE RECOVERY
          </p>
          <h2>Recover lost revenue. Grow your business.</h2>
          <p>
            Use a connected view of payments, stock, customers, orders, and campaigns to find the
            next best recovery opportunity.
          </p>
        </AnimatedSection>
        <AnimatedStagger className="recovery-grid">
          <RecoveryCard
            title="Failed payments"
            label="Collection queue"
            impact="₹48,500 at risk"
            automation="Send payment reminder"
            icon={CreditCard}
            onClick={() => navigate('/demo')}
          />
          <RecoveryCard
            title="Abandoned carts"
            label="Commerce follow-up"
            impact="₹31,200 at risk"
            automation="Trigger WhatsApp nudge"
            icon={PackageCheck}
            onClick={() => navigate('/demo')}
          />
          <RecoveryCard
            title="Repeat purchase"
            label="Customer opportunity"
            impact="₹22,750 potential"
            automation="Launch reorder campaign"
            icon={UsersRound}
            onClick={() => navigate('/demo')}
          />
          <RecoveryCard
            title="Upsell"
            label="Product bundle"
            impact="₹18,900 potential"
            automation="Recommend a higher-value bundle"
            icon={Layers3}
            onClick={() => navigate('/demo')}
          />
          <RecoveryCard
            title="Cross-sell"
            label="Complementary products"
            impact="₹14,200 potential"
            automation="Recommend related products"
            icon={Target}
            onClick={() => navigate('/demo')}
          />
          <RecoveryCard
            title="COD confirmation"
            label="Order verification"
            impact="₹27,600 at risk"
            automation="Verify on WhatsApp"
            icon={ShieldCheck}
            onClick={() => navigate('/demo')}
          />
        </AnimatedStagger>
        <p className="demo-note">
          Opportunity values appear only inside sample workspaces or when calculated from your
          authorized business data.
        </p>
      </section>

      <TestimonialsSection />

      <section className="industries section-pad" aria-hidden="true">
        <AnimatedSection className="section-intro">
          <p className="eyebrow blue">
            <Building2 size={15} /> INDUSTRY SOLUTIONS
          </p>
          <h2>Built for businesses with complex operations.</h2>
          <p>
            Connect the complete journey from customer to payment, without forcing every business
            into the same workflow.
          </p>
        </AnimatedSection>
        <AnimatedStagger className="industry-grid">
          {['Ecommerce & D2C', 'Retail businesses', 'Wholesale distributors', 'Manufacturers'].map(
            (industry, index) => (
              <article key={industry} className="hover-lift">
                <span>0{index + 1}</span>
                <h3>{industry}</h3>
                <p>Manage the complete business lifecycle with a connected operating system.</p>
                <button onClick={() => navigate('/solutions')}>
                  Explore solution <ArrowRight size={15} />
                </button>
              </article>
            )
          )}
        </AnimatedStagger>
      </section>

      <section className="comparison section-pad" aria-hidden="true">
        <AnimatedSection className="section-intro centered">
          <p className="eyebrow blue">
            <BarChart3 size={15} /> WHY BIZSYNCOS
          </p>
          <h2>Replace disconnected work with a connected operating model.</h2>
        </AnimatedSection>
        <div className="comparison-table">
          <div className="comparison-row comparison-head">
            <span>Capability</span>
            <span>Spreadsheets</span>
            <span>Multiple tools</span>
            <span>Traditional ERP</span>
            <span>BizSyncOS</span>
          </div>
          {[
            ['Connected business data', false, 'Partial', true, true],
            ['Ecommerce operations', false, 'Partial', 'Partial', true],
            ['Customer growth', false, 'Separate tool', 'Limited', true],
            ['No-code automation', false, 'Separate tool', 'Limited', true],
            ['AI recommendations', false, false, 'Limited', true],
            ['Unified business health', false, false, false, true],
          ].map(([capability, sheet, tools, erp, biz]) => (
            <div className="comparison-row" key={String(capability)}>
              <span>{String(capability)}</span>
              <Cell value={sheet} />
              <Cell value={tools} />
              <Cell value={erp} />
              <Cell value={biz} highlight />
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-preview section-pad">
        <div className="pricing-intro">
          <p className="eyebrow light">
            <CircleDollarSign size={15} /> PRICING THAT SCALES WITH YOU
          </p>
          <h2>Start simple. Scale without changing platforms.</h2>
          <p>
            BizSyncOS plans are designed around the people, operational depth, and AI usage your
            business actually needs.
          </p>
          <ButtonLink onClick={() => navigate('/pricing')} variant="secondary">
            View pricing approach
          </ButtonLink>
        </div>
        <div className="plan-stack">
          <PlanCard
            name="Starter"
            price="₹2,999"
            copy="For small businesses getting their operations in sync."
            features={['Up to 5 users', 'One warehouse', 'CRM, orders and inventory']}
            onClick={() => navigate('/pricing')}
          />
          <PlanCard
            name="Growth"
            price="₹7,999"
            copy="For teams running multi-channel commerce."
            features={['Up to 20 users', 'Multi-warehouse', 'Automation and API access']}
            featured
            onClick={() => navigate('/pricing')}
          />
          <PlanCard
            name="Scale"
            price="₹14,999"
            copy="For businesses ready for AI-led operations."
            features={['Up to 100 users', 'AI Business Brain', 'Custom dashboards']}
            onClick={() => navigate('/pricing')}
          />
          <PlanCard
            name="Enterprise"
            price="Custom"
            copy="For complex, governed enterprise operations."
            features={['Unlimited users', 'Custom integrations', 'Dedicated onboarding']}
            action="Talk to sales"
            onClick={() => navigate('/contact')}
          />
        </div>
      </section>

      <section className="security section-pad" aria-hidden="true">
        <div className="security-copy">
          <p className="eyebrow blue">
            <ShieldCheck size={15} /> SECURITY & CONTROL
          </p>
          <h2>Your business data deserves serious controls.</h2>
          <p>
            BizSyncOS applies product-level controls so teams can work quickly without losing
            governance or accountability.
          </p>
          <ButtonLink onClick={() => navigate('/product')} variant="ghost">
            Explore the platform
          </ButtonLink>
        </div>
        <div className="security-grid">
          <SecurityItem
            icon={UsersRound}
            title="Role-based access"
            text="Give each team member the right workspace permissions."
          />
          <SecurityItem
            icon={LockKeyhole}
            title="Tenant isolation"
            text="Business data stays scoped to its own workspace."
          />
          <SecurityItem
            icon={FileText}
            title="Audit history"
            text="Keep a trace of sensitive changes, approvals, and actions."
          />
          <SecurityItem
            icon={ShieldCheck}
            title="Approval controls"
            text="Keep high-impact actions in authorized human hands."
          />
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="faq-enhanced section-pad">
        <AnimatedSection
          className="section-intro centered"
          style={
            {
              maxWidth: 640,
              margin: '0 auto',
              textAlign: 'center',
            } as React.CSSProperties
          }
        >
          <p className="eyebrow blue">
            <CircleHelp size={15} /> FREQUENTLY ASKED QUESTIONS
          </p>
          <h2>Everything you need to know before you connect your business.</h2>
        </AnimatedSection>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article key={faq.q} className={openFaq === index ? 'open' : ''}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
              >
                <span>{faq.q}</span>
                <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-grid" />
        <p className="eyebrow light">
          <Sparkles size={15} /> BIZSYNCOS
        </p>
        <h2>Stop managing software. Start managing your business.</h2>
        <p>
          Run operations, grow revenue, automate work, and make smarter decisions from one
          intelligent platform.
        </p>
        <div>
          <ButtonLink onClick={() => navigate('/demo')}>Try live demo</ButtonLink>
          <ButtonLink onClick={() => navigate('/signup')} variant="secondary">
            Start free trial
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

function ProblemCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article className="problem-card hover-lift">
      <span>
        <Icon size={21} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function FeatureCard({ feature, onClick }: { feature: Feature; onClick: () => void }) {
  const Icon = feature.icon;
  return (
    <article className={`feature-card ${feature.accent} hover-lift`}>
      <span>
        <Icon size={22} />
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      <button type="button" onClick={onClick}>
        Explore feature <ArrowRight size={15} />
      </button>
    </article>
  );
}

function WorkflowNode({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="workflow-node">
      <span>
        <Icon size={18} />
      </span>
      <div>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}

function WorkflowLine() {
  return (
    <div className="workflow-line">
      <i />
      <ChevronRight size={15} />
    </div>
  );
}

function RecoveryCard({
  title,
  label,
  impact,
  automation,
  icon: Icon,
  onClick,
}: {
  title: string;
  label: string;
  impact: string;
  automation: string;
  icon: LucideIcon;
  onClick: () => void;
}) {
  return (
    <article className="recovery-card hover-lift">
      <span>
        <Icon size={20} />
      </span>
      <p>{title}</p>
      <h3>{label}</h3>
      <strong>{impact}</strong>
      <small>{automation}</small>
      <button
        onClick={onClick}
        style={{
          border: 0,
          background: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          gap: 4,
          alignItems: 'center',
          marginTop: 19,
          color: '#007eb8',
          fontSize: 11,
          fontWeight: 800,
          padding: 0,
        }}
      >
        Review in demo <ArrowRight size={15} />
      </button>
    </article>
  );
}

function Cell({ value, highlight = false }: { value: string | boolean; highlight?: boolean }) {
  return (
    <span className={highlight ? 'cell-highlight' : ''}>
      {value === true ? <Check size={18} /> : value === false ? <X size={17} /> : String(value)}
    </span>
  );
}

function PlanCard({
  name,
  price,
  copy,
  features,
  featured = false,
  action = 'Start free trial',
  onClick,
}: {
  name: string;
  price: string;
  copy: string;
  features: string[];
  featured?: boolean;
  action?: string;
  onClick: () => void;
}) {
  return (
    <article className={`plan-card ${featured ? 'featured' : ''}`}>
      {featured ? <span className="plan-label">MOST POPULAR</span> : null}
      <p>{name}</p>
      <strong className="plan-price">
        {price}
        <small>{price === 'Custom' ? '' : ' / month'}</small>
      </strong>
      <h3>{copy}</h3>
      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <Check size={14} />
            {feature}
          </li>
        ))}
      </ul>
      <button className="plan-card-action" onClick={onClick}>
        {action} <ArrowRight size={15} />
      </button>
    </article>
  );
}

function SecurityItem({
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
        <Icon size={21} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function PublicPage({
  route,
  navigate,
}: {
  route: Exclude<Route, '/'>;
  navigate: (route: Route) => void;
}) {
  return <PublicSite route={route} navigate={navigate} />;
}

function GooglePartnerLogo() {
  return (
    <span className="partner-logo-google">
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </span>
  );
}

function MetaPartnerLogo() {
  return (
    <span className="partner-logo-meta">
      <svg width="22" height="15" viewBox="0 0 38 24" fill="none">
        <path
          d="M10.1 2.4C6.2 2.4 2.8 5.6 1.4 9.6c-1.6 4.6.4 9.7 4.6 11.5 3.3 1.4 7.2.7 9.8-1.8l3.2-3.1 3.2 3.1c2.6 2.5 6.5 3.2 9.8 1.8 4.2-1.8 6.2-6.9 4.6-11.5-1.4-4-4.8-7.2-8.7-7.2-3.4 0-6.5 1.8-8.9 4.6-2.4-2.8-5.5-4.6-8.9-4.6zm0 3.8c2.4 0 4.6 1.6 6.1 3.9l-2.9 2.9c-1.1-1.3-2.6-2.2-4.3-2.2-2.3 0-4.3 1.8-4.7 4.1-.4 2.4 1 4.6 3.3 5.2 2 .5 4-.4 5.1-2.1l3.5-3.5 3.5 3.5c1.1 1.7 3.1 2.6 5.1 2.1 2.3-.6 3.7-2.8 3.3-5.2-.4-2.3-2.4-4.1-4.7-4.1-1.7 0-3.2.9-4.3 2.2l-2.9-2.9c1.5-2.3 3.7-3.9 6.1-3.9 3.2 0 6 2.3 6.9 5.3.9 3.1-.4 6.4-3.1 7.8-2.3 1.2-5.1.7-6.9-1l-3-2.9-3 2.9c-1.8 1.7-4.6 2.2-6.9 1-2.7-1.4-4-4.7-3.1-7.8.9-3 3.7-5.3 6.9-5.3z"
          fill="#0668E1"
        />
      </svg>
      <span>Meta</span>
    </span>
  );
}

function RazorpayPartnerLogo() {
  return (
    <span className="partner-logo-razorpay">
      <svg width="18" height="20" viewBox="0 0 24 28" fill="none">
        <path
          d="M15.2 0H5.6L0 28h8.5l2.4-12.2h4.5c4.7 0 8.6-3.5 8.6-7.9C24 3.5 20.1 0 15.2 0zm-.4 10.4h-4.6l1.2-6.2h3.4c2.1 0 3.7 1.4 3.7 3.1 0 1.7-1.6 3.1-3.7 3.1z"
          fill="#0C83FF"
        />
      </svg>
      <span>Razorpay</span>
    </span>
  );
}

function ShiprocketPartnerLogo() {
  return (
    <span className="partner-logo-shiprocket">
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2L3 9.5V24.5L16 32L29 24.5V9.5L16 2Z"
          stroke="#7432FF"
          strokeWidth="3"
          fill="none"
        />
        <path d="M16 8L8 12.5V21.5L16 26L24 21.5V12.5L16 8Z" fill="#7432FF" />
      </svg>
      <span>Shiprocket</span>
    </span>
  );
}

function OpenAiPartnerLogo() {
  return (
    <span className="partner-logo-openai">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0f172a">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.784a4.472 4.472 0 0 1 2.36-1.973V12.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.784zm15.597 3.856l-5.843-3.37 2.02-1.166a.076.076 0 0 1 .071 0l4.83 2.79a4.494 4.494 0 0 1-.684 8.185v-5.763a.79.79 0 0 0-.394-.676zm2.01-4.269l-.142-.084-4.779-2.758a.776.776 0 0 0-.784 0L8.4 8.9v-2.33a.08.08 0 0 1 .033-.062L13.27 3.72a4.504 4.504 0 0 1 6.68 4.65zm-9.988 5.75l2.434-1.404 2.433 1.404v2.812l-2.433 1.406-2.434-1.406z" />
      </svg>
      <span>OpenAI API</span>
    </span>
  );
}

function ChatGptPartnerLogo() {
  return (
    <span className="partner-logo-chatgpt">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#10a37f">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.784a4.472 4.472 0 0 1 2.36-1.973V12.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.784zm15.597 3.856l-5.843-3.37 2.02-1.166a.076.076 0 0 1 .071 0l4.83 2.79a4.494 4.494 0 0 1-.684 8.185v-5.763a.79.79 0 0 0-.394-.676zm2.01-4.269l-.142-.084-4.779-2.758a.776.776 0 0 0-.784 0L8.4 8.9v-2.33a.08.08 0 0 1 .033-.062L13.27 3.72a4.504 4.504 0 0 1 6.68 4.65zm-9.988 5.75l2.434-1.404 2.433 1.404v2.812l-2.433 1.406-2.434-1.406z" />
      </svg>
      <span>ChatGPT</span>
    </span>
  );
}

function Footer({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <footer className="site-footer">
      {/* Wave background accent decorative elements */}
      <div className="footer-wave-left" aria-hidden="true" />
      <div className="footer-wave-right" aria-hidden="true" />

      <div className="footer-inner-shell">
        {/* 1. TOP PARTNER TRUST BAR */}
        <div className="footer-partners-bar-wrap">
          <div className="footer-partners-header">
            <span className="footer-partners-rule" />
            <span className="footer-partners-title">TRUSTED BY LEADING GLOBAL PARTNERS</span>
            <span className="footer-partners-rule" />
          </div>
          <div className="footer-partner-cards-container">
            <div className="footer-partner-card">
              <GooglePartnerLogo />
              <span className="partner-sub">Cloud &amp; AI</span>
            </div>
            <div className="partner-divider" />
            <div className="footer-partner-card">
              <OpenAiPartnerLogo />
              <span className="partner-sub">AI Platform Partner</span>
            </div>
            <div className="partner-divider" />
            <div className="footer-partner-card">
              <ChatGptPartnerLogo />
              <span className="partner-sub">Conversational AI</span>
            </div>
            <div className="partner-divider" />
            <div className="footer-partner-card">
              <MetaPartnerLogo />
              <span className="partner-sub">Business Solutions</span>
            </div>
            <div className="partner-divider" />
            <div className="footer-partner-card">
              <RazorpayPartnerLogo />
              <span className="partner-sub">Payments Partner</span>
            </div>
            <div className="partner-divider" />
            <div className="footer-partner-card">
              <ShiprocketPartnerLogo />
              <span className="partner-sub">Logistics Partner</span>
            </div>
          </div>
        </div>

        {/* 2. MAIN 6-COLUMN NAVIGATION & NEWSLETTER GRID */}
        <div className="footer-nav-grid">
          {/* Brand & Trust Badges */}
          <div className="footer-brand-col">
            <BrandMark />
            <p className="footer-brand-tagline">
              The unified real-time operating system for modern high-velocity D2C, omnichannel
              retail, and multi-node B2B brands.
            </p>
            <div className="footer-trust-badges">
              <span className="footer-badge-item">
                <ShieldCheck size={14} className="badge-icon-shield" /> ISO 27001 Certified &amp;
                SOC-2 Type II
              </span>
              <span className="footer-badge-item">
                <Cloud size={14} className="badge-icon-cloud" /> 100% Hosted in India (AWS Mumbai)
              </span>
              <span className="footer-badge-item">
                <CheckCircle2 size={14} className="badge-icon-check" /> Official Meta BSP &amp;
                Razorpay Partner
              </span>
            </div>
            <div className="footer-social-row">
              <a
                href="https://linkedin.com/company/bizsyncos"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="footer-social-link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                </svg>
              </a>
              <a
                href="https://x.com/bizsyncos"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="footer-social-link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@bizsyncos"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="footer-social-link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-col-links">
              <li>
                <button type="button" onClick={() => navigate('/product')}>
                  Platform Overview
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/product')}>
                  Real-Time Stock Lock
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/product')}>
                  WhatsApp AI Commerce
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/product')}>
                  COD Reconciliation
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/product')}>
                  Logistics SLA Defense
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/product')}>
                  Gemini AI Business Brain
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/integrations')}>
                  Integrations Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="footer-col-title">Solutions</h4>
            <ul className="footer-col-links">
              <li>
                <button type="button" onClick={() => navigate('/solutions')}>
                  D2C Brands
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/solutions')}>
                  Quick Commerce &amp; Dark Stores
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/solutions')}>
                  Omnichannel Retailers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/solutions')}>
                  B2B Wholesalers &amp; Distributors
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/solutions')}>
                  Multi-Node Warehouses
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/solutions')}>
                  Enterprise Custom Rollouts
                </button>
              </li>
            </ul>
          </div>

          {/* Comparisons */}
          <div>
            <h4 className="footer-col-title">Comparisons</h4>
            <ul className="footer-col-links">
              <li>
                <button type="button" onClick={() => navigate('/why-bizsyncos')}>
                  BizSyncOS vs Unicommerce
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/why-bizsyncos')}>
                  BizSyncOS vs Vinculum
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/why-bizsyncos')}>
                  BizSyncOS vs Odoo ERP
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/why-bizsyncos')}>
                  BizSyncOS vs Zoho One
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/why-bizsyncos')}>
                  BizSyncOS vs Fragmented Stack
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-col-links">
              <li>
                <button type="button" onClick={() => navigate('/about')}>
                  About BizSyncOS
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/pricing')}>
                  Pricing Plans
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/docs')}>
                  Documentation &amp; API
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/contact')}>
                  Contact Sales
                </button>
              </li>
              <li>
                <a href="mailto:support@bizsyncos.com">support@bizsyncos.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. DEEP DARK NAVY SUB-FOOTER BAR */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-wave-accent" aria-hidden="true" />
        <div className="footer-bottom-inner">
          <div className="footer-bottom-left">
            <span className="footer-copyright">
              &copy; 2026 BizSyncOS Technologies Pvt. Ltd. All rights reserved.
            </span>
            <span className="footer-region">
              <span className="footer-flag-badge" aria-hidden="true">
                <svg width="16" height="11" viewBox="0 0 18 12" fill="none">
                  <rect width="18" height="4" fill="#FF9933" />
                  <rect y="4" width="18" height="4" fill="#FFFFFF" />
                  <rect y="8" width="18" height="4" fill="#138808" />
                  <circle cx="9" cy="6" r="1.5" stroke="#000080" strokeWidth="0.6" />
                </svg>
              </span>
              Engineered with pride in Bengaluru, India for global commerce.
            </span>
          </div>

          <div className="footer-bottom-center">
            <span className="footer-status-pill">
              <span className="footer-status-dot" /> 99.99% Operational SLA
            </span>
          </div>

          <div className="footer-bottom-right">
            <button type="button" onClick={() => navigate('/docs')}>
              Privacy Policy
            </button>
            <span className="footer-legal-sep">|</span>
            <button type="button" onClick={() => navigate('/docs')}>
              Terms of Service
            </button>
            <span className="footer-legal-sep">|</span>
            <button type="button" onClick={() => navigate('/product')}>
              Security &amp; Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(resolveCurrentRoute);
  const isAuthRoute = route === '/login' || route === '/signup';
  useEffect(() => {
    const destination = directAccessRoutes[route];
    if (destination) {
      window.location.replace(destination);
    }
  }, [route]);
  useEffect(() => {
    const onPopState = () => setRoute(resolveCurrentRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const navigate = useCallback((nextRoute: Route) => {
    const frontend = document.querySelector<HTMLMetaElement>('meta[name="auth-frontend"]')?.content;
    if (frontend && nextRoute !== '/login') {
      window.location.assign(`${frontend}${nextRoute}`);
      return;
    }
    const destination = directAccessRoutes[nextRoute];
    if (destination) {
      window.location.assign(destination);
      return;
    }
    window.history.pushState({}, '', nextRoute);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      {!isAuthRoute && <Header navigate={navigate} currentRoute={route} />}
      {route === '/' ? (
        <PremiumHome navigate={navigate} />
      ) : (
        <PublicPage route={route} navigate={navigate} />
      )}
      {!isAuthRoute && <Footer navigate={navigate} />}
      {!isAuthRoute && <AiChatbotWidget navigate={navigate} />}
    </>
  );
}
