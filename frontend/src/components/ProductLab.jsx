import React, { useState } from 'react';
import { Droplet, ShieldAlert, Sparkles, Check, X, Info, HelpCircle } from 'lucide-react';

export default function ProductLab() {
  const [selectedProduct, setSelectedProduct] = useState('conventional_synthetic');
  const [simulatedFlow, setSimulatedFlow] = useState('medium');
  const [simulatedSensitivity, setSimulatedSensitivity] = useState(true);

  const products = [
    {
      id: 'conventional_synthetic',
      name: 'Conventional Bleached Synthetic Pad',
      badge: '⚠️ Frequent Cause of Rashes',
      badgeClass: 'badge-emergency',
      material: 'Polyethylene plastic top-sheet, chlorine-bleached wood fluff pulp, super-absorbent polyacrylate polymers (SAP), synthetic deodorants.',
      verdict: 'AVOID IF PRONE TO RASHES, ITCHING, OR PROLONGED PCOS SPOTTING',
      why_not: 'Plastic sheets create an occlusive thermal trap against the vulva, elevating local skin temperature by up to 2°C and trapping moisture. In women with PCOS whose cycles cause prolonged spotting, wearing synthetic plastic pads for 5-8 days leads to contact dermatitis, fungal proliferation, and painful thigh friction.',
      what_it_does: 'Traps sweat and friction against delicate labial mucosa. Chlorine bleaching leaves minute trace organochlorines (dioxins) that can trigger mucosal irritation and disrupt natural flora.',
      pros: ['Cheap & widely available in every corner store', 'High single-instance absorbency'],
      cons: ['Traps heat and creates anaerobic bacterial environment', 'Non-biodegradable (takes 500+ years to decompose)', 'Artificial fragrances cause contact allergies']
    },
    {
      id: 'organic_bamboo_cotton',
      name: '100% Organic Bamboo / Cotton Pad',
      badge: '🌸 Top Choice for Sensitive Skin',
      badgeClass: 'badge-blush',
      material: 'GOTS certified organic cotton topsheet, bamboo pulp core, plant-based cornstarch waterproof backing, zero chemical fragrances.',
      verdict: 'GOLD STANDARD FOR REGULAR DAILY WEAR & RASH PREVENTION',
      why_not: 'N/A — Highly recommended! The only minor trade-off is a slightly higher cost per box compared to subsidized plastic brands.',
      what_it_does: 'Breathes like fine cotton lingerie. Natural cellulose micro-pores allow continuous air circulation, keeping the vulvar skin dry, cool, and free from sweat rash and chafing.',
      pros: ['100% Breathable and hypoallergenic', 'Completely unbleached or elemental chlorine free (ECF)', 'Naturally antibacterial bamboo Kun prevents odor without artificial perfume', 'Gentle on sensitized PCOS skin'],
      cons: ['Requires changing every 4-6 hours on heavy days', 'Slightly higher price point']
    },
    {
      id: 'medical_silicone_cup',
      name: 'Medical-Grade Platinum Silicone Menstrual Cup',
      badge: '⭐ Best for Heavy & Unpredictable PCOS Cycles',
      badgeClass: 'badge-success',
      material: '100% USP Class VI Medical Grade Platinum Cured Silicone. Zero latex, BPA, phthalates, or chemical bleaches.',
      verdict: 'BEST FOR HEAVY FLOW DAYS, SPORTS, AND TRAVEL',
      why_not: 'N/A — Exceptional choice! May require 1-2 cycles of practice to get comfortable with folding and inserting.',
      what_it_does: 'Collects menstrual fluid rather than absorbing it. This is vital because pads absorb natural vaginal protective moisture along with blood, elevating vaginal pH. Cups preserve the optimal acidic pH (3.8-4.5) and protect your lactobacilli barrier.',
      pros: ['Holds up to 30ml (3x to 5x more than a heavy pad)', 'Safe for up to 12 hours continuous wear', 'Reusable for 5 to 10 years (zero waste, saves thousands of rupees)', 'No skin friction or moisture traps whatsoever'],
      cons: ['Mild learning curve for insertion/removal', 'Requires boiling in clean water between cycles']
    },
    {
      id: 'reusable_period_underwear',
      name: 'Organic Multi-Layer Period Underwear',
      badge: '🌙 Supreme Sleep & Spotting Companion',
      badgeClass: 'badge-blush',
      material: 'Organic modal/bamboo inner lining, antimicrobial absorbent bamboo-fleece middle layer, breathable TPU leakproof barrier.',
      verdict: 'PERFECT FOR SLEEP, LIGHT DAYS, AND UNPREDICTABLE SPOTTING',
      why_not: 'Not meant for torrential heavy flooding days as a standalone without backups.',
      what_it_does: 'Eliminates all pad movement, rustling, and wing friction during sleep or workouts. Absorbs spotting smoothly without drying vulvar tissue.',
      pros: ['Feels just like luxurious, soft lingerie', 'Zero wing rubbing or thigh chafing', 'Washable and reusable for 2-3 years', 'Zero bulk or plastic crinkling noise'],
      cons: ['Needs cold machine rinse and air drying', 'Higher upfront investment per pair']
    }
  ];

  const current = products.find(p => p.id === selectedProduct) || products[0];

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '2.5rem' }}>
        <span className="badge-tag badge-blush" style={{ marginBottom: '0.6rem' }}>
          Stage 6 of 6: Menstrual Product Science Lab
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: 'var(--crimson-deep)', lineHeight: 1.2, marginBottom: '0.6rem' }}>
          Why This Pad? Why Not That Pad?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '750px', margin: '0 auto' }}>
          Demystifying menstrual hygiene down to the polymer. Learn what synthetic plastics do to delicate vulvar skin, why rashes happen, and how to choose the right protection for your flow and sensitivity.
        </p>
      </div>

      {/* Product Selector Ribbon */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {products.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedProduct(p.id)}
            style={{
              padding: '1.1rem',
              borderRadius: '16px',
              border: selectedProduct === p.id ? '2.5px solid var(--crimson-rich)' : '1px solid var(--border-glass)',
              background: selectedProduct === p.id ? '#FFF0F3' : '#fff',
              textAlign: 'left',
              cursor: 'pointer',
              boxShadow: selectedProduct === p.id ? '0 6px 18px rgba(164, 19, 60, 0.18)' : '0 2px 8px rgba(0,0,0,0.03)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--crimson-deep)', marginBottom: '0.4rem' }}>
              {p.name}
            </div>
            <span className={`badge-tag ${p.badgeClass}`} style={{ fontSize: '0.72rem' }}>
              {p.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Detailed Product Deep Dive */}
      <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--crimson-deep)' }}>
              {current.name}
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-light)', fontWeight: 600 }}>
              Material Breakdown & Biocompatibility Assessment
            </span>
          </div>
          <div style={{ background: '#FFF8F9', padding: '0.6rem 1.2rem', borderRadius: '12px', border: '1px solid var(--border-glass)', fontSize: '0.86rem', fontWeight: 700, color: 'var(--crimson-rich)' }}>
            {current.verdict}
          </div>
        </div>

        {/* 2-Column Science Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Chemical & Mechanical Action */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--crimson-deep)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                🧪 Exact Ingredients & Polymers:
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, background: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                {current.material}
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--crimson-deep)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                ⚡ What It Does to Your Vulva & Micro-Ecology:
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, background: '#FFF0F3', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--ruby-light)' }}>
                {current.what_it_does}
              </p>
            </div>
          </div>

          {/* Why Not & Pros/Cons */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--crimson-rich)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                ❓ Why / Why Not Use This?
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, background: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                {current.why_not}
              </p>
            </div>

            {/* Pros and Cons bullets */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <div style={{ background: '#E8F5E9', padding: '0.9rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1B5E20', marginBottom: '0.4rem' }}>
                  ✓ Key Advantages:
                </div>
                <ul style={{ paddingLeft: '1rem', fontSize: '0.78rem', color: '#2E7D32', lineHeight: 1.5 }}>
                  {current.pros.map((pr, idx) => (
                    <li key={idx} style={{ marginBottom: '0.2rem' }}>{pr}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#FFEBEE', padding: '0.9rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C62828', marginBottom: '0.4rem' }}>
                  ✕ Critical Drawbacks:
                </div>
                <ul style={{ paddingLeft: '1rem', fontSize: '0.78rem', color: '#B71C1C', lineHeight: 1.5 }}>
                  {current.cons.map((cn, idx) => (
                    <li key={idx} style={{ marginBottom: '0.2rem' }}>{cn}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Golden Rules */}
        <div style={{ background: '#FFFDF5', border: '1px solid #FEF08A', borderRadius: '16px', padding: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <Info size={18} color="#B45309" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#92400E' }}>
              3 Non-Negotiable Gynecological Hygiene Commandments:
            </h4>
          </div>
          <ol style={{ paddingLeft: '1.4rem', fontSize: '0.86rem', color: '#78350F', lineHeight: 1.7 }}>
            <li><strong>Maximum 6-Hour Pad Limit:</strong> Regardless of how light your spotting is, replace pads every 4 to 6 hours to prevent blood oxidation and bacterial colonies.</li>
            <li><strong>Zero Artificial Perfumes:</strong> Never buy 'deodorized' or 'fragranced' pads; synthetic fragrance fixatives are top culprits for contact dermatitis and recurrent yeast flare-ups.</li>
            <li><strong>Protect Your Acidic Shield:</strong> Never wash internally (douching) or use scented feminine washes. External warm water preserves your protective lactobacilli.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
