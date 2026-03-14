"use client"

export function Product3D({ title = "Premium Ayurvedic Oil", color = "#5cb85c" }) {
  return (
    <div className="w-full h-80 relative rounded-xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center">
      {/* Gradient background animation */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
          animation: "pulse 3s ease-in-out infinite",
        }}
      />

      {/* Bottle SVG Illustration */}
      <div className="relative z-10 w-32 h-56 flex items-center justify-center">
        <svg 
          viewBox="0 0 100 200" 
          className="w-full h-full drop-shadow-lg"
          style={{
            animation: "bounce 3s ease-in-out infinite",
          }}
        >
          {/* Bottle cap */}
          <rect x="35" y="10" width="30" height="15" rx="2" fill="#8B7355" />
          
          {/* Bottle neck */}
          <path d="M 40 25 L 38 40 L 62 40 L 60 25 Z" fill={color} />
          
          {/* Bottle body */}
          <ellipse cx="50" cy="50" rx="22" ry="8" fill={color} />
          <path d="M 28 50 Q 25 100 30 130 Q 35 150 50 160 Q 65 150 70 130 Q 75 100 72 50 Z" fill={color} />
          
          {/* Bottle shine */}
          <ellipse cx="35" cy="80" rx="8" ry="25" fill="white" opacity="0.15" />
          
          {/* Bottom of bottle */}
          <ellipse cx="50" cy="160" rx="20" ry="8" fill={color} opacity="0.8" />
        </svg>
      </div>

      {/* Logo Badge */}
      <div className="absolute top-2 right-2 bg-white/80 rounded-full w-12 h-12 flex items-center justify-center shadow-md z-20 pointer-events-none">
        <div className="relative w-8 h-8">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#5cb85c" opacity="0.1" />
            <path d="M 50 20 Q 60 40 50 60 Q 40 40 50 20" fill="#5cb85c" />
            <circle cx="50" cy="50" r="8" fill="#4ca04c" />
          </svg>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/50 via-primary/20 to-transparent text-white rounded-b-xl z-10 pointer-events-none">
        <p className="text-sm font-bold truncate">{title}</p>
        <p className="text-xs opacity-90">Premium Product</p>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export function Product3DGrid() {
  const products = [
    { title: "Ashwagandha Wellness", color: "#8B6F47" },
    { title: "Brahmi Brain Oil", color: "#6B5B4F" },
    { title: "Turmeric Immunity", color: "#C4943E" },
    { title: "Neem Herbal Extract", color: "#5cb85c" },
    { title: "Triphala Balance", color: "#7B6D5F" },
    { title: "Shilajit Pure", color: "#4A4A4A" },
    { title: "Arjun Heart Care", color: "#A0522D" },
    { title: "Brahmi Capsules", color: "#556B2F" },
  ]

  return (
    <div className="space-y-8">
      {/* Featured Product Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-foreground">Arogyabio Premium Collection</h3>
            <p className="text-muted-foreground">Experience our flagship products in stunning visual format. Each product is crafted with authentic Ayurvedic wisdom and modern quality standards.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                100% Natural Ingredients
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Ancient Ayurvedic Formulas
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Scientifically Tested
              </li>
            </ul>
          </div>
          <div className="h-80 rounded-xl overflow-hidden">
            <Product3D title="Ashwagandha Premium" color="#8B6F47" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Explore Our Products</h3>
        <p className="text-muted-foreground mb-8">Browse our complete collection of premium Ayurvedic wellness products. Each product features beautiful visuals with smooth animations.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/30">
                <Product3D title={product.title} color={product.color} />
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {product.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Features */}
      <div className="bg-secondary/30 rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-4">Product Collection Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="font-medium text-sm text-foreground">Beautiful Visuals</p>
            <p className="text-xs text-muted-foreground">View each product with smooth animations and engaging graphics</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-sm text-foreground">Authentic Ingredients</p>
            <p className="text-xs text-muted-foreground">All products contain pure, natural Ayurvedic ingredients sourced responsibly</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-sm text-foreground">Health Benefits</p>
            <p className="text-xs text-muted-foreground">Each product targets specific wellness goals backed by traditional Ayurvedic knowledge</p>
          </div>
        </div>
      </div>
    </div>
  )
}
