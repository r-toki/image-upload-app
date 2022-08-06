import { useEffect, useState } from 'react';

export const useObjectUrl = (object?: File | Blob | MediaSource) => {
  const [objectURL, setObjectUrl] = useState<string>();

  useEffect(() => {
    if (!object) setObjectUrl(undefined);
    else setObjectUrl(URL.createObjectURL(object));
    return () => {
      if (objectURL) URL.revokeObjectURL(objectURL);
    };
  }, [object]);

  return {
    objectURL,
  };
};
