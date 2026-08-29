if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "score",
  name: "Score Media Group",
  description: " Vermarkter Regionale Tageszeitungen in Deutschland",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "utiq",
          coverage: 16,
          excludedDSPs: []
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "utiq",
          coverage: 16,
          excludedDSPs: []
        }
      ]
    }
  ],
  supportedSSPs: [
    "equativ",
    "pubmatic",
    "adform"
  ]
});