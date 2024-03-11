"use client";
import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { Size } from "react-easy-crop";
import { relative } from "path";
export default function CropperComponent() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [croppedImage, setCroppedImage] = useState(null);

  const [cropSize, setCropSize] = useState();
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        "https://rukminim2.flixcart.com/image/850/1000/l1mh7rk0/poster/0/d/h/medium-shinchan-cartoon-wall-poster-decorative-poster-for-original-imagd5f6m5zwvhhy.jpeg?q=20&crop=false",
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex-row space-x-5">
        <button onClick={() => setCropSize({ width: 100, height: 100 })}>
          STYLE1
        </button>
        <button onClick={() => setCropSize({ width: 150, height: 300 })}>
          STYLE2
        </button>
        <button>1</button>
        <button onClick={() => setCropSize({ width: 250, height: 250 })}>
          RESET
        </button>
        <button onClick={showCroppedImage}>Show Result</button>
      </div>

      <div className="relative" style={{ width: 300, height: 300 }}>
        <Cropper
          image="https://rukminim2.flixcart.com/image/850/1000/l1mh7rk0/poster/0/d/h/medium-shinchan-cartoon-wall-poster-decorative-poster-for-original-imagd5f6m5zwvhhy.jpeg?q=20&crop=false"
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          cropSize={cropSize}
          style={{
            containerStyle: { zIndex: 50 },
            cropAreaStyle: { zIndex: 50 },
            mediaStyle: { zIndex: 50 },
          }}
        />
      </div>
      <div className="flex flex-col w-1/2 items-center mt-20">
        {croppedImage && (
          <img src={croppedImage} alt="Cropped" width={200} height={200} />
        )}
      </div>
    </div>
  );
}
