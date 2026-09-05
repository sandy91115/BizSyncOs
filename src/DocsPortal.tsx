import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
    ArrowRight,
    BarChart3,
    BrainCircuit,
    Building2,
    Check,
    ChevronDown,
    CircleDollarSign,
    CircleHelp,
    ClipboardList,
    FileText,
    Globe2,
    Layers3,
    LockKeyhole,
    MessageSquareText,
    PackageCheck,
    PlugZap,
    Search,
    ShieldCheck,
    Sparkles,
    Truck,
    UsersRound,
    Warehouse,
    Workflow,
} from 'lucide-react';
import { useMemo, useState } from 'react';

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

type ModuleGuide = {
    title: string;
    description: string;
    icon: LucideIcon;
    tint: string;
};

const guideGroups = [
    { id: 'start', label: 'Get started', note: 'Company, people, first run' },
    { id: 'operate', label: 'Run operations', note: 'Modules and daily work' },
    {
        id: 'intelligence',
        label: 'Intelligence',
        note: 'Automation and Copilot',
    },
    {
        id: 'connect',
        label: 'Connect and scale',
        note: 'Integrations and billing',
    },
    {
        id: 'support',
        label: 'Help centre',
        note: 'Troubleshooting and support',
    },
] as const;

const guideTopics: GuideTopic[] = [
    {
        id: 'setup',
        group: 'start',
        label: 'Set up your company',
        description:
            'Create the workspace, set local business defaults, and choose a starting plan.',
        icon: Building2,
    },
    {
        id: 'workspace',
        group: 'start',
        label: 'Invite your team',
        description:
            'Assign roles and give every person the access they need — no more, no less.',
        icon: UsersRound,
    },
    {
        id: 'modules',
        group: 'operate',
        label: 'Run your core modules',
        description:
            'Learn where CRM, orders, inventory, warehouse, finance, and reports connect.',
        icon: Layers3,
    },
    {
        id: 'automation',
        group: 'intelligence',
        label: 'Design safe automations',
        description:
            'Turn business events into repeatable workflows with approvals and audit history.',
        icon: Workflow,
    },
    {
        id: 'copilot',
        group: 'intelligence',
        label: 'Use Business Copilot',
        description:
            'Ask grounded questions, review evidence, and route recommendations for approval.',
        icon: BrainCircuit,
    },
    {
        id: 'integrations',
        group: 'connect',
        label: 'Connect channels',
        description:
            'Authorize integrations, select sync scope, and monitor every incoming event.',
        icon: PlugZap,
    },
    {
        id: 'billing',
        group: 'connect',
        label: 'Plans and billing',
        description:
            'Understand trial access, capability-based plans, usage, and subscription changes.',
        icon: CircleDollarSign,
    },
    {
        id: 'help',
        group: 'support',
        label: 'Troubleshoot confidently',
        description:
            'Resolve the most common workspace, sync, automation, and AI access issues.',
        icon: CircleHelp,
    },
];

const moduleGuides: ModuleGuide[] = [
    {
        title: 'CRM & Leads',
        description:
            'Capture leads, preserve customer history, plan follow-ups, and convert with context.',
        icon: UsersRound,
        tint: 'teal',
    },
    {
        title: 'Orders',
        description:
            'Move quotations, sales orders, cancellations, and returns through a clear lifecycle.',
        icon: ClipboardList,
        tint: 'blue',
    },
    {
        title: 'Inventory',
        description:
            'Maintain products, stock locations, reservations, reorder signals, and adjustments.',
        icon: Layers3,
        tint: 'violet',
    },
    {
        title: 'Warehouse',
        description:
            'Coordinate receiving, put-away, pick, pack, dispatch, and fulfillment handoffs.',
        icon: Warehouse,
        tint: 'amber',
    },
    {
        title: 'Purchasing',
        description:
            'Create requests and purchase orders, receive stock, and retain supplier context.',
        icon: PackageCheck,
        tint: 'orange',
    },
    {
        title: 'Finance',
        description:
            'Track invoices, payments, receivables, credits, and collection priorities.',
        icon: CircleDollarSign,
        tint: 'green',
    },
    {
        title: 'Marketing',
        description:
            'Manage consent-aware audiences, campaigns, communication outcomes, and recovery.',
        icon: MessageSquareText,
        tint: 'rose',
    },
    {
        title: 'Reports & analytics',
        description:
            'Review KPIs, trends, business health, forecasts, risks, and opportunity signals.',
        icon: BarChart3,
        tint: 'cyan',
    },
];

