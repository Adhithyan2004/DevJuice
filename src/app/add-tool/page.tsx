import { Suspense } from 'react';
import AddTool from './AddTool';

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading add tool...</div>}
    >
      <AddTool />
    </Suspense>
  );
}
