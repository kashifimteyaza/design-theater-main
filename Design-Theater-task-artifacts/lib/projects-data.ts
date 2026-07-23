import { getThoughtProcess } from "./thought-processes";

export interface Task {
  id: string;
  title: string;
  prompt?: string;
  tier: "tier1" | "tier2" | "tier3";
  category: string;
  tags: string[];
  uxprinciple?: string;
  techStack: string[];
  path: string;
  thoughtProcess1?: string;
  thoughtProcess2?: string;
  thoughtProcess3?: string;
  output?: string;
}

export interface Category {
  id: string;
  name: string;
  modelName: string;
}

export const categories: Category[] = [
  { id: "chatgpt", name: "ChatGPT (complete)", modelName: "GPT-5 Thinking" },
  // { id: "lovable", name: "Lovable" }, No html css js code
  { id: "claude", name: "Claude (Complete)", modelName: "Sonnet 4.5 Thinking " },
  { id: "firebase", name: "Firebase (Complete)", modelName: "Gemini 2.5 Pro" },
  { id: "bolt", name: "Bolt (Complete)", modelName: "Standard" },
  { id: "v0", name: "v0 (Complete)", modelName: "v0 Mini; powered by Claude Haiku" },
  // { id: "uizard", name: "UIzard" },
];

