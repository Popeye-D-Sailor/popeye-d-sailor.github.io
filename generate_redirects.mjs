// generate_redirects.mjs - WGOPilot Official GitHub Pages Product Showcase & Redirect Generator
// Generates the WGOPilot™ Official Product & Provider Showcase homepage (index.html),
// README.md, static HTML redirects (go/<slug>), and remote manifest (go/links.conf).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REDIRECT_CONFIG = [
  // Commercial VPN Providers
  {
    name: 'NordVPN®',
    key: 'URL_NORDVPN',
    slugs: ['nordvpn', 'nord'],
    target: 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=161117&url_id=902',
    category: 'Commercial VPN Provider',
    badge: 'NordLynx® (WireGuard®) & OpenVPN®',
    desc: 'Automated token provisioning and key registration for NordLynx® (built on the WireGuard® protocol), real-time server load and city/country catalog discovery, and OpenVPN® UDP/TCP :443 Stealth fallback profiles.'
  },
  {
    name: 'Surfshark®',
    key: 'URL_SURFSHARK',
    slugs: ['surfshark', 'surf'],
    target: 'https://surfshark.com/',
    category: 'Commercial VPN Provider',
    badge: 'WireGuard®, MultiHop & OpenVPN®',
    desc: 'Automated key management and profile provisioning for the WireGuard® protocol, global city/country relay catalog, MultiHop pair discovery, and seamless Warm Standby failover integration.'
  },
  {
    name: 'Proton VPN®',
    key: 'URL_PROTON',
    slugs: ['protonvpn', 'proton', 'prtn'],
    target: 'https://protonvpn.com/',
    category: 'Commercial VPN Provider',
    badge: 'WireGuard®, Secure Core & NAT-PMP',
    desc: 'Native profile management for the WireGuard® and OpenVPN® protocols, Secure Core routing, P2P relay optimization, and automated NAT-PMP Port Forwarding integration.'
  },
  {
    name: 'Private Internet Access® (PIA®)',
    key: 'URL_PIA',
    slugs: ['pia'],
    target: 'https://www.privateinternetaccess.com/',
    category: 'Commercial VPN Provider',
    badge: 'WireGuard® API & Port Forwarding',
    desc: 'Automated token authentication, WireGuard® public key registration against PIA® NextGen gateways, live region latency probing, and built-in PIA® Port Forwarding daemon lifecycle control.'
  },
  {
    name: 'Mullvad®',
    key: 'URL_MULLVAD',
    slugs: ['mullvad', 'mull'],
    target: 'https://mullvad.net/',
    category: 'Commercial VPN Provider',
    badge: 'WireGuard® Relays & Multihop',
    desc: 'Native relay catalog discovery, multihop/bridge entry-exit pairing, and AES-256 Hardware Vault key protection for `.conf` and `.ovpn` router profiles.'
  },
  {
    name: 'IVPN®',
    key: 'URL_IVPN',
    slugs: ['ivpn'],
    target: 'https://www.ivpn.net/',
    category: 'Commercial VPN Provider',
    badge: 'WireGuard® & Multi-Hop',
    desc: 'Standard WireGuard® `.conf` and OpenVPN® `.ovpn` Hardware Vault import, DNS leak protection, and automated Autopilot health monitoring.'
  },
  {
    name: 'Windscribe®',
    key: 'URL_WINDSCRIBE',
    slugs: ['windscribe', 'wind'],
    target: 'https://windscribe.com/',
    category: 'Commercial VPN Provider',
    badge: 'WireGuard® & OpenVPN® Profiles',
    desc: 'Full compatibility with Windscribe® router WireGuard® and OpenVPN® configurations, custom port selection, and per-device split-tunneling.'
  },

  // Recommended OpenWrt Hardware (Amazon Associates StoreID: wgopilot-20)
  {
    name: 'GL.iNet® Flint 2 (GL-MT6000)',
    key: 'URL_HW_FLINT2',
    slugs: ['hw-flint2', 'flint2'],
    target: 'https://www.amazon.com/s?k=GL.iNet+GL-MT6000+Flint+2+WiFi+6+Router&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'Home Flagship • Wi-Fi 6 • Dual 2.5GbE',
    desc: 'Quad-Core 2.0 GHz ARM64 Filogic 830 processor with 1GB RAM and dual 2.5GbE ports. Delivers up to ~900 Mbps sustained WireGuard® throughput on OpenWrt®.'
  },
  {
    name: 'GL.iNet® Beryl AX (GL-MT3000)',
    key: 'URL_HW_BERYL',
    slugs: ['hw-beryl', 'beryl'],
    target: 'https://www.amazon.com/s?k=GL.iNet+GL-MT3000+Beryl+AX+Travel+Router&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'Pocket Travel Gateway • Wi-Fi 6 • 2.5GbE WAN',
    desc: 'Dual-Core 1.3 GHz ARM64 travel router with USB-C power, 2.5GbE WAN port, and native compatibility with WGOPilot™ Hotel & Airport Captive Portal Login Assist.'
  },
  {
    name: 'GL.iNet® Slate AX (GL-AXT1800)',
    key: 'URL_HW_SLATE',
    slugs: ['hw-slate', 'slate'],
    target: 'https://www.amazon.com/s?k=GL.iNet+GL-AXT1800+Slate+AX+Router&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'Gigabit Travel Router • Wi-Fi 6',
    desc: 'Quad-Core 1.2 GHz ARM processor with 3x Gigabit Ethernet ports, USB 3.0 tethering, and MicroSD storage expansion.'
  },
  {
    name: 'GL.iNet® Brume 2 (GL-MT2500)',
    key: 'URL_HW_BRUME2',
    slugs: ['hw-brume2', 'brume2'],
    target: 'https://www.amazon.com/s?k=GL.iNet+GL-MT2500+Brume+2+VPN+Gateway&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'Dedicated Wired VPN Gateway • 2.5GbE WAN',
    desc: 'Compact headless wired security gateway designed to sit inline behind an existing ISP modem or mesh Wi-Fi system as a dedicated WGOPilot™ VPN accelerator.'
  },
  {
    name: 'Cudy WR3000 (Wi-Fi 6)',
    key: 'URL_HW_CUDY',
    slugs: ['hw-cudy', 'cudy'],
    target: 'https://www.amazon.com/s?k=Cudy+WR3000+OpenWrt+WiFi+6+Router&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'Value Home Pick • ARM64 Filogic 820',
    desc: 'Budget-friendly dual-core ARM64 Wi-Fi 6 router with mainline OpenWrt® support and fast hardware-assisted routing.'
  },
  {
    name: 'Banana Pi BPI-R3 / BPI-R4',
    key: 'URL_HW_BANANA',
    slugs: ['hw-banana', 'bpi'],
    target: 'https://www.amazon.com/s?k=Banana+Pi+BPI-R3+BPI-R4+OpenWrt+Router&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'Enthusiast 2.5G / 10G SFP+ Platform',
    desc: 'High-performance multi-gigabit OpenWrt® reference board for gigabit fiber uplinks and heavy multi-tunnel workloads.'
  },
  {
    name: 'FriendlyElec NanoPi R4S / R5S / R6S',
    key: 'URL_HW_FRIENDLY',
    slugs: ['hw-friendly', 'nanopi'],
    target: 'https://www.amazon.com/s?k=FriendlyElec+NanoPi+R4S+R5S+R6S+Router&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'CNC Metal Multi-Gigabit Appliance',
    desc: 'Rockchip ARM64 multi-core wired appliance delivering near-line-rate 1G/2.5G WireGuard® and OpenVPN® encryption.'
  },
  {
    name: 'GL.iNet® Full Router Lineup',
    key: 'URL_GLINET',
    slugs: ['glinet', 'gl'],
    target: 'https://www.amazon.com/s?k=GL.iNet+WiFi+7+WiFi+6+Router+Beryl+Flint+Slate&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'Wi-Fi 7 & Wi-Fi 6 Home & Travel Series',
    desc: 'Explore the complete GL.iNet® OpenWrt®-based router lineup including Flint 2, Flint 3, Beryl AX, Beryl 7, Slate AX, and Spitz AX 5G.'
  },
  {
    name: 'All Compatible OpenWrt® Hardware',
    key: 'URL_AMAZON_HW',
    slugs: ['hardware', 'hw'],
    target: 'https://www.amazon.com/s?k=OpenWrt+WiFi+Router+GL.iNet+Flint+2+Beryl+AX+Cudy&tag=wgopilot-20',
    category: 'Recommended Router Hardware',
    badge: 'Curated OpenWrt® Hardware Directory',
    desc: 'Browse compatible OpenWrt® home routers, travel gateways, and multi-gigabit wired appliances on Amazon.'
  },

  // Project Sponsorship & Developer Support
  {
    name: 'Sponsor Popeye-D-Sailor (Ko-fi)',
    key: 'URL_SPONSOR',
    slugs: ['sponsor', 'support', 'supp'],
    target: 'https://ko-fi.com/popeyedsailor',
    category: 'Project Sponsorship'
  },
  {
    name: 'Ko-fi Support (Popeye-D-Sailor)',
    key: 'URL_KOFI',
    slugs: ['kofi'],
    target: 'https://ko-fi.com/popeyedsailor',
    category: 'Project Sponsorship'
  },
  {
    name: 'GitHub Sponsors (Popeye-D-Sailor)',
    key: 'URL_GITHUB_SPONSORS',
    slugs: ['github-sponsors', 'ghs'],
    target: 'https://github.com/sponsors/Popeye-D-Sailor',
    category: 'Project Sponsorship'
  },
  {
    name: 'Liberapay Support',
    key: 'URL_LIBERAPAY',
    slugs: ['liberapay'],
    target: 'https://liberapay.com/',
    category: 'Project Sponsorship'
  },
  {
    name: 'Project Bug Bounty / Fund',
    key: 'URL_BOUNTY',
    slugs: ['bounty', 'bnty'],
    target: 'https://github.com/Popeye-D-Sailor',
    category: 'Project Sponsorship'
  }
];

