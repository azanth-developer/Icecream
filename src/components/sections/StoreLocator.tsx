export default function StoreLocator() {
  return (
    <section className="w-full h-screen bg-background relative flex items-center justify-center overflow-hidden z-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-background to-background"></div>
      
      <div className="relative z-10 text-center px-4">
        <h2 className="font-playfair text-6xl md:text-8xl text-cream mb-8 drop-shadow-2xl">Taste The Luxury</h2>
        <p className="font-inter font-light tracking-[0.2em] text-cream/60 uppercase text-sm mb-12">Available at select premium retailers worldwide.</p>
        
        <button className="px-12 py-5 border border-gold text-gold font-inter tracking-[0.2em] uppercase text-sm hover:bg-gold hover:text-black transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
          Find A Boutique
        </button>
      </div>
    </section>
  );
}
