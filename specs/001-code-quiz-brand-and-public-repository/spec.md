# Code Quiz brand and public repository

**Status:** In progress

## Goal

Adoptar de forma completa y segura el nombre **Code Quiz**, crear una identidad 3D apta para la aplicación y mantener toda la presentación pública del repositorio precisa, coherente y libre de información sensible.

## Context

La identidad Code Quiz está integrada. La primera versión se prepara para un repositorio privado nuevo con un único commit inicial; la publicación futura será en Vercel. La spec 004 completa la migración técnica y la preparación del build.

## Requirements

- REQ-1: Toda superficie pública debe usar el nombre visible “Code Quiz” con capitalización coherente.
- REQ-2: El logo principal debe ser un lockup 3D original con el texto exacto “CODE QUIZ” y referencias visuales no registradas a HTML, CSS y JavaScript.
- REQ-3: La familia de marca debe incluir como mínimo lockup horizontal transparente, símbolo compacto, favicon y composición para Open Graph.
- REQ-4: Los assets deben mantener la paleta y las reglas claro/oscuro de `DESIGN.md`, conservar legibilidad a tamaños pequeños y evitar depender de una única superficie de fondo.
- REQ-5: Las materias compartirán paleta; se distinguirán mediante logo, nombre y apoyos gráficos mínimos, no mediante sistemas cromáticos independientes.
- REQ-6: `README.md`, título HTML, metadatos, package metadata y textos de interfaz deben describir únicamente funcionalidades realmente disponibles o identificar explícitamente la hoja de ruta.
- REQ-7: Open Graph debe usar `property="og:..."`, URLs absolutas y rutas con capitalización idéntica al despliegue definitivo.
- REQ-8: Antes de publicar, debe realizarse una revisión de secretos, archivos privados, rutas locales, datos personales, material corporativo y assets accidentales tanto en archivos versionados como no versionados.
- REQ-9: El repositorio no debe publicar conceptos descartados, archivos temporales de generación, capturas de QA, logs ni builds locales.

## Design Requirements

- Seguir `DESIGN.md` como fuente de verdad.
- Mantener la dirección aprobada del cubo 3D con las tres caras `< >`, `{ }` y `JS`.
- Usar símbolos originales; no copiar los escudos oficiales de HTML, CSS o JavaScript.
- Exportar el logo final con alfa real, bordes limpios y variantes verificadas sobre canvas claro y oscuro.

## Acceptance Criteria

- [x] AC-1: La búsqueda de referencias públicas antiguas en el árbol de trabajo no encuentra “HTML-CSS Quiz” salvo en notas históricas justificadas. [REQ-1]
- [x] AC-2: El logo aprobado muestra “CODE QUIZ” sin errores y representa claramente las tres materias. [REQ-2]
- [x] AC-3: Los cuatro formatos de marca existen, están optimizados y no contienen fondos rasterizados accidentales. [REQ-3, REQ-4]
- [x] AC-4: Logo, favicon y Open Graph se verifican visualmente en temas claro y oscuro y en tamaños de uso reales. [REQ-4]
- [x] AC-5: `README.md` distingue el estado de esta rama y la publicación pendiente y enlaza las specs activas sin presentar la hoja de ruta como implementada. [REQ-6]
- [ ] AC-6: Los metadatos Open Graph usan atributos y URLs válidos para el destino público confirmado. [REQ-7]
- [x] AC-7: La revisión de privacidad no encuentra secretos o datos sensibles y queda registrada en `notes.md`. [REQ-8]
- [x] AC-8: `pnpm lint`, `pnpm build` y `git diff --check` se ejecutan; cualquier fallo previo queda separado y documentado. [REQ-6, REQ-9]

## Out Of Scope

- Añadir o migrar preguntas.
- Implementar selección de materias, niveles o partidas.
- Rediseñar la paleta definida en `DESIGN.md`.

## Technical Notes

- Solo los assets finales de `public/images/` forman parte de la entrega.
- Preferir formatos WebP/AVIF para composiciones raster grandes cuando no se pierda fidelidad; conservar PNG para transparencia cuando corresponda.
- Los favicons y símbolos pequeños pueden necesitar una simplificación específica, no un simple reescalado del lockup.
- El build sirve desde la raíz y genera las URLs absolutas desde SITE_URL cuando se defina el dominio público.

## Risks Or Open Questions

- Pendientes la creación del nuevo repositorio y el dominio de Vercel. No se publica en el remoto anterior.
