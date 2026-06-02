export default function CustomerLove() {
  const testimonials = [
    { text: "The most decadent vanilla I have ever tasted. It ruins all other ice creams.", author: "Vogue Food" },
    { text: "A masterclass in texture and flavor. BOOM is setting a new global standard.", author: "Culinary Digest" },
    { text: "Absolutely phenomenal. The richness of the chocolate is unmatched.", author: "The Artisan Journal" }
  ];

  return (
    <section className="w-full py-40 bg-background relative overflow-hidden z-30">
      {/* Cinematic dark glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[200px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h3 className="font-inter tracking-[0.2em] text-gold uppercase text-sm mb-6 text-center">Acclaimed</h3>
        <h2 className="font-playfair text-4xl md:text-6xl text-cream text-center mb-24">The Verdict</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass p-10 rounded-2xl flex flex-col justify-between h-[300px] hover:bg-white/5 transition-colors duration-500">
              <p className="font-playfair text-xl md:text-2xl text-cream leading-relaxed italic">"{t.text}"</p>
              <p className="font-inter tracking-widest text-gold text-xs uppercase mt-8">— {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
