---
sidebar_position: 1
---

# Intro
### Dieses Repository enthält:
- Eine [Übersicht](https://github.com/BVDW-org/ovk-identifiersupport/blob/main/OVK-IdentifierSupport.md) der OVK Häuser welche Identifier ihre Publisher unterstützen, um so Addressability in der Postcookie Ära sicherzustellen.
- Eine [Übersicht](https://github.com/BVDW-org/ovk-identifiersupport/blob/main/DSP-IdentifierSupport.md) des Identifier Supports auf DSP und eine [Übersicht](https://github.com/BVDW-org/ovk-identifiersupport/blob/main/SSP-IdentifierSupport.md) der SSP Seite.
 

## Erläuterung der Vermarkter ID Übersicht:
- Die Datei soll von jedem OVK Vermarkter initial und fortlaufend gepflegt werden.
- Das Ziel ist es, diese Datei nicht nur unter Vermarktern, sondern auch mit Einkäufern zu teilen, damit beide Seiten die Relevanz und Potentiale zu ID Lösungen besser bewerten können und damit hoffentlich mehr Speed auf den Support der Ids auf beiden Seiten kommt.

**Legende:**
- Status: 
  - Live = ID is live on publisher website(s)
  - In-Progress = Integration is in progress / Contractual talks underway
  - No Support = No integration forseeable 
- Usable via:
  - Bid Stream (deal id) = ID is only available in form of pre-targeted deals
  - Bid Stream (unrestricted) = ID is sent to all demand partners without restriction
  - Bid Stream (restricted) = Only selected demand partners receive the ID
  - IO only (Adserver) = ID is used for IO campaigns in the publisher's Ad Server
  - Data Marketplace (Curation-SSP) = ID is used for data activation through the data marketplace of a SSP
  - Data Marketplace (DSP) = ID is used for data activation through the data marketplace of a DSP
  - Data Clean Room = ID can be activated through DCR workflow


## Erläuterung der DSP und SSP ID Übersicht:
- Diese Datei soll ebenfalls regelmäßig von den Vermarktern gepflegt werden.
- Ids sollen nur dann eingetragen werden, wenn eine offizielle Bestätigung der DSP oder SSP vorliegt, dass eine ID unterstützt wird. Oder die Info ist öffentlich einsehbar wie z.B. in der Prebid Doku.

**Legende:**
  - Status: Der Release Status der ID Lösung (Live = ausgerollt, In-Progress = Eine Integration ist beabsichtigt und Gespräche laufen, No Support = Derzeit keine Integration vorgesehen)
  - Usage:
    - Frequency Capping: Wird die ID bei einer DSP für Frequency Capping genutzt?
    - Available via Bidstream->All DSPs: Weiterleitung an DSPs 
    - Enabled via DMP: Kann die ID in der SSP oder DSP für eine Audience Aktivierung genutzt werden?
