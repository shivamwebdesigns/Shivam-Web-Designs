import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-14 sm:py-20 lg:py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          HTTP 404 // NOT FOUND
        </div>
        <h1 className="text-5xl sm:text-7xl font-light tracking-tight text-white">
          Page Does Not Exist
        </h1>
        <p className="text-sm text-neutral-400 font-light leading-relaxed">
          The requested coordinate could not be resolved on our edge servers. It may have been relocated or archived.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-800 text-white hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
