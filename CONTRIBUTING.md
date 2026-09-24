# Contribuir a Code Quiz

¡Gracias por ayudar a mejorar Code Quiz! Puedes participar corrigiendo contenido, comunicando errores, proponiendo mejoras o enviando código. La aplicación y las aportaciones se redactan principalmente en español.

## Antes de empezar

Revisa los [issues abiertos](https://github.com/sergio-jr-dev/Code-Quiz/issues) para evitar duplicados. Para un cambio importante de interfaz, arquitectura o funcionamiento, abre primero un issue que explique el problema y la solución que propones. Para una corrección pequeña y concreta, puedes enviar directamente una pull request.

### Comunicar un error

Abre un [issue](https://github.com/sergio-jr-dev/Code-Quiz/issues/new/choose) con:

- Una descripción breve de lo que sucede y de lo que esperabas.
- Pasos para reproducirlo y, si ayuda, una captura sin información personal.
- Navegador, sistema operativo, tamaño de pantalla y modalidad de partida relevantes.
- Mensajes de error pertinentes, eliminando antes tokens, datos privados y rutas locales.

Si el problema afecta a la seguridad, evita publicar detalles explotables o secretos en un issue. Usa la opción de reporte privado de vulnerabilidades del repositorio, si está habilitada.

### Proponer o corregir preguntas

Indica la materia, el nivel y el tema; copia el ID estable de la pregunta si ya existe. Explica la corrección y aporta una fuente técnica fiable cuando corresponda. Las opciones deben ser paralelas en precisión y extensión, con una sola respuesta correcta. La explicación debe enseñar por qué esa respuesta es válida y por qué las alternativas pueden confundir.

El banco está en `src/data/bank/`. Conserva los IDs existentes y usa los bloques tipados de texto o código del proyecto: no incluyas HTML arbitrario para renderizar contenido. Una combinación publicada de materia y nivel debe mantener al menos veinte preguntas aprobadas.

## Desarrollo local

Necesitas una versión de Node.js compatible con `package.json` (22.22.2+, 24.15+ o 26+) y **pnpm 12.4.1**.

```bash
pnpm install
pnpm dev
```

Abre la URL local que muestre Vite. Para comprobar la versión de producción en tu equipo:

```bash
pnpm build
pnpm preview
```

No necesitas cuentas ni servicios externos para desarrollar. El estado del quiz se guarda en el navegador; para probar una configuración desde cero, usa un perfil de navegador limpio o elimina los datos locales de la aplicación de pruebas.

## Enviar una pull request

1. Crea una rama desde `main` y limita el cambio a un problema o mejora concreta.
2. Respeta [DESIGN.md](DESIGN.md) y la arquitectura existente. Actualiza la documentación si cambia el comportamiento visible; incluye capturas para cambios de interfaz.
3. Añade o ajusta pruebas cuando cambien las reglas del quiz, el banco de preguntas o un comportamiento interactivo.
4. Ejecuta las comprobaciones antes de abrir la pull request:

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build
git diff --check
```

En la descripción, explica qué problema resuelve el cambio, cómo lo comprobaste y si hay alguna limitación conocida. Mantén el `pnpm-lock.yaml` sincronizado solo si cambian dependencias. No incluyas archivos `.env`, credenciales, resultados de build ni capturas temporales.

Las contribuciones aceptadas se publicarán bajo la [licencia MIT](LICENSE) del proyecto.
