import path from 'path-browserify';

export async function preloadImages() {
  if (process.env['PATH_LIST'] == null) {
    return;
  }

  const imagePathList: string[] = process.env['PATH_LIST'].split(',').filter((imagePath) => {
    const extension = path.parse(imagePath).ext.toLowerCase();
    return ['.bmp', '.jpg', '.jpeg', '.gif', '.png', '.webp', '.avif'].includes(extension);
  });

  const prefetch = Promise.all(
    imagePathList.map((imagePath) => {
      const link = document.createElement('link');
      Object.assign(link, {
        as: 'image',
        crossOrigin: 'anonymous',
        fetchPriority: 'high',
        href: imagePath,
        rel: 'preload',
      });
      document.head.appendChild(link);
    }),
  );
  return prefetch;
}
