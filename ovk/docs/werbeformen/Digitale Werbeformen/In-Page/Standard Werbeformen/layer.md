# Layer
<span class="badge badge--success">Active</span>

![Billboard](/img/formats/billboard.jpg)

## Beschreibung
Der Layer hat kein fest vorgegebenes Format. Seine Platzierung erfolgt beim Aufruf einer Internetseite direkt über dem Content. Das Werbemittel muss dafür komplett in Flash programmiert sein.

Dieser Standard formuliert Mindestanforderungen an ein Layer Format, sofern die Spezifikationen des Universal Flash Layer nicht eingehalten werden können.

## Technische Spezifikationen


| Name         | Layer    |
|--------------|----------|
| OVK ID       | 689      |
| expandable   | nein     |
| sticky       | nein     |
| video        | ja/nein  |
| Dateigewicht | 40 KB    |
| Größe        | in PX    |
| min. Breite  | 1        |
| max. Breite  | beliebig |
| min. Höhe    | 1        |
| max. Höhe    | beliebig |

:::danger Close Button

- Das Werbemittel muss für den User schließbar sein.
- Der Close Button sollte klar erkennbar, nicht auf transparentem Hintergrund und in unmittelbarer Nähe zur Werbeform rechts oben positioniert sein.
- Funktionsaufruf zum Schließen des Layers: Fscommand(„adlayerhider“)
:::


## Offizielle Size für Programmatic
XXX x XXX

## Größe
200 kB (von uns gehostet), max. 2MB nachgeladen (polite Download aus externen Quellen)
## Formate
JPEG, Gif, HTML5 und Video

:::info Allgemeine HTML5 Spezifikationen
HTML5 Werbemittel bestehen wie Webseiten aus mehreren Elementen, die nicht analog zu Flash in einem File zusammengeführt und komprimiert werden können. Diese sind:  - HTML  - Files - CSS  - Libraries (Javascript, JQuery, etc.) - Bilder - Videos  Damit der Aufbau der Webseite und des Werbemittels nicht unnötig verzögert wird, ist bei der Kreation zu beachten, dass die einzelnen Elemente des HTML5 Werbemittels sowohl hinsichtlich ihrer Anzahl als auch Dateigröße so klein wie möglich gehalten werden, um die Serverprozesse/Anfragen (Serverrequests) zu minimieren. Dazu sind Kompilierungsmethoden des Codes und Code-Optimierungen in einer Datei anzuwenden.  Folgende Limits müssen eingehalten werden:  - 200 kB physisch, entpackt - 200 kB als redirect - max. 2 MB nachgeladen (polite Download) Dies ist durch Komprimierung und Optimierungsverfahren als auch durch sparsame Anwendung von Animationen und Einbindung externer Elemente wie Fonts und Bibliotheken einzuhalten, welche auch zu der Dateigröße dazu gerechnet werden. Unterverzeichnis-Strukturen sind zu vermeiden.
:::

:::caution SSLFähigkeit (obligatorisch)
Wir weisen darauf hin, dass ab sofort (Mai 2016) alle Bestandteile einer Kampagne (Script , Redirect Ressourcen) als HTTPS-- Tags, AgenturZählpixel und sonstige extern gehostete kompatible Komponenten anzuliefern sind, um Anzeige Messfehler in Bezug auf Verletzungen von Sicherheitseinstellungen der unterschiedlichen Browser webseitenübergreifend ausschließen zu können. Dafür ist sicherzustellen, dass alle Ressourcen auf SSLzertifizierten Servern und gehostet sind. Bitte prüfen Sie daher, ob die von Ihnen eingesetzten Systeme für das Hosting der Werbemittel diese Möglichkeit standardisiert zur Verfügung stellen. Mit dieser Maßnahme soll den Entwicklungen der Internet Engineering Task Force (IETF) und der damit steigenden Bedeutung von HTTPS gerecht werden.kompatiblen Werberessourcen 1
::: 

:::caution Sound & Video
Sound und Video sind erlaubt. Der Sound darf allerdings nur userinitiiert (onMouseover/ onClick) starten, nicht automatisch mit einer Animation. Der Sound muss mit der gleichen Technik deaktiviert werden (Mouseover/out bzw. onClick). Ein Looping ist nicht gestattet. Bitte außerdem darauf achten, dass das Werbemittel (bei onClick Variante) ein gut sichtbares Symbol enthält, mit dem der Sound bei angemessener Lautstärke an und ausgeschaltet werden kann (z.B. Lautsprecher-- Symbol ). StreamingInhalte innerhalb des Werbemittels müssen polite geladen werden. Sie dürfen erst dann starten, wenn die Seite komplett geladen ist. 
:::
## Interessante Links
[Close Button für Layer](https://github.com/Unitadtechnologystandards/HTML5Lib/tree/master/close)

[Clicktag](/docs/Tech-Hilfe/klicktag)