import { Suspense } from 'react';
import AdminPage from './AdminPage';

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading admin page...</div>}
    >
      <AdminPage />
    </Suspense>
  );
}
