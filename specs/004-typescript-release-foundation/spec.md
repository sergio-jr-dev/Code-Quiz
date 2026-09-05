# TypeScript release foundation

**Status:** Implemented

## Goal

Cerrar una primera base de Code Quiz en TypeScript conservando el quiz actual, preparada para un repositorio privado nuevo sin historial y un futuro despliegue en Vercel.

## Requirements

- REQ-1: Migrar aplicación, banco y configuración Vite a TypeScript estricto, con comprobación de tipos en el build y ESLint propio.
- REQ-2: Conservar exactamente las 25 preguntas, opciones y explicaciones actuales y la partida completa; corregir barajado, doble respuesta y reinicio incompleto.
- REQ-3: Mantener la identidad y el tema oscuro existentes; completar foco, feedback textual y movimiento reducido en el flujo actual.
- REQ-4: Sanitizar las explicaciones Markdown y probar contenido malicioso.
- REQ-5: Servir desde la raíz y generar canonical y URLs sociales únicamente cuando exista un SITE_URL válido. Builds sin URL pública quedan noindex.
- REQ-6: Actualizar README y documentación para separar esta versión de las ampliaciones futuras y retirar referencias corporativas del árbol publicable.
- REQ-7: Verificar tipos, lint, pruebas, build, diff y navegador antes de preparar la publicación.

## Acceptance Criteria

- [x] AC-1: No queda aplicación JS/JSX ni dependencia de configuración corporativa; types, lint y build pasan. [REQ-1]
- [x] AC-2: El banco conserva sus 25 entradas y las pruebas verifican puntuación, finalización, revisión y reinicio. [REQ-2]
- [x] AC-3: Flujo operable con teclado, foco deliberado y movimiento reducido, sin desbordamiento a 320 px y escritorio. [REQ-3]
- [x] AC-4: Payloads maliciosos no producen HTML activo y Markdown de código conserva su contenido literal. [REQ-4]
- [x] AC-5: Build raíz funcional, metadatos sin URL antigua ni dominio inventado; URL configurada produce enlaces absolutos. [REQ-5]
- [x] AC-6: Documentación describe lo disponible y la publicación futura sin anunciarla como realizada. [REQ-6]

## Out Of Scope

- Ampliar preguntas, materias, niveles, filtros, persistencia o modo claro.
- Incorporar React Compiler o reescribir la aplicación desde cero.
- Borrar el historial local, modificar el remoto anterior o desplegar en esta fase.

## Technical Notes

La publicación posterior partirá de una copia limpia sin `.git`, dependencias ni artefactos. Se conserva el repositorio actual hasta entonces. La suite mínima se adelanta para proteger la migración; las specs 002 y 003 siguen Draft.

## Risks Or Open Questions

- Repositorio privado creado: sergio-jr-dev/Code-Quiz. Producción confirmada: https://codequiz-game.vercel.app/.
