// generate_redirects.mjs - WGOPilot Official GitHub Pages Redirect Generator
// Generates static HTML redirects and links.conf for popeye-d-sailor.github.io/go/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REDIRECT_CONFIG = [
  // Commercial VPN Providers
  {
    name: 'NordVPN',
    key: 'URL_NORDVPN',
    slugs: ['nordvpn', 'nord'],
    target: 'https://nordvpn.com/',
    category: 'Commercial VPN Provider'
  },
  {
    name: 'Surfshark VPN',
    key: 'URL_SURFSHARK',
    slugs: ['surfshark', 'surf'],
    target: 'https://surfshark.com/',
    category: 'Commercial VPN Provider'
  },
  {
    name: 'Mullvad VPN',
    key: 'URL_MULLVAD',
    slugs: ['mullvad', 'mull'],
    target: 'https://mullvad.net/',
    category: 'Commercial VPN Provider'
  },
  {
    name: 'Proton VPN',
    key: 'URL_PROTON',
    slugs: ['protonvpn', 'proton', 'prtn'],
    target: 'https://protonvpn.com/',
    category: 'Commercial VPN Provider'
  },
  {
    name: 'Private Internet Access (PIA)',
    key: 'URL_PIA',
    slugs: ['pia'],
    target: 'https://www.privateinternetaccess.com/',
    category: 'Commercial VPN Provider'
  },
  {
    name: 'IVPN',
    key: 'URL_IVPN',
    slugs: ['ivpn'],
    target: 'https://www.ivpn.net/',
    category: 'Commercial VPN Provider'
  },
  {
    name: 'Windscribe VPN',
    key: 'URL_WINDSCRIBE',
    slugs: ['windscribe', 'wind'],
    target: 'https://windscribe.com/',
    category: 'Commercial VPN Provider'
  },

  // Recommended OpenWrt Hardware
  {
    name: 'GL.iNet GL-MT6000 (Flint 2)',
    key: 'URL_HW_FLINT2',
    slugs: ['hw-flint2', 'flint2'],
    target: 'https://www.gl-inet.com/products/gl-mt6000/',
    category: 'Recommended Router Hardware'
  },
  {
    name: 'GL.iNet GL-MT3000 (Beryl AX)',
    key: 'URL_HW_BERYL',
    slugs: ['hw-beryl', 'beryl'],
    target: 'https://www.gl-inet.com/products/gl-mt3000/',
    category: 'Recommended Router Hardware'
  },
  {
    name: 'GL.iNet GL-AXT1800 (Slate AX)',
    key: 'URL_HW_SLATE',
    slugs: ['hw-slate', 'slate'],
    target: 'https://www.gl-inet.com/products/gl-axt1800/',
    category: 'Recommended Router Hardware'
  },
  {
    name: 'GL.iNet GL-MT2500 (Brume 2 Security Gateway)',
    key: 'URL_HW_BRUME2',
    slugs: ['hw-brume2', 'brume2'],
    target: 'https://www.gl-inet.com/products/gl-mt2500/',
    category: 'Recommended Router Hardware'
  },
  {
    name: 'Bananapi BPI-R3 OpenWrt Router',
    key: 'URL_HW_BANANA',
    slugs: ['hw-banana', 'bpi'],
    target: 'https://openwrt.org/toh/sinovoip/bananapi_bpi-r3',
    category: 'Recommended Router Hardware'
  },
  {
    name: 'Cudy WR3000 Wi-Fi 6 Router',
    key: 'URL_HW_CUDY',
    slugs: ['hw-cudy', 'cudy'],
    target: 'https://www.cudy.com/products/wr3000-1-0',
    category: 'Recommended Router Hardware'
  },
  {
    name: 'FriendlyElec NanoPi Series',
    key: 'URL_HW_FRIENDLY',
    slugs: ['hw-friendly', 'nanopi'],
    target: 'https://www.friendlyelec.com/',
    category: 'Recommended Router Hardware'
  },
  {
    name: 'GL.iNet Routers Hub',
    key: 'URL_GLINET',
    slugs: ['glinet', 'gl'],
    target: 'https://www.gl-inet.com/',
    category: 'Recommended Router Hardware'
  },
  {
    name: 'OpenWrt Table of Hardware',
    key: 'URL_AMAZON_HW',
    slugs: ['hardware', 'hw'],
    target: 'https://openwrt.org/toh/start',
    category: 'Recommended Router Hardware'
  },

  // Project Sponsorship & Developer Support
  {
    name: 'Sponsor Popeye-D-Sailor',
    key: 'URL_SPONSOR',
    slugs: ['sponsor', 'support', 'supp'],
    target: 'https://github.com/Popeye-D-Sailor',
    category: 'Project Sponsorship'
  },
  {
    name: 'Ko-fi Support',
    key: 'URL_KOFI',
    slugs: ['kofi'],
    target: 'https://ko-fi.com/',
    category: 'Project Sponsorship'
  },
  {
    name: 'GitHub Sponsors',
    key: 'URL_GITHUB_SPONSORS',
    slugs: ['github-sponsors', 'ghs'],
    target: 'https://github.com/sponsors',
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
    target: 'https://github.com/Popeye-D-Sailor/wgopilot/issues',
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
    <p>Navigating to official portal: <br><a href="${targetUrl}">${targetUrl}</a></p>
    <p style="font-size: 0.8rem; color: #64748b;">If you are not redirected automatically within 3 seconds, please click the link above.</p>
  </div>
</body>
</html>
`;
}

function generateIndexHtml() {
  const categories = [...new Set(REDIRECT_CONFIG.map(c => c.category))];
  
  let listHtml = '';
  for (const cat of categories) {
    listHtml += `\n    <h3 class="cat-title">${cat}</h3>\n    <ul class="link-grid">\n`;
    const items = REDIRECT_CONFIG.filter(c => c.category === cat);
    for (const item of items) {
      const primarySlug = item.slugs[0];
      const aliasSlugs = item.slugs.slice(1).map(s => `<code>/go/${s}</code>`).join(', ');
      listHtml += `      <li class="link-item">
        <div class="link-head">
          <span class="link-name">${item.name}</span>
          <a class="direct-badge" href="${item.target}" target="_blank" rel="noopener">Official Site ↗</a>
        </div>
        <div class="link-paths">
          <div>Primary: <a class="go-link" href="/go/${primarySlug}"><code>https://popeye-d-sailor.github.io/go/${primarySlug}</code></a></div>
          ${aliasSlugs ? `<div class="aliases">CLI Short Aliases: ${aliasSlugs}</div>` : ''}
        </div>
      </li>\n`;
    }
    listHtml += `    </ul>\n`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>WGOPilot Official Redirect & Partner Portal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 40px 20px;
      background: #0b0f19;
      color: #94a3b8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .container {
      max-width: 820px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      margin-bottom: 36px;
      padding-bottom: 24px;
      border-bottom: 1px solid #1f2937;
    }
    h1 {
      color: #f8fafc;
      font-size: 1.85rem;
      margin: 0 0 10px 0;
    }
    .lead {
      color: #38bdf8;
      font-size: 1.05rem;
      margin: 0 0 10px 0;
    }
    p.desc {
      color: #94a3b8;
      font-size: 0.92rem;
      margin: 0;
    }
    .cat-title {
      color: #e2e8f0;
      font-size: 1.15rem;
      margin: 28px 0 14px 0;
      border-left: 3px solid #38bdf8;
      padding-left: 10px;
    }
    .link-grid {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 12px;
    }
    .link-item {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 8px;
      padding: 14px 18px;
      transition: border-color 0.15s ease;
    }
    .link-item:hover {
      border-color: #38bdf8;
    }
    .link-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .link-name {
      font-weight: 600;
      color: #f1f5f9;
      font-size: 0.98rem;
    }
    .direct-badge {
      font-size: 0.75rem;
      background: #1e293b;
      color: #94a3b8;
      padding: 3px 8px;
      border-radius: 4px;
      text-decoration: none;
    }
    .direct-badge:hover {
      background: #334155;
      color: #f8fafc;
    }
    .link-paths {
      font-size: 0.85rem;
      color: #64748b;
    }
    .go-link {
      color: #38bdf8;
      text-decoration: none;
    }
    .go-link:hover {
      text-decoration: underline;
    }
    .aliases {
      margin-top: 4px;
      font-size: 0.78rem;
      color: #94a3b8;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: #0f172a;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 0.82rem;
      color: #38bdf8;
    }
    footer {
      margin-top: 48px;
      text-align: center;
      border-top: 1px solid #1f2937;
      padding-top: 20px;
      font-size: 0.85rem;
      color: #64748b;
    }
    footer a {
      color: #94a3b8;
      text-decoration: none;
    }
    footer a:hover {
      color: #38bdf8;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>WGOPilot Official Redirect Portal</h1>
      <p class="lead">Safe, verified upstream partner links for WGOPilot OpenWrt Avionics</p>
      <p class="desc">Used by Web Cockpit, Mobile CLI helpers (<code>referral_menu.sh</code>), and RPCD backend.</p>
    </header>

    ${listHtml}

    <footer>
      <p>Part of the <a href="https://github.com/Popeye-D-Sailor/wgopilot">WGOPilot OpenWrt Project</a> | Maintained by <a href="https://github.com/Popeye-D-Sailor">Popeye-D-Sailor</a></p>
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
  <title>WGOPilot Portal - Redirect</title>
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
    <h2>WGOPilot Portal</h2>
    <p>The requested destination could not be resolved automatically.</p>
    <p><a href="/">Return to Official Redirect Directory</a> or visit <a href="https://github.com/Popeye-D-Sailor/wgopilot">WGOPilot on GitHub</a>.</p>
  </div>
</body>
</html>
`;
}

