import { Suspense } from 'react';
import ToolsPage from './ToolsPage';

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading admin page...</div>}
    >
      <ToolsPage />
    </Suspense>
  );
}
