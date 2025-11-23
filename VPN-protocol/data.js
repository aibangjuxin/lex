const protocols = [
  {
    id: "shadowsocks",
    name: "Shadowsocks",
    type: "Proxy",
    year: "2012",
    transport: "TCP/UDP",
    description:
      "A secure socks5 proxy, designed to protect your internet traffic. It is the 'grandfather' of modern censorship circumvention tools.",
    pros: ["Lightweight", "Fast on low-end devices", "Wide client support"],
    cons: [
      "Active probing can detect it",
      "No native obfuscation (needs plugins)",
    ],
    bestFor: "Basic privacy, older devices",
    obfuscation: "Low (High with plugins)",
    speed: "High",
  },
  {
    id: "vmess",
    name: "VMess",
    type: "V2Ray",
    year: "2015",
    transport: "TCP/mKCP/WS/H2/QUIC",
    description:
      "The primary protocol for V2Ray. It is stateless and supports various transport layers, making it highly versatile.",
    pros: [
      "Extremely versatile",
      "Robust encryption",
      "Hard to detect with WS+TLS",
    ],
    cons: [
      "Heavy handshake overhead",
      "Configuration can be complex",
      "Time synchronization required",
    ],
    bestFor: "Stability, bypassing heavy firewalls",
    obfuscation: "High",
    speed: "Medium",
  },
  {
    id: "vless",
    name: "VLess",
    type: "V2Ray/Xray",
    year: "2020",
    transport: "TCP/WS/gRPC/XTLS",
    description:
      "A lightweight version of VMess that removes the encryption overhead, relying instead on the underlying TLS layer for security.",
    pros: [
      "Very fast (no double encryption)",
      "Lightweight",
      "XTLS/Reality support for ultimate stealth",
    ],
    cons: [
      "No encryption without TLS (unsafe for plain text)",
      "Newer, slightly less client support than VMess",
    ],
    bestFor: "High performance, maximum stealth (with Reality)",
    obfuscation: "Very High",
    speed: "Very High",
  },
  {
    id: "trojan",
    name: "Trojan",
    type: "Trojan",
    year: "2017",
    transport: "TLS",
    description:
      "Designed to mimic HTTPS traffic exactly. To a firewall, it looks indistinguishable from a standard web server accessing a website.",
    pros: [
      "Unblockable by standard DPI",
      "Simple concept (mimics HTTPS)",
      "Fast",
    ],
    cons: ["Requires a domain and valid cert", "Not as flexible as V2Ray"],
    bestFor: "Bypassing strict firewalls, looking like normal web traffic",
    obfuscation: "Very High",
    speed: "High",
  },
  {
    id: "hysteria2",
    name: "Hysteria 2",
    type: "QUIC",
    year: "2023",
    transport: "UDP (QUIC)",
    description:
      "A powerful proxy protocol built on top of QUIC. It is designed to optimize throughput on unreliable networks (high packet loss).",
    pros: [
      "Insane speeds on bad networks",
      "Brute forces through congestion",
      "Modern architecture",
    ],
    cons: [
      "High CPU usage",
      "UDP throttling by some ISPs",
      "Aggressive congestion control can be unfriendly",
    ],
    bestFor: "Poor network conditions, maximum throughput",
    obfuscation: "High",
    speed: "Very High",
  },
  {
    id: "tuic",
    name: "Tuic",
    type: "QUIC",
    year: "2023",
    transport: "UDP (QUIC)",
    description:
      "Another QUIC-based protocol, similar to Hysteria but aiming for a more standard implementation using existing QUIC libraries.",
    pros: [
      "0-RTT connection establishment",
      "Multiplexing",
      "Performance similar to Hysteria",
    ],
    cons: ["Newer, fewer clients", "UDP throttling issues"],
    bestFor: "Low latency gaming, fast browsing",
    obfuscation: "High",
    speed: "Very High",
  },
  {
    id: "wireguard",
    name: "WireGuard",
    type: "VPN",
    year: "2016",
    transport: "UDP",
    description:
      "A modern, general-purpose VPN protocol. It is not designed for censorship circumvention but is extremely fast and secure.",
    pros: [
      "State-of-the-art cryptography",
      "Instant connection",
      "Kernel-level speed",
    ],
    cons: [
      "Easily detected/blocked (UDP)",
      "Static IP allocation (privacy concern for some)",
    ],
    bestFor: "Secure tunneling where censorship is not an issue",
    obfuscation: "None",
    speed: "Very High",
  },
  {
    id: "shadowsocksr",
    name: "ShadowsocksR",
    type: "Proxy",
    year: "2015",
    transport: "TCP/UDP",
    description:
      "A fork of Shadowsocks that added complex obfuscation to fool DPI. Now largely unmaintained but still used.",
    pros: ["Historical significance", "Some unique obfuscation methods"],
    cons: [
      "Unmaintained",
      "Security vulnerabilities",
      "Superseded by newer protocols",
    ],
    bestFor: "Legacy systems",
    obfuscation: "Medium",
    speed: "Medium",
  },
];

// Export for use in module or global scope
if (typeof module !== "undefined" && module.exports) {
  module.exports = protocols;
} else {
  window.protocols = protocols;
}
