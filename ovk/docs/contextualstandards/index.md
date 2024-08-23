# Introduction
Content:

[Motivation](#motivation)

[Description and Requirements](#description-and-requirements)
   - [Classification](#classification)
   - [Analysis](#analysis)

[Criteria](#criteria)

[1. QUALITY](#1-quality)
   - [1.1 Direct connection](#11-direct-connection)
   - [1.2 Review and publication of the test results](#12-review-and-publication-of-the-test-results)

[2. DOCUMENTATION](#2-documentation)
   - [2.1 Documentation of the system functionality](#21-documentation-of-the-system-functionality)
   - [2.2 Documentation of quality assurance](#22-documentation-of-quality-assurance)

[3. DATA PROTECTION AND PRIVACY](#3-data-protection-and-privacy)
   - [3.1 Exclusion of sensitive categories](#31-exclusion-of-sensitive-categories)

[4. TECHNOLOGY](#4-technology)
   - [4.1 Taxonomy standard](#41-taxonomy-standard)
   - [4.2 Open RTB standard](#42-open-rtb-standard)

[Documentation](#documentation)
   - [Market adoption and implementation overview](#market-adoption-and-implementation-overview)

[Current Projects](#current-projects)
     

# Motivation

## OVK-Contextual Standard v1.0: A solution for the post-cookie era

3rd party cookie-based advertising is becoming less and less possible.
Contextual targeting is a solution to continue to operate a successful advertising business in the future - based on content and without cookies or consent.
In order to successfully establish contextual targeting on the market, scalability and reliable quality are required. ﻿﻿The Online-Vermarkterkreis (OVK) in the Bundesverband Digitale Wirtschaft (BVDW) e. V. has developed a provider and technology-agnostic standard for online contextual targeting, which is presented here.
The standard described below is supported by all marketers organized in the OVK. OVK members have already implemented it or will implement it by the end of Q2 2024.

# Description and Requirements
The OVK Contextual Standard v1.0 is provider and technology-agnostic standard for online contextual targeting in the German advertising market.  The standard emphasizes direct connectivity to the content owner or marketer, scalability, reliable quality, and adherence to the IAB Content Taxonomy and the Open RTB standard for signaling. Sensitive categories are excluded, and sensitive topics are signaled. The system functionality, quality assurance, and processes and methods for quality assurance are documented and published on the publishers websited and also here. 

# Distinction between Classification and Analysis
When talking about the Contextual Standard the distiction between Classification and Analysis should be made.

## Classification
Classification refers to the process of organizing digital content into specific categories. For the classification of online content, the OVK follows the IAB Content Taxonomy. The IAB Content Taxonomy consists of a hierarchical structure of categories and subcategories for classifying the digital content. It currently contains around seven hundred thematic categories (such as Automotive, Books and Literature, Business and Finance) and around four hundred content attributes (such as content type, source, media format, language and location). Topics around Brand Suitability and Risk or Sensitive Categories are also part of the tematic categories.

## Analysis
The analysis of the content, on the other hand, refers to using different methods, such as algorithms and machine learning, to analyze the content of a certain digital content (web page , app, email etc.) and determine the contextual category/categories matching the content on the page. The method of analysing the content is different for each solution and technology. The OVK-Contextual-Standard is technology-agnostic and therefore does not prescribe a certain method of analyzing the content. However each OVK member is obliged to transparently communicate the results of the analysis on a sample of contents and publish a detailed documentation of the method (s. below)

# Criteria
## 1. QUALITY
Main Principles
-  Timely classification
-  Only relevant content is classified
-  Enrichment with information that is not publicly available
-  Transparency
-  comprehensible Quality for market participants
 
### 1.1 Direct connection
- The technology used is connected directly by the content owner or marketer.

### 1.2 Review and publication of the test results
- Content classification results are checked manually on a random basis for each technology used.<br />
- If possible, the classification results of different technologies are compared and contrasted.<br />
- The results of the manual check and, if applicable, those of the comparison are published on the provider's website.

## 2. DOCUMENTATION
Main Principles
-  Transparency
-  Verifiable quality
-  Consistently high quality
-  Trust

 ### 2.1 Documentation of the system functionality<br />
 - The functionality of the classification system(s) used is described in the form of documentation (underlying architecture, connection to the 
   content, which data is used, how the data is processed, etc.).<br />
- The documentation is published on the provider's website.
   
 ### 2.2 Documentation of quality assurance﻿﻿
 - Systems and data are continuously reviewed and optimized.<br />
 - The processes and methods for quality assurance are documented and published on the provider's website.

## 3. DATA PROTECTION AND PRIVACY
 Main Principles
-  No usage of sensitive categories

 ### 3.1 Exclusion of sensitive categories
 - Following sensitive categories are excluded, "Sensitive Topic" should be signaled:

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



 ## 4. TECHNOLOGY
 Main Principles
-  Transparency
  
 ### 4.1 Taxonomy standard
 - The IAB Content Taxonomy at least version 2.1 is used. Sensitive categories are excluded (see data protection)
   [IAB Content Taxonony 2.1](https://github.com/InteractiveAdvertisingBureau/Taxonomies/blob/main/Content%20Taxonomies/Content%20Taxonomy%202.1.tsv)

 ### 4.2 Open RTB standard
 - Signaling is carried out according to the Open RTB standard.

# Documentation
Please find here all documentation around the OVK Contextual Standard.

## Market adoption and implementation overview
Marketers sales houses and publishers implemented the standard and system documentations.


|        **marketer**          | `ducumentation according to 2.1 & 2.2 ` |
| ---------------------------------- |--------------|
| `Ad Alliance`           |https://osdatasolutions.de/contextual-ovk/  
| `BCN`                   |https://www.brand-community-network.de/fileadmin/user_upload/20230822_BCN_Contextual_Targeting.pdf
| `BurdaForward`          |https://www.burda-forward.de/advertising/data-targeting/
| `Funke`                 |https://funkedigital.de/ovk-contextual/ 
| `Himedia`               |
| `iq Digital`            | 
| `Media Impact`          |https://osdatasolutions.de/contextual-ovk/ 
| `mobile.de`             |
| `netpointmedia`         |
| `Quarter Media`         |
| `Score Media`           |
| `SevenOne`              |
| `Ströer`                |https://osdatasolutions.de/contextual-ovk/
| `UIM`                   |


# Current Projects

- Contextual classification of video content

  
  
  
