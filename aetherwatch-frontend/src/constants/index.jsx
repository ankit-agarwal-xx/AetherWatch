import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Contact Us", href: "#" },
];

export const testimonials = [
  {
    user: "Sarah Chen",
    company: "Chief Information Security Officer, TechNova Inc.",
    image: user1,
    text: "AetherWatch has revolutionized our network security. The AI-driven DNS filtering caught threats we didn't even know existed. It's like having a cybersecurity expert working 24/7.",
  },
  {
    user: "Amelia Patel",
    company: "Head of Cybersecurity, Global Retail Solutions",
    image: user2,
    text: "I'm impressed by AetherWatch's DNS tunneling detection. It's caught several attempts that our previous solution missed. The ensemble stack learning approach really sets it apart.",
  },
  {
    user: "Marcus Rodriguez",
    company: "Data Protection Officer, SecureBank",
    image: user5,
    text: "Implementing AetherWatch was a game-changer for our compliance efforts. The automatic GDPR & PCI DSS checks have saved us countless hours & reducing our risk exposure",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Intelligent DNS Filtering",
    description:
      "Leverage AI-powered DNS filtering to detect and block malicious domains in real-time, protecting your network from emerging threats.",
  },
  {
    icon: <Fingerprint />,
    text: "DNS Tunneling Detection",
    description:
      "Detect and prevent DNS tunneling attempts using advanced ensemble stack learning techniques, safeguarding against data exfiltration and covert communication channels.",
  },
  {
    icon: <ShieldHalf />,
    text: "Compliance Checker",
    description:
      "Automatically assess and ensure compliance with GDPR and PCI DSS regulations, keeping your organization aligned with industry standards.",
  },
  {
    icon: <BatteryCharging />,
    text: "Fraud Detection System",
    description:
      "Utilize advanced AI algorithms to analyze transaction patterns and detect potential fraudulent activities, safeguarding financial operations.",
  },
  {
    icon: <PlugZap />,
    text: "Trend Analysis Dashboard",
    description:
      "Visualize and interpret network traffic trends with an intuitive dashboard, enabling proactive threat identification and mitigation.",
  },
  {
    icon: <GlobeLock />,
    text: "Multi-Protocol Support",
    description:
      "Secure your DNS communications with support for multiple protocols including DNS over UDP, DNS over DTLS, and DNS over HTTPS.",
  },
];

export const pricingOptions = [
  {
    title: "Basic",
    price: "$99",
    features: [
      "Intelligent DNS Filtering",
      "Basic Compliance Checker",
      "10,000 DNS queries/day",
      "Real-Time Threat Alerts",
    ],
  },
  {
    title: "Pro",
    price: "$499",
    features: [
      "Advanced Fraud Detection",
      "DNS Tunneling Prevention",
      "100,000 DNS queries/day",
      "Trend Analysis Dashboard",
    ],
  },
  {
    title: "Enterprise",
    price: "$999",
    features: [
      "All Pro features",
      "Custom Integration Support",
      "Unlimited DNS queries",
      "On-Premises Deployment Option",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
