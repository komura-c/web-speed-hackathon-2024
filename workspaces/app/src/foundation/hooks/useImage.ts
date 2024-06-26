import { useAsync } from 'react-use';

import { getImageUrl } from '../../lib/image/getImageUrl';

export const useImage = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  const { value } = useAsync(async () => {
    const dpr = window.devicePixelRatio;
    return getImageUrl({
      format: 'webp',
      height: height * dpr,
      imageId,
      width: width * dpr,
    });
  }, []);

  return value;
};
