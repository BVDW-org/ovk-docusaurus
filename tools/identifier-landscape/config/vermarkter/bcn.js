if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "bcn",
  name: "BCN Brand Community Network GmbH",
  description: "Vermarkter für BurdaVerlag, BurdaForward, Funke, Klambt, Delius Klasing und Kouneli",
  supportedInventoryTypes: [
    { type: "desktop", coverage: },
    { type: "mobile", coverage:  },
    { type: "app", coverage:  }
  ],
  supportedIds: [
    { id: "utiq", coverage: 50 }
  ]
});
