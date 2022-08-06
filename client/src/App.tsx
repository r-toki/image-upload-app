import imageCompression from 'browser-image-compression';
import { useEffect, useState } from 'react';

import { useFileInput, useObjectUrl } from './hooks';

export const App = () => {
  const fileInput = useFileInput();

  const onCompress = async () => {
    if (!fileInput.file) return;
    const compressedFile = await imageCompression(fileInput.file, { maxSizeMB: 1 });
    fileInput.setFile(compressedFile);
  };

  return (
    <div
      style={{
        width: '720px',
        padding: '20px 12px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={fileInput.onClick}>選択</button>
        <button onClick={() => fileInput.setFile(undefined)}>破棄</button>
        {fileInput.file && <button onClick={onCompress}>圧縮</button>}
      </div>

      <input
        ref={fileInput.ref}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={fileInput.onChange}
      />

      {fileInput.file && <FileViewer file={fileInput.file} />}
    </div>
  );
};

const FileViewer = ({ file }: { file: File }) => {
  const { objectURL } = useObjectUrl(file);
  const [encoded, setEncoded] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    encodeFileToBase64(file).then((res) => setEncoded(res));
  }, [file]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '12px' }}>
      <>
        <div>{`画像サイズ: ${(file.size / 1024 / 1024).toFixed(3)}MB`}</div>
        {objectURL && (
          <img src={objectURL} width="400" height="400" style={{ objectFit: 'cover' }} />
        )}
      </>

      {encoded && (
        <>
          <div>
            {`Base64: ${encoded
              .toString()
              .length.toString()
              .split('')
              .reduce((pre, cur, idx) => (idx % 3 ? cur + pre : cur + ',' + pre))}文字`}
          </div>
          <img src={encoded.toString()} width="400" height="400" style={{ objectFit: 'cover' }} />
        </>
      )}
    </div>
  );
};

const encodeFileToBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
