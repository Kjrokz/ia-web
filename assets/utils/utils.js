import { useEffect, useState } from "react";

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      console.log("Called", reader);
      baseURL = reader.result;
      //console.log(baseURL);
      resolve(baseURL);
    };
    //console.log(fileInfo);
  });
};

export function captureVideoFrame(video, format, quality) {
  if (typeof video === "string") {
    video = document.getElementById(video);
  }

  format = format || "jpeg";
  quality = quality || 0.92;

  if (!video || (format !== "png" && format !== "jpeg")) {
    return false;
  }

  var canvas = document.createElement("CANVAS");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canvas.getContext("2d").drawImage(video, 0, 0);

  var dataUri = canvas.toDataURL("image/" + format, quality);
  var data = dataUri.split(",")[1];
  var mimeType = dataUri.split(";")[0].slice(5);

  var bytes = window.atob(data);
  var buf = new ArrayBuffer(bytes.length);
  var arr = new Uint8Array(buf);

  for (var i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }

  var blob = new Blob([arr], { type: mimeType });
  return { blob: blob, dataUri: dataUri, format: format };
}