function generateRedirectHtml(name, targetUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting to ${name}...</title>
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="${targetUrl}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, follow">
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #0b0f19;
      color: #94a3b8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 12px;
      padding: 32px 40px;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
    h2 {
      margin-top: 0;
      color: #f1f5f9;
      font-size: 1.35rem;
    }
    p {
      margin: 16px 0;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    a {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 500;
    }
    a:hover {
      text-decoration: underline;
    }
    .spinner {
      margin: 20px auto 10px;
      width: 32px;
      height: 32px;
      border: 3px solid #1e293b;
      border-top-color: #38bdf8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
  <script>
    window.location.replace("${targetUrl}");
  </script>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <h2>Redirecting to ${name}</h2>
    <p>Navigating to official partner portal...</p>
    <p style="font-size: 0.8rem; color: #64748b;">If you are not redirected automatically within 3 seconds, <a href="${targetUrl}">click here to continue</a>.</p>
  </div>
</body>
</html>
`;
}

function generateIndexHtml() {
  const vpnProviders = REDIRECT_CONFIG.filter(c => c.category === 'Commercial VPN Provider');
  const hwItems = REDIRECT_CONFIG.filter(c => c.category === 'Recommended Router Hardware');

  const vpnCardsHtml = vpnProviders.map(item => {
    const slug = item.slugs[0];
    return `      <div class="card">
        <div class="card-top">
          <div>
            <h3 class="card-title">${item.name}</h3>
            <span class="pill">${item.badge || 'WireGuard® & OpenVPN®'}</span>
          </div>
          <a class="cta-btn" href="/go/${slug}" target="_blank" rel="noopener">Visit Official Site ↗</a>
        </div>
        <p class="card-desc">${item.desc || ''}</p>
      </div>`;
  }).join('\n');

  const hwCardsHtml = hwItems.map(item => {
    const slug = item.slugs[0];
    return `      <div class="card">
        <div class="card-top">
          <div>
            <h3 class="card-title">${item.name}</h3>
            <span class="pill pill-hw">${item.badge || 'OpenWrt® Compatible'}</span>
          </div>
          <a class="cta-btn cta-hw" href="/go/${slug}" target="_blank" rel="noopener">Check Price ↗</a>
        </div>
        <p class="card-desc">${item.desc || ''}</p>
      </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>WGOPilot™ — Flight Control for WireGuard® &amp; OpenVPN® on OpenWrt®</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="WGOPilot™ is an enterprise-grade router VPN management suite, Avionics Web Cockpit, and 42-column SSH CLI for OpenWrt® (21.02 through 25.12+) supporting WireGuard®, OpenVPN®, AES-256 Hardware Vault encryption, and automated commercial VPN provider onboarding.">
  <meta name="impact-site-verification" value="437bf73f-11ae-4bf5-b92b-ae7a3d50a557">
  <style>
    :root {
      --bg-main: #070b14;
      --bg-card: #0f172a;
      --bg-card-hover: #131d36;
      --border: #1e293b;
      --border-accent: #38bdf8;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --emerald: #10b981;
      --amber: #f59e0b;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: radial-gradient(circle at 50% 0%, #0f1b33 0%, var(--bg-main) 55%);
      color: var(--text-muted);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
    }
    .nav {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(7, 11, 20, 0.88);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
    }
    .nav-inner {
      max-width: 1180px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--text-main);
      font-weight: 700;
      font-size: 1.15rem;
      text-decoration: none;
    }
    .brand img {
      width: 36px;
      height: 36px;
      border-radius: 8px;
    }
    .nav-links {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      font-size: 0.9rem;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 500;
    }
    .nav-links a:hover {
      color: var(--accent);
    }
    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 40px 20px 64px;
    }
    .hero {
      text-align: center;
      padding: 28px 16px 40px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 44px;
    }
    .hero-crest {
      width: 88px;
      height: 88px;
      border-radius: 18px;
      box-shadow: 0 12px 30px rgba(56, 189, 248, 0.2);
      margin-bottom: 16px;
    }
    h1 {
      color: var(--text-main);
      font-size: 2.3rem;
      line-height: 1.25;
      margin: 0 0 12px 0;
    }
    .subtitle {
      color: var(--accent);
      font-size: 1.18rem;
      font-weight: 600;
      margin: 0 0 16px 0;
    }
    .hero-desc {
      max-width: 840px;
      margin: 0 auto 24px;
      font-size: 1rem;
      color: #cbd5e1;
    }
    .badge-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 26px;
    }
    .arch-badge {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #e0f2fe;
      padding: 5px 13px;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 600;
    }
    .hero-actions {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 14px;
    }
    .btn-primary, .btn-secondary {
      display: inline-block;
      padding: 11px 22px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: #ffffff;
      border: 1px solid #38bdf8;
    }
    .btn-primary:hover {
      filter: brightness(1.12);
    }
    .btn-secondary {
      background: #111827;
      color: #e2e8f0;
      border: 1px solid #334155;
    }
    .btn-secondary:hover {
      border-color: var(--accent);
      color: #ffffff;
    }
    .section-head {
      margin: 48px 0 22px;
    }
    .section-head h2 {
      color: var(--text-main);
      font-size: 1.6rem;
      margin: 0 0 8px 0;
      border-left: 4px solid var(--accent);
      padding-left: 14px;
    }
    .section-head p {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.96rem;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 24px;
    }
    @media (max-width: 640px) {
      .gallery-grid { grid-template-columns: 1fr; }
      h1 { font-size: 1.75rem; }
    }
    .shot-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
    }
    .shot-card img {
      width: 100%;
      height: auto;
      display: block;
      border-bottom: 1px solid var(--border);
    }
    .shot-caption {
      padding: 16px 20px;
    }
    .shot-caption h3 {
      margin: 0 0 6px 0;
      color: var(--text-main);
      font-size: 1.05rem;
    }
    .shot-caption p {
      margin: 0;
      font-size: 0.88rem;
      color: var(--text-muted);
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 18px;
    }
    .feature-box {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
    }
    .feature-box h3 {
      margin: 0 0 8px 0;
      color: var(--text-main);
      font-size: 1.05rem;
    }
    .feature-box p {
      margin: 0;
      font-size: 0.9rem;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 18px;
    }
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .card:hover {
      border-color: var(--border-accent);
      background: var(--bg-card-hover);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }
    .card-title {
      margin: 0 0 6px 0;
      color: var(--text-main);
      font-size: 1.08rem;
    }
    .pill {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #34d399;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 2px 9px;
      border-radius: 999px;
    }
    .pill-hw {
      color: #fbbf24;
      background: rgba(245, 158, 11, 0.12);
      border-color: rgba(245, 158, 11, 0.3);
    }
    .card-desc {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-muted);
    }
    .cta-btn {
      flex-shrink: 0;
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #38bdf8;
      padding: 7px 13px;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 600;
      text-decoration: none;
      white-space: nowrap;
    }
    .cta-btn:hover {
      background: #0284c7;
      color: #ffffff;
    }
    .cta-hw {
      border-color: #f59e0b;
    }
    .cta-hw:hover {
      background: #d97706;
    }
    footer {
      margin-top: 64px;
      border-top: 1px solid var(--border);
      padding-top: 28px;
      font-size: 0.82rem;
      color: #64748b;
    }
    footer a {
      color: #94a3b8;
      text-decoration: none;
    }
    footer a:hover {
      color: var(--accent);
    }
    .legal-box {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 18px 22px;
      margin-top: 16px;
      line-height: 1.55;
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="nav-inner">
      <a class="brand" href="/">
        <img src="/assets/wgopilot-crest.png" alt="WGOPilot Crest">
        <span>WGOPilot™</span>
      </a>
      <div class="nav-links">
        <a href="#screenshots">Web Cockpit &amp; Setup Wizard</a>
        <a href="#architecture">Core Architecture</a>
        <a href="#providers">Compatible VPN Providers</a>
        <a href="#hardware">Recommended OpenWrt® Hardware</a>
        <a href="https://github.com/Popeye-D-Sailor" target="_blank" rel="noopener">GitHub Profile ↗</a>
      </div>
    </div>
  </nav>

  <div class="container">
    <section class="hero">
      <img class="hero-crest" src="/assets/wgopilot-crest.png" alt="WGOPilot Winged Shield Crest">
      <h1>WGOPilot™ — Flight Control for WireGuard® &amp; OpenVPN® on OpenWrt®</h1>
      <p class="subtitle">Enterprise-Grade Router VPN Cockpit, 3-Step Provider Setup Wizard &amp; Autonomous Failover Suite</p>
      <p class="hero-desc">
        <strong>WGOPilot™</strong> transforms any compatible <strong>OpenWrt®</strong> router (<code>21.02</code> through <code>25.12+</code>) into a self-healing VPN gateway. Built with a zero-dependency Avionics Web Cockpit, a 42-column interactive SSH CLI, an AES-256 Hardware Vault, and native onboarding adapters for leading commercial VPN providers.
      </p>
      <div class="badge-row">
        <span class="arch-badge">OpenWrt® 21.02 – 25.12+ (fw4 nftables &amp; fw3 iptables)</span>
        <span class="arch-badge">WireGuard® &amp; OpenVPN® Dual-Engine</span>
        <span class="arch-badge">AES-256 Hardware-Bound Vault</span>
        <span class="arch-badge">100% Local • Zero Telemetry</span>
        <span class="arch-badge">19 Languages</span>
      </div>
      <div class="hero-actions">
        <a class="btn-primary" href="#screenshots">Explore Live Web Cockpit Screenshots</a>
        <a class="btn-secondary" href="#providers">Compatible VPN Providers &amp; Integration</a>
        <a class="btn-secondary" href="https://github.com/Popeye-D-Sailor" target="_blank" rel="noopener">Popeye-D-Sailor on GitHub ↗</a>
      </div>
    </section>

    <section id="screenshots">
      <div class="section-head">
        <h2>🖥️ Live Avionics Web Cockpit &amp; 3-Step Provider Onboarding Wizard</h2>
        <p>Captured directly from a live OpenWrt® router running the WGOPilot™ Web Cockpit and LuCI RPC backend.</p>
      </div>
      <div class="gallery-grid">
        <div class="shot-card">
          <a href="/assets/screenshots/provider-setup-wizard.png" target="_blank" rel="noopener">
            <img src="/assets/screenshots/provider-setup-wizard.png" alt="WGOPilot 3-Step Provider Setup Wizard">
          </a>
          <div class="shot-caption">
            <h3>1. Guided 3-Step Provider, Key &amp; First-Flight Setup Wizard (<code>#/setup</code>)</h3>
            <p>Walks home and prosumer users through commercial VPN provider selection (<strong>NordVPN®</strong>, <strong>Surfshark®</strong>, <strong>Proton VPN®</strong>, <strong>Private Internet Access® / PIA®</strong>, <strong>Mullvad®</strong>, or Custom <code>.conf</code>/<code>.ovpn</code>), automated token/key registration in the AES-256 Hardware Vault, and first-flight leak verification—plus direct signup links for users who need a subscription.</p>
          </div>
        </div>

        <div class="shot-card">
          <a href="/assets/screenshots/cockpit-flight-deck.png" target="_blank" rel="noopener">
            <img src="/assets/screenshots/cockpit-flight-deck.png" alt="WGOPilot Main Flight Deck and 4-Card Avionics HUD">
          </a>
          <div class="shot-caption">
            <h3>2. Main Flight Deck &amp; 4-Card Avionics HUD (<code>#/cockpit</code>)</h3>
            <p>At-a-glance status bar displaying live tunnel protocol (Outbound <strong>WireGuard®</strong> / <strong>OpenVPN®</strong> &amp; Inbound Home VPN Server), active city/country gateway, Cabin Seal (Kill Switch) state, Autopilot watchdog status, and 1-click Flight Mode Presets (<em>Standard</em>, <em>Gaming</em>, <em>Streaming</em>, <em>Max Privacy</em>).</p>
          </div>
        </div>

        <div class="shot-card">
          <a href="/assets/screenshots/flight-wizards-hub.png" target="_blank" rel="noopener">
            <img src="/assets/screenshots/flight-wizards-hub.png" alt="WGOPilot Flight Wizards Overview">
          </a>
          <div class="shot-caption">
            <h3>3. Flight Wizards Hub &amp; 9 1-Click Task Assistants (<code>#/quick-setup</code>)</h3>
            <p>Task-driven wizards for Streaming &amp; Smart-TV Unlock, Low-Jitter Gaming Optimization, Hotel &amp; Airport Captive Portal Login Assist, Phone-Home Server setup, Strict Privacy Audit, and Encrypted Disaster-Recovery Backup Capsules.</p>
          </div>
        </div>

        <div class="shot-card">
          <a href="/assets/screenshots/settings-avionics.png" target="_blank" rel="noopener">
            <img src="/assets/screenshots/settings-avionics.png" alt="WGOPilot Avionics Settings and Input Border Key">
          </a>
          <div class="shot-caption">
            <h3>4. 5-Section Avionics Settings &amp; Real-Time Input Border Key (<code>#/settings</code>)</h3>
            <p>Fine-grained control over Tunnel MTU &amp; TCP MSS Clamping, DNS-over-HTTPS / Private VPN DNS resolvers, IPv6 leak policy, USB tethering uplinks, and hardware LED bindings—with instant color-coded control borders (<em>Recommended</em>, <em>Custom Value</em>, <em>Unsaved</em>).</p>
          </div>
        </div>
      </div>
    </section>

    <section id="architecture">
      <div class="section-head">
        <h2>🛡️ Core Engineering &amp; Security Architecture</h2>
        <p>Built in POSIX <code>/bin/sh</code>, OpenWrt® <code>ucode</code> (<code>rpcd</code>), and zero-build ES6 JavaScript to run smoothly on everything from 64MB travel routers to multi-gigabit ARM64/x86_64 gateways.</p>
      </div>
      <div class="feature-grid">
        <div class="feature-box">
          <h3>🔒 Fail-Closed Cabin Seal (<code>fw4</code> &amp; <code>fw3</code> Kill Switch)</h3>
          <p>Atomic kernel-level firewall rules for both modern <code>fw4</code> (<code>nftables</code>) and legacy <code>fw3</code> (<code>iptables</code>) that prevent LAN-to-WAN traffic leaks during tunnel handshakes, key rotation, or upstream ISP dropouts.</p>
        </div>
        <div class="feature-box">
          <h3>🤖 Autonomous Autopilot &amp; Warm Standby</h3>
          <p>Continuous latency and packet-loss telemetry with automatic failover to pre-staged Warm Standby endpoints and optional 1-click Censorship Shield (OpenVPN® TCP :443 Stealth fallback).</p>
        </div>
        <div class="feature-box">
          <h3>🔀 Policy-Based Split-Tunneling (Table 100)</h3>
          <p>Route specific LAN devices (Smart TVs, work laptops, gaming consoles) or domain/application presets through the VPN tunnel, direct ISP WAN, or scheduled bedtime rules without weakening leak protection.</p>
        </div>
        <div class="feature-box">
          <h3>🔐 AES-256 Hardware-Bound Cryptographic Vault</h3>
          <p>Encrypts all WireGuard® private keys, OpenVPN® credentials, and commercial provider API tokens at rest using hardware-derived entropy in <code>/etc/wgopilot/vault/</code>.</p>
        </div>
        <div class="feature-box">
          <h3>📟 42-Column SSH CLI &amp; Mobile Termux Parity</h3>
          <p>Every capability in the Web Cockpit is also available over SSH inside a strict 42-column terminal interface designed for narrow smartphone SSH screens and headless administration.</p>
        </div>
        <div class="feature-box">
          <h3>🌍 19-Language Native Localization</h3>
          <p>Complete UI, interactive help cards, and documentation localization across 19 languages, including full RTL layout support for Arabic, Persian, Hebrew, and Urdu.</p>
        </div>
      </div>
    </section>

    <section id="providers">
      <div class="section-head">
        <h2>🌐 Commercial VPN Provider Integration &amp; Official Partner Links</h2>
        <p>WGOPilot™ includes built-in onboarding adapters and an optional in-app Partner Deals directory for users configuring a commercial VPN subscription on their OpenWrt® router.</p>
      </div>
      <div class="card-grid">
${vpnCardsHtml}
      </div>
    </section>

    <section id="hardware">
      <div class="section-head">
        <h2>📡 Recommended OpenWrt® Router Hardware for WGOPilot™</h2>
        <p>Multi-core ARM64 home routers, pocket travel gateways, and wired security appliances tested for high-throughput WireGuard® and OpenVPN® routing.</p>
      </div>
      <div class="card-grid">
${hwCardsHtml}
      </div>
    </section>

    <footer>
      <p>
        <strong>WGOPilot™ Official Product &amp; Partner Portal</strong> • Created and Maintained by <a href="https://github.com/Popeye-D-Sailor">Popeye-D-Sailor</a> •
        Support via <a href="/go/kofi">Ko-fi</a> or <a href="/go/github-sponsors">GitHub Sponsors</a>
      </p>
      <div class="legal-box">
        <p style="margin: 0 0 10px 0;">
          <strong>FTC Affiliate &amp; Amazon Associates Disclosure (16 CFR Part 255):</strong> WGOPilot™ and this website include referral and affiliate links for select commercial VPN services and router hardware. If you choose to purchase a subscription or hardware device through one of these links, the project maintainer may receive an affiliate commission at no additional cost to you. <strong>As an Amazon Associate I earn from qualifying purchases.</strong> Provider compatibility, telemetry, and routing features in WGOPilot™ operate identically regardless of how a subscription or device was obtained.
        </p>
        <p style="margin: 0;">
          <strong>Copyright, Dual License &amp; Third-Party Trademark Notice:</strong> Copyright &copy; 2026 Popeye-D-Sailor (Dual License: Free for Personal &amp; Non-Commercial Home Use; Commercial License Required for Commercial, MSP &amp; Fleet Use). &ldquo;WGOPilot&trade;&rdquo; and the WGOPilot Winged Shield Crest are trademarks of Popeye-D-Sailor. &ldquo;WireGuard&reg;&rdquo; is a registered trademark of Jason A. Donenfeld. &ldquo;OpenVPN&reg;&rdquo; is a registered trademark of OpenVPN Inc. &ldquo;OpenWrt&reg;&rdquo; is a registered trademark of Software in the Public Interest, Inc. (SPI). &ldquo;GL.iNet&reg;&rdquo; is a registered trademark of GL Technologies. &ldquo;Linksys&reg;&rdquo; is a registered trademark of Linksys Holdings, Inc. Commercial VPN and DNS provider names (including NordVPN&reg;, NordLynx&reg;, Surfshark&reg;, Proton VPN&reg;, Private Internet Access&reg; / PIA&reg;, Mullvad&reg;, IVPN&reg;, Windscribe&reg;, Cloudflare&reg;, and Quad9&reg;) are trademarks&trade; or registered&reg; trademarks of their respective owners and are referenced solely under nominative fair use to indicate user-configured compatibility without implying corporate endorsement or affiliation.
        </p>
        <p style="margin: 8px 0 0 0; font-size: 0.72rem; color: #475569;">Impact-Site-Verification: 437bf73f-11ae-4bf5-b92b-ae7a3d50a557</p>
      </div>
    </footer>
  </div>
</body>
</html>
`;
}

function generate404Html() {
  const slugToTargetMap = {};
  for (const item of REDIRECT_CONFIG) {
    for (const slug of item.slugs) {
      slugToTargetMap[slug.toLowerCase()] = item.target;
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>WGOPilot™ Portal - Redirect</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>
    const MAPPINGS = ${JSON.stringify(slugToTargetMap, null, 2)};
    const path = window.location.pathname.replace(/^\\/+/, '').replace(/\\/+$/, '');
    const parts = path.split('/');
    let targetSlug = '';
    if (parts.length >= 2 && parts[0] === 'go') {
      targetSlug = parts[1].toLowerCase();
    } else if (parts.length === 1 && parts[0]) {
      targetSlug = parts[0].toLowerCase();
    }
    if (targetSlug && MAPPINGS[targetSlug]) {
      window.location.replace(MAPPINGS[targetSlug]);
    }
  </script>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #0b0f19;
      color: #94a3b8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 12px;
      padding: 36px;
      max-width: 480px;
      text-align: center;
    }
    h2 { color: #f8fafc; margin-top: 0; }
    a { color: #38bdf8; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h2>WGOPilot™ Official Portal</h2>
    <p>The requested destination could not be resolved automatically.</p>
    <p><a href="/">Return to WGOPilot™ Official Product Showcase</a> or visit <a href="https://github.com/Popeye-D-Sailor">Popeye-D-Sailor on GitHub</a>.</p>
  </div>
</body>
</html>
`;
}

// Build files
console.log('Generating WGOPilot product showcase, redirects, and manifests...');

const goDir = path.join(__dirname, 'go');
if (!fs.existsSync(goDir)) {
  fs.mkdirSync(goDir, { recursive: true });
}

// 1. Generate go/links.conf
const linksConfLines = [
  'URL_NORDVPN="https://popeye-d-sailor.github.io/go/nordvpn"',
  'URL_SURFSHARK="https://popeye-d-sailor.github.io/go/surfshark"',
  'URL_MULLVAD="https://popeye-d-sailor.github.io/go/mullvad"',
  'URL_PROTON="https://popeye-d-sailor.github.io/go/protonvpn"',
  'URL_PIA="https://popeye-d-sailor.github.io/go/pia"',
  'URL_IVPN="https://popeye-d-sailor.github.io/go/ivpn"',
  'URL_WINDSCRIBE="https://popeye-d-sailor.github.io/go/windscribe"',
  'URL_HW_FLINT2="https://popeye-d-sailor.github.io/go/hw-flint2"',
  'URL_HW_BERYL="https://popeye-d-sailor.github.io/go/hw-beryl"',
  'URL_HW_SLATE="https://popeye-d-sailor.github.io/go/hw-slate"',
  'URL_HW_BRUME2="https://popeye-d-sailor.github.io/go/hw-brume2"',
  'URL_HW_BANANA="https://popeye-d-sailor.github.io/go/hw-banana"',
  'URL_HW_CUDY="https://popeye-d-sailor.github.io/go/hw-cudy"',
  'URL_HW_FRIENDLY="https://popeye-d-sailor.github.io/go/hw-friendly"',
  'URL_SPONSOR="https://popeye-d-sailor.github.io/go/sponsor"',
  'URL_KOFI="https://popeye-d-sailor.github.io/go/kofi"',
  'URL_GITHUB_SPONSORS="https://popeye-d-sailor.github.io/go/github-sponsors"',
  'URL_LIBERAPAY="https://popeye-d-sailor.github.io/go/liberapay"',
  'URL_BOUNTY="https://popeye-d-sailor.github.io/go/bounty"',
  // Compatibility fallbacks for rpcd/ucode
  'URL_GLINET="https://popeye-d-sailor.github.io/go/glinet"',
  'URL_AMAZON_HW="https://popeye-d-sailor.github.io/go/hardware"'
];

fs.writeFileSync(path.join(goDir, 'links.conf'), linksConfLines.join('\n') + '\n', 'utf8');
console.log(`Created: go/links.conf (${linksConfLines.length} entries)`);

// 2. Generate slug redirects
let totalRedirects = 0;
for (const item of REDIRECT_CONFIG) {
  const html = generateRedirectHtml(item.name, item.target);
  for (const slug of item.slugs) {
    const slugDir = path.join(goDir, slug);
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true });
    }
    fs.writeFileSync(path.join(slugDir, 'index.html'), html, 'utf8');
    fs.writeFileSync(path.join(goDir, `${slug}.html`), html, 'utf8');
    totalRedirects++;
  }
}
console.log(`Created redirect HTML for ${totalRedirects} slug aliases.`);

// 3. Index & 404 pages
const indexHtml = generateIndexHtml();
fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
fs.writeFileSync(path.join(goDir, 'index.html'), indexHtml, 'utf8');

const notFoundHtml = generate404Html();
fs.writeFileSync(path.join(__dirname, '404.html'), notFoundHtml, 'utf8');

// 4. .nojekyll
fs.writeFileSync(path.join(__dirname, '.nojekyll'), '', 'utf8');

// 5. README.md
const readmeContent = `# ✈️ WGOPilot™ — Official Product Showcase, Provider Integration & Hardware Website

Official public website and remote partner manifest repository for [**WGOPilot™ — Flight Control for WireGuard® & OpenVPN® on OpenWrt®**](https://popeye-d-sailor.github.io/), created and maintained by [**Popeye-D-Sailor**](https://github.com/Popeye-D-Sailor).

- 🌐 **Live Product Website**: [https://popeye-d-sailor.github.io/](https://popeye-d-sailor.github.io/)
- 👤 **Developer Profile**: [https://github.com/Popeye-D-Sailor](https://github.com/Popeye-D-Sailor)

---

## 🖥️ Live Web Cockpit & 3-Step Provider Setup Wizard Preview

### 1. Guided 3-Step Provider, Key & First-Flight Setup Wizard (\`#/setup\`)
![WGOPilot 3-Step Provider Setup Wizard](assets/screenshots/provider-setup-wizard.png)

### 2. Main Flight Deck & 4-Card Avionics HUD (\`#/cockpit\`)
![WGOPilot Main Flight Deck](assets/screenshots/cockpit-flight-deck.png)

### 3. Flight Wizards Hub & 9 1-Click Task Assistants (\`#/quick-setup\`)
![WGOPilot Flight Wizards Hub](assets/screenshots/flight-wizards-hub.png)

### 4. 5-Section Avionics Settings & Input Border Key (\`#/settings\`)
![WGOPilot Avionics Settings](assets/screenshots/settings-avionics.png)

---

## 🌐 Commercial VPN Provider Compatibility

| Provider | Native WGOPilot™ Integration | Official Link |
| :--- | :--- | :--- |
| **NordVPN®** | Automated token provisioning & key registration for **NordLynx®** (**WireGuard®**), real-time server load & city discovery, **OpenVPN®** UDP/TCP :443 profiles | [Visit NordVPN® ↗](https://popeye-d-sailor.github.io/go/nordvpn) |
| **Surfshark®** | Automated **WireGuard®** key & profile provisioning, city/country relay catalog, MultiHop & Warm Standby failover | [Visit Surfshark® ↗](https://popeye-d-sailor.github.io/go/surfshark) |
| **Proton VPN®** | Native **WireGuard®** & **OpenVPN®** profile management, Secure Core, P2P & NAT-PMP Port Forwarding | [Visit Proton VPN® ↗](https://popeye-d-sailor.github.io/go/protonvpn) |
| **Private Internet Access® (PIA®)** | Automated token authentication, **WireGuard®** public key registration & automated PIA® Port Forwarding daemon | [Visit PIA® ↗](https://popeye-d-sailor.github.io/go/pia) |
| **Mullvad®** | Native relay catalog discovery, multihop/bridge pairing & AES-256 Hardware Vault key management | [Visit Mullvad® ↗](https://popeye-d-sailor.github.io/go/mullvad) |

---

## ⚖️ FTC Affiliate Disclosure & Trademark Notice

- **FTC & Amazon Associates Disclosure (16 CFR Part 255)**: WGOPilot™ and \`https://popeye-d-sailor.github.io\` contain referral and affiliate links for select VPN services and router hardware. If you purchase a subscription or device through one of these links, the project maintainer may receive an affiliate commission at no additional cost to you. **As an Amazon Associate I earn from qualifying purchases.**
- **Copyright & Trademarks**: Copyright © 2026 Popeye-D-Sailor. "WGOPilot™" is a trademark of Popeye-D-Sailor. "WireGuard®" is a registered trademark of Jason A. Donenfeld. "OpenVPN®" is a registered trademark of OpenVPN Inc. "OpenWrt®" is a registered trademark of Software in the Public Interest, Inc. (SPI). All third-party product and company names are trademarks™ or registered® trademarks of their respective holders.
`;

fs.writeFileSync(path.join(__dirname, 'README.md'), readmeContent, 'utf8');

console.log('All files generated successfully.');
