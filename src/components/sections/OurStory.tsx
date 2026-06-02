import Image from 'next/image';

export default function OurStory() {
  return (
    <section className="w-full bg-background text-cream py-32 px-4 md:px-20 relative z-30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="font-inter tracking-[0.2em] text-gold uppercase text-sm mb-6">Our Legacy</h3>
          <h2 className="font-playfair text-5xl md:text-7xl leading-tight mb-8">
            The Pursuit of <br />Absolute Perfection
          </h2>
          <p className="font-inter font-light text-cream/80 text-lg leading-relaxed max-w-lg mb-8">
            Born from a desire to elevate ice cream into a luxury experience, BOOM was crafted by master artisans who refused to compromise. Every pint is a testament to our dedication to sourcing only the finest global ingredients.
          </p>
          <button className="border-b border-gold text-gold pb-2 font-inter tracking-widest text-sm uppercase hover:text-white hover:border-white transition-colors duration-500">
            Discover Our Story
          </button>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl border border-white/10">
          <Image 
            src="/assets/images/editorial.png" 
            alt="Decadent Boom Ice Cream" 
            fill 
            className="object-cover hover:scale-105 transition-transform duration-[2s]" 
          />
        </div>
      </div>
    </section>
  );
}
