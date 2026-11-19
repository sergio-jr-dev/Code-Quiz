"use strict";
(self["webpackChunkcode_quiz_presentation"] = self["webpackChunkcode_quiz_presentation"] || []).push([["223"], {
4314(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.d(__webpack_exports__, {
  VideoMattingQueueProcessor: () => (VideoMattingQueueProcessor)
});
/* import */ var _index_v4tr1bft_mjs__rspack_import_4 = __webpack_require__(3501);
/* import */ var _index_9x6e1dq0_mjs__rspack_import_0 = __webpack_require__(3722);
/* import */ var _index_cw0pnpg5_mjs__rspack_import_5 = __webpack_require__(8690);
/* import */ var _index_rcv7qkt5_mjs__rspack_import_1 = __webpack_require__(8427);
Object(function __rspack_missing_module() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* import */ var react__rspack_import_3 = __webpack_require__(7140);





// src/components/RenderQueue/VideoMattingQueueProcessor.tsx


var VideoMattingQueueProcessor = () => {
  const {
    markVideoMattingJobDone,
    markVideoMattingJobFailed,
    setProcessVideoMattingJobCallback,
    updateVideoMattingJobProgress
  } = (0,react__rspack_import_3.useContext)(_index_9x6e1dq0_mjs__rspack_import_0/* .RenderQueueContext */.x7);
  const processJob = (0,react__rspack_import_3.useCallback)(async (job) => {
    let outputs = null;
    let processingError = null;
    try {
      updateVideoMattingJobProgress(job.id, {
        detail: null,
        message: "Checking WebGPU support...",
        value: 0
      });
      const support = await Object(function __rspack_missing_module() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model: job.model });
      if (!support.supported) {
        throw new Error(support.detailedReason);
      }
      await (0,_index_v4tr1bft_mjs__rspack_import_4/* .loadModelForJob */.k)({
        model: job.model,
        progressStart: 0,
        progressSpan: 0.2,
        isModelCached: (model) => Object(function __rspack_missing_module() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }),
        loadModel: (model, onProgress) => Object(function __rspack_missing_module() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
          model,
          onProgress: (progress) => onProgress(progress.progress)
        }),
        updateProgress: (progress) => updateVideoMattingJobProgress(job.id, {
          ...progress,
          detail: null
        })
      });
      outputs = await Object(function __rspack_missing_module() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        src: job.src,
        model: job.model,
        audio: job.audio,
        videoBitrate: job.videoBitrate,
        onProgress: (progress) => {
          updateVideoMattingJobProgress(job.id, {
            detail: progress.stage === "finalizing" ? `Processed ${progress.processedFrames} ${progress.processedFrames === 1 ? "frame" : "frames"}` : `Processed ${progress.processedFrames} ${progress.processedFrames === 1 ? "frame" : "frames"} · ${Math.round(progress.progress * 100)}%`,
            message: progress.stage === "finalizing" ? "Finalizing video layers..." : "Separating foreground...",
            value: 0.2 + (progress.progress ?? 1) * 0.65
          });
        }
      });
      updateVideoMattingJobProgress(job.id, {
        detail: null,
        message: "Saving video layers...",
        value: 0.88
      });
      const [base, foreground] = await Promise.all([
        outputs.base.getBlob(),
        outputs.foreground.getBlob()
      ]);
      await Promise.all([
        base.arrayBuffer().then((contents) => (0,_index_cw0pnpg5_mjs__rspack_import_5/* .writeStaticFile */.sV)({ contents, filePath: job.baseOutName })),
        foreground.arrayBuffer().then((contents) => (0,_index_cw0pnpg5_mjs__rspack_import_5/* .writeStaticFile */.sV)({ contents, filePath: job.foregroundOutName }))
      ]);
    } catch (error) {
      processingError = error instanceof Error ? error : new Error(String(error));
    }
    try {
      await Promise.all([
        outputs?.base.dispose(),
        outputs?.foreground.dispose()
      ]);
      await Object(function __rspack_missing_module() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model: job.model });
    } catch {}
    if (processingError) {
      markVideoMattingJobFailed(job.id, processingError);
    } else {
      markVideoMattingJobDone(job.id);
    }
  }, [
    markVideoMattingJobDone,
    markVideoMattingJobFailed,
    updateVideoMattingJobProgress
  ]);
  (0,react__rspack_import_3.useEffect)(() => {
    setProcessVideoMattingJobCallback(processJob);
    return () => setProcessVideoMattingJobCallback(null);
  }, [processJob, setProcessVideoMattingJobCallback]);
  return null;
};



},
3501(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.d(__webpack_exports__, {
  k: () => (loadModelForJob)
});
// src/components/RenderQueue/load-model-for-job.ts
var loadModelForJob = async ({
  isModelCached,
  loadModel,
  model,
  progressSpan,
  progressStart,
  updateProgress
}) => {
  const cached = await isModelCached(model);
  await loadModel(model, (progress) => {
    const percentage = progress === null ? "" : ` ${Math.round(progress * 100)}%`;
    updateProgress({
      message: `${cached ? "Loading" : "Downloading"} ${model}${percentage}`,
      value: progressStart + (progress ?? 0) * progressSpan
    });
  });
};




},

}]);
//# sourceMappingURL=223.bundle.js.map