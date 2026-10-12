# Emilia Development Group — brand brief pentru site

Document de pornire pentru construirea site-ului **Emilia Development Group**. Conține identitatea vizuală finală (logo, culori, fonturi, stil) și unde se află toate fișierele.

---

## 1. Brand

- **Nume:** Emilia Development Group (fostul nume „Emilia Investment Group” NU se mai folosește nicăieri)
- **Domeniu:** dezvoltare imobiliară
- **Ton:** premium, cald, discret, elegant. Mult spațiu alb, puține elemente, materiale nobile (aramă, piele, hârtie texturată).
- **Limba site-ului:** română (cu diacritice: ă, â, î, ș, ț)

---

## 2. Logo

**Monograma:** un **E** și un **D** împletite. Un stâlp vertical cu bară sus, un arc subțire care iese spre stânga și burta unui D în dreapta.
**Wordmark:** `EMILIA` cu litere mari, serif, foarte spațiate. Dedesubt scrie `DEVELOPMENT GROUP`, mic, cu linie subțire și tot spațiat.

### Compoziții (toate există ca fișier)
| Compoziție | Fișier (stem) | Când se folosește |
|---|---|---|
| Vertical (simbol deasupra textului) | `emilia-vertical-*` | varianta principală, hero, coperte |
| Orizontal (simbol stânga, text dreapta) | `emilia-orizontal-*` | header site, semnături email, bannere |
| Doar text | `emilia-text-*` | spații înguste, footer |
| Simbol | `emilia-simbol-*` | favicon, avatar social, watermark |

### Variante de culoare
| Variantă | Simbol | Text | Fundal |
|---|---|---|---|
| `full-color` | `#A85D2C` aramă | `#32180A` espresso | deschis (cretă / crem) |
| `mono-espresso` | `#32180A` | `#32180A` | deschis |
| `mono-crem` | `#EADFD5` | `#EADFD5` | închis (espresso) |
| `gradient` | gradient aramă → crem | același | **doar** fundal închis, dimensiuni mari |

### Reguli
- Gradientul și mono-crem se folosesc doar pe fundal închis. Full-color și mono-espresso se folosesc doar pe fundal deschis.
- Logo-ul nu se deformează, nu se rotește, nu primește umbre și nu se recolorează în afara paletei.
- Spațiu liber minim în jurul logo-ului: înălțimea literei „E” din EMILIA.
- **Favicon:** simbolul full-color pe fundal transparent sau mono-crem pe espresso.

### Fișiere logo
- **GitHub (public):** https://github.com/gogurm/emilia-logo/tree/main/export
  - SVG: `export/svg/emilia-{compoziție}-{variantă}.svg`
  - PNG transparent: `export/png/emilia-{compoziție}-{variantă}.png` (vertical 1600 px, orizontal și text 2400 px, simbol 1200 px lățime)
  - Link direct, de exemplu: `https://raw.githubusercontent.com/gogurm/emilia-logo/main/export/svg/emilia-orizontal-full-color.svg`
- **Google Drive (pachetul complet):** https://drive.google.com/drive/folders/1Ymlpo_f-rQ8im_zpbd0AVE1fEUVR111H
  - `svg/`, `png/`, `fonturi/`, `sursa/` (`EMILIA_DEVELOPMENT_GROUP.ai` + `.svg`, fișierul original din Illustrator)

---

## 3. Culori

### Paleta principală
| Nume | HEX | RGB | Rol |
|---|---|---|---|
| **Espresso** | `#32180A` | 50, 24, 10 | fundal principal închis, text pe deschis |
| **Alamă** | `#F0C291` | 240, 194, 145 | accent: linkuri, etichete, detalii, hover |
| **Cretă** | `#EADFD5` | 234, 223, 213 | suprafețe deschise, text pe închis |

### Culori secundare (folosite în identitate și pe site)
| Nume | HEX | Rol |
|---|---|---|
| Aramă (logo) | `#A85D2C` | simbolul în varianta full-color, accent puternic pe deschis |
| Crem | `#F6EFE7` | fundal deschis alternativ (carduri, secțiuni) |
| Espresso adânc | `#240F05` | fundaluri mai întunecate, footer |
| Maro mediu | `#4A2510` | tranziții și degradeuri pe fundal închis |

### Gradient metalic (logo gradient)
```css
/* aramă → crem, de jos-stânga spre dreapta-sus */
linear-gradient(45deg, #C98A52 0%, #EAB687 38%, #F6D9B4 74%, #FDF2E4 100%);

/* varianta „hero”, mai caldă */
linear-gradient(45deg, #B9713C 0%, #F0C291 55%, #FDF0E0 100%);
```

### Variabile CSS gata de folosit
```css
:root {
  --espresso: #32180a;
  --espresso-deep: #240f05;
  --brown: #4a2510;
  --copper: #a85d2c;
  --brass: #f0c291;
  --chalk: #eadfd5;
  --cream: #f6efe7;
  --text-on-light-muted: rgba(50, 24, 10, .68);
  --text-on-dark-muted: rgba(234, 223, 213, .7);
  --line-on-light: rgba(50, 24, 10, .16);
  --line-on-dark: rgba(234, 223, 213, .2);
  --gradient-metal: linear-gradient(45deg, #c98a52 0%, #eab687 38%, #f6d9b4 74%, #fdf2e4 100%);
}
```

