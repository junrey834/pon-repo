import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto text-center">
          <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4 block">
            Our Story
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl mx-auto">
            Born from the Streets, Built for Individuals
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
              <p>
                PON was founded in 2020 with a simple belief: clothing should be an extension 
                of your identity, not a uniform. We saw a gap in streetwear—brands were either 
                too loud or too basic, nothing spoke to the person who wanted to stand out 
                through subtlety and quality.
              </p>
              
              <p>
                Every piece we create starts with a question: "Would we wear this every day?" 
                If the answer isn't an immediate yes, we go back to the drawing board. This 
                obsession with getting it right has led us to source premium heavyweight cotton, 
                develop our own signature fits, and work with manufacturers who share our 
                commitment to quality.
              </p>

              <p>
                Our hoodies and jackets aren't designed to follow trends—they're built to 
                outlast them. We believe in buying less but buying better. A single well-made 
                piece that you'll reach for again and again beats a closet full of clothes 
                you'll forget about.
              </p>

              <p className="font-heading text-foreground text-xl font-medium">
                PON isn't just a brand. It's a statement that says: "I know who I am."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32 bg-foreground text-background">
        <div className="container mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="font-heading text-5xl font-bold mb-4">01</div>
              <h3 className="font-heading text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-background/70">
                We never compromise on materials or construction. Every stitch matters.
              </p>
            </div>
            <div className="text-center">
              <div className="font-heading text-5xl font-bold mb-4">02</div>
              <h3 className="font-heading text-xl font-semibold mb-3">Timeless Design</h3>
              <p className="text-background/70">
                Our pieces are designed to be worn for years, not just one season.
              </p>
            </div>
            <div className="text-center">
              <div className="font-heading text-5xl font-bold mb-4">03</div>
              <h3 className="font-heading text-xl font-semibold mb-3">Authentic Expression</h3>
              <p className="text-background/70">
                We create for individuals who know their style and own it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Ready to Wear Your Identity?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Explore our collection and find the pieces that speak to you.
          </p>
          <Button asChild size="lg">
            <Link to="/shop">Shop Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
