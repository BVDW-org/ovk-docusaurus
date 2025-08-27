# Linear Video Ad

Ein lineares Video Ad nimmt die volle Aufmerksamkeit des Nutzers ein. Es liegt vor, zwischen oder nach dem Video Content und läuft linear, d.h. das Ad läuft nie zeitgleich mit dem Video Content. Es wird zwischen Pre-, Mid- und Post-Rolls und Interactive Video Ads unterschieden.

## Pre-, Mid- und Post-Roll
Pre-, Mid- und Post-Rolls sind mit regulären TV-Spots zu vergleichen.

Pre-Rolls werden vor dem eigentlichen Video Content ausgespielt. In Deutschland wird in der Regel nur ein Spot gesendet, während z.B. in England auch bis zu drei Spots vor dem Content ausgespielt werden können.

Mid-Rolls werden ähnlich wie in TV-Werbepausen zwischen den Video Content gelegt. Dabei sind mehrere Mid-Roll-Slots möglich.

Post-Rolls werden nach dem Content ausgespielt.

```mermaid
graph LR;
    Pre-Roll-->Video-Content;
    Video-Content(Video Content)-->Mid-roll(Mid-Roll N1);
    Mid-roll(Mid-Roll N1)-->Video-Content2(Video Content)
    Video-Content2(Video Content)-->Mid-roll2(Mid-Roll N2);
    Mid-roll2(Mid-Roll N2)-->Video-Content3(Video Content);
    Video-Content3(Video Content)-->Post-Roll;
```

#### Short Form und Long Form Content

Aus dem TV ins Internet verlängerte Long Form Contents bieten dem Nutzer den Vorteil, sich TV-Inhalte losgelöst von der Programmplanung nachträglich im Internet anschauen zu können. Dies wird auch Catch Up TV oder Just Missed Funktion genannt und wird von Portalen wie TVNOW.de oder ProSieben.de angeboten.

Beim Short Form Content handelt es sich häufig um Schnipsel aus bestehen Long Form Programmen, aber auch um Outtakes, Interviews, Nachrichten, Musikvideos etc.

Die Entscheidung, welche Video Ads eingesetzt werden sollen, ist abhängig von der Länge des Video Contents. Einige Regeln sind hier aufgeführt:

| Short Form Video Schnipsel und Nachrichten (weniger als 5 Min.)                  | Long Form Programme und Film (länger als 5 Min.)                                    |
|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Alle linearen und non-linearen Werbeformen möglich                               | Alle linearen und non-linearen Werbeformen möglich                                  |
| Hohe Werbewirkung durch hohe Bereitschaft des Nutzers den Spot komplett zu sehen | Hohe Werbewirkung durch hohe Bereitschaft des Nutzers, den Spot komplett zu sehen   |
| Je kürzer das Video Ad, desto besser                                             | Sinnvoller für langere Video Ads (15 bis 30 Sekunden)                               |
| Möglichst keine Schaltung von Mid-Rolls                                          | Je länger der Content. desto mehr Video-Ads können hintereinander geschaltet werden |
| Pre-Rolls möglichst nicht langer als 15 bis 20 Sekunden                          |                                                                                     |

### Pre-Roll Ad

**Technische Spezifikationen für Pre-Roll Ads:**

|     Name                       |     Pre-Roll Ad    |                  |                  |
|--------------------------------|--------------------|------------------|------------------|
|     OVK ID                     |     700            |                  |                  |
|     expandable                 |     nein           |                  |                  |
|     sticky                     |     nein           |                  |                  |
|     video                      |     ja             |                  |                  |
|     Dateigewicht               |     -              |                  |                  |
|     Größe in Pixel             |                    |                  |                  |
|     min. Breite                |     max. Breite    |     min. Höhe    |     max. Höhe    |
|     512                        |     818            |     288          |     460          |
|     Weitere Spezifikationen    |                    |                  |                  |
|     -                          |                    |                  |                  |

### Mid-Roll Ad

**Technische Spezifikationen für Mid-Roll Ads:**

