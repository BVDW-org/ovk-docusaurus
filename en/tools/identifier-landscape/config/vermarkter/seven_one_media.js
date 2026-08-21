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
    {
      type: "desktop",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 60
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 60
        }
      ]
    },
    {
      type: "ctv",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 60
        }
      ]
    },
    {
      type: "app",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 60
        }
      ]
    }
  ]
});