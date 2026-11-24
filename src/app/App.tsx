import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryProvider } from './QueryProvider'
import { NotFoundPage } from './NotFoundPage'
import { HomePage } from '@/features/home/HomePage'

// Routing is React Router in declarative mode; data loading stays in TanStack Query (ADR-0015).
export function App() {
  return (
    <QueryProvider>
      {/* Translation namespaces load lazily; Suspense waits for them (ADR-0010, ADR-0015). */}
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryProvider>
  )
}
