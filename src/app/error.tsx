"use client"
import React, {useEffect} from 'react'
import Link from 'next/link'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import { NavLink, useRouteError } from 'react-router'
interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log("error", error);
    return () => {
      return
    }
  }, [error])

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex-1 flex flex-col items-center justify-center px-4'>
        <div className='flex-1 flex flex-col items-center justify-center px-4'>
          <div className='text-center max-w-md'>
            <h1 className='text-6xl md:text-8xl font-bold text-blue-500 mb-4'>404</h1>
            <h2 className='text-xl md:text-2xl font-semibold text-gray-700 mb-2'>Page Not Found</h2>
            <p className='text-gray-600 mb-6'>The page you're looking for doesn't exist.</p>
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left flex'>
                <p className='text-sm text-red-600 font-mono justify-center'>{error.data || error.statusText || error.message}</p>
              </div>
            )}
            <Link
              href='/'
              className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors'>
              Go to Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
