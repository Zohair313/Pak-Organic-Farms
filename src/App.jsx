import React, { useState, useEffect } from 'react';
import enData from './data/en.json';
import urData from './data/ur.json';
import {
  Phone,
  MessageCircle,
  Clock,
  Star,
  Check,
  ChevronDown,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  Truck,
  FileText,
  Menu,
  X
} from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Sign up form state for WhatsApp dispatch
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    product: '',
    frequency: ''
  });

  const content = lang === 'en' ? enData : urData;
  const isRtl = lang === 'ur';

  // Toggle language and update HTML document attributes
  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ur' : 'en';
    setLang(nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = content.lang;
    document.documentElement.dir = content.dir;
    document.title = content.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', content.meta.description);
    }
  }, [lang, content]);

  // Set default form options once loaded
  useEffect(() => {
    if (content.contact.form.productOptions.length > 0 && !formData.product) {
      setFormData(prev => ({
        ...prev,
        product: content.contact.form.productOptions[0],
        frequency: content.contact.form.frequencies[0]
      }));
    }
  }, [content, formData.product]);

  // Handle direct WhatsApp plan pre-fill
  const getWhatsAppLink = (customText) => {
    const encoded = encodeURIComponent(customText || (isRtl 
      ? 'السلام علیکم پاک آرگینک فارمز، مجھے دودھ کی سبسکرپشن کے بارے میں معلومات چاہیے۔'
      : 'Hello Pak Organic Farms, I would like to inquire about fresh milk delivery in Islamabad.'));
    return `https://wa.me/923210510111?text=${encoded}`;
  };

  // Form submission directly to WhatsApp
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const orderDetails = isRtl
      ? `السلام علیکم پاک آرگینک فارمز،\nمیں دودھ کی سبسکرپشن شروع کرنا چاہتا ہوں۔\n\nنام: ${formData.name || 'غیر درج شدہ'}\nفون نمبر: ${formData.phone || 'غیر درج شدہ'}\nپتہ: ${formData.address || 'غیر درج شدہ'}\nپروڈکٹ: ${formData.product}\nڈیلیوری روٹین: ${formData.frequency}`
      : `Hello Pak Organic Farms,\nI would like to start a milk subscription with the following details:\n\nName: ${formData.name || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\nAddress: ${formData.address || 'Not provided'}\nProduct: ${formData.product}\nDelivery Frequency: ${formData.frequency}`;
    
    window.open(`https://wa.me/923210510111?text=${encodeURIComponent(orderDetails)}`, '_blank');
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className={`min-h-screen bg-[#FBF8F1] text-[#1D2430] ${isRtl ? 'font-body' : 'font-body'}`}>
      
      {/* 1. TOP BAR */}
      <section className="bg-[#1F3A5F] text-[#FBF8F1] border-b border-[#2C4F7C] text-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <a
              href="tel:+923210510111"
              className="inline-flex items-center gap-2 hover:text-[#C9962B] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9962B]"
              aria-label="Call Pak Organic Farms customer line"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9962B]" />
              <span className="font-medium tracking-wide" dir="ltr">{content.topBar.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#C9962B] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9962B]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#C9962B]" />
              <span>{content.topBar.whatsappText}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              type="button"
              className="px-3 py-1 text-xs font-semibold rounded-[4px] border border-[#3E6596] bg-[#162A45] hover:bg-[#C9962B] hover:text-[#1F3A5F] hover:border-[#C9962B] transition-colors cursor-pointer"
              aria-label={`Switch to ${content.topBar.switchLang}`}
            >
              {content.topBar.switchLang}
            </button>
          </div>
        </div>
      </section>

      {/* 2. STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#FBF8F1]/95 backdrop-blur-sm border-b border-[#DFD7C5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] p-1 rounded-[4px]">
            <div className="w-10 h-10 rounded-[4px] bg-[#1F3A5F] flex items-center justify-center border border-[#162A45] shrink-0 text-[#C9962B] font-heading font-bold text-xl">
              P
            </div>
            <div>
              <span className="block font-heading font-bold text-lg sm:text-xl text-[#1F3A5F] leading-tight tracking-tight">
                Pak Organic Farms
              </span>
              <span className="block text-xs text-[#5A6578] font-medium leading-none mt-0.5">
                {isRtl ? 'اسلام آباد اور راولپنڈی' : 'Islamabad & Rawalpindi'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#products" className="text-sm font-medium text-[#1D2430] hover:text-[#1F3A5F] hover:underline underline-offset-4 decoration-[#C9962B] decoration-2 transition-colors">
              {content.nav.products}
            </a>
            <a href="#plans" className="text-sm font-medium text-[#1D2430] hover:text-[#1F3A5F] hover:underline underline-offset-4 decoration-[#C9962B] decoration-2 transition-colors">
              {content.nav.plans}
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-[#1D2430] hover:text-[#1F3A5F] hover:underline underline-offset-4 decoration-[#C9962B] decoration-2 transition-colors">
              {content.nav.howItWorks}
            </a>
            <a href="#our-farm" className="text-sm font-medium text-[#1D2430] hover:text-[#1F3A5F] hover:underline underline-offset-4 decoration-[#C9962B] decoration-2 transition-colors">
              {content.nav.farm}
            </a>
            <a href="#contact" className="text-sm font-medium text-[#1D2430] hover:text-[#1F3A5F] hover:underline underline-offset-4 decoration-[#C9962B] decoration-2 transition-colors">
              {content.nav.contact}
            </a>
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-[4px] bg-[#1F3A5F] text-[#FBF8F1] text-sm font-semibold hover:bg-[#162A45] border border-[#1F3A5F] transition-colors min-h-[44px] shadow-sm"
            >
              {content.nav.startSub}
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-[4px] border border-[#DFD7C5] text-[#1F3A5F] hover:bg-[#EFE8D8] focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DFD7C5] bg-[#FBF8F1] px-4 py-5 shadow-lg">
            <nav className="flex flex-col gap-3">
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-base font-medium rounded-[4px] hover:bg-[#EFE8D8] text-[#1F3A5F]"
              >
                {content.nav.products}
              </a>
              <a
                href="#plans"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-base font-medium rounded-[4px] hover:bg-[#EFE8D8] text-[#1F3A5F]"
              >
                {content.nav.plans}
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-base font-medium rounded-[4px] hover:bg-[#EFE8D8] text-[#1F3A5F]"
              >
                {content.nav.howItWorks}
              </a>
              <a
                href="#our-farm"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-base font-medium rounded-[4px] hover:bg-[#EFE8D8] text-[#1F3A5F]"
              >
                {content.nav.farm}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-base font-medium rounded-[4px] hover:bg-[#EFE8D8] text-[#1F3A5F]"
              >
                {content.nav.contact}
              </a>
              <div className="pt-2 border-t border-[#DFD7C5] flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-[4px] bg-[#1F3A5F] text-[#FBF8F1] font-semibold text-sm"
                >
                  {content.nav.startSub}
                </a>
                <button
                  onClick={() => {
                    toggleLanguage();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-[4px] border border-[#1F3A5F] text-[#1F3A5F] font-semibold text-sm hover:bg-[#EFE8D8]"
                >
                  {content.topBar.switchLang}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (Split Layout + Facts Row) */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#DFD7C5] bg-pattern-grid">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Text Side (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col items-start text-start-adaptive">
              <span className="inline-block py-1 px-3 text-xs font-semibold uppercase tracking-wider text-[#1F3A5F] bg-[#EFE8D8] border border-[#DFD7C5] rounded-[4px] mb-5">
                {content.hero.badge}
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[46px] leading-[1.2] font-bold text-[#1F3A5F] tracking-tight mb-5">
                {content.hero.headline}
              </h1>

              <p className="text-[#3D4756] text-base sm:text-lg leading-relaxed max-w-xl mb-8">
                {content.hero.subline}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-[4px] bg-[#1F3A5F] text-[#FBF8F1] text-base font-semibold hover:bg-[#162A45] border border-[#1F3A5F] transition-colors min-h-[48px] shadow-sm"
                >
                  <span>{content.hero.btnPrimary}</span>
                  <ArrowIcon className="w-4 h-4 ms-2 shrink-0" />
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-[4px] bg-transparent text-[#1F3A5F] text-base font-semibold border border-[#1F3A5F] hover:bg-[#EFE8D8] transition-colors min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 me-2 text-[#C9962B] shrink-0" />
                  <span>{content.hero.btnSecondary}</span>
                </a>
              </div>
            </div>

            {/* Photo Side (5 Columns) */}
            <div className="lg:col-span-5">
              <div className="relative border border-[#DFD7C5] bg-[#FFFFFF] p-2 rounded-[6px] shadow-sm">
                <img
                  src="/images/hero-milk.jpg"
                  alt={content.hero.imageAlt}
                  className="w-full h-auto aspect-[4/3] object-cover rounded-[4px]"
                  loading="eager"
                  width="600"
                  height="450"
                />
                <div className="p-3 bg-[#FBF8F1] border-t border-[#DFD7C5] mt-2 flex items-center justify-between text-xs text-[#5A6578]">
                  <span className="font-medium text-[#1F3A5F]">Pak Organic Farms Dispatch</span>
                  <span>Pure chilled glass bottle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Facts Row Under Hero */}
          <div className="mt-14 pt-8 border-t border-[#DFD7C5] grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.hero.facts.map((fact, idx) => (
              <div key={idx} className="p-4 bg-[#EFE8D8]/50 border border-[#DFD7C5] rounded-[4px] flex flex-col text-start-adaptive">
                <div className="flex items-center gap-2 mb-1">
                  {idx === 0 && <Clock className="w-4 h-4 text-[#C9962B] shrink-0" />}
                  {idx === 1 && <Star className="w-4 h-4 text-[#C9962B] fill-[#C9962B] shrink-0" />}
                  {idx === 2 && <ShieldCheck className="w-4 h-4 text-[#C9962B] shrink-0" />}
                  <span className="font-heading font-bold text-base sm:text-lg text-[#1F3A5F]">
                    {fact.label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4D5868] leading-normal">
                  {fact.sub}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. PRODUCTS SECTION (Asymmetric Layout + Price List, No Decorative Card Trios) */}
      <section id="products" className="py-16 lg:py-20 bg-[#FBF8F1]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="max-w-2xl text-start-adaptive mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9962B] block mb-2">
              {content.products.sectionTag}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3A5F]">
              {content.products.title}
            </h2>
            <p className="text-[#4D5868] text-sm sm:text-base mt-2">
              {content.products.subtitle}
            </p>
          </div>

          {/* Clean Balanced Product Grid (2x2 equal height cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Product 1: Cow Milk */}
            <div className="bg-[#FFFFFF] border border-[#DFD7C5] rounded-[4px] p-6 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#EFE8D8] text-[#1F3A5F] rounded-[4px] border border-[#DFD7C5]">
                    {content.products.items[0].badge}
                  </span>
                  <span className="text-xs font-mono text-[#768498]">SKU-COW01</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch mb-4 flex-1">
                  <div className="sm:col-span-5 h-44 sm:h-full min-h-[140px]">
                    <img
                      src="/images/cow-milk.jpg"
                      alt={content.products.items[0].name}
                      className="w-full h-full object-cover border border-[#DFD7C5] rounded-[4px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="sm:col-span-7 text-start-adaptive flex flex-col justify-center">
                    <h3 className="font-heading text-xl font-bold text-[#1F3A5F] mb-2">
                      {content.products.items[0].name}
                    </h3>
                    <p className="text-sm text-[#4D5868] leading-relaxed">
                      {content.products.items[0].desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Row */}
              <div className="mt-4 pt-4 border-t border-[#DFD7C5] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-sm">
                  {content.products.items[0].sizes.map((s, idx) => (
                    <div key={idx} className="bg-[#FBF8F1] px-3 py-1.5 rounded-[4px] border border-[#DFD7C5]">
                      <span className="text-[#5A6578] block text-[11px]">{s.size}</span>
                      <span className="font-bold text-[#1F3A5F]" dir="ltr">{s.price}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={getWhatsAppLink(`I would like to order Organic Cow Milk in Islamabad.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold bg-[#1F3A5F] text-[#FBF8F1] rounded-[4px] hover:bg-[#162A45] transition-colors"
                >
                  {isRtl ? 'آرڈر کریں' : 'Order This'}
                </a>
              </div>
            </div>

            {/* Product 2: Buffalo Milk */}
            <div className="bg-[#FFFFFF] border border-[#DFD7C5] rounded-[4px] p-6 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#EFE8D8] text-[#1F3A5F] rounded-[4px] border border-[#DFD7C5]">
                    {content.products.items[1].badge}
                  </span>
                  <span className="text-xs font-mono text-[#768498]">SKU-BUF02</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch mb-4 flex-1">
                  <div className="sm:col-span-5 h-44 sm:h-full min-h-[140px]">
                    <img
                      src="/images/buffalo-milk.jpg"
                      alt={content.products.items[1].name}
                      className="w-full h-full object-cover border border-[#DFD7C5] rounded-[4px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="sm:col-span-7 text-start-adaptive flex flex-col justify-center">
                    <h3 className="font-heading text-xl font-bold text-[#1F3A5F] mb-2">
                      {content.products.items[1].name}
                    </h3>
                    <p className="text-sm text-[#4D5868] leading-relaxed">
                      {content.products.items[1].desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#DFD7C5] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-sm">
                  {content.products.items[1].sizes.map((s, idx) => (
                    <div key={idx} className="bg-[#FBF8F1] px-3 py-1.5 rounded-[4px] border border-[#DFD7C5]">
                      <span className="text-[#5A6578] block text-[11px]">{s.size}</span>
                      <span className="font-bold text-[#1F3A5F]" dir="ltr">{s.price}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={getWhatsAppLink(`I would like to order Organic Buffalo Milk.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold bg-[#1F3A5F] text-[#FBF8F1] rounded-[4px] hover:bg-[#162A45] transition-colors"
                >
                  {isRtl ? 'آرڈر کریں' : 'Order This'}
                </a>
              </div>
            </div>

            {/* Product 3: Desi Ghee */}
            <div className="bg-[#FFFFFF] border border-[#DFD7C5] rounded-[4px] p-6 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#EFE8D8] text-[#1F3A5F] rounded-[4px] border border-[#DFD7C5]">
                    {content.products.items[2].badge}
                  </span>
                  <span className="text-xs font-mono text-[#768498]">SKU-GHE03</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch mb-4 flex-1">
                  <div className="sm:col-span-5 h-44 sm:h-full min-h-[140px]">
                    <img
                      src="/images/desi-ghee.jpg"
                      alt={content.products.items[2].name}
                      className="w-full h-full object-cover border border-[#DFD7C5] rounded-[4px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="sm:col-span-7 text-start-adaptive flex flex-col justify-center">
                    <h3 className="font-heading text-xl font-bold text-[#1F3A5F] mb-2">
                      {content.products.items[2].name}
                    </h3>
                    <p className="text-sm text-[#4D5868] leading-relaxed">
                      {content.products.items[2].desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#DFD7C5] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-sm">
                  {content.products.items[2].sizes.map((s, idx) => (
                    <div key={idx} className="bg-[#FBF8F1] px-3 py-1.5 rounded-[4px] border border-[#DFD7C5]">
                      <span className="text-[#5A6578] block text-[11px]">{s.size}</span>
                      <span className="font-bold text-[#1F3A5F]" dir="ltr">{s.price}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={getWhatsAppLink(`I would like to order Desi Ghee in Islamabad.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold bg-[#1F3A5F] text-[#FBF8F1] rounded-[4px] hover:bg-[#162A45] transition-colors"
                >
                  {isRtl ? 'آرڈر کریں' : 'Order This'}
                </a>
              </div>
            </div>

            {/* Product 4: Yogurt / Dahi */}
            <div className="bg-[#FFFFFF] border border-[#DFD7C5] rounded-[4px] p-6 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#EFE8D8] text-[#1F3A5F] rounded-[4px] border border-[#DFD7C5]">
                    {content.products.items[3].badge}
                  </span>
                  <span className="text-xs font-mono text-[#768498]">SKU-DAH04</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch mb-4 flex-1">
                  <div className="sm:col-span-5 h-44 sm:h-full min-h-[140px]">
                    <img
                      src="/images/yogurt.jpg"
                      alt={content.products.items[3].name}
                      className="w-full h-full object-cover border border-[#DFD7C5] rounded-[4px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="sm:col-span-7 text-start-adaptive flex flex-col justify-center">
                    <h3 className="font-heading text-xl font-bold text-[#1F3A5F] mb-2">
                      {content.products.items[3].name}
                    </h3>
                    <p className="text-sm text-[#4D5868] leading-relaxed">
                      {content.products.items[3].desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#DFD7C5] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-sm">
                  {content.products.items[3].sizes.map((s, idx) => (
                    <div key={idx} className="bg-[#FBF8F1] px-3 py-1.5 rounded-[4px] border border-[#DFD7C5]">
                      <span className="text-[#5A6578] block text-[11px]">{s.size}</span>
                      <span className="font-bold text-[#1F3A5F]" dir="ltr">{s.price}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={getWhatsAppLink(`I would like to order Natural Farm Dahi.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold bg-[#1F3A5F] text-[#FBF8F1] rounded-[4px] hover:bg-[#162A45] transition-colors"
                >
                  {isRtl ? 'آرڈر کریں' : 'Order This'}
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SUBSCRIPTION PLANS (Clean structured list / table, Honest Pause Rules) */}
      <section id="plans" className="py-16 lg:py-20 bg-pattern-sand border-y border-[#DFD7C5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="max-w-2xl text-start-adaptive mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9962B] block mb-2">
              {content.plans.sectionTag}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3A5F]">
              {content.plans.title}
            </h2>
            <p className="text-[#3D4756] text-sm sm:text-base mt-2">
              {content.plans.subtitle}
            </p>
          </div>

          {/* Desktop Table / Mobile Stacked Cards */}
          <div className="bg-[#FBF8F1] border border-[#DFD7C5] rounded-[4px] shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-start-adaptive border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-[#1F3A5F] text-[#FBF8F1] text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 text-start-adaptive font-semibold">{content.plans.tableHeaders.plan}</th>
                    <th className="py-4 px-6 text-start-adaptive font-semibold">{content.plans.tableHeaders.cadence}</th>
                    <th className="py-4 px-6 text-start-adaptive font-semibold">{content.plans.tableHeaders.volume}</th>
                    <th className="py-4 px-6 text-start-adaptive font-semibold">{content.plans.tableHeaders.estimate}</th>
                    <th className="py-4 px-6 text-start-adaptive font-semibold">{content.plans.tableHeaders.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFD7C5] text-sm">
                  {content.plans.items.map((plan) => (
                    <tr key={plan.id} className={`hover:bg-[#FFFFFF] transition-colors ${plan.popular ? 'bg-[#FFFDF7]' : ''}`}>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-base text-[#1F3A5F]">{plan.name}</span>
                          {plan.popular && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[3px] bg-[#C9962B] text-[#1F3A5F]">
                              {isRtl ? 'سب سے مقبول' : 'Most Popular'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5A6578] mt-1 max-w-xs">{plan.description}</p>
                      </td>
                      <td className="py-5 px-6 font-medium text-[#1D2430]">{plan.cadence}</td>
                      <td className="py-5 px-6 text-[#4D5868]">{plan.volume}</td>
                      <td className="py-5 px-6 font-bold text-[#1F3A5F] whitespace-nowrap" dir="ltr">{plan.estimate}</td>
                      <td className="py-5 px-6">
                        <a
                          href={getWhatsAppLink(plan.whatsappMsg)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-[4px] bg-[#1F3A5F] text-[#FBF8F1] hover:bg-[#162A45] transition-colors whitespace-nowrap"
                        >
                          <MessageCircle className="w-3.5 h-3.5 me-1.5 text-[#C9962B]" />
                          <span>{isRtl ? 'یہ پلان منتخب کریں' : 'Choose this plan'}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Honest Note on Pause/Cancel Rules */}
          <div className="p-4 bg-[#FBF8F1] border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#C9962B] rounded-[4px] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C9962B] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#4D5868] leading-relaxed">
              <strong className="text-[#1F3A5F] font-semibold">{isRtl ? 'شفاف اصول: ' : 'Pause & cancellation note: '}</strong>
              {content.plans.note}
            </p>
          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS (Numbered Horizontal Timeline, Distinct Layout) */}
      <section id="how-it-works" className="py-16 lg:py-20 bg-[#FBF8F1]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="max-w-2xl text-start-adaptive mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9962B] block mb-2">
              {content.howItWorks.sectionTag}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3A5F]">
              {content.howItWorks.title}
            </h2>
            <p className="text-[#4D5868] text-sm sm:text-base mt-2">
              {content.howItWorks.subtitle}
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {content.howItWorks.steps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-[#FFFFFF] border border-[#DFD7C5] p-6 rounded-[4px] text-start-adaptive flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EFE8D8]">
                    <span className="font-mono font-bold text-2xl text-[#C9962B]">
                      {step.number}
                    </span>
                    {idx === 0 && <Calendar className="w-5 h-5 text-[#1F3A5F]" />}
                    {idx === 1 && <MessageCircle className="w-5 h-5 text-[#1F3A5F]" />}
                    {idx === 2 && <Truck className="w-5 h-5 text-[#1F3A5F]" />}
                    {idx === 3 && <FileText className="w-5 h-5 text-[#1F3A5F]" />}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#1F3A5F] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#4D5868] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 text-[11px] font-medium text-[#7C8B9E] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C9962B]" />
                  <span>{isRtl ? 'تصدیق شدہ عمل' : 'Verified standard'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Step 3 Delivery Box Visual Highlight */}
          <div className="mt-10 border border-[#DFD7C5] bg-[#FFFFFF] p-4 rounded-[4px] shadow-xs flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-48 shrink-0">
              <img
                src="/images/morning-delivery.jpg"
                alt={isRtl ? 'صبح کی کولڈ ڈلیوری باکس' : 'Morning delivery box and chilled bottle'}
                className="w-full aspect-[4/3] object-cover rounded-[3px] border border-[#DFD7C5]"
                loading="lazy"
              />
            </div>
            <div className="text-start-adaptive">
              <h4 className="font-heading font-bold text-base text-[#1F3A5F] mb-1">
                {isRtl ? 'محفوظ تھرمل بیگ میں ڈیلیوری' : 'Insulated Thermal Doorstep Bag'}
              </h4>
              <p className="text-xs sm:text-sm text-[#4D5868] leading-relaxed">
                {isRtl 
                  ? 'ہر گھر کے دروازے پر صبح 5:30 سے 7:00 بجے تک شیشے کی بوتلیں مخصوص انسولیٹڈ بیگز میں رکھی جاتی ہیں تاکہ گرم موسم میں بھی دودھ کا ٹمپریچر برقرار رہے۔'
                  : 'Bottles are placed at your doorstep inside dedicated insulated thermal bags between 5:30 AM and 7:00 AM, protecting the cold chain even during Islamabad summer mornings.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. OUR FARM / WHY TRUST US (Split Section, Real Farm photo + Factual list) */}
      <section id="our-farm" className="py-16 lg:py-20 bg-[#EFE8D8] border-y border-[#DFD7C5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Real Farm Visual & Process Photos (5 Cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
              <div className="border border-[#DFD7C5] bg-[#FFFFFF] p-2 rounded-[6px] shadow-sm">
                <img
                  src="/images/farm-pasture.jpg"
                  alt={content.farm.imageAlt}
                  className="w-full h-auto aspect-[4/3] object-cover rounded-[4px]"
                  loading="lazy"
                  width="600"
                  height="450"
                />
                <div className="p-3 bg-[#FBF8F1] border-t border-[#DFD7C5] mt-2 text-start-adaptive">
                  <p className="text-xs text-[#1F3A5F] font-semibold">
                    {isRtl ? 'پاک آرگینک فارم کی سہولیات' : 'Pak Organic Farms Facility'}
                  </p>
                  <p className="text-[11px] text-[#5A6578]">
                    {isRtl ? 'کھلا قدرتی ماحول، حفظانِ صحت پر مبنی ملکنغ اور کولڈ چین' : 'Spacious paddocks, automated stainless milking & immediate 4°C chilling'}
                  </p>
                </div>
              </div>

              {/* Supporting Documentary Photos: Bulk Cooler & Lab Testing */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#DFD7C5] bg-[#FFFFFF] p-1.5 rounded-[4px] shadow-xs">
                  <img
                    src="/images/bulk-cooler.jpg"
                    alt={isRtl ? 'کولڈ ملک ٹینک 4 ڈگری' : 'Bulk Milk Cooler 4°C'}
                    className="w-full aspect-[4/3] object-cover rounded-[2px]"
                    loading="lazy"
                  />
                  <div className="p-1.5 text-center text-[11px] font-medium text-[#1F3A5F]">
                    {isRtl ? '4°C بلک کولر' : '4°C Bulk Cooler'}
                  </div>
                </div>
                <div className="border border-[#DFD7C5] bg-[#FFFFFF] p-1.5 rounded-[4px] shadow-xs">
                  <img
                    src="/images/lab-testing.jpg"
                    alt={isRtl ? 'لیبارٹری کوالٹی ٹیسٹ' : 'Milk Fat & Purity Testing'}
                    className="w-full aspect-[4/3] object-cover rounded-[2px]"
                    loading="lazy"
                  />
                  <div className="p-1.5 text-center text-[11px] font-medium text-[#1F3A5F]">
                    {isRtl ? 'روزانہ فیٹ اور پیورٹی ٹیسٹ' : 'Daily Fat Testing'}
                  </div>
                </div>
              </div>
            </div>

            {/* Factual Integrity List (7 Cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 text-start-adaptive">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C9962B] block mb-2">
                {content.farm.sectionTag}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3A5F] mb-4">
                {content.farm.title}
              </h2>
              <p className="text-[#3D4756] text-sm sm:text-base leading-relaxed mb-6 font-medium">
                {content.farm.lead}
              </p>

              {/* Factual numbered bullet list */}
              <div className="space-y-4">
                {content.farm.facts.map((fact, idx) => (
                  <div key={idx} className="bg-[#FBF8F1] border border-[#DFD7C5] p-4 rounded-[4px] text-start-adaptive">
                    <h3 className="font-heading font-bold text-base text-[#1F3A5F] mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9962B] shrink-0"></span>
                      {fact.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4D5868] leading-relaxed">
                      {fact.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS (3 Real-Sounding Reviews + Honest Google Rating) */}
      <section className="py-16 lg:py-20 bg-[#FBF8F1]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 text-start-adaptive">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C9962B] block mb-2">
                {content.reviews.sectionTag}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3A5F]">
                {content.reviews.title}
              </h2>
            </div>
            
            {/* Google Rating Stated Honestly */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EFE8D8] border border-[#DFD7C5] rounded-[4px] self-start md:self-auto">
              <div className="flex items-center text-[#C9962B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C9962B]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#1F3A5F]">
                {content.reviews.ratingSummary}
              </span>
            </div>
          </div>

          {/* 3 Review Cards in Simple Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.reviews.items.map((review, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#DFD7C5] p-6 rounded-[4px] flex flex-col justify-between shadow-sm text-start-adaptive"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C9962B] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C9962B]" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-[#3D4756] leading-relaxed italic mb-6">
                    “{review.quote}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#DFD7C5]">
                  <div className="font-heading font-bold text-[#1F3A5F] text-sm">
                    {review.author}
                  </div>
                  <div className="text-xs text-[#5A6578]">
                    {review.location}
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-[#C9962B]">
                    {review.plan}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ SECTION (Real Questions in Clean Accordion) */}
      <section className="py-16 lg:py-20 bg-pattern-sand border-y border-[#DFD7C5]">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          
          <div className="text-start-adaptive mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9962B] block mb-2">
              {content.faq.sectionTag}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3A5F]">
              {content.faq.title}
            </h2>
          </div>

          <div className="space-y-3">
            {content.faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FBF8F1] border border-[#DFD7C5] rounded-[4px] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    type="button"
                    className="w-full py-4 px-5 text-start-adaptive flex items-center justify-between gap-4 font-heading font-bold text-base text-[#1F3A5F] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#C9962B] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-start-adaptive text-sm text-[#4D5868] leading-relaxed border-t border-[#DFD7C5]/50 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. CONTACT / VISIT & SIGNUP FORM */}
      <section id="contact" className="py-16 lg:py-20 bg-[#FBF8F1]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="max-w-2xl text-start-adaptive mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9962B] block mb-2">
              {content.contact.sectionTag}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3A5F]">
              {content.contact.title}
            </h2>
            <p className="text-[#4D5868] text-sm sm:text-base mt-2">
              {content.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Office Details, Map & Delivery Coverage (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-start-adaptive">
              
              {/* Address Card */}
              <div className="bg-[#FFFFFF] border border-[#DFD7C5] p-5 rounded-[4px] shadow-sm">
                <h3 className="font-heading font-bold text-base text-[#1F3A5F] mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9962B]" />
                  {content.contact.addressTitle}
                </h3>
                <p className="text-sm text-[#4D5868] leading-relaxed mb-3">
                  {content.contact.addressLine}
                </p>
                <div className="text-xs font-medium text-[#1F3A5F] flex items-center gap-2 pt-2 border-t border-[#DFD7C5]">
                  <Clock className="w-3.5 h-3.5 text-[#C9962B]" />
                  <span>{content.contact.timings}</span>
                </div>
              </div>

              {/* Delivery Areas Pill List */}
              <div className="bg-[#FFFFFF] border border-[#DFD7C5] p-5 rounded-[4px] shadow-sm">
                <h3 className="font-heading font-bold text-base text-[#1F3A5F] mb-3">
                  {content.contact.deliveryAreasTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {content.contact.deliveryAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-[#EFE8D8] text-[#1F3A5F] border border-[#DFD7C5] rounded-[3px]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="border border-[#DFD7C5] rounded-[4px] overflow-hidden shadow-sm bg-[#FFFFFF]">
                <iframe
                  title="Pak Organic Farms Location Javed Plaza PWD Islamabad"
                  src="https://maps.google.com/maps?q=PWD+Society+Islamabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="p-2 bg-[#FBF8F1] border-t border-[#DFD7C5] text-center text-xs text-[#5A6578]">
                  Sector D, PWD Society, Islamabad
                </div>
              </div>

              {/* Social Link */}
              <div className="flex items-center gap-3">
                <a
                  href={content.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F3A5F] hover:text-[#C9962B] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#C9962B]" />
                  <span>@{content.contact.instagram}</span>
                </a>
              </div>

            </div>

            {/* Right: Direct Subscription Sign-Up Form (7 Cols) */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DFD7C5] p-6 sm:p-8 rounded-[4px] shadow-sm text-start-adaptive">
              <div className="mb-6 pb-4 border-b border-[#DFD7C5]">
                <h3 className="font-heading font-bold text-xl text-[#1F3A5F]">
                  {content.contact.form.formTitle}
                </h3>
                <p className="text-xs text-[#5A6578] mt-1">
                  {isRtl 
                    ? 'کوئی رجسٹریشن فیس نہیں۔ تصدیق فوری واٹس ایپ پر موصول ہوگی۔'
                    : 'No registration fees. Confirmation sent straight to your WhatsApp.'}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#1F3A5F] uppercase tracking-wider mb-1">
                    {content.contact.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={content.contact.form.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#DFD7C5] bg-[#FBF8F1] text-sm text-[#1D2430] focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#1F3A5F] uppercase tracking-wider mb-1">
                    {content.contact.form.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={content.contact.form.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#DFD7C5] bg-[#FBF8F1] text-sm text-[#1D2430] focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-xs font-semibold text-[#1F3A5F] uppercase tracking-wider mb-1">
                    {content.contact.form.addressLabel}
                  </label>
                  <textarea
                    id="address"
                    rows="2"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={content.contact.form.addressPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#DFD7C5] bg-[#FBF8F1] text-sm text-[#1D2430] focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] focus:bg-[#FFFFFF] transition-colors"
                  ></textarea>
                </div>

                {/* Product Choice */}
                <div>
                  <label htmlFor="product" className="block text-xs font-semibold text-[#1F3A5F] uppercase tracking-wider mb-1">
                    {content.contact.form.productLabel}
                  </label>
                  <select
                    id="product"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#DFD7C5] bg-[#FBF8F1] text-sm text-[#1D2430] focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] focus:bg-[#FFFFFF] transition-colors"
                  >
                    {content.contact.form.productOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Delivery Cadence */}
                <div>
                  <label htmlFor="frequency" className="block text-xs font-semibold text-[#1F3A5F] uppercase tracking-wider mb-1">
                    {content.contact.form.frequencyLabel}
                  </label>
                  <select
                    id="frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#DFD7C5] bg-[#FBF8F1] text-sm text-[#1D2430] focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] focus:bg-[#FFFFFF] transition-colors"
                  >
                    {content.contact.form.frequencies.map((freq, idx) => (
                      <option key={idx} value={freq}>{freq}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-[4px] bg-[#1F3A5F] text-[#FBF8F1] font-semibold text-base hover:bg-[#162A45] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <MessageCircle className="w-5 h-5 text-[#C9962B]" />
                    <span>{content.contact.form.submitButton}</span>
                  </button>
                  <p className="text-[11px] text-[#768498] mt-2 text-center leading-normal">
                    {content.contact.form.formDisclaimer}
                  </p>
                </div>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-pattern-ink text-[#DFD7C5] border-t border-[#2C4F7C] pt-12 pb-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2C4F7C] text-start-adaptive">
            
            {/* Brand column */}
            <div className="md:col-span-5">
              <span className="font-heading font-bold text-xl text-[#FBF8F1] block mb-2">
                Pak Organic Farms
              </span>
              <p className="text-sm text-[#A8B7C9] leading-relaxed max-w-sm mb-4">
                {content.footer.tagline}
              </p>
              <div className="text-xs text-[#C9962B] font-medium">
                {content.footer.hours}
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FBF8F1] block mb-3">
                {content.footer.quickLinks}
              </span>
              <ul className="space-y-2 text-sm text-[#A8B7C9]">
                <li><a href="#products" className="hover:text-[#C9962B] transition-colors">{content.nav.products}</a></li>
                <li><a href="#plans" className="hover:text-[#C9962B] transition-colors">{content.nav.plans}</a></li>
                <li><a href="#how-it-works" className="hover:text-[#C9962B] transition-colors">{content.nav.howItWorks}</a></li>
                <li><a href="#our-farm" className="hover:text-[#C9962B] transition-colors">{content.nav.farm}</a></li>
                <li><a href="#contact" className="hover:text-[#C9962B] transition-colors">{content.nav.contact}</a></li>
              </ul>
            </div>

            {/* Direct Details */}
            <div className="md:col-span-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FBF8F1] block mb-3">
                {content.nav.contact}
              </span>
              <p className="text-xs text-[#A8B7C9] leading-relaxed mb-3">
                {content.contact.addressLine}
              </p>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-[#FBF8F1] font-medium">Phone: </span>
                  <a href="tel:+923210510111" className="text-[#A8B7C9] hover:text-[#C9962B]" dir="ltr">
                    +92 321 0510111
                  </a>
                </div>
                <div>
                  <span className="text-[#FBF8F1] font-medium">Instagram: </span>
                  <a href={content.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#A8B7C9] hover:text-[#C9962B]">
                    @pakorganicfarms
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C8F9F]">
            <div>{content.footer.copyright}</div>
            <div className="text-[#A8B7C9]">{content.footer.credit}</div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (Bottom Corner, Modest Size, No Gimmicks) */}
      <aside aria-label="Quick contact" className="fixed bottom-5 end-5 z-50">
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-3 bg-[#1F3A5F] text-[#FBF8F1] rounded-[4px] border border-[#2C4F7C] shadow-md hover:bg-[#162A45] transition-colors min-h-[48px]"
          aria-label="Direct WhatsApp chat"
        >
          <MessageCircle className="w-5 h-5 text-[#C9962B]" />
          <span className="text-xs font-semibold hidden sm:inline">
            {content.floatingWhatsApp}
          </span>
        </a>
      </aside>

    </div>
  );
}
