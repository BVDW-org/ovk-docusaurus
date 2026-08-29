if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "seven_one_media",
  name: "SevenOne Media GmbH",
  description: " ",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "netid_utiq",
          excludedDSPs: []
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "netid_utiq",
          excludedDSPs: []
        }
      ]
    },
    {
      type: "ctv",
      supportedIds: [
        {
          id: "netid_utiq",
          excludedDSPs: []
        }
      ]
    },
    {
      type: "app",
      supportedIds: [
        {
          id: "netid_utiq",
          excludedDSPs: []
        }
      ]
    }
  ],
  supportedSSPs: [
    "yieldlab"
  ]
});