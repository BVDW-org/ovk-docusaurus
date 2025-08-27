# In-Text Ad
<span class="badge badge--success">Active</span>

![Billboard](/img/formats/billboard.jpg)

## Beschreibung
Bei einer In-Text Ad werden im Content von Websites, die vom Werbungtreibenden bestimmten Begriffe identifiziert und in doppelt unterstrichene Hyperlinks umformatiert. Bei Mouseover öffnet sich ein Anzeigen-Layer mit Werbe- und Zusatzinformationen zu dem passenden Begriff. Nach Klick auf diese Informationen gelangt der User auf die jeweilige Seite des Werbungtreibenden. Erst jetzt wird per CPC abgerechnet.

Bei einem In-Text Video öffnet sich bei Mouseover ein Videolayer. Verweilt der User mit der Mouse auf dem Layer, expandiert das Video (Mouseover-Event). Der User kann oft aus bis zu vier passenden Videos im Layer auswählen. Jede Ad Impression (AI) ist schon vor dem Klick als AI qualifiziert, da aufgrund des Channel- und Begriffstargeting zielgerichtet ausgeliefert wird und die AI 100% User initiiert ist. Wie bei anderen In-Page Formaten benötigt auch das In-Text Video keinen Videocontent, um Videowerbung auszuliefern. Es wird per CPC abgerechnet. Die Kommunikationsleistung im Layer ist kostenlos.

## Technische Spezifikationen


| Name         | In-Text Ad |
|--------------|---------|
| OVK ID       | 693     |
| expandable   | nein    |
| sticky       | nein    |
| video        | ja/nein |


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