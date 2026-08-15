if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "uim",
  name: "United Internet Media",
  description: "Vermarkter für Web.de und GMX.",
  supportedInventoryTypes: [
    { type: "desktop", coverage:  },
    { type: "mobile", coverage:  },
    { type: "app", coverage:  }
  ],
  supportedIds: [
    { id: "netid_utiq", coverage: 90 },
    { id: "netid", coverage: 90 }
  ]
});
