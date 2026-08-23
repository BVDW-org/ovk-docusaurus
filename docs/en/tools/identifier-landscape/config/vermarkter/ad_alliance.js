if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "ad_alliance",
  name: "Ad Alliance",
  description: "Vermarkter von RTL Deutschland, Gruner + Jahr etc.",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "utiq"
        },
        {
          id: "netid_utiq"
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "utiq",
          coverage: 15
        },
        {
          id: "netid_utiq",
          coverage: 25
        }
      ]
    },
    {
      type: "ctv",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 30
        }
      ]
    }
  ]
});