// Build files
console.log('Generating redirects and manifests...');

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
const readmeContent = `# WGOPilot Official Redirect & Partner Portal

Live redirect gateway and remote manifest host for [WGOPilot](https://github.com/Popeye-D-Sailor/wgopilot).

- **Manifest**: [go/links.conf](go/links.conf) (\`https://popeye-d-sailor.github.io/go/links.conf\`)
- **Portal URL**: \`https://popeye-d-sailor.github.io/\`
- **Redirects Path**: \`https://popeye-d-sailor.github.io/go/<slug>\`

## Verified Slugs & Destinations

| Full Slug | CLI Alias | Destination |
| :--- | :--- | :--- |
| \`/go/nordvpn\` | \`/go/nord\` | [NordVPN](https://nordvpn.com/) |
| \`/go/surfshark\` | \`/go/surf\` | [Surfshark VPN](https://surfshark.com/) |
| \`/go/mullvad\` | \`/go/mull\` | [Mullvad VPN](https://mullvad.net/) |
| \`/go/protonvpn\` | \`/go/proton\`, \`/go/prtn\` | [Proton VPN](https://protonvpn.com/) |
| \`/go/pia\` | - | [Private Internet Access](https://www.privateinternetaccess.com/) |
| \`/go/ivpn\` | - | [IVPN](https://www.ivpn.net/) |
| \`/go/windscribe\` | \`/go/wind\` | [Windscribe](https://windscribe.com/) |
| \`/go/hw-flint2\` | \`/go/flint2\` | [GL.iNet GL-MT6000 (Flint 2)](https://www.gl-inet.com/products/gl-mt6000/) |
| \`/go/hw-beryl\` | \`/go/beryl\` | [GL.iNet GL-MT3000 (Beryl AX)](https://www.gl-inet.com/products/gl-mt3000/) |
| \`/go/hw-slate\` | \`/go/slate\` | [GL.iNet GL-AXT1800 (Slate AX)](https://www.gl-inet.com/products/gl-axt1800/) |
| \`/go/hw-brume2\` | \`/go/brume2\` | [GL.iNet GL-MT2500 (Brume 2)](https://www.gl-inet.com/products/gl-mt2500/) |
| \`/go/hw-banana\` | \`/go/bpi\` | [Bananapi BPI-R3](https://openwrt.org/toh/sinovoip/bananapi_bpi-r3) |
| \`/go/hw-cudy\` | \`/go/cudy\` | [Cudy WR3000](https://www.cudy.com/products/wr3000-1-0) |
| \`/go/hw-friendly\` | \`/go/nanopi\` | [FriendlyElec NanoPi](https://www.friendlyelec.com/) |
| \`/go/glinet\` | \`/go/gl\` | [GL.iNet Hardware](https://www.gl-inet.com/) |
| \`/go/hardware\` | \`/go/hw\` | [OpenWrt Table of Hardware](https://openwrt.org/toh/start) |
| \`/go/sponsor\` | \`/go/support\`, \`/go/supp\` | [Popeye-D-Sailor Profile](https://github.com/Popeye-D-Sailor) |
| \`/go/kofi\` | - | [Ko-fi](https://ko-fi.com/) |
| \`/go/github-sponsors\` | \`/go/ghs\` | [GitHub Sponsors](https://github.com/sponsors) |
| \`/go/liberapay\` | - | [Liberapay](https://liberapay.com/) |
| \`/go/bounty\` | \`/go/bnty\` | [Project Bug Bounty](https://github.com/Popeye-D-Sailor/wgopilot/issues) |

## Maintenance

To re-generate all redirects and manifests, run:
\`\`\`bash
node generate_redirects.mjs
\`\`\`
`;

fs.writeFileSync(path.join(__dirname, 'README.md'), readmeContent, 'utf8');

console.log('All files generated successfully.');
