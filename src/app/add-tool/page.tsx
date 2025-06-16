import { Suspense } from 'react';
import AddTool from './AddTool';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#121212] text-center text-white">
          Loading add tool...
        </div>
      }
    >
      <AddTool />
    </Suspense>
  );
}