const troubleshooting = [
    {
        question: 'A teammate cannot open our workspace. What should I check?',
        answer: 'Confirm they accepted the invitation, selected the correct workspace, and have a role that includes the requested capability. Owners and administrators can review memberships from Team settings.',
    },
    {
        question: 'Why is an integration showing a failed sync?',
        answer: 'Open Sync logs first. Check the connector status, credential validity, event or webhook error, and affected record. Correct the cause before replaying a failed job so duplicate data is not introduced.',
    },
    {
        question: 'Why did an automation stop at approval?',
        answer: 'High-impact actions are intentionally held until an authorized person approves, rejects, delegates, or escalates the request. Review the execution history to see the approval policy and next owner.',
    },
    {
        question: 'Why can’t I use Business Copilot or see an AI feature?',
        answer: 'AI access depends on the active plan, company entitlement, and your role. A workspace owner can review subscription capabilities, while an administrator can confirm your workspace membership and access level.',
    },
];

function scrollToGuide(id: string) {
    document
        .getElementById(id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function GuideIcon({
    icon: Icon,
    size = 18,
}: {
    icon: LucideIcon;
    size?: number;
}) {
    return <Icon aria-hidden="true" size={size} strokeWidth={1.8} />;
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
    const [activeGroup, setActiveGroup] = useState('start');
    const [openIssue, setOpenIssue] = useState<number | null>(0);

    const matchingTopics = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return guideTopics;
        return guideTopics.filter((topic) =>
            `${topic.label} ${topic.description} ${topic.group}`
                .toLowerCase()
                .includes(normalizedQuery),
        );
    }, [query]);

    const chooseTopic = (topic: GuideTopic) => {
        setActiveGroup(topic.group);
        setQuery('');
        scrollToGuide(topic.id);
    };

    const sectionReveal = (delay = 0) =>
        prefersReducedMotion
            ? {}
            : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.16 },
                  transition: {
                      duration: 0.5,
                      delay,
                      ease: [0.16, 1, 0.3, 1] as const,
                  },
              };

    return (
        <main className="docs-portal">
            <section className="docs-hero" aria-labelledby="docs-title">
                <span className="docs-hero-grid" aria-hidden="true" />
                <div className="docs-layout">
                    <motion.div
                        className="docs-hero-copy"
                        initial={
                            prefersReducedMotion ? false : { opacity: 0, y: 20 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.56,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <p className="docs-eyebrow">
                            <BookOpenMark /> PRODUCT DOCUMENTATION
                        </p>
                        <h1 id="docs-title">
                            Build a connected business,{' '}
                            <em>one confident step</em> at a time.
                        </h1>
                        <p>
                            A practical guide to setting up BizSyncOS, bringing
                            your team into one workspace, and running every
                            module with the context your business needs.
                        </p>

                        <label className="docs-search-box">
                            <Search size={19} aria-hidden="true" />
                            <input
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder="Search setup, automation, invoices, integrations…"
                                aria-label="Search BizSyncOS documentation"
                            />
                            <span>⌘ K</span>
                        </label>
                        {query ? (
                            <div className="docs-search-results" role="list">
                                {matchingTopics.length ? (
                                    matchingTopics.map((topic) => (
                                        <button
                                            key={topic.id}
                                            type="button"
                                            onClick={() => chooseTopic(topic)}
                                            role="listitem"
                                        >
                                            <GuideIcon icon={topic.icon} />
                                            <span>
                                                <strong>{topic.label}</strong>
                                                <small>
                                                    {topic.description}
                                                </small>
                                            </span>
                                            <ArrowRight size={15} />
                                        </button>
                                    ))
                                ) : (
                                    <p>
                                        No matching guide yet. Try “team”,
                                        “workflow”, “invoice”, or “AI”.
                                    </p>
                                )}
                            </div>
                        ) : null}

                        <div className="docs-hero-actions">
                            <button
                                type="button"
                                className="docs-primary-action"
                                onClick={() => scrollToGuide('setup')}
                            >
                                Start with company setup{' '}
                                <ArrowRight size={17} />
                            </button>
                            <button
                                type="button"
                                className="docs-secondary-action"
                                onClick={() => navigate('/demo')}
                            >
                                Explore the live demo <ArrowRight size={17} />
                            </button>
                        </div>
                    </motion.div>

                    <motion.aside
                        className="docs-launch-card"
                        initial={
                            prefersReducedMotion
                                ? false
                                : { opacity: 0, scale: 0.96, y: 16 }
                        }
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 0.62,
                            delay: prefersReducedMotion ? 0 : 0.1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div className="docs-launch-head">
                            <span>
                                <Sparkles size={16} /> YOUR FIRST 30 MINUTES
                            </span>
                            <i />
                        </div>
                        <h2>Turn the demo into your operating system.</h2>
                        <ol>
                            <li>
                                <b>01</b>
                                <span>
                                    <strong>Shape the company</strong>
                                    <small>
                                        Locale, currency, year, and data rules.
                                    </small>
                                </span>
                            </li>
                            <li>
                                <b>02</b>
                                <span>
                                    <strong>Bring in the right people</strong>
                                    <small>
                                        Teams, roles, responsibilities, and
                                        access.
                                    </small>
                                </span>
                            </li>
                            <li>
                                <b>03</b>
                                <span>
                                    <strong>Start an operating flow</strong>
                                    <small>
                                        Customer, product, order, or warehouse
                                        first.
                                    </small>
                                </span>
                            </li>
                            <li>
                                <b>04</b>
                                <span>
                                    <strong>Connect intelligence safely</strong>
                                    <small>
                                        Review insights, approvals, and
                                        automations.
                                    </small>
                                </span>
                            </li>
                        </ol>
                        <div className="docs-launch-foot">
                            <Check size={16} /> Full-product demo access for 3
                            days
                        </div>
                    </motion.aside>
                </div>
            </section>

            <section
                className="docs-quick-nav"
                aria-label="Documentation navigation"
            >
                <div className="docs-layout">
                    <p>Explore the guide</p>
                    <div>
                        {guideGroups.map((group) => (
                            <button
                                key={group.id}
                                type="button"
                                className={
                                    activeGroup === group.id ? 'is-active' : ''
                                }
                                onClick={() => {
                                    setActiveGroup(group.id);
                                    const firstTopic = guideTopics.find(
                                        (topic) => topic.group === group.id,
                                    );
                                    if (firstTopic)
                                        scrollToGuide(firstTopic.id);
                                }}
                            >
                                {group.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="docs-guide-overview"
                aria-label="Guide overview"
            >
                <div className="docs-layout docs-guide-overview-grid">
                    <aside className="docs-guide-sidebar">
                        <p>DOCUMENTATION MAP</p>
                        <nav aria-label="Documentation sections">
                            {guideGroups.map((group) => (
                                <div key={group.id}>
                                    <button
                                        type="button"
                                        className={
                                            activeGroup === group.id
                                                ? 'is-active'
                                                : ''
                                        }
                                        onClick={() => setActiveGroup(group.id)}
                                    >
                                        <span>{group.label}</span>
                                        <ChevronDown size={15} />
                                    </button>
                                    {activeGroup === group.id ? (
                                        <ul>
                                            {guideTopics
                                                .filter(
                                                    (topic) =>
                                                        topic.group ===
                                                        group.id,
                                                )
                                                .map((topic) => (
                                                    <li key={topic.id}>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                scrollToGuide(
                                                                    topic.id,
                                                                )
                                                            }
                                                        >
                                                            {topic.label}
                                                        </button>
                                                    </li>
                                                ))}
                                        </ul>
                                    ) : null}
                                </div>
                            ))}
                        </nav>
                        <div className="docs-sidebar-support">
                            <ShieldCheck size={20} />
                            <strong>Need a rollout plan?</strong>
                            <span>
                                Start with the operating depth you need now,
                                then expand without losing context.
                            </span>
                            <button
                                type="button"
                                onClick={() => navigate('/contact')}
                            >
                                Talk to a specialist <ArrowRight size={14} />
                            </button>
                        </div>
                    </aside>

                    <div className="docs-guide-index">
                        <DocsSectionHeading
                            eyebrow="THE BIZSYNCOS PLAYBOOK"
                            title="Start with the workflow, not the software."
                            copy="This guide follows the same sequence your team will use in the product: company context first, daily operations next, then intelligence and scale."
                        />
                        <div className="docs-topic-grid">
                            {matchingTopics.map((topic, index) => {
                                const Icon = topic.icon;
                                return (
                                    <motion.button
                                        key={topic.id}
                                        type="button"
                                        className={`docs-topic-card ${
                                            activeGroup === topic.group
                                                ? 'is-prioritised'
                                                : ''
                                        }`}
                                        onClick={() => chooseTopic(topic)}
                                        {...sectionReveal(index * 0.035)}
                                    >
                                        <span className="docs-topic-icon">
                                            <Icon size={20} />
                                        </span>
                                        <small>
                                            {
                                                guideGroups.find(
                                                    (group) =>
                                                        group.id ===
                                                        topic.group,
                                                )?.label
                                            }
                                        </small>
                                        <strong>{topic.label}</strong>
                                        <p>{topic.description}</p>
                                        <em>
                                            Open guide <ArrowRight size={14} />
                                        </em>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="setup"
                className="docs-content-section docs-setup-section"
            >
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="01 / COMPANY SETUP"
                        title="Give every record a business context from day one."
                        copy="Your workspace is the home for one company’s people, operating rules, connected data, and subscription capabilities. Complete these foundations before importing or creating operational data."
                    />
                    <div className="docs-setup-steps">
                        {[
                            [
                                'Company profile',
                                'Add the legal business name, operating address, country, timezone, primary currency, fiscal year, and regional tax configuration.',
                                Building2,
                            ],
                            [
                                'Workspace defaults',
                                'Choose how your team will describe products, locations, customers, sales orders, and internal references.',
                                Layers3,
                            ],
                            [
                                'Operating locations',
                                'Create warehouses or stock locations before stock arrives so inventory movements stay traceable.',
                                Warehouse,
                            ],
                            [
                                'Launch the first flow',
                                'Start with a lead, a product, a quotation, or an order. The system carries the context forward.',
                                Sparkles,
                            ],
                        ].map(([title, text, Icon], index) => {
                            const StepIcon = Icon as LucideIcon;
                            return (
                                <motion.article
                                    key={title as string}
                                    {...sectionReveal(index * 0.06)}
                                >
                                    <span>0{index + 1}</span>
                                    <div>
                                        <StepIcon size={20} />
                                        <h3>{title as string}</h3>
                                        <p>{text as string}</p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                    <div className="docs-callout docs-callout-plain">
                        <LockKeyhole size={19} />
                        <div>
                            <strong>Keep the workspace boundary intact.</strong>
                            <p>
                                Company data, permissions, integrations, AI
                                memory, and audit history are designed to stay
                                inside the selected workspace.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="workspace"
                className="docs-content-section docs-workspace-section"
            >
                <div className="docs-layout docs-workspace-grid">
                    <div>
                        <DocsSectionHeading
                            eyebrow="02 / PEOPLE AND ACCESS"
                            title="Make ownership obvious before work begins."
                            copy="Invite teammates after the company is configured. Give each person a role that fits the decisions they are trusted to make, rather than sharing an owner login."
                        />
                        <div className="docs-role-list">
                            <article>
                                <span>
                                    <Building2 size={18} />
                                </span>
                                <div>
                                    <strong>Owner</strong>
                                    <p>
                                        Company strategy, plan, entitlements,
                                        and sensitive approvals.
                                    </p>
                                </div>
                            </article>
                            <article>
                                <span>
                                    <ShieldCheck size={18} />
                                </span>
                                <div>
                                    <strong>Administrator</strong>
                                    <p>
                                        Workspace configuration, memberships,
                                        permissions, and operational setup.
                                    </p>
                                </div>
                            </article>
                            <article>
                                <span>
                                    <UsersRound size={18} />
                                </span>
                                <div>
                                    <strong>Functional teams</strong>
                                    <p>
                                        Sales, operations, warehouse,
                                        procurement, finance, and marketing
                                        access by responsibility.
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                    <motion.div
                        className="docs-workspace-map"
                        {...sectionReveal(0.1)}
                    >
                        <p>WORKSPACE OPERATING LOOP</p>
                        <div
                            className="docs-workspace-map-lines"
                            aria-hidden="true"
                        />
                        {[
                            ['Owner', 'Sets direction'],
                            ['Admin', 'Sets controls'],
                            ['Teams', 'Run daily work'],
                            ['BizSyncOS', 'Shares context'],
                        ].map(([label, detail], index) => (
                            <div
                                key={label}
                                className={`docs-workspace-node node-${index + 1}`}
                            >
                                <b>{label}</b>
                                <small>{detail}</small>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section
                id="modules"
                className="docs-content-section docs-modules-section"
            >
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="03 / DAILY OPERATIONS"
                        title="Every module keeps the next team informed."
                        copy="BizSyncOS is most useful when data moves with the work. A customer, item, order, stock movement, payment, and report should tell the same business story — not create a new spreadsheet."
                    />
                    <div className="docs-module-grid">
                        {moduleGuides.map((module, index) => {
                            const Icon = module.icon;
                            return (
                                <motion.article
                                    key={module.title}
                                    className={`docs-module-card ${module.tint}`}
                                    {...sectionReveal(index * 0.035)}
                                >
                                    <span>
                                        <Icon size={21} />
                                    </span>
                                    <h3>{module.title}</h3>
                                    <p>{module.description}</p>
                                </motion.article>
                            );
                        })}
                    </div>
                    <div className="docs-operating-strip">
                        <span>Typical operating path</span>
                        {[
                            'Lead',
                            'Customer',
                            'Quotation',
                            'Order',
                            'Stock',
                            'Invoice',
                            'Payment',
                            'Insight',
                        ].map((item, index) => (
                            <div key={item}>
                                <b>{item}</b>
                                {index < 7 ? <ArrowRight size={14} /> : null}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="automation"
                className="docs-content-section docs-automation-section"
            >
                <div className="docs-layout">
                    <div className="docs-automation-heading">
                        <DocsSectionHeading
                            eyebrow="04 / AUTOMATION WITH ACCOUNTABILITY"
                            title="Automate repeatable work. Keep people in control."
                            copy="A workflow starts from a business event, checks known conditions, and follows an explicit policy. When an action could affect money, stock, customers, or external systems, the correct person stays in the decision loop."
                        />
                        <div className="docs-automation-safety">
                            <ShieldCheck size={20} />
                            <div>
                                <strong>Approval-aware by design</strong>
                                <span>
                                    No black-box financial, stock, or customer
                                    actions.
                                </span>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        className="docs-workflow-board"
                        {...sectionReveal(0.1)}
                    >
                        <p>EXAMPLE: HIGH-VALUE COD ORDER</p>
                        <div className="docs-workflow-steps">
                            {[
                                ['Trigger', 'Order created', ClipboardList],
                                ['Condition', 'Payment = COD', Layers3],
                                ['Intelligence', 'Risk context', BrainCircuit],
                                ['Approval', 'Owner review', ShieldCheck],
                                [
                                    'Action',
                                    'Verify customer',
                                    MessageSquareText,
                                ],
                                ['Audit', 'Execution history', FileText],
                            ].map(([label, detail, Icon], index) => {
                                const StepIcon = Icon as LucideIcon;
                                return (
                                    <div key={label as string}>
                                        <article
                                            className={
                                                index === 3 ? 'is-approval' : ''
                                            }
                                        >
                                            <span>
                                                <StepIcon size={18} />
                                            </span>
                                            <small>{label as string}</small>
                                            <strong>{detail as string}</strong>
                                        </article>
                                        {index < 5 ? (
                                            <ArrowRight size={17} />
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                    <div className="docs-principle-grid">
                        <article>
                            <Check size={17} />
                            <span>
                                <strong>Use templates to start</strong>Lead
                                follow-up, low stock, delayed shipment, invoice
                                reminder, and daily review are clear first
                                candidates.
                            </span>
                        </article>
                        <article>
                            <Check size={17} />
                            <span>
                                <strong>
                                    Test the policy before publishing
                                </strong>
                                Check triggers, variables, permissions,
                                condition paths, timeouts, and fallback owners.
                            </span>
                        </article>
                        <article>
                            <Check size={17} />
                            <span>
                                <strong>Review execution history</strong>Use
                                runs, waits, retries, approvals, and audit
                                records to understand exactly what happened.
                            </span>
                        </article>
                    </div>
                </div>
            </section>

            <section
                id="copilot"
                className="docs-content-section docs-copilot-section"
            >
                <div className="docs-layout docs-copilot-layout">
                    <div>
                        <DocsSectionHeading
                            eyebrow="05 / BUSINESS COPILOT"
                            title="Ask questions. Inspect the evidence. Decide with confidence."
                            copy="Business Copilot is designed to explain verified, tenant-scoped business data. It can surface a recommendation, but it does not bypass your permissions or execute a transaction on its own."
                        />
                        <div className="docs-copilot-rules">
                            <article>
                                <BrainCircuit size={19} />
                                <span>
                                    <strong>Ask a business question</strong>
                                    <p>
                                        Try sales, receivables, low stock, top
                                        products, failed syncs, or business
                                        health.
                                    </p>
                                </span>
                            </article>
                            <article>
                                <BarChart3 size={19} />
                                <span>
                                    <strong>Read the evidence label</strong>
                                    <p>
                                        Authoritative numbers come from
                                        validated business queries, not invented
                                        prompt calculations.
                                    </p>
                                </span>
                            </article>
                            <article>
                                <ShieldCheck size={19} />
                                <span>
                                    <strong>Approve the next action</strong>
                                    <p>
                                        Recommendations become workflow
                                        follow-ups only after the required human
                                        approval.
                                    </p>
                                </span>
                            </article>
                        </div>
                    </div>
                    <motion.aside
                        className="docs-copilot-preview"
                        {...sectionReveal(0.08)}
                    >
                        <div className="docs-preview-top">
                            <span>
                                <BrainCircuit size={17} /> BIZSYNCOS BUSINESS
                                COPILOT
                            </span>
                            <i>Grounded</i>
                        </div>
                        <div className="docs-preview-question">
                            What needs attention before today’s dispatch?
                        </div>
                        <div className="docs-preview-answer">
                            <p>
                                One product is at its reorder threshold and two
                                invoices are overdue.
                            </p>
                            <ul>
                                <li>
                                    <Check size={14} /> Review stock reservation
                                    for the low-stock SKU.
                                </li>
                                <li>
                                    <Check size={14} /> Send an owner-approved
                                    collection follow-up.
                                </li>
                            </ul>
                            <span>Evidence: verified workspace signals</span>
                        </div>
                        <div className="docs-preview-note">
                            <Sparkles size={15} /> Recommendation prepared — no
                            action executed.
                        </div>
                    </motion.aside>
                </div>
            </section>

            <section
                id="integrations"
                className="docs-content-section docs-integrations-section"
            >
                <div className="docs-layout">
                    <DocsSectionHeading
                        eyebrow="06 / INTEGRATION HUB"
                        title="Connect channels without losing the source of truth."
                        copy="Integrations bring external signals into your operating context. Configure each connector deliberately, keep credentials secure, and use Sync logs to inspect or replay a failed exchange."
                    />
                    <div className="docs-integration-flow">
                        {[
                            [
                                'Authorize',
                                'Connect the account with an approved credential.',
                                LockKeyhole,
                            ],
                            [
                                'Scope',
                                'Choose stores, locations, direction, and sync windows.',
                                Globe2,
                            ],
                            [
                                'Normalize',
                                'Map incoming events into the shared business workflow.',
                                Layers3,
                            ],
                            [
                                'Observe',
                                'Use Sync logs, status, and audit history to investigate.',
                                BarChart3,
                            ],
                        ].map(([title, text, Icon], index) => {
                            const FlowIcon = Icon as LucideIcon;
                            return (
                                <motion.article
                                    key={title as string}
                                    {...sectionReveal(index * 0.06)}
                                >
                                    <span>0{index + 1}</span>
                                    <FlowIcon size={23} />
                                    <h3>{title as string}</h3>
                                    <p>{text as string}</p>
                                </motion.article>
                            );
                        })}
                    </div>
                    <div className="docs-integration-guardrails">
                        <div>
                            <Truck size={19} />
                            <strong>Shipping</strong>
                            <span>
                                Track dispatch, status, exceptions, and delivery
                                activity.
                            </span>
                        </div>
                        <div>
                            <CircleDollarSign size={19} />
                            <strong>Payments</strong>
                            <span>
                                Validate payment events before finance and order
                                updates.
                            </span>
                        </div>
                        <div>
                            <MessageSquareText size={19} />
                            <strong>Communication</strong>
                            <span>
                                Use controlled WhatsApp or email actions from
                                approved workflows.
                            </span>
                        </div>
                        <div>
                            <Globe2 size={19} />
                            <strong>Commerce</strong>
                            <span>
                                Keep channel-safe idempotency and reconciliation
                                in focus.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="billing"
                className="docs-content-section docs-billing-section"
            >
                <div className="docs-layout docs-billing-layout">
                    <div>
                        <DocsSectionHeading
                            eyebrow="07 / SUBSCRIPTIONS AND BILLING"
                            title="Choose capabilities that match the business you run today."
                            copy="A subscription belongs to one company. It defines the modules, users, usage, and support level available to that workspace, so access stays explicit as your organisation grows."
                        />
                        <button
                            type="button"
                            className="docs-text-action"
                            onClick={() => navigate('/pricing')}
                        >
                            Compare plans and capabilities{' '}
                            <ArrowRight size={17} />
                        </button>
                    </div>
                    <div className="docs-billing-list">
                        <article>
                            <span>
                                <Sparkles size={18} />
                            </span>
                            <div>
                                <strong>
                                    Start with a 3-day full-product demo
                                </strong>
                                <p>
                                    Explore core modules before choosing a
                                    long-term operating depth.
                                </p>
                            </div>
                        </article>
                        <article>
                            <span>
                                <Check size={18} />
                            </span>
                            <div>
                                <strong>
                                    Upgrade when teams or complexity expand
                                </strong>
                                <p>
                                    Add access to capabilities such as
                                    automation, AI, additional users, or
                                    warehouses when you are ready.
                                </p>
                            </div>
                        </article>
                        <article>
                            <span>
                                <ShieldCheck size={18} />
                            </span>
                            <div>
                                <strong>
                                    Keep owner visibility into access
                                </strong>
                                <p>
                                    Use Subscription and Team settings to review
                                    the active plan, scope, and available
                                    capabilities.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section
                id="help"
                className="docs-content-section docs-help-section"
            >
                <div className="docs-layout docs-help-layout">
                    <div>
                        <DocsSectionHeading
                            eyebrow="08 / HELP CENTRE"
                            title="Resolve the issue with context, not guesswork."
                            copy="Start with the workspace, record, workflow execution, or connector status that produced the problem. Most issues become straightforward once the relevant audit trail is in view."
                        />
                        <div className="docs-help-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/demo')}
                            >
                                Open live demo <ArrowRight size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/contact')}
                            >
                                Contact support <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="docs-troubleshooting-list">
                        {troubleshooting.map((item, index) => {
                            const isOpen = openIssue === index;
                            return (
                                <article
                                    key={item.question}
                                    className={isOpen ? 'is-open' : ''}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenIssue(isOpen ? null : index)
                                        }
                                        aria-expanded={isOpen}
                                    >
                                        <span>{item.question}</span>
                                        <ChevronDown size={19} />
                                    </button>
                                    {isOpen ? <p>{item.answer}</p> : null}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="docs-final-cta">
                <div className="docs-layout">
                    <div>
                        <p>
                            <Sparkles size={16} /> READY TO PUT THE GUIDE INTO
                            PRACTICE?
                        </p>
                        <h2>
                            See the complete operating system before you commit.
                        </h2>
                        <span>
                            Open the 3-day demo to follow a live customer,
                            order, inventory movement, approval, and business
                            insight from one connected workspace.
                        </span>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            Start 3-day demo <ArrowRight size={17} />
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/contact')}
                        >
                            Plan a rollout <ArrowRight size={17} />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

function BookOpenMark() {
    return (
        <span className="docs-book-mark" aria-hidden="true">
            <FileText size={14} />
        </span>
    );
}
