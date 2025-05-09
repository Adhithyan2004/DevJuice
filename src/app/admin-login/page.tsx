import { Suspense } from 'react';
import AdminLogin from './AdminLogin';

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading admin page...</div>}
    >
      <AdminLogin />
    </Suspense>
  );
}
