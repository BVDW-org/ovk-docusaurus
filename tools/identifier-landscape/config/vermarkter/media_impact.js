if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "media_impact",
  name: "Media Impact",
  description: " Vermarkter von Axel Springer.",
  supportedInventoryTypes: [
    { type: "desktop", coverage:  },
    { type: "mobile", coverage:  },
    { type: "app", coverage:  }
  ],
  supportedIds: [
    { id: "utiq", coverage:  },
    { id: "netid", coverage:  }
  ]
});
