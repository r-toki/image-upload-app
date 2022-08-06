import { useFileInput, useObjectUrl } from './hooks';

export const App = () => {
  const fileInput = useFileInput();
  const { objectURL } = useObjectUrl(fileInput.file);

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
        <button onClick={fileInput.reset}>破棄</button>
      </div>

      <input
        ref={fileInput.ref}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={fileInput.onChange}
      />
      {objectURL && <img src={objectURL} />}
    </div>
  );
};
