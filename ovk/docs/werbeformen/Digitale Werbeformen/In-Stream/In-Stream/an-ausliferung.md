# An- und Auslieferung In-Stream Video
## Der VAST Standard

:::info
In-Stream Videoinhalte können analog zu In-Page Ads als physische Datei oder Redirects (VAST) angeliefert werden.
:::

<span class="badge badge--success">Active</span>

![Billboard](/img/formats/billboard.jpg)

### Zur Info:

Das Video Ad Serving Template (VAST) ist ein international standardisiertes XML-Werbemitteltemplate für den In-Stream Bereich. Durch die Nutzung von VAST können Video Ads, wie Pre-Roll, Mid-Roll, Post-Roll und Overlay playerunabhängig eingebunden werden.
Mehr Informationen zum VAST Standard erfahren Sie hier. -> [IAB Vast Standard](https://www.iab.com/guidelines/vast/)

### Für die Anlieferung sind folgende Spezifikationen zu beachten:
#### Physische Anlieferung:
Anlieferung Rohformat  (Encoding wird vom Vermarkter übernommen)

#### Anlieferung als Redirect (VAST Wrapper):

Video-Set für An- und Auslieferung von In-Stream Werbemitteln über VAST Redirect

Bitte immer vorab beim Vermarkter die entsprechende Anliefervariante anfragen.


### Bewegtbildwerbeformen im Internet

Die gängigsten Werbeformen sind die sogenannten linearen Video Ads wie Pre-, Mid- und Post-Roll. Aber auch non-lineare Video Ads wie Overlay Ads oder auch die Verbindung mit Companion Ads werden immer beliebter.
Die Herausforderungen im Bewegtbildbereich sind vor allem die Kommunikation zwischen den Playern und den Adservern. Im Gegensatz zu Standardwerbeformen, die über einen Adslot des Adservers ausgeliefert werden können, muss im Bewegtbildbereich die Werbung über den Player mit Hilfe eines XML Sheet gestartet werden.

Um auch hier eine reibungslose Abwicklung beim Einbau der Kampagnen zu gewährleisten, wird seitens der Vermarkter des OVK der VAST Standard des IAB US unterstützt. Dieser Standard definiert die Kommunikation zwischen dem Player und dem Adserver. Zudem werden wir die Terminologie und technischen Größen standardisiert. Auch hier erfolgt die Orientierung an den aktuellen Standards des IAB US (siehe auch Downloads unten).

### Was ist VAST?
Mit dem Video Ad Serving Template (VAST) gibt es eine international standardisierte Werbemittelbeschreibung für das Ausspielen von Bewegtbildwerbeformen. Durch die Nutzung von VAST können Video Ads playerunabhängig eingebunden werden.

### Vorteile für Agenturen und Vermarkter
- Eine Werbemittelbeschreibung (VAST) für alle Player
- Reibungslosere Abwicklung im Einbau der Kampagne
- Standardisiertes Reporting für Werbungtreibende und Agenturen
- Bewegtbildwerbung kann wie jedes andere Standardwerbemittel über Redirect eingebucht werden.
- Ausnutzen der bestehenden Infrastruktur der Agenturen in Adserving, Reporting und Optimierungstools.
- Optimierung der Site übergreifenden Bewegtbildrotationen eines Vermarkters, da unabhängig vom Player.

### Downloads

[Mehr Infos zum Thema VAST](https://www.iab.com/guidelines/vast/)

[VAST XML Beispiel](https://github.com/InteractiveAdvertisingBureau/VAST_Samples)

### Offizielle Size für Programmatic
XXX x XXX

### Formate
Physisch als MP4, OGG, WEBM oder MOV oder als Vast Wrapper (Redirect)

## VPAID ??

## Physische Anlieferung – Rohformat
Encoding wird vom Vermarkter übernommen)

Die einfachste Variante bei der Anlieferung ist, dass der Kunde den Spot als Rohformat anliefert und der Vermarkter die Encodierungen übernimmt. Dabei sollte folgende Richtlinie beachtet werden:

|     Anlieferung Spot – Rohformat    |                                                                                                        |
|-------------------------------------|--------------------------------------------------------------------------------------------------------|
|     Videocodecs:                    |     Uncompressed,   XDCAM HD 422, Apple ProRes 422, IMX30/50 oder H.264 (mind. Datenrate 6 Mbit/s).    |
|     Videogrößen:                    |     720x576 bis 1920x1080                                                                              |
|     Framerate:                      |     25, 30, 50 oder 60 fps                                                                             |
|     Audioeigenschaften:             |     48 oder 44 kHz, 16 Bit, Stereo                                                                     |
|     Format:                         |     MOV/MP4 Quicktime                                                                                  |
|     Seitenverhältnis:               |     16:9-Vollformat                                                                                    |


## Anlieferung als Redirect (VAST)

Video-Set für An- und Auslieferung von In-Stream Werbemitteln über VAST Redirect

Im Folgenden finden Sie die Spezifikationen für die An- und Auslieferung von In-Stream Werbemitteln über VAST Redirect:

|     Dateiformat       |     Bitrate    |     Größe      |     Bitrate Video / Audio       |     Einsatz / Qualitätsstufen              |
|-----------------------|----------------|----------------|---------------------------------|--------------------------------------------|
|     MP4               |                |                |                                 |                                            |
|     H.264 Main        |     1.500      |     960x540    |     1350k Video + 128k Audio    |     Online HQ                              |
|     H.264 Baseline    |     750        |     640x360    |     600k Video + 128k Audio     |     Online Low   (Standard) = Mobile HQ    |
|     H.264 Baseline    |     320        |     320x180    |     260k Video + 64k Audio      |     Mobile Low                             |
|     WEBM              |                |                |                                 |                                            |
|     VP8               |     750        |     640x360    |     600k Video + 128k Audio     |     HTML5 Fallback                         |



:::caution SSLFähigkeit (obligatorisch)
Wir weisen darauf hin, dass ab sofort (Mai 2016) alle Bestandteile einer Kampagne (Script , Redirect Ressourcen) als HTTPS-- Tags, AgenturZählpixel und sonstige extern gehostete kompatible Komponenten anzuliefern sind, um Anzeige Messfehler in Bezug auf Verletzungen von Sicherheitseinstellungen der unterschiedlichen Browser webseitenübergreifend ausschließen zu können. Dafür ist sicherzustellen, dass alle Ressourcen auf SSLzertifizierten Servern und gehostet sind. Bitte prüfen Sie daher, ob die von Ihnen eingesetzten Systeme für das Hosting der Werbemittel diese Möglichkeit standardisiert zur Verfügung stellen. Mit dieser Maßnahme soll den Entwicklungen der Internet Engineering Task Force (IETF) und der damit steigenden Bedeutung von HTTPS gerecht werden.kompatiblen Werberessourcen 1
::: 

:::caution Sound & Video
Sound und Video sind erlaubt. Der Sound darf allerdings nur userinitiiert (onMouseover/ onClick) starten, nicht automatisch mit einer Animation. Der Sound muss mit der gleichen Technik deaktiviert werden (Mouseover/out bzw. onClick). Ein Looping ist nicht gestattet. Bitte außerdem darauf achten, dass das Werbemittel (bei onClick Variante) ein gut sichtbares Symbol enthält, mit dem der Sound bei angemessener Lautstärke an und ausgeschaltet werden kann (z.B. Lautsprecher-- Symbol ). StreamingInhalte innerhalb des Werbemittels müssen polite geladen werden. Sie dürfen erst dann starten, wenn die Seite komplett geladen ist. 
:::