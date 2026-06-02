import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 glass">
      <div className="flex-1">
        <button className="text-cream hover:text-gold transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 flex justify-center mt-2">
        <Link href="/" className="relative w-56 h-20 block hover:scale-105 transition-transform duration-500">
          <Image 
            src="/logo.png" 
            alt="BOOM Ice Cream Logo" 
            fill 
            className="object-contain" 
            priority
          />
        </Link>
      </div>

      <div className="flex-1 flex justify-end">
        <button className="text-xs font-inter tracking-[0.2em] uppercase text-cream hover:text-gold transition-colors duration-300">
          Shop Now
        </button>
      </div>
    </nav>
  );
}
