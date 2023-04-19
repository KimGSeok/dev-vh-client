export const onClickBlobDownload = async (arrayBuffer: [], fileName: string, extension: string, type: string) => {

  console.log(arrayBuffer);

  const blob = await new Blob([Uint8Array.from(arrayBuffer)], { type });

  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', downloadUrl);
  link.setAttribute('download', `${fileName}.${extension}`);

  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);

  window.URL.revokeObjectURL(downloadUrl);
}