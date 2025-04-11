# Einführung
Inhalt:

[1. Motivation](#motivation)

[2. Beschreibung und Anforderungen](#beschreibung-und-anforderungen)
   - [2.1 Klassifizierung](#klassifizierung)
   - [2.3 Analyse](#analyse)

[3. Kriterien](#Kriterien)

[3.1 QUALITÄT](#1-qualität)
   - [3.1.1 Direktanbindung](#11-direktanbindung)
   - [3.1.2 Überprüfung und Veröffentlichung der Prüfergebnisse](#12-überprüfung-und-veröffentlichung-der-prüfergebnisse)

[3.2 DOKUMENTATION](#2-dokumentation)
   - [3.2.1 Dokumentation der Systemfunktionalität](#21-dokumentation-der-systemfunktionalität)
   - [3.2.2 Dokumentation der Qualitätssicherung](#22-dokumentation-der-qualitätssicherung)

[3.3 DATENSCHUTZ UND PRIVACY](#3-datenschutz-und-privacy)
   - [3.3.1 Ausschluss von sensiblen Kategorien](#31-ausschluss-von-sensiblen-kategorien)

[3.4 TECHNOLOGIE](#4-technologie)
   - [3.4.1 Taxonomie-Standard](#41-taxonomie-standard)
   - [3.4.2 Open RTB-Standard](#42-open-rtb-standard)

[4. Dokumentation](#documentation)
   - [Implementierungsübersicht und Dokumentationen](#implementierungsübersicht-und-dokumentationen)

[5. Laufende Projeke](#laufende-projekte)
     

# Motivation

## OVK-Contextual Standard v1.0: A solution for the post-cookie era

OVK-Contextual Standard v1.0: Eine Lösung für die Post-Cookie-Ära
3rd-Party-Cookie-basierte Werbung ist immer weniger möglich. Kontextuelles Targeting ist eine Lösung, um auch in Zukunft ein erfolgreiches Werbegeschäft betreiben zu können - basierend auf den nicht-werblichen Inhalten eines Angebotes. Um kontextuelles Targeting erfolgreich am Markt zu etablieren, sind Skalierbarkeit und verlässliche Qualität gefragt. Der Online-Vermarkterkreis (OVK) im Bundesverband Digitale Wirtschaft (BVDW) e. V. hat einen anbieter- und technologieunabhängigen Standard für Online Kontextuelles Targeting entwickelt, der hier vorgestellt wird. Der im Folgenden beschriebene Standard wird perspektivisch von allen im OVK organisierten Vermarktern unterstützt. Der Großteil der OVK-Mitglieder hat den Standard bereits implementiert.

# Beschreibung und Anforderungen
Der OVK-Contextual Standard v1.0 ist ein anbieter- und technologieunabhängiger Standard für kontextuelles Online-Targeting im deutschen Werbemarkt. Der Standard legt Wert auf eine direkte Anbindung an den Content Owner oder Vermarkter, Skalierbarkeit, verlässliche Qualität und die Einhaltung der IAB Content Taxonomy und des Open RTB Standards für die Signalisierung. Sensible Kategorien werden ausgeschlossen, es wird „Sensitive Topic“ signalisiert. Die Systemfunktionalität, die Qualitätssicherung sowie die Prozesse und Methoden zur Qualitätssicherung werden dokumentiert und auf der Website des Anbieters sowie hier veröffentlicht.

# Unterscheidung zwischen Klassifizierung und Analyse
In Bezug auf die Erarbeitung des kontextuellen Standards ist eine Unterscheidung zwischen den Prozessen der Klassifizierung und der Analyse wichtig.

## Klassifizierung
Klassifizierung bezieht sich auf den Prozess der Einteilung digitaler Inhalte in bestimmte Kategorien. Bei der Klassifizierung von Online-Inhalten orientiert sich der OVK an der IAB Content Taxonomy. Die IAB Content Taxonomy besteht aus einer hierarchischen Struktur von Kategorien und Unterkategorien zur Klassifizierung der digitalen Inhalte. Sie enthält derzeit rund siebenhundert thematische Kategorien (z. B. Automobil, Bücher und Literatur, Wirtschaft und Finanzen) und rund vierhundert Inhaltsattribute (z. B. Inhaltstyp, Quelle, Medienformat, Sprache und Standort). Zu den thematischen Kategorien gehören auch Themen wie Markentauglichkeit und risikoreiche oder sensible Kategorien.

## Analyse
Die Analyse des Inhalts hingegen bezieht sich auf die Verwendung verschiedener Methoden wie Algorithmen und maschinelles Lernen, um den Inhalt eines bestimmten digitalen Inhalts (Webseite, App, E-Mail usw.) zu analysieren und die kontextbezogenen Kategorien zu bestimmen, die zum Inhalt des Digitalangebots passen. Die Methode zur Analyse des Inhalts ist für jede Lösung und Technologie unterschiedlich. Der kontextuelle Standard des OVK ist technologieunabhängig und schreibt daher keine bestimmte Methode zur Analyse des Inhalts vor. Allerdings sind eine stichprobenartige Überprüfung der Analyseergebnisse und deren Veröffentlichung sowie die Veröffentlichung einer detaillierten Dokumentation der Methode Bestandteile des Standards (s. unten)

# Kriterien
## 1. QUALITÄT
Wichtigste Grundsätze
-  Zeitnahe Klassifizierung
-  Nur relevante Inhalte werden klassifiziert
-  Anreicherung mit Informationen, die nicht öffentlich zugänglich sind
-  Transparenz
-  Nachvollziehbare Qualität für Marktteilnehmer

 
### 1.1 Direktanbindung
-  Die verwendete Technologie wird direkt vom Publisher oder Vermarkter der Inhalte angebunden.

### 1.2 Überprüfung und Veröffentlichung der Prüfergebnisse
-  Die Ergebnisse der Inhaltsklassifizierung werden stichprobenartig für jede verwendete Technologie manuell überprüft.
-  Wenn möglich, werden die Klassifizierungsergebnisse verschiedener Technologien verglichen und gegenübergestellt.
-  Die Ergebnisse der manuellen Prüfung und ggf. die des Vergleichs werden auf der Website des Anbieters veröffentlicht.


## 2. DOKUMENTATION
Wichtigste Grundsätze
-  Transparenz
-  Überprüfbare Qualität
-  Gleichbleibend hohe Qualität
-  Vertrauen


 ### 2.1 Dokumentation der Systemfunktionalität<br />
 -  Die Funktionsweise des/der verwendeten Klassifikationssystems/e wird in Form einer Dokumentation beschrieben (zugrunde liegende Architektur, Verbindung zu den Inhalten, welche Daten verwendet werden, wie die Daten verarbeitet werden, usw.).
 -  Die Dokumentation wird auf der Website des Anbieters veröffentlicht.
 
   
 ### 2.2 Dokumentation der Qualitätssicherung<br />
 -  Die Systeme und Daten werden laufend überprüft und optimiert.
 -  Die Prozesse und Methoden zur Qualitätssicherung werden dokumentiert und auf der Website des Anbieters veröffentlicht.
 

## 3. DATENSCHUTZ UND PRIVACY
 Wichtigste Grundsätze
-  Keine Verwendung sensitiver Kategorien

 ### 3.1 Ausschluss von sensiblen Kategorien
 - Die folgenen sensitiven Kategorien werden für die Signalisierung ausgeschlossen. "Sensitive Topic" sollte statt dessen signalisiert werden:

| Unique ID | Name                                   | Tier 1                  | Tier 2                   | Tier 3                             | Tier 4              | Replacement     |
|-----------|----------------------------------------|-------------------------|--------------------------|------------------------------------|---------------------|-----------------|
| 193| Adoption and Fostering| Family and Relationships| Parenting | Adoption and Fostering|  Sensitive Topic |
| 219| Food Allergies| Food & Drink| Food Allergies| |  | Sensitive Topic |
| 231| Weight Loss| Healthy Living | Weight Loss || || Sensitive Topic    |
| 287| Diseases and Conditions | Medical Health | Diseases and Conditions ||  || Sensitive Topic    |
| 288| Allergies| Medical Health | Diseases and Conditions   | Allergies || Sensitive Topic    |
| 289| Ear, Nose and Throat Conditions | Medical Health | Diseases and Conditions| Ear, Nose and Throat Conditions || Sensitive Topic    |
| 290| Endocrine and Metabolic Diseases | Medical Health | Diseases and Conditions | Endocrine and Metabolic Diseases || Sensitive Topic    |
| 291| Hormonal Disorders | Medical Health | Diseases and Conditions| Endocrine and Metabolic Diseases| Hormonal Disorders | Sensitive Topic    |
| 292| Menopause | Medical Health | Diseases and Conditions | Endocrine and Metabolic Diseases | Menopause | Sensitive Topic    |
| 293| Thyroid Disorders | Medical Health | Diseases and Conditions| Endocrine and Metabolic Diseases | Thyroid Disorders  | Sensitive Topic    |
|294|Eye and Vision Conditions|Medical Health|Diseases and Conditions|Eye and Vision Conditions||Sensitive Topic
|295|Foot Health|Medical Health|Diseases and Conditions|Foot Health||Sensitive Topic
|296|Heart and Cardiovascular Diseases|Medical Health|Diseases and Conditions|Heart and Cardiovascular Diseases||Sensitive Topic
|297|Infectious Diseases|Medical Health|Diseases and Conditions|Infectious Diseases||Sensitive Topic
|298|Injuries|Medical Health|Diseases and Conditions|Injuries||Sensitive Topic
|300|Lung and Respiratory Health|Medical Health|Diseases and Conditions|Lung and Respiratory Health||Sensitive Topic
|301|Mental Health|Medical Health|Diseases and Conditions|Mental Health||Sensitive Topic
|302|Reproductive Health|Medical Health|Diseases and Conditions|Reproductive Health||Sensitive Topic
|303|Birth Control|Medical Health|Diseases and Conditions|Reproductive Health|Birth Control|Sensitive Topic
|304|Infertility|Medical Health|Diseases and Conditions|Reproductive Health|Infertility|Sensitive Topic
|305|Pregnancy|Medical Health|Diseases and Conditions|Reproductive Health|Pregnancy|Sensitive Topic
|306|Blood Disorders|Medical Health|Diseases and Conditions|Blood Disorders||Sensitive Topic
|307|Sexual Health|Medical Health|Diseases and Conditions|Sexual Health||Sensitive Topic
|308|Sexual Conditions|Medical Health|Diseases and Conditions|Sexual Health|Sexual Conditions|Sensitive Topic
|309|Skin and Dermatology|Medical Health|Diseases and Conditions|Skin and Dermatology||Sensitive Topic
|310|Sleep Disorders|Medical Health|Diseases and Conditions|Sleep Disorders||Sensitive Topic
|311|Substance Abuse|Medical Health|Diseases and Conditions|Substance Abuse||Sensitive Topic
|312|Bone and Joint Conditions|Medical Health|Diseases and Conditions|Bone and Joint Conditions||Sensitive Topic
|313|Brain and Nervous System Disorders|Medical Health|Diseases and Conditions|Brain and Nervous System Disorders||Sensitive Topic
|314|Cancer|Medical Health|Diseases and Conditions|Cancer||Sensitive Topic
|317|Diabetes|Medical Health|Diseases and Conditions|Diabetes||Sensitive Topic
|318|Digestive Disorders|Medical Health|Diseases and Conditions|Digestive Disorders||Sensitive Topic
|319|Medical Tests|Medical Health|Medical Tests|||Sensitive Topic
|320|Pharmaceutical Drugs|Medical Health|Pharmaceutical Drugs|||Sensitive Topic
|321|Surgery|Medical Health|Surgery|||Sensitive Topic
|322|Vaccines|Medical Health|Vaccines|||Sensitive Topic
|323|Cosmetic Medical Services|Medical Health|Cosmetic Medical Services|||Sensitive Topic
|405|Personal Debt|Personal Finance|Personal Debt|||Sensitive Topic
|453|Religion & Spirituality|Religion & Spirituality||||Sensitive Topic
|454|Agnosticism|Religion & Spirituality|Agnosticism|||Sensitive Topic
|455|Spirituality|Religion & Spirituality|Spirituality|||Sensitive Topic
|456|Astrology|Religion & Spirituality|Astrology|||Sensitive Topic
|457|Atheism|Religion & Spirituality|Atheism|||Sensitive Topic
|458|Buddhism|Religion & Spirituality|Buddhism|||Sensitive Topic
|459|Christianity|Religion & Spirituality|Christianity|||Sensitive Topic
|460|Hinduism|Religion & Spirituality|Hinduism|||Sensitive Topic
|461|Islam|Religion & Spirituality|Islam|||Sensitive Topic
|462|Judaism|Religion & Spirituality|Judaism|||Sensitive Topic
|463|Sikhism|Religion & Spirituality|Sikhism|||Sensitive Topic
|494|Disabled Sports|Sports|Disabled Sports|||Sensitive Topic
|v9i3On|Sensitive Topics|||||Sensitive Topic
|Rm3SiT|Adult & Explicit Sexual Content|Sensitive Topics||||Sensitive Topic
|avbNf2|Arms & Ammunition|Sensitive Topics||||Sensitive Topic
|XtODT3|Crime & Harmful acts to individuals and Society and Human Right Violations|Sensitive Topics||||Sensitive Topic
|I4GWl6|Death; Injury; or Military Conflict|Sensitive Topics||||Sensitive Topic
|mm3UXx|Online piracy |Sensitive Topics||||Sensitive Topic
|HxqYV1|Hate speech & acts of aggression|Sensitive Topics||||Sensitive Topic
|j9PaO9|Obscenity and Profanity|Sensitive Topics||||Sensitive Topic
|pg0WhF|Illegal Drugs/Tobacco/eCigarettes/ Vaping/Alcohol|Sensitive Topics||||Sensitive Topic
|6i4dB6|Spam or Harmful Content|Sensitive Topics||||Sensitive Topic
|8FD8nI|Terrorism|Sensitive Topics||||Sensitive Topic
|Z7rJBM|Sensitive Social Issues|Sensitive Topics||||Sensitive Topic



 ## 4. TECHNOLOGIE
 Wichtigste Grundsätze
-  Transparenz
  
 ### 4.1 Taxonomie-Standard
 - Es wird die IAB-Content Taxonomy, mindestens Version 2.1, verwendet. Sensitive Kategorien werden ausgeschlossen (siehe Datenschutz) 
   [IAB Content Taxonony 2.1](https://github.com/InteractiveAdvertisingBureau/Taxonomies/blob/main/Content%20Taxonomies/Content%20Taxonomy%202.1.tsv)

 ### 4.2 Open RTB Standard
 - Die Signalisierung erfolgt nach dem Open RTB-Standard im programmatischen Prozess.

# Dokumentation
Hier finden Sie die OVK-Mitglieder, die den OVK-Contextual Standard implementiert haben sowie deren Dokumentationen.

## Implementierungsübersicht und Dokumentationen
Liste der Mitglieder und deren Dokumentationen, die den OVK-Contextual Standard unterstützen:


|        **Vermarkter**          | `Dokumentation nach 2.1 & 2.2 ` |
| ---------------------------------- |--------------|
| `Ad Alliance`           |https://osdatasolutions.de/contextual-ovk/  
| `BCN`                   |https://bcn.group/fileadmin/Assets/02_Werbeloesungen/Digital/Programmatic_Contextual_Targeting_2025.pdf
| `Funke`                 |https://funkedigital.de/ovk-contextual/ 
| `Himedia`               |
| `iq Digital`            | 
| `Media Impact`          |https://osdatasolutions.de/contextual-ovk/ 
| `mobile.de`             |
| `netpointmedia`         |
| `Quarter Media`         |
| `Score Media`           |
| `SevenOne`              |https://www.seven.one/werbeprodukte/contextual-targeting
| `Ströer`                |https://osdatasolutions.de/contextual-ovk/
| `UIM`                   |https://www.united-internet-media.de/de/produkteundloesungen/data-targeting/zielgruppen/smart-contextual-targeting/


# Laufende Projekte

-  Kontextueller Standard für Video
  
  
  
