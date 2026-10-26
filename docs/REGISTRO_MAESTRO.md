# Registro Maestro ADESIS WEB

## ADESIS_WEB_V1.1.2_release_HOME1.0_PROYECTOS_VIDRIO_UNICO_20261026
Antecesora: ADESIS_WEB_V1.1.1_release_HOME1.0_PRIVACIDAD_BLOQUE_UNICO_20261026.
Solicitud: retirar la capa interior que rodea las tarjetas y conservar el vidrio general de Proyectos.
Cambio: fondo de #proyectos .cards transparente y borde transparente. Se conserva el ancho del borde para mantener exactamente la geometría de la grilla. El panel .projects-focus y los estilos, imágenes y scripts de las tarjetas se mantienen.
Favicon verificado: assets/favicon.svg, A blanca sin travesaño y punto azul; enlazado en Home y Privacidad.
Identidad y LIVE preservados en ambas páginas; CSS con versión de caché 1.1.2.
Validación: revisión del CSS y comparación de la estructura de tarjetas y del texto de Privacidad con la versión anterior; comprobación visual online tras el despliegue.
Rollback: commit anterior 3bdf524eac9182d7601438b3bda70b54f5655899.

## ADESIS_WEB_V1.1.1_release_HOME1.0_PRIVACIDAD_BLOQUE_UNICO_20261026
Origen: V1.1.1 aprobada por titular el 26/10/2026. Fuente autocontenida SHA-256: 5f71b6f4fd4e9554085e391944cfb5506bfe37b664937c6412f10679fdd0e767.
Publicación: separación funcional en index.html y privacy.html, estilos y JS extraídos, cinco imágenes originales sin recodificación, favicon y wordmark; identidad release en footer.
Rollback: HEAD previo d856bfc381d37fa8080fb056c0f36a5897982fdc, sin forzar rama. Publicación autorizada expresamente por titular.

## Historial heredado de V1.1.1

# REGISTRO MAESTRO — ADESIS WEB / HOME

## Build activa
`ADESIS_WEB_V1.1.1_candidate_HOME1.0_PRIVACIDAD_BLOQUE_UNICO_20261026` — Candidate local; no publicada.

## Estado previo V1.1.0
`ADESIS_WEB_V1.1.0_candidate_HOME1.0_PRIVACIDAD_PLANA_20261026` — Candidate local; no publicada.

## Estado previo V1.0.9
`ADESIS_WEB_V1.0.9_candidate_HOME1.0_PRIVACIDAD_COMPACTA_20261026` — Candidate local; no publicada. Antecesora: `ADESIS_WEB_V1.0.8_candidate_HOME1.0_PRIVACIDAD_20261026`.


## Estado heredado de la rama V1.0.6 (registro histórico)
**ADESIS_WEB_V1.0.6_candidate_HOME1.0_INSTITUCIONAL_GLASS_20261026**

Estado: **CANDIDATE / OFFLINE / NO PRODUCCIÓN**.

### Origen controlado
- Base documental: `ADESIS_PROJECT_CARDS_BASELINE_v1.4_RF3D_REFRAME_FINAL_2026-09-30.html`, preservada byte a byte en `BASELINE_ORIGINAL_20260930.html`.
- Referencia GitHub pública verificada al preparar la build: `Mariano-LM/adesis-web`, `main`, blob de `index.html` `087819f904f3cd448bc177f6ee182194ae3417fb`.
- Las cinco imágenes base64 y el JavaScript de tarjetas de la copia local son idénticos a los del index de GitHub, comprobados por longitud y huella FNV-32. Se alineó además el CSS de las tarjetas al bloque del `index.html` online (6043 caracteres, FNV-32 `93390ea1`).
- La estructura original de los cinco `<article class="sw-project-card">` no se ha alterado. Las imágenes, apertura, diagonal, botoneras y tiempos provienen de la fuente original.

