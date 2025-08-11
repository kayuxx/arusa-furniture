"use server";

export async function getVercelBlob(blobpath: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN!;
  const projectId = token.match(/(?<=vercel_blob_rw_)([^_]+)/g);
  const url = new URL(
    blobpath,
    `https://${projectId}.${process.env.VERCEL_BLOB_BASE}`,
  ).href;
  console.log({ pathname: blobpath, token, projectId, url });
  return url;
}
