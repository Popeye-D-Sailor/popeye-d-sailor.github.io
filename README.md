# WGOPilot Official Redirect & Partner Portal

Live redirect gateway and remote manifest host for [WGOPilot](https://github.com/Popeye-D-Sailor/wgopilot).

- **Manifest**: [go/links.conf](go/links.conf) (`https://popeye-d-sailor.github.io/go/links.conf`)
- **Portal URL**: `https://popeye-d-sailor.github.io/`
- **Redirects Path**: `https://popeye-d-sailor.github.io/go/<slug>`

## Verified Slugs & Destinations

| Full Slug | CLI Alias | Destination |
| :--- | :--- | :--- |
| `/go/nordvpn` | `/go/nord` | [NordVPN](https://nordvpn.com/) |
| `/go/surfshark` | `/go/surf` | [Surfshark VPN](https://surfshark.com/) |
| `/go/mullvad` | `/go/mull` | [Mullvad VPN](https://mullvad.net/) |
| `/go/protonvpn` | `/go/proton` | [Proton VPN](https://protonvpn.com/) |
| `/go/pia` | - | [Private Internet Access](https://www.privateinternetaccess.com/) |
| `/go/ivpn` | - | [IVPN](https://www.ivpn.net/) |
| `/go/windscribe` | `/go/wind` | [Windscribe](https://windscribe.com/) |
| `/go/hw-flint2` | `/go/flint2` | [GL.iNet GL-MT6000 (Flint 2)](https://www.gl-inet.com/products/gl-mt6000/) |
| `/go/hw-beryl` | `/go/beryl` | [GL.iNet GL-MT3000 (Beryl AX)](https://www.gl-inet.com/products/gl-mt3000/) |
| `/go/hw-slate` | `/go/slate` | [GL.iNet GL-AXT1800 (Slate AX)](https://www.gl-inet.com/products/gl-axt1800/) |
| `/go/hw-brume2` | `/go/brume2` | [GL.iNet GL-MT2500 (Brume 2)](https://www.gl-inet.com/products/gl-mt2500/) |
| `/go/hw-banana` | `/go/bpi` | [Bananapi BPI-R3](https://openwrt.org/toh/sinovoip/bananapi_bpi-r3) |
| `/go/hw-cudy` | `/go/cudy` | [Cudy WR3000](https://www.cudy.com/products/wr3000-1-0) |
| `/go/hw-friendly` | `/go/nanopi` | [FriendlyElec NanoPi](https://www.friendlyelec.com/) |
| `/go/glinet` | - | [GL.iNet Hardware](https://www.gl-inet.com/) |
| `/go/hardware` | - | [OpenWrt Table of Hardware](https://openwrt.org/toh/start) |
| `/go/sponsor` | `/go/support` | [Popeye-D-Sailor Profile](https://github.com/Popeye-D-Sailor) |
| `/go/kofi` | - | [Ko-fi](https://ko-fi.com/) |
| `/go/github-sponsors` | `/go/ghs` | [GitHub Sponsors](https://github.com/sponsors) |
| `/go/liberapay` | - | [Liberapay](https://liberapay.com/) |
| `/go/bounty` | - | [Project Sponsorship](https://github.com/Popeye-D-Sailor) |

## Maintenance

To re-generate all redirects and manifests, run:
```bash
node generate_redirects.mjs
```
