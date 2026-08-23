// OVK ID Landscape Map - Data Partner Konfigurationsdaten

if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}

window.OVK_LANDSCAPE_CONFIG.dataPartners = [
  {
    id: "iq_data",
    name: "IQ digital data",
    description: "Daten von IQ digital",
    supportedIds: [
      "utiq"
    ],
    supportedDSPs: [
      "adform"
    ],
    supportedSSPs: [
      "index_exchange",
      "xandr"
    ]
  },
  {
    id: "bcn_data",
    name: "BCN Data",
    description: "Vermarktereigene Datensegmente des Burda Community Network.",
    supportedIds: [
      "utiq"
    ],
    supportedDSPs: [
      "ttd",
      "active_agent"
    ],
    supportedSSPs: [
      "index_exchange",
      "magnite"
    ]
  },
  {
    id: "uim_data",
    name: "United Internet Media (Data)",
    description: "E-Commerce- und Profil-Datensegmente von WEB.DE & GMX.",
    supportedIds: [
      "netid_utiq",
      "netid"
    ],
    supportedDSPs: [
      "ttd",
      "active_agent",
      "adform"
    ],
    supportedSSPs: [
      "equativ",
      "xandr"
    ]
  }
];

// Für Node.js CommonJS-Umgebung (Validierung)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.OVK_LANDSCAPE_CONFIG.dataPartners;
}
