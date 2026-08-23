if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "bcn",
  name: "BCN Brand Community Network GmbH",
  description: "Vermarkter für BurdaVerlag, BurdaForward, Funke, Klambt, Delius Klasinng",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "utiq"
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "utiq",
          coverage: 50
        }
      ]
    },
    {
      type: "app",
      supportedIds: [
        {
          id: "utiq",
          coverage: 50
        }
      ]
    }
  ]
});