### Genealogía de candidatos de laboratorio
1. `ADESIS_WEB_HERO_V1.0.2_candidate_INSTITUCIONAL_20261025` — institucional + wordmark seleccionado, página de demostración offline.
2. `ADESIS_WEB_HERO_V1.0.3_candidate_INSTITUCIONAL_UNIFIEDBG_20261025` — fondo unificado.
3. `ADESIS_WEB_HERO_V1.0.4_candidate_INSTITUCIONAL_GLASSPROJECTS_20261025` — prueba panel esmerilado.
4. `ADESIS_WEB_HERO_V1.0.5_candidate_INSTITUCIONAL_GLASSPROJECTS_TUNE01_20261025` — vidrio gris, esquinas rectas y luz azul.
5. **`ADESIS_WEB_V1.0.6_candidate_HOME1.0_INSTITUCIONAL_GLASS_20261026`** — rescate de HTML real con cinco capturas y código de tarjetas online, restauración de layout original; reducción del título de secciones, aumento del claim superior, retiro de marca header y segundo botón.

### Línea paralela congelada
`ADESIS_WEB_HERO_V2.0_candidate_TIERRA_20261025` — alternativa Tierra, preservada sin modificaciones.

### Estado
Golden online intacta. Esta build no está publicada ni promovida. Sin escrituras a GitHub, Workspace ni terceros.


## Actualización V1.0.7 — 2026-10-26

**ADESIS_WEB_V1.0.7_candidate_HOME1.0_FIX_UI_20261026** — Candidate de retoque visual: EXPLORAR fuera, rótulo ADESIS previo a Contacto fuera, FileForge con esquinas de 18px en móvil. Baseline V1.0.6 preservada, cinco cards y JS idénticos byte a byte. Sin publicación a producción.


## Actualización V1.0.8 — 2026-10-26

**Build activa del paquete:** `ADESIS_WEB_V1.0.8_candidate_HOME1.0_PRIVACIDAD_20261026`.
**Antecesora:** `ADESIS_WEB_V1.0.7_candidate_HOME1.0_FIX_UI_20261026`.
**Estado:** candidate preparada y verificada localmente para GitHub Pages; no publicada ni promovida a stable.

- Privacidad: reemplazo del anuncio provisional por política de la web institucional; responsable, navegación, servicios, email, conservación, derechos y alcance de productos. No se inventa el tratamiento de datos de Tornado.
- Privacidad comparte los estilos generales y el JavaScript original de Home; CSS específico separado.
- Home conserva íntegros los cinco artículos de proyecto, sus imágenes y su lógica de apertura. Cambios de shell: título público, navegación accesible, fallback sin JS, footer con identidad nueva y ajuste de salto de línea.
- Footer de ambas páginas: identidad seleccionable/copiable y punto LIVE cíclico ON/OFF.
- GitHub Pages: rutas relativas, `CNAME` heredado y `.nojekyll`. Carpeta `publicar/` contiene sólo el sitio; documentos y respaldo quedan fuera de la publicación.
- Registro maestro heredado y ampliado; original del ZIP V1.0.7 preservado byte a byte en `respaldo/`. Manifest nuevo para esta build.
- Verificación remota de Settings/Pages, DNS y HTTPS: no realizada desde este paquete. Ninguna escritura en GitHub ni cambio del dominio.

Validación final: ver `QA_V1.0.8.json`. Ajustes posteriores al primer pase: separación del header de Privacidad, marco de Proyectos en tablet y enlace a documentación pública de protección de datos de Google Workspace. La base congelada permanece intacta.


## Actualización V1.0.9 — 2026-10-26

**Identidad:** `ADESIS_WEB_V1.0.9_candidate_HOME1.0_PRIVACIDAD_COMPACTA_20261026`.

