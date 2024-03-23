// import './side-effects';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ClientApp } from '@wsh-2024/app/src/index';

// import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();
  // await preloadImages();

  const root = document.getElementById('root')!;
  if (window.location.pathname.startsWith('/admin')) {
    const { AdminApp } = await import('@wsh-2024/admin/src/index');
    createRoot(root).render(<AdminApp />);
  } else {
    hydrateRoot(
      root,
      <SWRConfig value={{ fallback: {} }}>
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>
      </SWRConfig>,
    );
  }
};

main().catch(console.error);
