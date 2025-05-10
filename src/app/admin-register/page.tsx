import { Suspense } from 'react';
import AdminRegisterPage from './AdminRegisterPage';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">Loading admin register page...</div>
      }
    >
      <AdminRegisterPage />
    </Suspense>
  );
}
