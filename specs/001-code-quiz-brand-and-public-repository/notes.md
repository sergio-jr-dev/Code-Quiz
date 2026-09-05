# Notes

## Decisions

- Nombre editorial: Code Quiz. Marca gráfica: CODE QUIZ.
- El usuario aprobó el cubo 3D con `< >`, `{ }` y `JS`, el renombrado a `Code-Quiz` y la eliminación del fondo mediante procesamiento de imagen.
- Las materias comparten la identidad violeta; no se anuncian JavaScript ni filtros como disponibles todavía.
- El usuario solicita nesting nativo, propiedades lógicas y media queries anidadas junto al selector afectado.

## Implementation Notes

- Repositorio remoto renombrado a `sergio-jr-dev/Code-Quiz`; `origin` actualizado conservando el alias SSH existente.
- Cabecera, package metadata, canonical, Open Graph y `base` preparados para `/Code-Quiz/`.
- Logo generado originalmente con la herramienta de imágenes: cubo violeta con símbolos de código y texto CODE QUIZ. El generador produjo un fondo cuadriculado rasterizado.
- El procesamiento autorizado elimina el fondo y los huecos de las letras, conserva los símbolos blancos del cubo, limpia bordes y adapta el texto al fondo oscuro. Los WebP finales tienen alfa real: 960 × 448, aproximadamente 60 KB por variante.
- Símbolo compacto PNG 256 × 256, favicon PNG 48 × 48 e imagen social PNG 1200 × 630 sobre fondo oscuro. El README enlaza las variantes y muestra una captura actualizada.
- Concepto y prompt temporales retirados del árbol publicable; recuperables desde Git y una copia local externa. Retirados el componente de marca anterior sin consumidores y el estilo de imagen del footer sin uso.
- Se conserva el cambio previo del usuario a `@vitejs/plugin-react` y su lockfile. No se añadieron dependencias para procesar imágenes.
- Los tokens globales usan las parejas `light-dark()` de DESIGN.md. El esquema activo sigue siendo oscuro hasta implementar el modo claro completo.
- Dimensiones y posiciones CSS usan propiedades lógicas. Los botones permiten wrap y se apilan hasta 30rem mediante una media query anidada en su selector.

## Validation Results

### Validation (2026-09-05)

- Checks run: build, lint, `git diff --check`, inspección del diff, revisión de assets y alfa, Chromium a 320/1280 px y consultas a GitHub y Pages.
- Passing checks: build y diff correctos. Logos con alfa de 0 a 255; fondos claro y oscuro inspeccionados. Símbolo comprobado a 16/32/48/64 px; imagen social revisada a 1200 × 630. La cabecera carga el WebP bajo `/Code-Quiz/` sin deformación ni desbordamiento. Las preferencias clara y oscura del sistema conservan el tema oscuro intencional.
- Passing checks: recorrido de 25 preguntas, explicación, finalización, revisión y reinicio. Activación de respuesta y avance con teclado. La migración a block-size mantiene la explicación visible.
- Passing checks: tras ajustar el grupo de botones, resultados y revisión no presentan desbordamiento horizontal a 320 px; los botones ocupan 240 px dentro de la tarjeta.
- Passing checks: búsqueda de patrones de credenciales en árbol y en 338 blobs de texto únicos del historial, sin coincidencias. Esta comprobación no garantiza la ausencia de cualquier tipo de dato sensible.
- Failing checks: lint reproduce el fallo previo en `QuizContextProvider.jsx:15` por `Math.random()` durante render. Pertenece a la spec 002.
- Unresolved risks: publicar el build actualizado y verificar la aplicación pública; accesibilidad completa, sanitización y reinicio del estado de revisión siguen en las specs 002/003.
- Los comandos pnpm se ejecutaron con `pnpm_config_verify_deps_before_run=false` para usar las dependencias instaladas sin reinstalarlas automáticamente. Los artefactos de navegador están fuera del repositorio; solo la captura editorial del README forma parte de los assets publicados.

## Public Deployment

- GitHub confirma el nombre `Code-Quiz` y Pages responde HTTP 200 en `https://sergio-jr-dev.github.io/Code-Quiz/`.
- El HTML publicado sigue siendo el anterior: referencia JS/CSS absolutos en `/HTML-CSS-Quiz/`, que devuelven HTTP 404. La respuesta 200 del documento no significa que la aplicación pública funcione.
- Los mismos assets antiguos existen bajo `/Code-Quiz/`. El nuevo build local resuelve todas sus rutas bajo ese prefijo.
- El entorno github-pages solo admite la rama `main`. La publicación necesita integrar los cambios de la rama de trabajo y desplegarlos desde main. No se ha modificado esa regla, fusionado ramas ni publicado este build.
- La spec permanece In progress hasta completar y verificar esa publicación.
- En la comprobación final apareció eliminado el workflow local ".github/workflows/jekyll-gh-pages.yml", un cambio externo a esta implementación. Se conserva esa eliminación. No hay workflow de reemplazo en el árbol actual; antes de publicar debe resolverse el mecanismo de despliegue previsto.

## Deviations From Spec

- Extracción de alfa por procesamiento de imagen autorizada expresamente después de que el generador no consiguiera transparencia.
- Se incorporaron las convenciones CSS solicitadas durante la revisión, incluida la corrección del desbordamiento de los botones en móvil.

## Visual Deviations

- CODE usa un tratamiento claro y QUIZ un violeta más luminoso en la variante oscura para mejorar legibilidad; se conserva el cubo aprobado.
- El modo claro de la aplicación sigue pendiente; solo están preparados los tokens y los assets.

## Dirección de publicación actualizada · 2026-09-05

La publicación en el remoto anterior queda descartada. La spec 004 prepara una base TypeScript para un nuevo repositorio privado sin historial y un futuro despliegue en Vercel. Los resultados anteriores de Pages son históricos.

## Cierre de publicación · 2026-09-06

- Repositorio privado: https://github.com/sergio-jr-dev/Code-Quiz. Commit raíz 229f46e; no contiene el historial anterior.
- URL pública: https://codequiz-game.vercel.app/. SITE_URL ya se refleja en el HTML servido: canonical y og:url apuntan al dominio y og:image a su imagen social absoluta. No aparece noindex en el documento de producción.
- Favicon e imagen social responden HTTP 200 con content-type image/png. Aplicación sin errores ni avisos de consola.
- Flujo público completado con teclado: 25 preguntas, revisión de 25 entradas y reinicio a 1/25. Sin desbordamiento a 320 px ni 1440 px. Preferencia clara del sistema mantiene el tema oscuro actual; modo claro funcional sigue fuera de alcance. Movimiento reducido aplicado en la prueba móvil.
- README y AGENTS.md actualizados; carpeta local enlazada al historial nuevo tras verificar identidad de archivos y guardar el historial anterior fuera del repositorio.

### Validation

- Checks run: pnpm lint, pnpm test, build con SITE_URL de producción (incluye tsc -b), git diff --check, comprobación HTTP y navegador Chromium en el dominio público.
- Passing checks: todos; 17 pruebas, metadatos absolutos, assets accesibles, foco, flujo y reflow verificados. La validación visual se apoya además en las comprobaciones de assets de marca y texto ampliado registradas anteriormente.
- Failing checks: None.
- Unresolved risks: no se afirma una auditoría exhaustiva WCAG ni una prueba manual con lector de pantalla; no son criterios pendientes de esta spec de marca y publicación.
