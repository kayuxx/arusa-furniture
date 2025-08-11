type PayloadImageDataType = {
  alt: string;
  createdAt: string;
  filename: string;
  filesize: number;
  focalX: number;
  focalY: number;
  height: number;
  id: number;
  mimeType: string;
  thumbnailURL: string | null;
  updatedAt: string;
  url: string;
  width: number;
};

export type WithUpload<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: PayloadImageDataType;
};
