import { Suspense } from 'react';
import SearchClient from './SearchClient';

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading search...</div>}
    >
      <SearchClient />
    </Suspense>
  );
}
