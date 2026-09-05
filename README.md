# Code Quiz

Aplicación educativa en español para practicar HTML y CSS con preguntas de opción única, feedback inmediato y explicaciones.

![Code Quiz: quiz de HTML y CSS con identidad violeta](public/images/screenshot.png)

## Primera versión

- 25 preguntas de HTML y CSS en cada partida, en orden aleatorio.
- Respuesta correcta e incorrecta indicadas con texto y color.
- Explicaciones en Markdown con HTML sanitizado.
- Puntuación, porcentaje y revisión de todas las respuestas.
- Reinicio completo con un nuevo barajado.
- Navegación con teclado y respeto a movimiento reducido.
- Identidad Code Quiz y tema oscuro; modo claro todavía pendiente.

La base utiliza **React 19, TypeScript estricto y Vite 8**. No requiere backend ni cuentas de usuario. React Compiler no está incorporado.

## Desarrollo local

Requisitos: Node.js 22.22.2+, 24.15+ o 26+ y pnpm 11.24.0.

```bash
pnpm install
pnpm dev
```

Comprobaciones:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

`pnpm test:watch` ejecuta las pruebas en modo interactivo. `pnpm build` comprueba tipos antes de generar `dist/`. La suite usa Vitest y Testing Library para proteger el banco, el barajado, las explicaciones y el flujo completo.

Para revisar el build:

```bash
pnpm preview
```

La aplicación se sirve desde `/` tanto en desarrollo como en producción.

## Publicación en Vercel

La publicación está pendiente. Esta versión se prepara para un repositorio privado nuevo llamado **Code-Quiz**, con un único commit inicial, sin trasladar el historial anterior.

En Vercel, utilizar el preset Vite, `pnpm build` como comando de build y `dist` como directorio de salida. No hacen falta reglas de reescritura para el flujo actual, que usa una sola página.

Configurar **SITE_URL** en el entorno de producción con el origen HTTPS definitivo, sin rutas, parámetros ni fragmentos. El build utiliza ese valor para canonical, `og:url` y la URL absoluta de la imagen social. No contiene secretos.

Hasta definir SITE_URL, el build incluye `noindex, nofollow` y omite las URLs públicas para no anunciar un dominio inventado. Dejar SITE_URL sin definir en previews. Para verificar localmente el comportamiento, puede añadirse a `.env.local`, que no se versiona.

Antes de publicar, validar el build con el dominio elegido y revisar el contenido que se copiará al nuevo repositorio. No trasladar `.git`, `node_modules`, `dist`, `.env*`, logs ni artefactos de trabajo. Conservar el repositorio anterior como respaldo; no es necesario borrar su historial local.

## Estructura

```text
src/
  components/   Interfaz del quiz y resultados (.tsx)
  context/      Estado compartido y acciones de la partida
  data/         Las 25 preguntas actuales
  lib/          Barajado y render seguro de explicaciones
  types/        Contratos de preguntas, opciones y contexto
  test/         Configuración de pruebas
config/         Metadatos generados durante el build
specs/          Especificaciones, tareas y decisiones
public/images/  Logos, favicon, imagen social y captura
```

## Evolución planificada

Las siguientes funcionalidades todavía no están implementadas:

- HTML, CSS y JavaScript como materias seleccionables.
- Niveles básico, intermedio y avanzado.
- Partidas de 10 preguntas, bancos de al menos 20 por materia y nivel y modo mixto.
- Modelo ampliado de contenido con ejemplos de código.
- Posiciones correctas equilibradas y revisión editorial de distractores.
- Persistencia del progreso, mejores resultados y repetición de fallos.
- Modo claro completo con selector y persistencia.

Especificaciones:

- [001 · Identidad Code Quiz](specs/001-code-quiz-brand-and-public-repository/spec.md)
- [002 · Banco y equidad](specs/002-question-bank-and-answer-fairness/spec.md)
- [003 · Flujo ampliado](specs/003-quiz-flow-and-test-foundation/spec.md)
- [004 · Base TypeScript de la primera versión](specs/004-typescript-release-foundation/spec.md)

## Marca y autoría

Proyecto personal de Sergio Jiménez Rubio. La marca incluye logos transparentes para [fondos oscuros](public/images/code-quiz-logo-dark.webp) y [claros](public/images/code-quiz-logo-light.webp), [símbolo compacto](public/images/code-quiz-symbol.png), favicon e imagen social. Las variantes claras están preparadas para la evolución futura.

## Privacidad

Aunque el nuevo repositorio comience privado, tratar los archivos como material que se publicará. No incluir credenciales, configuración privada ni datos personales innecesarios. Comunicar cualquier vulnerabilidad por un canal privado sin publicar secretos.

Antes de publicar y durante el mantenimiento, ejecutar `pnpm audit` para revisar todas las dependencias y `pnpm audit --prod` para las de producción. Mantener el lockfile versionado y verificar tipos, lint, pruebas y build después de actualizarlo.

## Licencia

[MIT](LICENSE).
