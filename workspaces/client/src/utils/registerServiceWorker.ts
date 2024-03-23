export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }
  const worker = navigator.serviceWorker;
  const registrations = await worker.getRegistrations();
  if (registrations?.length) {
    for (const registration of registrations) {
      registration.unregister();
    }
  }
  // return await worker.register('/serviceworker.global.js', { updateViaCache: 'none' })
  return
}