- Solicitud del titular: adoptar la navegación y el diseño compacto propuestos: Privacidad sólo en footer de Home; página legal sin hero, sin menú principal y con retorno directo a ADESIS.
- Política resumida en cuatro bloques: responsable, tratamiento, proveedores y derechos. Se conserva la información esencial de la versión anterior; se declaran las prácticas reales del código en vez de incorporar la frase de ejemplo sobre cookies y analítica de Google.
- Responsable: ADESIS SAS, sin sustituir por persona humana ni agregar placeholders, CUIT inventado o una casilla de contacto no confirmada. Contacto preservado: direccion@adesis.com.ar.
- Home: sólo se elimina el enlace de Privacidad del header y se actualiza identidad. Tarjetas, imágenes, CSS de Home y JS conservados byte a byte desde V1.0.8.
- IDMP: footer mínimo seleccionable y LIVE preservado en ambas páginas. No se oculta la política según user-agent.
- Entregables equivalentes: sitio modular para GitHub Pages y HTML autocontenido para revisión local, con navegación por hash y sin dependencia de assets externos.
- V1.0.8 y su ZIP quedan intactos. Esta versión es candidate, sin deploy ni cambios en GitHub, DNS o terceros.


## Actualización V1.1.0 — 2026-10-26

**Identidad:** `ADESIS_WEB_V1.1.0_candidate_HOME1.0_PRIVACIDAD_PLANA_20261026`. Antecesora: `ADESIS_WEB_V1.0.9_candidate_HOME1.0_PRIVACIDAD_COMPACTA_20261026`.

- Solicitud expresa del titular: sustituir la presentación en tarjetas por un documento legal plano, monoespaciado, denso y de bajo perfil visual.
- CSS: cuerpo 11.5 px/1.45, gris #6c7a8c, texto justificado; título de 12 px; sin tarjetas, índices, píldoras, gradientes ni hero. En Privacidad se suprimen partículas/glow y se utiliza fondo uniforme. El navegador conserva zoom y selección de texto.
- HTML: un título y cuatro párrafos continuos con rótulos en negrita; regreso [← VOLVER]. Privacidad sigue accesible desde el footer de Home y mediante URL directa en el sitio modular.
- Contenido: ADESIS SAS y direccion@adesis.com.ar; sin datos inventados ni declaraciones sobre formularios o analítica que el código no incorpora. Se conservan finalidad, conservación, proveedores y derechos. El texto queda disponible a cualquier visitante; no hay variantes por user-agent ni contenido reservado a bots.
- Home: sólo cambia la identidad. Tarjetas, imágenes, CSS y JS permanecen idénticos a V1.0.9.
- IDMP: identidad, LIVE y registro acumulado conservados. ZIP V1.0.9 preservado sin cambios; hash de antecesora incluido. HTML autocontenido generado desde el sitio modular actual.
- Estado: candidate local; sin publicación, commit, push ni modificaciones en servicios externos.


## Actualización V1.1.1 — 2026-10-26

**Identidad:** `ADESIS_WEB_V1.1.1_candidate_HOME1.0_PRIVACIDAD_BLOQUE_UNICO_20261026`. Antecesora: `ADESIS_WEB_V1.1.0_candidate_HOME1.0_PRIVACIDAD_PLANA_20261026`.

- Solicitud del titular: unir los cuatro puntos legales en un único bloque continuo; rótulos en mayúsculas, sin negrita ni separación entre párrafos.
- Documento: un solo párrafo con cuatro spans inline para conservar las anclas. Se retira strong de todo el cuerpo y se mantiene el peso 400 uniforme. El título general y los enlaces permanecen.
- El contenido textual de los cuatro puntos es idéntico al de V1.1.0, salvo normalización del espacio entre puntos. Home sólo actualiza identidad; imágenes, tarjetas, CSS de Home y JS se preservan.
- IDMP: identidad, LIVE, registro heredado y hash de antecesora conservados. HTML autocontenido y paquete modular corresponden a la misma build. V1.1.0 se preserva sin modificaciones.
- Estado: candidate local; sin publicación ni cambios externos.

