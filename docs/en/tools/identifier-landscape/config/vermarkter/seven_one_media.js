if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "seven_one_media",
  name: "Seven.One Media",
  description: "Vermarkter der ProSiebenSat.1 Media SE.",
  supportedInventoryTypes: [
    { type: "desktop", coverage:  },
    { type: "mobile", coverage:  },
    { type: "ctv", coverage:  },
    { type: "app", coverage: }
  ],
  supportedIds: [
    { id: "netid_utiq", coverage: 60 }
  ]
});
