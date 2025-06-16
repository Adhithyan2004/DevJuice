import { Suspense } from 'react';
import SuperAdminPage from './SuperAdminPage';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#121212] text-center text-white">
          Loading admin page...
        </div>
      }
    >
      <SuperAdminPage />
    </Suspense>
  );
}
