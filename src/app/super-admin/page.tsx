import { Suspense } from 'react';
import SuperAdminPage from './SuperAdminPage';

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading admin page...</div>}
    >
      <SuperAdminPage />
    </Suspense>
  );
}
