export default function CustomerLove() {
  const testimonials = [
    { text: "The most decadent vanilla I have ever tasted. It ruins all other ice creams.", author: "Vogue Food" },
    { text: "A masterclass in texture and flavor. BOOM is setting a new global standard.", author: "Culinary Digest" },
    { text: "Absolutely phenomenal. The richness of the chocolate is unmatched.", author: "The Artisan Journal" }
  ];

  return (
    <section className="w-full py-40 bg-background relative z-30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-background to-background"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h3 className="font-inter tracking-[0.2em] text-gold uppercase text-sm mb-6">Acclaim</h3>
          <h2 className="font-playfair text-5xl md:text-7xl">Adored by &quot;The Elite&quot;</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass p-10 rounded-2xl flex flex-col justify-between h-[300px] hover:bg-white/5 transition-colors duration-500">
              <p className="font-playfair text-xl md:text-2xl text-cream leading-relaxed mb-8">&quot;{t.text}&quot;</p>
              <span className="font-inter text-gold uppercase tracking-widest text-sm">— {t.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
