import { Suspense } from 'react'
import Client from '../../components/Client'

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>
}) {
  return (
    <Suspense fallback={<>...</>}>
      <Client searchParams={searchParams} />
    </Suspense>
  )
}