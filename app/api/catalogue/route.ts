import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    // Fetch products
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .order("category", { ascending: true });

    // Fetch health kits
    const { data: kits } = await supabase
      .from("health_kits")
      .select("*")
      .eq("is_active", true)
      .order("category", { ascending: true });

    // Generate HTML for PDF
    const htmlContent = generateCatalogueHTML(products || [], kits || []);

    // Return HTML that can be converted to PDF by client-side
    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": 'attachment; filename="Arogyabio-Catalogue.html"',
      },
    });
  } catch (error) {
    console.error("[v0] Error generating catalogue:", error);
    return NextResponse.json(
      { error: "Failed to generate catalogue" },
      { status: 500 }
    );
  }
}

function generateCatalogueHTML(products: any[], kits: any[]) {
  const currentDate = new Date().toLocaleDateString();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Arogyabio - Product Catalogue</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          background: #f5f5f5;
        }
        
        .page {
          width: 8.5in;
          height: 11in;
          margin: 0.5in auto;
          padding: 0.75in;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          page-break-after: always;
        }
        
        .cover-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
          color: white;
          min-height: 10in;
        }
        
        .logo-section {
          margin-bottom: 2rem;
        }
        
        .logo {
          width: 200px;
          height: 200px;
          margin: 0 auto 1rem;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: bold;
          color: #2d5016;
        }
        
        .cover-page h1 {
          font-size: 48px;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        
        .cover-page p {
          font-size: 20px;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }
        
        .cover-date {
          font-size: 14px;
          opacity: 0.8;
          margin-top: 2rem;
        }
        
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 3px solid #2d5016;
        }
        
        .header-logo {
          width: 60px;
          height: 60px;
          background: #2d5016;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 24px;
          margin-right: 1rem;
        }
        
        .header-info h2 {
          font-size: 24px;
          color: #2d5016;
          margin: 0;
        }
        
        .header-info p {
          font-size: 12px;
          color: #666;
          margin: 0;
        }
        
        .section-title {
          font-size: 28px;
          color: #2d5016;
          margin: 1.5rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #d4af37;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1rem 0;
        }
        
        .product-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 1rem;
          background: #f9f9f9;
          page-break-inside: avoid;
        }
        
        .product-image {
          width: 100%;
          height: 150px;
          background: #e8f5e9;
          border-radius: 6px;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #2d5016;
          text-align: center;
          overflow: hidden;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-name {
          font-size: 14px;
          font-weight: 700;
          color: #2d5016;
          margin-bottom: 0.25rem;
        }
        
        .product-category {
          font-size: 11px;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.3rem;
        }
        
        .product-price {
          font-size: 16px;
          color: #2d5016;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        
        .product-description {
          font-size: 11px;
          color: #666;
          margin-bottom: 0.3rem;
          line-height: 1.4;
        }
        
        .product-details {
          font-size: 10px;
          color: #999;
          margin-top: 0.3rem;
        }
        
        .detail-item {
          margin-bottom: 0.2rem;
        }
        
        .detail-label {
          font-weight: 700;
          color: #2d5016;
        }
        
        .benefits-list {
          font-size: 10px;
          color: #666;
          margin-top: 0.3rem;
          list-style: none;
        }
        
        .benefits-list li {
          margin-left: 1rem;
          text-indent: -0.5rem;
        }
        
        .benefits-list li:before {
          content: "•";
          color: #2d5016;
          margin-right: 0.3rem;
        }
        
        .kit-card {
          border: 2px solid #d4af37;
          border-radius: 8px;
          padding: 1.2rem;
          background: linear-gradient(135deg, #f0f7e8 0%, #fffef9 100%);
          margin-bottom: 1.5rem;
          page-break-inside: avoid;
        }
        
        .kit-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.8rem;
        }
        
        .kit-image {
          width: 120px;
          height: 120px;
          background: #e8f5e9;
          border-radius: 6px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #2d5016;
        }
        
        .kit-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
        }
        
        .kit-info {
          flex: 1;
        }
        
        .kit-name {
          font-size: 16px;
          font-weight: 700;
          color: #2d5016;
          margin-bottom: 0.3rem;
        }
        
        .kit-category {
          font-size: 12px;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.3rem;
        }
        
        .kit-price {
          font-size: 18px;
          color: #2d5016;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        
        .kit-description {
          font-size: 12px;
          color: #666;
          line-height: 1.4;
        }
        
        .kit-details {
          margin-top: 0.8rem;
          font-size: 11px;
          color: #666;
        }
        
        .kit-benefits {
          margin-top: 0.5rem;
        }
        
        .kit-benefits-title {
          font-weight: 700;
          color: #2d5016;
          margin-bottom: 0.3rem;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        
        .benefit-item {
          font-size: 10px;
          color: #666;
          padding: 0.3rem;
          background: white;
          border-radius: 4px;
          padding-left: 0.5rem;
        }
        
        .benefit-item:before {
          content: "✓";
          color: #2d5016;
          margin-right: 0.3rem;
          font-weight: 700;
        }
        
        .toc-page {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        
        .toc-title {
          font-size: 32px;
          color: #2d5016;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .toc-section {
          margin-bottom: 2rem;
        }
        
        .toc-section-title {
          font-size: 18px;
          color: #2d5016;
          font-weight: 700;
          margin-bottom: 1rem;
          border-bottom: 1px solid #d4af37;
          padding-bottom: 0.5rem;
        }
        
        .toc-item {
          font-size: 13px;
          color: #666;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          text-indent: -0.5rem;
        }
        
        .footer {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e0e0e0;
          font-size: 10px;
          color: #999;
          text-align: center;
        }
        
        .page-number {
          text-align: center;
          font-size: 10px;
          color: #999;
          margin-top: 1rem;
        }
        
        @media print {
          body {
            background: white;
          }
          .page {
            margin: 0;
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <!-- Cover Page -->
      <div class="page cover-page">
        <div class="logo-section">
          <div class="logo">A</div>
          <h1>AROGYABIO</h1>
          <p>Authentic Ayurvedic Wellness Solutions</p>
          <p style="font-size: 14px; margin-top: 1rem;">Complete Natural Health Programme</p>
        </div>
        <div class="cover-date">
          <p>Product Catalogue</p>
          <p>Valid from ${currentDate}</p>
        </div>
      </div>
      
      <!-- Table of Contents -->
      <div class="page toc-page">
        <div class="header">
          <div class="header-logo">A</div>
          <div class="header-info">
            <h2>AROGYABIO</h2>
            <p>Product Catalogue & Wellness Guide</p>
          </div>
        </div>
        
        <div class="toc-title">Contents</div>
        
        <div class="toc-section">
          <div class="toc-section-title">Complete Health Kits</div>
          ${kits
            .slice(0, 10)
            .map(
              (kit, idx) =>
                `<div class="toc-item">${idx + 1}. ${kit.name} - ₹${Number(kit.price).toLocaleString("en-IN")}</div>`
            )
            .join("")}
        </div>
        
        <div class="toc-section">
          <div class="toc-section-title">Products by Category</div>
          ${Array.from(
            new Set(
              (products || []).map((p: any) => p.category).filter(Boolean)
            )
          )
            .map(
              (cat) =>
                `<div class="toc-item">• ${cat}</div>`
            )
            .join("")}
        </div>
      </div>
      
      <!-- Health Kits Section -->
      <div class="page">
        <div class="header">
          <div class="header-logo">A</div>
          <div class="header-info">
            <h2>AROGYABIO</h2>
            <p>Complete Health Kits</p>
          </div>
        </div>
        
        <div class="section-title">Complete Health Kits</div>
        
        ${kits
          .slice(0, 15)
          .map(
            (kit) => `
          <div class="kit-card">
            <div class="kit-header">
              <div class="kit-image">
                ${
                  kit.image_url
                    ? `<img src="${kit.image_url}" alt="${kit.name}" />`
                    : "📦"
                }
              </div>
              <div class="kit-info">
                <div class="kit-category">${kit.category || "Wellness"}</div>
                <div class="kit-name">${kit.name}</div>
                <div class="kit-price">₹${Number(kit.price).toLocaleString("en-IN")}</div>
                <div class="kit-description">${kit.description || kit.long_description}</div>
              </div>
            </div>
            
            ${
              kit.long_description
                ? `<div class="kit-details">
                    <strong>About:</strong> ${kit.long_description}
                  </div>`
                : ""
            }
            
            ${
              kit.benefits && kit.benefits.length > 0
                ? `<div class="kit-benefits">
                    <div class="kit-benefits-title">Key Benefits:</div>
                    <div class="benefits-grid">
                      ${kit.benefits
                        .slice(0, 6)
                        .map((b: string) => `<div class="benefit-item">${b}</div>`)
                        .join("")}
                    </div>
                  </div>`
                : ""
            }
            
            ${
              kit.included_products && kit.included_products.length > 0
                ? `<div class="kit-details" style="margin-top: 0.5rem;">
                    <strong>Includes:</strong> ${kit.included_products.slice(0, 5).join(", ")}${kit.included_products.length > 5 ? " & more" : ""}
                  </div>`
                : ""
            }
          </div>
        `
          )
          .join("")}
      </div>
      
      <!-- Products Section -->
      ${
        products && products.length > 0
          ? Array.from(
              new Set(
                (products || []).map((p: any) => p.category).filter(Boolean)
              )
            )
              .slice(0, 8)
              .map(
                (category, pageIdx) => `
          <div class="page">
            <div class="header">
              <div class="header-logo">A</div>
              <div class="header-info">
                <h2>${category}</h2>
                <p>Premium Ayurvedic Products</p>
              </div>
            </div>
            
            <div class="section-title">${category}</div>
            
            <div class="products-grid">
              ${(products || [])
                .filter((p: any) => p.category === category)
                .slice(0, 6)
                .map(
                  (product: any) => `
                <div class="product-card">
                  <div class="product-image">
                    ${
                      product.image_url
                        ? `<img src="${product.image_url}" alt="${product.name}" />`
                        : "🌿"
                    }
                  </div>
                  
                  <div class="product-category">${product.category}</div>
                  <div class="product-name">${product.name}</div>
                  <div class="product-price">₹${Number(product.price).toLocaleString("en-IN")}</div>
                  
                  ${product.description ? `<div class="product-description">${product.description}</div>` : ""}
                  
                  <div class="product-details">
                    ${product.size ? `<div class="detail-item"><span class="detail-label">Size:</span> ${product.size}</div>` : ""}
                    ${product.dosage ? `<div class="detail-item"><span class="detail-label">Dosage:</span> ${product.dosage}</div>` : ""}
                    ${product.certification ? `<div class="detail-item"><span class="detail-label">Cert:</span> ${product.certification}</div>` : ""}
                  </div>
                  
                  ${
                    product.benefits && product.benefits.length > 0
                      ? `<ul class="benefits-list">
                          ${product.benefits
                            .slice(0, 3)
                            .map((b: string) => `<li>${b}</li>`)
                            .join("")}
                        </ul>`
                      : ""
                  }
                  
                  ${product.usage ? `<div class="product-details" style="margin-top: 0.3rem;"><span class="detail-label">Usage:</span> ${product.usage}</div>` : ""}
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
              )
              .join("")
          : ""
      }
      
      <!-- Back Cover -->
      <div class="page cover-page" style="background: linear-gradient(135deg, #4a7c2c 0%, #2d5016 100%);">
        <div style="text-align: center;">
          <h2 style="font-size: 36px; margin-bottom: 2rem;">Thank You</h2>
          <p style="font-size: 18px; margin-bottom: 1rem;">For Choosing Arogyabio</p>
          <p style="font-size: 14px; opacity: 0.8; margin-bottom: 2rem;">Authentic Ayurvedic Wellness Solutions</p>
          
          <div style="background: white; color: #2d5016; padding: 1.5rem; border-radius: 8px; margin: 2rem auto; max-width: 80%;">
            <p style="font-size: 14px; margin-bottom: 1rem;"><strong>For inquiries and orders:</strong></p>
            <p style="font-size: 12px; margin-bottom: 0.5rem;">📧 Email: info@arogyabio.com</p>
            <p style="font-size: 12px; margin-bottom: 0.5rem;">🌐 Website: www.arogyabio.com</p>
            <p style="font-size: 12px;">📱 Contact: Available for consultation</p>
          </div>
          
          <p style="font-size: 11px; opacity: 0.7; margin-top: 2rem;">100% Natural • Ayurvedic • Premium Quality</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
