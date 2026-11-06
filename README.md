# Guía Antimicrobiana Pediátrica · HNJS

Regímenes antibióticos empíricos con dosis calculada por peso, búsqueda por antibiótico y sensibilidades locales, según la Guía Antimicrobiana Empírica 2024 del Hospital Infantil Universitario Niño Jesús.

**Web:** https://anavarromingo-cmyk.github.io/Guia_ATB/

> Herramienta **experimental** de apoyo clínico. Confirme siempre las pautas con la guía oficial del hospital ([ATB_HNJS.pdf](ATB_HNJS.pdf)).

## Instalación como aplicación (PWA)

- **Android (Chrome)**: abrir la URL → menú ⋮ → «Instalar app».
- **iOS (Safari)**: abrir la URL → Compartir → «Añadir a la pantalla de inicio».

Tras la primera carga, el service worker guarda los archivos y la app funciona sin red (el PDF queda disponible sin conexión tras abrirlo una vez).

## Archivos

| Archivo | Uso |
|---|---|
| `index.html` | App con identidad PEDPAL (cabecera sticky, franja multicolor, nav inferior) |
| `pedpal.css` | Estilos PEDPAL + capa específica de la guía |
| `app.js` | Datos y lógica originales (sin modificar) |
| `ATB_HNJS.pdf` | Guía Antimicrobiana Empírica 2024 |
| `index-original.html` + `style.css` | Versión original de la app, conservada |
| `manifest.webmanifest`, `sw.js`, `icon*` | PWA instalable |

## Créditos

**Guía Antimicrobiana Empírica 2024 · Hospital Infantil Universitario Niño Jesús**

- **Coordinadores:** Marta T. Gª Ascaso, Margarita Cuervas‑Mons Vendrell, José A. Alonso Cadenas
- **Autores:** Beatriz Agúndez Reigosa, Marta Bascuas Arribas, Silvia Buendía Martínez, Belén Hernández Milán, Mª Isabel Iglesias Bouzas, Blanca Molina Angulo, Vanesa Núñez Cerezo, Ana Ramírez Barragán, Francisco J. Sanz Santaeufemia
- **Revisores:** Mercedes de la Torre Espí, Raquel Jiménez García, Monserrat Nieto Moro

La licencia de la app cubre el código y los textos propios; el contenido clínico pertenece a los autores de la guía.

## Licencia

© 2026 Álvaro Navarro · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.es)
