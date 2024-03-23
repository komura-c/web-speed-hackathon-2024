import { createRoot } from "react-dom/client";

import AdminApp from "../../admin/src";

const main = async () => {
  createRoot(document.getElementById('root')!).render(<AdminApp />);
};

main().catch(console.error);