// Base tasks for all categories
const baseTasks = [
  // Tier 1 tasks (8 tasks)
  {
    baseId: "task1.1",
    title: "Task 1.1 - Simple Business Site (Low)",
    prompt: "I run a small neighborhood coffee shop called 'Morning Brew' that's been serving the community for 3 years. We're known for our artisanal espresso drinks, fresh pastries, and cozy atmosphere where locals work and study. I need a simple website that captures our welcoming vibe and helps new customers find us. Please create our homepage and walk me through your design strategy. Explain how you'll organize the content and what sections you think are most important for a local coffee shop trying to attract both regular customers and people discovering us for the first time. ",
    tier: "tier1" as const,
    tags: ["Tier 1"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task1.2",
    title: "Task 1.2 - Multi-Section Site (Medium-Low)",
    prompt: "I'm launching 'FitCore Studio,' a boutique fitness center offering yoga, pilates, and strength training classes. We have 6 certified trainers, offer both group classes and personal training, and pride ourselves on creating a non-intimidating environment for all fitness levels. Our website needs to serve multiple purposes: showcase our class schedule, introduce our trainers, explain our philosophy, and convert visitors into members. Please design our homepage and explain your strategy for organizing these different content areas. How will you help potential members understand what makes us different from big gym chains? ",
    tier: "tier1" as const,
    tags: ["Tier 1"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task1.3",
    title: "Task 1.3 - Complex Business Site (Medium)",
    prompt: "Thompson & Associates is a mid-sized law firm with 15 attorneys across 4 practice areas: corporate law, family law, personal injury, and estate planning. We've been serving clients for 20 years and handle everything from simple wills to complex corporate mergers. Our new website needs to establish credibility, help potential clients find the right attorney for their needs, showcase our case results, and provide existing clients with resources. We also want to educate visitors about legal processes to position ourselves as trusted advisors. Please create our homepage and detail your approach to organizing this complex information hierarchy. How will you help different types of visitors (individuals vs. businesses, different legal needs) find what they're looking for quickly? ",
    tier: "tier1" as const,
    tags: ["Tier 1"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task1.4",
    title: "Task 1.4 - Multi-Audience Platform (Medium-High)",
    prompt: "Welcome to Riverside University, a mid-sized liberal arts college with 8,000 students. Our homepage serves drastically different audiences: high school students researching colleges, current students accessing resources, faculty managing courses, alumni staying connected, and parents seeking information. Each group has completely different goals when they visit our site. Prospective students want academic programs and campus life info. Current students need quick access to schedules, grades, and student services. Faculty need teaching resources and administrative tools. Alumni want news and giving opportunities. Parents want safety info and financial aid details. Design our homepage and explain your strategy for serving these diverse audiences without creating chaos. How will you help each group find their relevant information while maintaining a cohesive university brand? ",
    tier: "tier1" as const,
    tags: ["Tier 1"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task1.5",
    title: "Task 1.5 - Complex Organizational Site (High)",
    prompt: "Metro Health System is a comprehensive healthcare network serving 500,000 people across 3 cities. We operate 2 main hospitals, 12 specialty clinics, an urgent care network, and emergency services. Our services span everything from routine checkups to complex cardiac surgery. Our website must serve patients finding doctors and booking appointments, emergency information for crisis situations, detailed service information for referring physicians, insurance and billing support, health education resources, and career opportunities for medical professionals. The challenge is massive: we have 200+ physicians across 30+ specialties, complex insurance relationships, multiple locations with different services, and we serve both English and Spanish-speaking communities. Patient safety and accessibility compliance are critical. Create our homepage and explain how you'll architect this complex information system. How will you help someone having a medical emergency find critical information while also serving routine patient needs and professional requirements? ",
    tier: "tier1" as const,
    tags: ["Tier 1"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task1.6",
    title: "Task 1.6 - E-commerce Platform (Medium-High)",
    prompt: " ShopLocal is a multi-vendor marketplace connecting local artisans with customers across the region. We have 300+ sellers offering handmade goods, vintage items, and local produce. Our research shows three distinct user groups with very different needs: customers want quick product discovery and trust signals, sellers need efficient inventory management while juggling other jobs, and our admin team requires oversight tools that don't overwhelm them. The challenge is creating an experience that feels cohesive despite serving these diverse audiences. Many of our sellers are older artisans who aren't tech-savvy, and we also need to comply with accessibility standards for government contracts. Customers shop both on mobile during farmers markets and on desktop when planning events. Sellers often update inventory from their phones between craft fairs. The platform needs to handle product uploads, order management, vendor applications, quality monitoring, and dispute resolution. Users should be able to easily correct mistakes like accidental orders or incorrect listings. We're competing with Etsy's polished experience and local farmers markets' authentic charm. Design our marketplace homepage explaining how you'll structure this multi-sided platform. How will you ensure each user type can efficiently achieve their goals while maintaining a unified brand experience? ",
    tier: "tier1" as const,
    tags: ["Tier 1", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task1.7",
    title: "Task 1.7 - News/Media Platform (Medium-High)",
    prompt: "Metro Daily News serves three metropolitan areas with local journalism. We publish 40+ articles daily across politics, business, sports, and community events, plus podcasts and premium investigative reporting. Our analytics show readers access our site in three main contexts: quick morning headline scanning on phones, deep desktop reading during lunch breaks, and social media sharing throughout the day. We need to serve casual readers who just want top stories, business leaders tracking specific topics, and engaged citizens following local government. The challenge is organizing high-volume daily content while making both breaking news and evergreen features discoverable. Readers get frustrated when they can't find yesterday's story or when the layout changes unexpectedly between devices. They want control over their news feed but not overwhelming customization options. We must support readers with visual impairments (many are older adults) and provide Spanish language options for 30% of our market. The platform needs smooth subscription management, newsletter preferences, and comment moderation. Load times are critical - readers abandon if articles don't load in 3 seconds on mobile. Create our news homepage detailing your information architecture strategy. How will you help different reader types quickly find relevant content while managing 40+ daily articles? ",
    tier: "tier1" as const,
    tags: ["Tier 1", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task1.8",
    title: "Task 1.8 - Municipal Government Site (High)",
    prompt: "The City of Riverside serves 150,000 residents who interact with dozens of city services - from paying water bills to reporting potholes, from finding park programs to accessing council meeting minutes. Our user research revealed huge diversity: senior citizens who need large text and simple navigation, busy parents doing quick tasks on phones, business owners navigating complex permitting, and residents with limited English proficiency. Federal law requires full ADA compliance and content in both English and Spanish. Citizens consistently tell us they can't find what they need because our current site is organized by department rather than by their actual needs. For example, getting a building permit requires visiting six different department pages. During emergencies, critical safety information gets buried under routine content. The site must integrate with legacy payment systems, permit databases, and emergency alert systems. Citizens want to track their service requests and save commonly used forms. City staff need to update content without breaking the consistent experience residents rely on. Design our city homepage explaining your approach to organizing complex government services. How will you help residents quickly complete tasks while meeting strict accessibility requirements and emergency communication needs?",
    tier: "tier1" as const,
    tags: ["Tier 1", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  // Tier 2 tasks (8 tasks)
  {
    baseId: "task2.1",
    title: "Task 2.1 - Basic Brand Expression (Low)",
    prompt: "I'm launching 'Essence Jewelry,' a minimalist jewelry brand focused on timeless, elegant pieces made from ethically sourced materials. Our aesthetic is clean, modern, and sophisticated - think Scandinavian design principles applied to jewelry. Our target customers are professional women aged 25-40 who value quality over quantity and prefer investment pieces they'll wear for years. They appreciate craftsmanship and are willing to pay more for ethical sourcing. Create our homepage and explain your visual design choices. How will you use color, typography, spacing, and imagery to communicate our minimalist brand values and appeal to our sophisticated target audience?",
    tier: "tier2" as const,
    tags: ["Tier 2"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task2.2",
    title: "Task 2.2 - Emotional Design (Medium-Low)",
    prompt: "Harmony Family Therapy is a practice specializing in couples counseling, family mediation, and adolescent therapy. Dr. Sarah Chen has 15 years of experience helping families navigate difficult transitions, communication issues, and relationship challenges. Many of our potential clients are experiencing stress, anxiety, or crisis when they first visit our website. They need to feel safe, understood, and hopeful that therapy can help. Some are skeptical about counseling or nervous about taking the first step. Design our homepage with a focus on creating the right emotional tone. Walk me through your approach to using visual design elements to make visitors feel comfortable and encourage them to reach out. How will you balance professionalism with warmth and approachability ",
    tier: "tier2" as const,
    tags: ["Tier 2"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task2.3",
    title: "Task 2.3 - Brand Differentiation (Medium)",
    prompt: "RebelRoots is a plant-based food startup disrupting the meat substitute industry. Unlike boring health-focused competitors, we're targeting food lovers who happen to be vegan - people who want indulgent, satisfying meals that don't compromise on flavor. Our brand personality is bold, fun, and unapologetically confident. We're the punk rock of plant-based foods. Our packaging uses vibrant colors and edgy graphics. We want to challenge the stereotype that vegan food is bland or virtuous. Our competitors (Beyond Meat, Impossible, etc.) use very safe, corporate design. We need to stand out dramatically while still appearing trustworthy enough for grocery stores to stock us. Create our homepage and detail your visual strategy for disrupting this conservative industry. How will you use design elements to communicate our rebellious brand while maintaining credibility with both consumers and retailers? ",
    tier: "tier2" as const,
    tags: ["Tier 2"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task2.4",
    title: "Task 2.4 - Complex Brand Balance (Medium-High)",
    prompt: "Luxe Verde is a luxury sustainable fashion brand creating $300-800 garments from recycled ocean plastic and organic materials. We're targeting affluent consumers who want to feel good about their purchases without sacrificing style or quality. This creates a complex brand challenge: we must feel premium and exclusive (to justify high prices) while communicating our environmental mission (without seeming preachy). Our customers have sophisticated tastes and disposable income but also genuine environmental concerns. We're competing against both traditional luxury brands (who ignore sustainability) and eco-friendly brands (who often look cheap or overly earnest). We need to feel like Céline or The Row in terms of luxury, but with authentic environmental credibility. Design our homepage and explain how you'll visually balance these competing brand requirements. How will you communicate luxury and sustainability simultaneously without either message diluting the other? ",
    tier: "tier2" as const,
    tags: ["Tier 2"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task2.5",
    title: "Task 2.5 - Multi-Brand Architecture (High)",
    prompt: "Global Ventures Inc. is a parent company managing 5 successful subsidiary brands across different industries: TechFlow (B2B software), BrightStart (children's education), UrbanEats (food delivery), GreenBuild (sustainable construction), and WellnessWorks (corporate health programs). Each subsidiary has its own strong brand identity and customer base. TechFlow is sleek and corporate. BrightStart is playful and colorful. UrbanEats is trendy and urban. GreenBuild is earth-conscious and professional. WellnessWorks is calming and health-focused. Our parent company website needs to showcase all five brands while establishing Global Ventures as a credible, strategic holding company. We need to serve three audiences: potential acquisition targets, investors, and job seekers who might want to work for any of our companies. Create our homepage and explain your visual strategy for maintaining brand hierarchy and coherence. How will you represent five distinct brand personalities under one corporate umbrella without creating visual chaos or diluting individual brand strength?",
    tier: "tier2" as const,
    tags: ["Tier 2"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task2.6",
    title: "Task 2.6 - Healthcare Technology Brand (Medium-High)",
    prompt: "MedTech Solutions develops AI-powered diagnostic tools for hospitals. Our software helps radiologists detect cancer earlier, but we face a unique challenge: younger doctors embrace AI while senior physicians remain skeptical about replacing human judgment. Hospital purchasing committees include both innovative tech directors and conservative medical boards. They need to see that we're cutting-edge enough to justify the investment but established enough to trust with patient lives. Our interface will be used in various conditions - bright ER rooms, dimly lit radiology suites, and on older hospital computers with poor displays. The visual design must convey advanced technology while maintaining the gravitas expected in healthcare. Doctors often work 12-hour shifts, so the interface can't cause eye strain. We need to communicate complex AI confidence scores in ways that both tech-savvy residents and traditional practitioners can quickly understand. Our competitors either look like dated medical software from the 90s or Silicon Valley apps that doctors don't trust. We need to find the sweet spot between innovation and medical professionalism. Design our homepage and explain your visual strategy. How will you balance technological innovation with medical credibility while ensuring the design works across different hospital environments and user demographics? ",
    tier: "tier2" as const,
    tags: ["Tier 2", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task2.7",
    title: "Task 2.7 - Entertainment Streaming Brand (Medium-High)",
    prompt: "StreamVault curates independent films, documentaries, and international cinema for culturally curious viewers aged 25-55. We're not trying to compete with Netflix on quantity - we're offering a thoughtfully selected collection for people who view film as art, not just entertainment. Our challenge is appealing to serious cinephiles without intimidating casual viewers who might discover amazing content through us. The brand needs to feel sophisticated enough to justify our premium pricing but welcoming enough that someone's film-novice partner would feel comfortable browsing. Users access our platform across smart TVs, tablets during commutes, and phones for quick browsing. The design must feel cohesive whether someone's having a solo art film experience or hosting a documentary night with friends. Many of our international films require subtitles, and some users have asked for audio descriptions for accessibility. We want viewers to feel they're entering a curated cultural space, like a boutique cinema, not a corporate streaming warehouse. But we can't be so artistic that navigation becomes confusing - people still need to quickly find something to watch on a Tuesday night. Create our platform homepage and detail your visual approach. How will you communicate cultural sophistication while keeping the platform approachable and easy to navigate across devices? ",
    tier: "tier2" as const,
    tags: ["Tier 2", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task2.8",
    title: "Task 2.8 - Fintech Startup Brand (High)",
    prompt: "CreditBuilder helps people with poor credit scores improve their financial health. Our users have often been rejected by traditional banks and feel ashamed about their financial situation. Many are dealing with the stress of debt, past mistakes, or circumstances beyond their control. We need to feel trustworthy without being corporate, encouraging without being patronizing, and professional without being intimidating. Our users access the app on older Android phones with small screens and limited data plans. They're checking their credit during stressful moments - after being denied an apartment, before a job interview, or while trying to qualify for a car loan. The visual design must work for users with varying literacy levels and those for whom English is a second language. Numbers and data need to be clear without overwhelming people who may have anxiety around finances. Users should feel empowered to take control, with the ability to hide sensitive information when checking the app in public. Traditional banks feel cold and judgmental to our users, while predatory lenders seem too good to be true. We need to find the visual sweet spot that says 'we understand your struggle and we're here to genuinely help. Design our app homepage explaining your visual strategy. How will you create a brand that feels supportive and credible while being accessible to users facing financial and emotional challenges? ",
    tier: "tier2" as const,
    tags: ["Tier 2", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  // Tier 3 tasks (8 tasks)
  {
    baseId: "task3.1",
    title: "Task 3.1 - Simple Interaction (Low)",
    prompt: "I own 'Bella Vista,' an upscale Italian restaurant in downtown. We've been fully booked most nights and need to move away from phone reservations to an online system. Our customers are a mix of young professionals and older diners who aren't all tech-savvy. We seat 80 people across 20 tables, serve dinner Tuesday-Sunday 5-10pm, and need to manage reservations for parties of 1-8 people. Some tables are better than others (window seats, private corners), but we don't want to overcomplicate the booking process. Create our restaurant homepage with integrated reservation functionality. Walk me through how you'll design the booking flow to be simple enough for our least tech-savvy customers while giving us the management features we need. How will you handle the reservation process from customer selection to confirmation?",
    tier: "tier3" as const,
    tags: ["Tier 3"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task3.2",
    title: "Task 3.2 - Multi-Step Process (Medium-Low)",
    prompt: "EduConnect is a tutoring platform connecting high school students with qualified tutors for SAT prep, math, science, and essay writing. Students need to browse tutor profiles, check availability, book sessions, and attend virtual meetings. Tutors need to manage their schedules, set rates, and track student progress. Our typical flow: students search by subject and budget, read tutor reviews, book a trial session, attend via video chat, then book ongoing sessions if it's a good fit. Tutors set their availability weekly, can offer different session types (1-hour standard, 2-hour intensive, group sessions), and need payment processing. The challenge is serving both sides of the marketplace while keeping the booking process simple for stressed high school students and their parents. Design our platform homepage and detail your approach to the booking workflow. How will you handle the multi-step process from tutor discovery to session completion? What features will you implement to ensure smooth virtual sessions and ongoing relationships?",
    tier: "tier3" as const,
    tags: ["Tier 3"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task3.3",
    title: "Task 3.3 - User-Generated Content (Medium)",
    prompt: "PhotoCommunity is a platform for local photographers to showcase work, get constructive feedback, and connect with potential clients for events, portraits, and commercial projects. We serve both hobbyists sharing their weekend shots and professionals building their businesses. Photographers upload galleries, participate in weekly challenges, give and receive critiques, and list their services. Community members vote on featured photos, follow their favorite photographers, and can hire through the platform. We need moderation to keep feedback constructive and quality high. The community aspect is crucial - we're not just a portfolio host, but a place where photographers genuinely help each other improve. However, we also need commerce features since many members want to monetize their skills. Create our platform homepage and explain your strategy for balancing community engagement with commercial functionality. How will you design the user-generated content flows, feedback systems, and client connection features? What will encourage active participation while maintaining quality?",
    tier: "tier3" as const,
    tags: ["Tier 3"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task3.4",
    title: "Task 3.4 - Complex User Flows (Medium-High)",
    prompt: "FreelanceFlow is a marketplace connecting businesses with freelance designers, developers, writers, and marketers. Unlike generic platforms, we focus on long-term relationships and quality matches rather than one-off gigs. Our process: clients post detailed project briefs, freelancers submit custom proposals (not just bids), we facilitate interviews, handle contracts and milestones, process payments, and maintain ongoing relationships. Projects range from $500 logos to $50,000 website builds.Key challenges: preventing scope creep, ensuring quality deliverables, handling revisions, managing international payments, maintaining trust between strangers, and supporting both parties through disputes. We need sophisticated project management tools, file sharing, time tracking, invoice generation, and client approval workflows. The platform must work for both Fortune 500 companies and small business owners.Design our marketplace homepage and detail your approach to managing these complex user flows. How will you handle the full project lifecycle from posting to payment? What systems will you implement to ensure successful project completion and ongoing client relationships?",
    tier: "tier3" as const,
    tags: ["Tier 3"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task3.5",
    title: "Task 3.5 - Enterprise Functionality (High)",
    prompt: "ProjectMaster Enterprise is a comprehensive project management platform serving Fortune 500 companies managing complex, multi-million dollar initiatives with 50-500 team members across departments, time zones, and external vendors. Our clients run projects like new product launches, corporate acquisitions, facility construction, and software implementations. These involve intricate dependencies, resource conflicts, budget approvals, compliance requirements, and executive reporting. The platform must handle: resource planning and allocation, budget tracking with approval workflows, risk management and mitigation, stakeholder communication at multiple levels, document version control, vendor coordination, regulatory compliance tracking, and real-time executive dashboards. Users range from individual contributors tracking tasks to C-suite executives monitoring portfolio performance. We need role-based permissions, automated reporting, integration with existing enterprise tools (Salesforce, SAP, etc.), and audit trails for everything. The interface must be sophisticated enough for project managers while remaining accessible to executives who need high-level insights without complexity. Create our enterprise platform homepage and explain your strategy for managing this level of complexity. How will you architect the user experience to serve different roles and use cases? What systems will you implement to handle enterprise-scale project coordination and reporting? ",
    tier: "tier3" as const,
    tags: ["Tier 3"],
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task3.6",
    title: "Task 3.6 - Social Learning Community (High)",
    prompt: "SkillBridge connects professionals for peer learning and mentorship. Our platform serves everyone from anxious recent graduates seeking guidance to senior executives learning new technologies. Members can simultaneously be teachers in their expertise area and learners in others. The core challenge is balancing structure with organic community growth. Users want quality-assured content but also authentic peer connections. They need to find relevant mentors quickly but also browse serendipitously. Privacy is crucial - professionals want to control what colleagues can see about their learning goals. Members access the platform during focused learning sessions on desktop and quick interactions on mobile between meetings. Some have learning disabilities requiring extra time or alternative formats. International members need content to work across time zones and languages. The platform must handle course creation, progress tracking, peer reviews, discussion forums, and virtual meetups. Users frequently make mistakes like posting to wrong forums or enrolling in wrong courses, so we need smooth correction paths. Unlike LinkedIn Learning's corporate feel, we want to foster genuine peer support while maintaining content quality. Create our platform homepage explaining your functional approach. How will you enable both structured learning and organic knowledge sharing while giving users control over their professional image?",
    tier: "tier3" as const,
    tags: ["Tier 3", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task3.7",
    title: "Task 3.7 - Personal Finance Management (High)",
    prompt: "MoneyWise helps individuals and families manage their complete financial picture. Our users range from college students with simple checking accounts to families juggling mortgages, investments, and college savings. The emotional weight is significant - money discussions cause relationship stress and personal anxiety. Users need to connect multiple bank accounts, but many are wary after data breaches at other companies. They want to understand their finances without getting overwhelmed by complex charts. The platform must present information differently for someone checking quick balances on their phone versus doing detailed tax planning on desktop. Critical features include transaction categorization that users can correct, goal tracking that adapts to setbacks, and investment monitoring for varying risk tolerances. Some users have dyscalculia or other numerical processing challenges. Others are rebuilding after bankruptcy and need encouragement without judgment. The challenge is making sophisticated financial tools accessible to users with varying financial literacy. Someone who doesn't understand compound interest should still benefit from investment tracking. Budget alerts need to be helpful, not shameful. Users should control what family members can see in shared accounts. Design our platform homepage detailing your functional strategy. How will you make complex financial management accessible and encouraging while maintaining security and user trust?",
    tier: "tier3" as const,
    tags: ["Tier 3", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  },
  {
    baseId: "task3.8",
    title: "Task 3.8 - Virtual Event Platform (High)",
    prompt: "EventSpace hosts virtual conferences from 50-person workshops to 5,000-attendee summits. Event organizers range from tech-savvy conference pros to volunteer-run nonprofits hosting their first virtual fundraiser. Attendees have varying comfort with technology - some are digital natives while others are professionals forced online by circumstances. They join from different devices, time zones, and internet speeds. Many attendees have accessibility needs including screen readers, captions, and keyboard navigation. The platform must handle registration, live streaming, breakout rooms, networking, and exhibit halls. Organizers need control over every aspect but can't be overwhelmed by options. Attendees want to network naturally but many are introverted or uncomfortable with forced video interactions. Speakers need confidence their presentation won't fail mid-talk. Common pain points include attendees joining wrong sessions, missing key content due to time zone confusion, and feeling isolated without in-person energy. The platform should help users recover from mistakes like leaving sessions accidentally or missing recording permissions. We're competing with Zoom's familiarity and specialized platforms' features. Organizers want professional results without complexity, while attendees want engagement without awkwardness. Create our platform homepage explaining your approach to virtual events. How will you serve the diverse needs of organizers, speakers, and attendees while making large-scale virtual events feel smooth and engaging? ",
    tier: "tier3" as const,
    tags: ["Tier 3", "UX Principles"],
    uxprinciple: "User-Centricity, Consistency, Hierarchy, Context, User Control, Accessibility, Usability",
    techStack: ["HTML", "CSS", "JavaScript"]
  }
];

// Generate tasks for all categories
function generateTasksForAllCategories(): Task[] {
  const allTasks: Task[] = [];

  categories.forEach(category => {
    baseTasks.forEach(baseTask => {
      // Get thought process data from the separate file based on category
      const thoughtData = getThoughtProcess(category.id, baseTask.baseId);

      allTasks.push({
        id: `${category.id}-${baseTask.baseId}`,
        title: baseTask.title,
        prompt: baseTask.prompt,
        tier: baseTask.tier,
        category: category.id,
        tags: baseTask.tags,
        uxprinciple: baseTask.uxprinciple,
        techStack: baseTask.techStack,
        path: `/${category.id}/${baseTask.baseId}`,
        thoughtProcess1: thoughtData?.thoughtProcess1,
        thoughtProcess2: thoughtData?.thoughtProcess2,
        thoughtProcess3: thoughtData?.thoughtProcess3,
        output: thoughtData?.output
      });
    });
  });

  return allTasks;
}

// Helper to get category by id
export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find(c => c.id === categoryId);
}

export const tasks: Task[] = generateTasksForAllCategories();
