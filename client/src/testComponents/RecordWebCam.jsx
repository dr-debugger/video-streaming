import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import Webcam from "react-webcam";

let url = null;

const RecordWebCam = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const [videoUrl, setVideoUrl] = useState(url);

  const clearAll = useCallback(() => {
    window.URL.revokeObjectURL(url);
    url = null;
    setVideoUrl(null);
    setRecordedChunks([]);
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    clearAll();
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      url = URL.createObjectURL(blob);
      setVideoUrl(url);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      clearAll();
    }
  }, [recordedChunks]);

  const handleShowVid = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      url = URL.createObjectURL(blob);
      // console.log(url);
      setVideoUrl(url);
    }
  }, [recordedChunks]);

  // useEffect(() => {
  //   return () => {
  //     window.URL.revokeObjectURL(url);
  //   };
  // });

  return (
    <>
      <Webcam audio={false} ref={webcamRef} />
      <div>
        {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={handleStartCaptureClick}>
            {recordedChunks.length > 0
              ? "Discard all and start again"
              : "Start Video"}
          </button>
        )}
      </div>
      <div>
        {recordedChunks.length > 0 && (
          <button onClick={handleDownload}>Download</button>
        )}
      </div>

      <div>
        {recordedChunks.length > 0 && (
          <button onClick={handleShowVid}>show Recorded video</button>
        )}
      </div>

      <div>
        {videoUrl !== null && (
          <video controls>
            <source src={videoUrl} type="video/webm" />
          </video>
        )}
      </div>
    </>
  );
};

export default RecordWebCam;