---

## 4. Fonturi

| Font | Rol | Fișier |
|---|---|---|
| **Venora Rosalind** | display: titluri mari, citate, cifre | `VenoraRosalind.ttf` |
| **Mikea** Regular + Italic | text editorial, subtitluri, paragrafe elegante | `Mikea-Regular.ttf`, `Mikea-Italic.ttf` |
| **Jost** (Google Fonts, 200–500) | UI: meniu, butoane, etichete, text mărunt, formulare | Google Fonts |
| Cormorant Garamond (Google Fonts) | fallback pentru Venora Rosalind | Google Fonts |

Fișierele TTF sunt pe GitHub în `fonts/` (https://github.com/gogurm/emilia-logo/tree/main/fonts) și în Drive, în `fonturi/`.

```css
@font-face { font-family:'Venora Rosalind'; src:url('fonts/VenoraRosalind.ttf') format('truetype'); font-weight:400; font-display:swap; }
@font-face { font-family:'Mikea'; src:url('fonts/Mikea-Regular.ttf') format('truetype'); font-weight:400; font-style:normal; font-display:swap; }
@font-face { font-family:'Mikea'; src:url('fonts/Mikea-Italic.ttf') format('truetype'); font-weight:400; font-style:italic; font-display:swap; }
```
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet">
```

### Scară tipografică (din prezentarea de brand)
| Element | Font | Mărime | Detalii |
|---|---|---|---|
| Hero | logo-ul (SVG), nu text | — | în prezentare, hero-ul e logo-ul vertical mare |
| H2 secțiune | Venora Rosalind | `clamp(34px, 5.2vw, 58px)` | line-height 1.06, letter-spacing -0.01em |
| H3 | Venora Rosalind | `clamp(24px, 3.4vw, 34px)` | line-height 1.2 |
| Subtitlu | Mikea | `clamp(17px, 2.2vw, 24px)` | line-height 1.5 |
| Paragraf | Jost 300/400 sau Mikea | 15–17px | line-height 1.65–1.7 |
| Eyebrow („01 — Proiecte”) | Jost | 10–11px | UPPERCASE, letter-spacing 0.4em |
| Buton / etichetă | Jost | 12px | UPPERCASE, letter-spacing 0.12em |

---

## 5. Stil vizual și UI

- **Ritm:** secțiunile alternează între fundal închis (espresso) și fundaluri deschise (cretă `#EADFD5` și crem `#F6EFE7`).
- **Layout:** conținut centrat, lățime maximă ~1120px, padding lateral generos, spațiu mare între secțiuni (`clamp(32px, 4vw, 52px)` în interior, mult mai mult între secțiuni).
- **Eyebrow numerotat** deasupra fiecărui titlu: `01 — Variante`, `02 — Aplicație` etc.
- **Butoane:** dreptunghiulare, fără colțuri rotunjite sau foarte puțin, contur subțire 1px (`rgba(50,24,10,.22)` pe deschis), text Jost uppercase spațiat. La hover: fundal espresso și text cretă (sau invers).
- **Pastile (filtre):** border-radius complet, contur subțire. Cea activă are contur închis.
- **Imagini:** fotografii calde, lumină laterală cu umbre lungi, materiale (piele maro, hârtie, aramă). Fără colțuri rotunjite.
- **Animații:** discrete. Fade + slide-up de 26px la intrare, logo-ul se dezvăluie de sus în jos, tagline-ul are un efect de letter-spacing care se strânge (de la 1.4em la 0.46em).
- **Linkuri:** alamă `#F0C291` pe fundal închis, cu hover în cretă.
- **De evitat:** albastru, verde, gri rece, alb pur `#FFF` pe suprafețe mari, colțuri foarte rotunde, umbre dure, iconițe colorate.

---

## 6. Materiale existente (mockup-uri)

Pe GitHub, în `assets/` (https://github.com/gogurm/emilia-logo/tree/main/assets):
- `carte-vizita.jpg`: cărți de vizită albe și maro, cu folio aramă
- `tricouri-polo.jpg`: tricouri polo crem, bej și maro, cu logo brodat
- `pungi.jpg`: pungi de cadou albe, kraft și maro, cu logo auriu

Se pot folosi ca imagini pe site (de exemplu în secțiunea „Despre” sau ca fundaluri).

---

## 7. Link-uri utile

- **Prezentarea logo-ului (protejată cu PIN 4465):** https://gogurm.github.io/emilia-logo/
- **Repo GitHub (cod și fișiere):** https://github.com/gogurm/emilia-logo
- **Folder Drive cu pachetul de logo:** https://drive.google.com/drive/folders/1Ymlpo_f-rQ8im_zpbd0AVE1fEUVR111H

---

## 8. Pentru noul chat (de completat de tine)

- [ ] Ce pagini are site-ul? (ex. Acasă, Proiecte, Despre, Contact)
- [ ] Ce proiecte imobiliare se prezintă (nume, locație, poze)?
- [ ] Date de contact: telefon, email, adresă (ex. Bd. Victoriei 48, Sibiu?)
- [ ] Domeniu propriu (ex. emiliadevelopment.ro)?
- [ ] Unde se găzduiește (GitHub Pages ca până acum, sau altceva)?
- [ ] Formular de contact, hartă, galerie, versiune în engleză?
