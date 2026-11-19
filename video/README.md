# Presentación de Code Quiz

Vídeo aprobado y publicado para LinkedIn y X: **49,5 segundos, 1080 × 1350 px, 30 fps**. Incluye música instrumental y textos, sin voz en off. El guion está en `../docs/video-presentacion.md`.

## Abrir la previsualización

Desde la raíz del repositorio:

```bash
cd video
pnpm install --frozen-lockfile
pnpm dev
```

Abre la dirección que imprima Remotion Studio y selecciona **CodeQuiz**. Pulsa el botón de reproducción para ver el montaje completo. La carpeta **Escenas** permite revisar cada escena por separado; la línea de tiempo permite recorrer el vídeo fotograma a fotograma.

## Organización

- `src/Presentation.tsx`: orden y duración de las nueve escenas.
- `src/scenes/`: un componente por escena.
- `src/components/`: tarjeta demostrativa, fondo compartido y confeti reproducible.
- `src/data.ts`: contenido leído de la pregunta real `html-links-001` del catálogo.
- `src/video.css`: estilos del vídeo, independientes de los del juego.
- `scripts/sync-assets.mjs`: copia únicamente los assets utilizados desde la aplicación. Las copias son generadas y no se versionan.

La interfaz del vídeo es una recreación editorial ampliada para favorecer la lectura, no una grabación de una partida. Las animaciones dependen del fotograma, sin temporizadores ni estado persistido. Las imágenes usan `Img` de Remotion para conservar la compatibilidad con la previsualización del navegador integrado.

## Verificación

```bash
pnpm typecheck
pnpm build
```

La compilación crea un bundle de previsualización; no exporta un vídeo. El formateador y el linter del repositorio también revisan el código de esta carpeta. El proyecto mantiene su propio `package.json`, workspace y lockfile, con todas las dependencias Remotion en la misma versión.

## Música y exportación

La composición completa incluye «Cipher», de Kevin MacLeod, con entrada y salida graduales. Las escenas individuales se previsualizan sin música. Consulta [la licencia y el crédito para la publicación](public/audio/CREDITS.md); el cierre incluye también una atribución breve. La versión final ya está aprobada y publicada.

Para volver a exportar la composición:

```bash
pnpm assets
pnpm exec remotion render src/index.ts CodeQuiz out/code-quiz.mp4 --codec=h264
```

`out/`, `build/` y los recursos generados no se versionan. El código propio sigue la licencia del repositorio; Remotion y el resto de dependencias conservan sus licencias respectivas.
