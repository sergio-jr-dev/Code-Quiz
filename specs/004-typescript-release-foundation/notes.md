# Notes

## Decisions

- Migración autorizada el 2026-09-05; se conservaron los cambios previos de marca, assets y CSS.
- Se mantiene el banco completo de 25 preguntas y el tema oscuro. React Compiler queda fuera de esta versión.
- El proyecto es personal del autor; se retiraron la configuración y referencias corporativas del árbol publicable.
- El remoto y el historial anteriores permanecen intactos. La creación del nuevo repositorio y la publicación son una fase posterior.
- SITE_URL solo debe configurarse con el origen definitivo de producción. Sin esa variable, el build declara noindex y omite URLs públicas.

## Implementation Notes

- Aplicación, banco y configuración Vite migrados a TypeScript estricto, con noUncheckedIndexedAccess y comprobación de tipos antes del build.
- ESLint 10 propio con TypeScript, Hooks y Fast Refresh. Se eliminó el plugin React antiguo incompatible con ESLint 10. TypeScript se fija a la serie 6.0 compatible con typescript-eslint.
- El contexto expone estado tipado y acciones; la puntuación se deriva de las respuestas. Se bloquean respuestas repetidas y avances sin selección.
- Fisher–Yates reemplaza el sort aleatorio. Reiniciar baraja de nuevo y limpia selección, respuestas, finalización y revisión.
- DOMPurify sanitiza el Markdown con allowlist de etiquetas de texto y código, sin atributos ni enlaces activos.
- Se incorporan Vitest y Testing Library para proteger esta migración; las funcionalidades ampliadas de 002/003 siguen pendientes.
- Se actualizan README, captura, AGENTS.md, DESIGN.md y referencias de despliegue. Los assets de marca previamente aprobados se conservan.

## Validation Results · 2026-09-05

### Validation

- Checks run: pnpm lint, pnpm test, pnpm build (incluye tsc -b), pnpm peers check, git diff --check; comparación exacta del banco con la copia previa; build adicional con SITE_URL de ejemplo; navegador Chromium del build raíz y peticiones locales de desarrollo.
- Passing checks: lint, TypeScript y build sin errores; 17 pruebas en 4 archivos; ninguna incompatibilidad de peers; diff sin errores de espacios. Las 25 preguntas, opciones, respuestas correctas y explicaciones son idénticas al contenido anterior.
- Passing checks: dos partidas completas en pruebas, segunda con 25/25, revisión, eliminación de la acción de revisión al abrirla y reinicio sin estado residual. Payloads con scripts, SVG, eventos, estilos, iframes y URLs inseguras se eliminan; el código escapado se conserva.
- Passing checks: en navegador, 25 preguntas distintas recorridas con teclado, resultados, revisión de 25 entradas y reinicio a 1/25 sin selección. Viewports de 320 y 1440 px, incluido texto al 200 % en móvil, sin desbordamiento horizontal. El foco pasa a los encabezados de pregunta, resultado y primera pregunta revisada.
- Passing checks: con movimiento reducido, sin animación de error, sin canvas de confeti y scroll automático. La aplicación conserva el tema oscuro tanto con preferencia de sistema clara como oscura; no se declara implementado un modo claro. Vista normal con confeti verificada en escritorio.
- Passing checks: consola del navegador sin errores ni avisos; documento, JavaScript, CSS, logo y favicon responden correctamente. Desarrollo sirve HTML y entrada TSX desde la raíz. Build sin SITE_URL incluye noindex; build de prueba con origen HTTPS genera canonical, og:url y og:image absolutos sin rutas antiguas.
- Passing checks: revisión visual de logo, imagen social y captura del README; búsqueda de credenciales, rutas locales y marca anterior sobre 173 archivos de texto versionados y no ignorados sin hallazgos. Capturas de QA fuera del repositorio; solo la captura de producto del README forma parte de la entrega.
- Failing checks: None.
- Unresolved risks: dominio definitivo y publicación remota todavía pendientes. No se ha realizado una auditoría exhaustiva WCAG ni una prueba manual con lector de pantalla; la validación cubre los controles, foco, estados y reflow del flujo actual.

## Deviations From Spec

- None. La suite mínima se adelantó explícitamente dentro del alcance de la migración, sin implementar el catálogo futuro.

## Visual Deviations