|     Name                       |     Mid-Roll Ad    |                  |                  |
|--------------------------------|--------------------|------------------|------------------|
|     OVK ID                     |     679            |                  |                  |
|     expandable                 |     nein           |                  |                  |
|     sticky                     |     nein           |                  |                  |
|     video                      |     ja             |                  |                  |
|     Dateigewicht               |     -              |                  |                  |
|     Größe in Pixel             |                    |                  |                  |
|     min. Breite                |     max. Breite    |     min. Höhe    |     max. Höhe    |
|     512                        |     818            |     288          |     460          |
|     Weitere Spezifikationen    |                    |                  |                  |
|     -                          |                    |                  |                  |

### Post-Roll Ad

**Technische Spezifikationen für Post-Roll Ads:**

|     Name                       | Post-Roll Ad |                  |                  |
|--------------------------------|--------------|------------------|------------------|
|     OVK ID                     | 699          |                  |                  |
|     expandable                 | nein         |                  |                  |
|     sticky                     | nein         |                  |                  |
|     video                      | ja           |                  |                  |
|     Dateigewicht               | -            |                  |                  |
|     Größe in Pixel             |              |                  |                  |
|     min. Breite                | max. Breite  |     min. Höhe    |     max. Höhe    |
|     512                        | 818          |     288          |     460          |
|     Weitere Spezifikationen    |              |                  |                  |
|     -                          |              |                  |                  |

## Interactive Video Ad

Ein wesentlicher Unterschied von Linear Videos Ad zu klassischer TV-Werbung liegt in der möglichen Interaktivität. Neben der Klickbarkeit der Spots erlauben z. B. Interactive Video Ads eine Interaktion mit dem Spot.

Beispiel für ein Interactive Video Ad: Während eines Spots erscheint ein Aufruf zu einem Gewinnspiel. Nach dem Klick auf den Aufruf stoppt der Spot und es öffnet sich im Player eine Gewinnspielfrage. Nach dem Beantworten der Frage trägt sich der Nutzer in ein Gewinnspielformular ein. Danach läuft der Spot zu Ende und der Content startet.

### Technische Spezifikationen

- Format: .swf (Flash)
- Videogröße:
- Anlieferungsgröße VAST
- Anlieferungsgröße Rohformat
     - Die Player-Steuerung sollte auf Start/Pause und Lautstärke reduziert sein. Die restlichen Features sind nicht anwählbar.
     - Bei Interaktion stoppt das Interactive Video Ad und kann nur durch einen Schließen-Button beendet werden.
     - Script-Kommunikation zwischen Video-Player und Interactive Video Ad über VPAID


:::caution SSLFähigkeit (obligatorisch)
Wir weisen darauf hin, dass ab sofort (Mai 2016) alle Bestandteile einer Kampagne (Script , Redirect Ressourcen) als HTTPS-- Tags, AgenturZählpixel und sonstige extern gehostete kompatible Komponenten anzuliefern sind, um Anzeige Messfehler in Bezug auf Verletzungen von Sicherheitseinstellungen der unterschiedlichen Browser webseitenübergreifend ausschließen zu können. Dafür ist sicherzustellen, dass alle Ressourcen auf SSLzertifizierten Servern und gehostet sind. Bitte prüfen Sie daher, ob die von Ihnen eingesetzten Systeme für das Hosting der Werbemittel diese Möglichkeit standardisiert zur Verfügung stellen. Mit dieser Maßnahme soll den Entwicklungen der Internet Engineering Task Force (IETF) und der damit steigenden Bedeutung von HTTPS gerecht werden.kompatiblen Werberessourcen 1
:::

:::caution Sound & Video
Sound und Video sind erlaubt. Der Sound darf allerdings nur userinitiiert (onMouseover/ onClick) starten, nicht automatisch mit einer Animation. Der Sound muss mit der gleichen Technik deaktiviert werden (Mouseover/out bzw. onClick). Ein Looping ist nicht gestattet. Bitte außerdem darauf achten, dass das Werbemittel (bei onClick Variante) ein gut sichtbares Symbol enthält, mit dem der Sound bei angemessener Lautstärke an und ausgeschaltet werden kann (z.B. Lautsprecher-- Symbol ). StreamingInhalte innerhalb des Werbemittels müssen polite geladen werden. Sie dürfen erst dann starten, wenn die Seite komplett geladen ist.
:::
## Interessante Links
[Close Button für Layer](https://github.com/Unitadtechnologystandards/HTML5Lib/tree/master/close)

[Clicktag](/docs/Tech-Hilfe/klicktag)