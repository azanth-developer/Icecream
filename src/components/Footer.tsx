import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-white/10 pt-20 pb-10 px-4 z-40 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="relative w-72 h-32 mb-12 opacity-90 hover:opacity-100 transition-opacity duration-500">
          <Image 
            src="/logo.png" 
            alt="BOOM Ice Cream" 
            fill 
            className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {['Our Story', 'Flavors', 'Ingredients', 'Find Us', 'Contact'].map((link) => (
            <a key={link} href="#" className="font-inter tracking-[0.2em] text-xs uppercase text-cream/70 hover:text-gold transition-colors duration-300">
              {link}
            </a>
          ))}
        </div>
        
        <div className="text-cream/40 font-inter text-xs tracking-widest uppercase">
          &copy; {new Date().getFullYear()} BOOM Ice Cream. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