- Se conserva la identidad violeta y el tema oscuro.
- Se añaden foco visible y etiquetas de resultado. El badge y la navegación de revisión usan el flujo normal para no superponerse al contenido.
- La comprobación de texto al 200 % detectó desbordamiento de métricas y contenedores; se corrigió con wrap, tamaños intrínsecos y padding estrecho. Todos los ajustes quedan descritos en DESIGN.md.

## Revisión de dependencias previa al nuevo repositorio · 2026-09-06

- Auditoría inicial: 8 avisos (5 high, 2 moderate, 1 low), todos en dependencias transitivas de desarrollo. Ningún aviso en dependencias de producción.
- Corrección mediante `pnpm audit --fix=update`, sin overrides ni cambios de versión mayor en dependencias directas:
  - `brace-expansion`: 5.0.5 → 5.0.9.
  - `@babel/core`: 7.29.0 → 7.29.7.
  - `browserslist`: 4.28.2 → 4.28.9.
  - `@humanfs/node`: 0.16.6 → 0.16.8.
- El lockfile incluye las actualizaciones relacionadas de Babel y de las bases de compatibilidad de Browserslist.
- Auditorías posteriores completa y `--prod`: 0 avisos en todas las severidades. Esto comprueba los avisos conocidos por el registro, no garantiza ausencia de vulnerabilidades desconocidas.
- Verificados `pnpm typecheck`, `pnpm lint`, `pnpm test` (17 pruebas), `pnpm build`, `pnpm peers check` y `git diff --check`: todos correctos. Los hashes del JavaScript y CSS de producción coinciden con la versión validada previamente; no se modifica el flujo visual ni el contenido.
- `pnpm outdated` también muestra nuevas versiones de tipos de React DOM, globals y el plugin de Fast Refresh, pero no están relacionadas con los avisos. Se mantiene TypeScript 6.0 por compatibilidad con typescript-eslint; no se realiza una actualización mayor a TypeScript 7.
- Nuevo repositorio previsto: `Code-Quiz`, privado y con un único commit inicial. La consulta de GitHub confirma que el repositorio anterior ahora se llama `Code-Quiz-legacy-` y es privado. No se ha cambiado su remoto local ni su historial.
- El dominio deseado de Vercel tiene la forma `code-quiz.vercel.app`, sujeto a disponibilidad y asignación. Los despliegues Preview reciben URLs propias; no se fija todavía SITE_URL ni se afirma que el dominio esté reservado.

Referencias de los paquetes corregidos: [brace-expansion](https://github.com/advisories/GHSA-rgw5-rvv9-x895), [Babel](https://github.com/advisories/GHSA-4x5r-pxfx-6jf8), [Browserslist](https://github.com/advisories/GHSA-73wf-gq98-2v4g), [humanfs](https://github.com/advisories/GHSA-p498-v437-472g).

## Migración a OXLint y TypeScript 7 · 2026-09-10

- OXLint sustituye a ESLint, `typescript-eslint` y los plugins separados de Hooks y Fast Refresh. La configuración conserva esas reglas mediante los plugins nativos `react`, `typescript` y `oxc`.
- TypeScript 7 vuelve a ser compatible con el pipeline porque el lint ya no depende de la API de TypeScript 6. `tsc -b` permanece como comprobación de tipos independiente; no se activa lint type-aware ni se incorpora `oxlint-tsgolint`.
- Verificados OXLint, TypeScript, 59 pruebas Vitest, build de Vite y `git diff --check`, todos sin errores.

## Publicación y vinculación local · 2026-09-06

- El repositorio privado sergio-jr-dev/Code-Quiz parte del commit raíz 229f46e, sin padres ni historial anterior.
- Producción confirmada en https://codequiz-game.vercel.app/. El HTML servido incluye canonical, og:url y og:image con ese dominio y no contiene noindex.
- Antes de vincular la carpeta local se compararon byte a byte sus 179 archivos con el remoto: ninguna diferencia. Se guardó el directorio Git antiguo completo, su HEAD, estado y diff en un respaldo externo permanente.
- La carpeta local utiliza main del nuevo repositorio y conserva todos los archivos de trabajo, dependencias y artefactos ignorados. El historial anterior no se importó.
- La actualización de documentación se registra después del commit inicial; no se reescribe el historial publicado.
