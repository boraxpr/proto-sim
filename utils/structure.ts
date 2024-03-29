export type Simulation = {
  // รหัส
  id: string;
  // ชื่อกรอปรูป
  name: string;
  // ชนิด Matboard
  matboard: boolean;
  // ภาพกรอบรูป
  frameUrl: string;
  // รูป artwork
  artworkUrl: string;
  // ขนาด
  size: string;
};

export type Artwork = {
  image: Blob;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileSizeUnit: string;
};

export interface Croppable {
  crop(
    artwork: Artwork,
    x: number,
    y: number,
    width: number,
    height: number
  ): Artwork;
}

export interface Resizable {
  resize(artwork: Artwork, width: number, height: number): Artwork;
}