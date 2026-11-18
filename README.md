# WGOPilot™ Official Redirect & Partner Portal

Live redirect gateway and remote manifest host for [WGOPilot™](https://github.com/Popeye-D-Sailor).

- **Manifest**: [go/links.conf](go/links.conf) (`https://popeye-d-sailor.github.io/go/links.conf`)
- **Portal URL**: `https://popeye-d-sailor.github.io/`
- **Redirects Path**: `https://popeye-d-sailor.github.io/go/<slug>`

## Verified Slugs & Destinations

| Full Slug | CLI Alias | Destination |
| :--- | :--- | :--- |
| `/go/nordvpn` | `/go/nord` | [NordVPN](https://go.nordvpn.net/aff_c?offer_id=15&aff_id=161117&url_id=902) |
| `/go/surfshark` | `/go/surf` | [Surfshark VPN](https://surfshark.com/) |
| `/go/mullvad` | `/go/mull` | [Mullvad VPN](https://mullvad.net/) |
| `/go/protonvpn` | `/go/proton`, `/go/prtn` | [Proton VPN](https://protonvpn.com/) |
| `/go/pia` | - | [Private Internet Access](https://www.privateinternetaccess.com/) |
| `/go/ivpn` | - | [IVPN](https://www.ivpn.net/) |
| `/go/windscribe` | `/go/wind` | [Windscribe](https://windscribe.com/) |
| `/go/hw-flint2` | `/go/flint2` | [GL.iNet GL-MT6000 (Flint 2)](https://www.amazon.com/s?k=GL.iNet+GL-MT6000+Flint+2+WiFi+6+Router&tag=wgopilot-20) |
| `/go/hw-beryl` | `/go/beryl` | [GL.iNet GL-MT3000 (Beryl AX)](https://www.amazon.com/s?k=GL.iNet+GL-MT3000+Beryl+AX+Travel+Router&tag=wgopilot-20) |
| `/go/hw-slate` | `/go/slate` | [GL.iNet GL-AXT1800 (Slate AX)](https://www.amazon.com/s?k=GL.iNet+GL-AXT1800+Slate+AX+Router&tag=wgopilot-20) |
| `/go/hw-brume2` | `/go/brume2` | [GL.iNet GL-MT2500 (Brume 2)](https://www.amazon.com/s?k=GL.iNet+GL-MT2500+Brume+2+VPN+Gateway&tag=wgopilot-20) |
| `/go/hw-banana` | `/go/bpi` | [Bananapi BPI-R3 / BPI-R4](https://www.amazon.com/s?k=Banana+Pi+BPI-R3+BPI-R4+OpenWrt+Router&tag=wgopilot-20) |
| `/go/hw-cudy` | `/go/cudy` | [Cudy WR3000](https://www.amazon.com/s?k=Cudy+WR3000+OpenWrt+WiFi+6+Router&tag=wgopilot-20) |
| `/go/hw-friendly` | `/go/nanopi` | [FriendlyElec NanoPi](https://www.amazon.com/s?k=FriendlyElec+NanoPi+R4S+R5S+R6S+Router&tag=wgopilot-20) |
| `/go/glinet` | `/go/gl` | [GL.iNet Hardware](https://www.amazon.com/s?k=GL.iNet+WiFi+7+WiFi+6+Router+Beryl+Flint+Slate&tag=wgopilot-20) |
| `/go/hardware` | `/go/hw` | [Recommended OpenWrt Router Hardware (Amazon)](https://www.amazon.com/s?k=OpenWrt+WiFi+Router+GL.iNet+Flint+2+Beryl+AX+Cudy&tag=wgopilot-20) |
| `/go/sponsor` | `/go/support`, `/go/supp` | [Ko-fi (Popeye-D-Sailor)](https://ko-fi.com/popeyedsailor) |
| `/go/kofi` | - | [Ko-fi (Popeye-D-Sailor)](https://ko-fi.com/popeyedsailor) |
| `/go/github-sponsors` | `/go/ghs` | [GitHub Sponsors (Popeye-D-Sailor)](https://github.com/sponsors/Popeye-D-Sailor) |
| `/go/liberapay` | - | [Liberapay](https://liberapay.com/) |
| `/go/bounty` | `/go/bnty` | [Project Bug Bounty / Fund](https://github.com/Popeye-D-Sailor) |

## Maintenance

To re-generate all redirects and manifests, run:
```bash
node generate_redirects.mjs
```
