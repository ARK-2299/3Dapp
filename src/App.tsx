/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Upload, 
  ChevronRight, 
  Camera, 
  Sparkles, 
  Box, 
  Layers, 
  User, 
  Share2, 
  Download, 
  RefreshCw, 
  Search, 
  SlidersHorizontal, 
  LayoutGrid,
  Tally3,
  Award,
  ChevronDown,
  Settings,
  CreditCard,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

type View = 'home' | 'processing' | 'result' | 'collection' | 'profile';

interface Style {
  id: string;
  name: string;
  image: string;
}

interface Avatar {
  id: string;
  name: string;
  style: string;
  date: string;
  image: string;
}

// --- Constants ---

const STYLES: Style[] = [
  { id: 'chibi', name: 'Chibi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGhXGIFEhfCwZSZhlRt3uoX6WHp8kn8kAPyipZZ910q2oGXePSMpeyiNywK5eCes01XeL6VvrZNDArrQAQTtWYuzCT4KtMNLn7perLUhnPK4Qu35_ufHIR34yhik0Woms8teeQd7_z-_PtAnvlIVKKcZGteIc6cUpthx7PoqFAutK-5orBjGeD8yHTMtauFqGcqZsCmSkQqso_K_8NlSs2EKWN9Be6FtALX9xx3KS4R5RGeKGEoDJNmi_eiLuxXkWE2uiWDI9w-yz6' },
  { id: 'pixel', name: 'Pixel', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD4Jft6w1RdJVLHX8Lyoo00bL1fdRRD4Ujy_zwWJnWg3lLZrslACPYVII56sHkySYyBVqKINimToQU8yCmNbIZXVc7H8XUVCdpNa69v3GOPZl07pAIJxsQom77ckPAr3-Wb-FYX8VrkCALD1T9yQRNFptXVFE-dsNWoXE6fdAdD6tntvfwB7kZmA4I5k4AEUnnw5jtCcPqPjXE26XVh15K3rOZWu6XGPsZTirQYpggaknCXHKwUvKWxMA9YAErd-NPE9GoojMHRVWt' },
  { id: 'figure', name: 'Figure', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt6famI8vxWVcjaCpouHnFYfnAfsFQcMHwUPMgr-h4rWSkXx9wBjMwMmYz2dqWHqcDRLcMizywmAe0QaS1S7g44WuiysRMMxgaTagf3MfpjsRe3gnRFwURgBHpk5SOZdFwGniSqy-JXmgEEHLW5iiEHhvKHkEYoMiGHmIGfzUJ_rPtlNwkOAleUWep_XNcrqUI16G5-sK5QGwtgzjQlz1Xa83gj4vwhCVOcQrkObWmAE9C5UUyv8RqQT5ClVgWKbB5Frm_wiTqVCaU' },
  { id: 'stylized', name: 'Stylized Realistic', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpJJZd1gzSjo4ypftMzgV8KNlInAoZ0pulDkzd0cxiX-NrT4DSvMLp_S5cyOveH3SJgI7uHJss-ZS8GA-gfMo8Uh5NnK2lTiUprWM6MborP3tLE22C1bgcVjnZdUx_AX_6mYZPSD9vHwBfWqx5fTNI-VuKM1x0-3S3PNFKrYlD7YCNHxZoz97_vWZjdpb2o6JWVJAYB5nHnCPLvu3zi5MmmoJRaMCVTdLGQ2JJRAIP4ONwq6UAGHnCTK2p2YTviZxexBjjBzGksTzp' },
];

const COLLECTION: Avatar[] = [
  { id: '842', name: 'Neon-X Phantom', style: 'Cyber', date: '2 days ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwG-IYm4LtyqXogEdCk_pNBfCPKisKaq3pfFaEat2xsAb41rsGkGxl1W7ec5Wi3NBziwLe6LFRIbToGPa79Iytzy-Ds9qvJOlu6aY5KKjw3OQJVtvrAUMHUhSmkqoaFBWCX4iIEMlL2n_LiJ-rMizhiqdNzdFJc1LYLr5UNjcGEDL0a_4ycZJP1n5z2K33f9qEh2CNK4zi1on4Ah-4vSbQDKthnzMMdXLnl0YDTs9-cFuoOXZLjCeI5XYNk_X95-5oAvyp_eSDFUZi' },
  { id: '841', name: 'Little Voyager', style: 'Chibi', date: '5 days ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnCDmxGg9w_ntieQRZ5VnkreY-ejByrJxTWErKaP6vbKBTlan3C3UWq9TjikU1v7fyTL6wnwJ7aGOT46OBHS_2A8SR6lagu5kwaXYXaT3wv1_2x-ZDnT132IMS_h50viDSHLUBUgil3D3XxKjeLHrmkkBbMhoFdnSNUVZ2isnUKww1l3HmN8zZV3VjBqs1-PuXAxVuf0sYh5Bg5qoL4eolnIoma6qXUqeln_2DQwWQZBm-uNHcl99wp6EBafP6D0a-5GmwIIVxAc5z' },
  { id: '840', name: 'Voxel Knight', style: 'Pixel', date: '1 week ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMUGy8TvcjR0yLUi_0h5BOHecbQl7p-ILMjm2diT59FZFMpR_Qy5k-AG8Kvd9AvL6M2bsyO7Bx-tF9cha3jQnaQ-WmnI8n9RfsSza7RjMr3DKfJ6z0p3Zw7kMOUKWsUmLgRfjIevXiIqFkkHv6I0UHZCAK-QqoT8NwVrnWzMMox7LIKZrY--_xTdrDevWoCQp2oieckfI2Viy_vWXC_UvYk45l4ffmaKvmSSanyuiFIFWbTdmRjjRw1h80qsEAfd1_A7fDDAE8PsXL' },
  { id: '839', name: 'Aria Hype', style: 'Stylized', date: '2 weeks ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-avq6yPYap_wg-DIAkmox7YHdg0GTXMGI95C1Pu4OK8UGYfbtNYCB6ulwPJYmHo8PxM_AzSp17ODq_YZYcUaJPKksFlUKqzPMv3yIZPd8rDH5QB4jSutNe1ykvJT4_dyxDfNVo85UC0ij8Q7zWHyLRCMNz6UXu6QEKWtEsecM742L3kRBpcnmgOQ6Rwsz9TghSkFkbIHLBNk0eFXkQpewrRgIcRa4oX2rHxBUwEU_Tvije5ipUPuDutBHFA6I92yTnQyUYglyMDWv' },
  { id: '838', name: 'Mekka-01', style: 'Retro', date: '3 weeks ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU5tFqNAHsdXk4gewLZHnuFj-QugzTvbR6J_kwyAH8Da2zWD8kXdNoBkOHdun1DZarWh4l1Vs4I355IXlok3YVqAtVsWb7JoxtxXV6IHb1m9ckdiEwMeStiI4XA41yHVI92PigxqRrW4biTWgOCTPrhpwap_JQZQemXeatBLr4irKww6uSLq1ti2yoA0MAA8W2aCKp00iY_7o7pJPIhDCfsCKiATzNjoK5Vghoc5BR6plI9m4mJ33eJwixhqzNEeQB0-MVVUQUCGJl' },
  { id: '837', name: 'Aether Sovereign', style: 'Elite', date: '1 month ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfm0jUX_ZSW4CtbIRDX_16-4yN1OINy9UdW-jJw7qk_f6mLN_3Xzym3HYdToorWZpaPDtfJd04r8jHdkpBKJgQYqCvx7dC1qMZLpCc89MclpMCvlLIl-3ffCFc-3JGVxnkBHkPpOuvi8m920hZWeToV9fyQG1jOJIETwDPGr7TJu32SauX0GgkIHJAAV253gW2HUw3xz7mIsb-qOo7lzRz0gWHyUv3cwpxkOBDcyvN0BIxiGKPS3Fn6h5vcGJhOZ0vPiPHMgWzp6aP' },
];

// --- Components ---

const TopBar = () => (
  <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-3xl shadow-[0_20px_40px_rgba(18,74,240,0.04)] flex items-center justify-between px-6 h-16">
    <div className="flex items-center gap-4">
      <button className="p-2 hover:bg-white/20 transition-all rounded-full active:scale-95 duration-200">
        <Menu className="w-6 h-6 text-secondary" />
      </button>
      <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-headline tracking-tighter">
        MetaFigure
      </h1>
    </div>
    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container ring-4 ring-primary/5 active:scale-95 transition-all">
      <img 
        alt="User Profile" 
        className="w-full h-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyU5No1rMKXR5aF5l8DFdPgnDas1YKVfaMQfQ419MW-huYT2XX_8HC34Y6xX9bzeF7a0Hi2JBb3ehFM9HOuSljHLad_wwigp6iBzQ4v1BMNMAsnJbS1qjMCzORD82NdOlY9SgfyVOkT6MaxuOAI8eafYEsZwamamNpMuUzE6MAXgH5yCcNaTxoAt9I9_OOty3lnESPO_plDFUayZkA_SqH_oSIgH-tPVXVcI6qM8QFJnUFyW5LuUfwkHzg7z1olVhwFtkDbcl0Zy81"
        referrerPolicy="no-referrer"
      />
    </div>
  </header>
);

const BottomNav = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => (
  <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 flex justify-around items-center px-4 py-3 bg-white/70 backdrop-blur-2xl rounded-[2rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
    <button 
      onClick={() => setView('home')}
      className={cn(
        "flex items-center justify-center rounded-full w-12 h-12 transition-all active:scale-90",
        currentView === 'home' || currentView === 'processing' || currentView === 'result' 
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30" 
          : "text-slate-400 hover:text-blue-500"
      )}
    >
      <Box className="w-6 h-6" />
    </button>
    <button 
      onClick={() => setView('collection')}
      className={cn(
        "flex items-center justify-center rounded-full w-12 h-12 transition-all active:scale-90",
        currentView === 'collection' 
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30" 
          : "text-slate-400 hover:text-blue-500"
      )}
    >
      <Layers className="w-6 h-6" />
    </button>
    <button 
      onClick={() => setView('processing')}
      className={cn(
        "flex items-center justify-center rounded-full w-12 h-12 transition-all active:scale-90",
        currentView === 'processing' 
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30" 
          : "text-slate-400 hover:text-blue-500"
      )}
    >
      <Sparkles className="w-6 h-6" />
    </button>
    <button 
      onClick={() => setView('profile')}
      className={cn(
        "flex items-center justify-center rounded-full w-12 h-12 transition-all active:scale-90",
        currentView === 'profile' 
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30" 
          : "text-slate-400 hover:text-blue-500"
      )}
    >
      <User className="w-6 h-6" />
    </button>
  </nav>
);

// --- Views ---

const HomeView = ({ onGenerate }: { onGenerate: () => void }) => {
  const [selectedStyle, setSelectedStyle] = useState('figure');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <section className="flex flex-col items-center">
        <div className="glass-card w-full rounded-xl p-8 md:p-12 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[60px] rounded-full"></div>
          <div className="w-20 h-20 bg-primary-container text-primary rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Camera className="w-10 h-10 fill-primary/20" />
          </div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4 tracking-tight">
            Upload a photo to generate your 3D avatar
          </h2>
          <p className="text-on-surface-variant mb-8 max-w-sm">
            Our AI transforms your portrait into a high-fidelity 3D collectible in seconds.
          </p>
          <button className="bg-gradient-to-br from-primary to-primary-dim text-on-primary px-8 py-4 rounded-lg font-bold flex items-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <span>Upload a photo</span>
            <Upload className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="font-headline text-lg font-bold tracking-tight text-on-surface">Select Style</h3>
          <span className="text-primary font-medium text-sm flex items-center gap-1 cursor-pointer">
            View All <ChevronRight className="w-4 h-4" />
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          {STYLES.map((style) => (
            <div 
              key={style.id} 
              onClick={() => setSelectedStyle(style.id)}
              className={cn(
                "flex-shrink-0 w-36 group cursor-pointer transition-all",
                selectedStyle === style.id ? "ring-2 ring-primary ring-offset-4 rounded-lg p-0.5 scale-105" : ""
              )}
            >
              <div className="h-48 rounded-lg bg-surface-container-high overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                <img 
                  alt={style.name} 
                  className="w-full h-full object-cover" 
                  src={style.image}
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className={cn(
                "text-center font-bold text-sm",
                selectedStyle === style.id ? "text-primary" : "text-on-surface"
              )}>
                {style.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-8">
        <button 
          onClick={onGenerate}
          className="w-full glass-card py-5 rounded-lg flex items-center justify-center gap-4 relative overflow-hidden group hover:bg-white/80 active:scale-[0.98] transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-tertiary/10 to-primary/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <Sparkles className="w-6 h-6 text-primary-dim fill-primary/20" />
          <span className="font-headline text-xl font-extrabold text-on-surface-variant tracking-tight z-10">Generate Avatar</span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
        </button>
        <p className="text-center text-on-surface-variant text-xs mt-4 tracking-widest uppercase font-label">Ready for minting in 3... 2... 1...</p>
      </section>
    </motion.div>
  );
};

const ProcessingView = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] space-y-12"
    >
      <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center">
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>
        
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
          ></motion.div>
          <div className="w-4/5 h-4/5 rounded-full border border-primary/30 flex items-center justify-center bg-surface-container-lowest/40 backdrop-blur-xl shadow-2xl">
            <Sparkles className="w-16 h-16 text-primary fill-primary/10" />
          </div>
        </div>

        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: -150, opacity: 0.6 }}
          className="absolute left-0 w-32 h-32 glass-card rounded-xl shadow-lg flex items-center justify-center overflow-hidden transform -rotate-6"
        >
          <img 
            className="w-full h-full object-cover grayscale opacity-60" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPBEOuMqDNYDMeQZIiH9fYvSttVQOBtGfNLqYf_0JCFhtDyUFXzjFl8z3daNQSxIG0xaru4inKhjqRokLbmV3plA1q5a2EkkApSW9xRsZR81Y7LYppFx87bz-CSxacsWWTOC2o1Tv5UEdB1iCeuMcqn7pyRUSLpthPoVxb3qs7VMDHjM-j89nJuaKIFtVoIVvm2J97OPxD5x3uUjh4mtuEMGy4PCdD3yNIZdd7kimtrCi5hNrLPPQcHaJiEOPgVzZUoQvmzzqEx26L"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 150, opacity: 0.6 }}
          className="absolute right-0 w-32 h-32 glass-card rounded-xl shadow-lg flex items-center justify-center overflow-hidden transform rotate-6"
        >
          <div className="flex flex-col items-center">
            <Box className="w-10 h-10 text-tertiary mb-2" />
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-tertiary/40 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-tertiary/40 animate-pulse delay-75"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-tertiary/40 animate-pulse delay-150"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-md text-center">
        <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Transforming your image...</h2>
        <p className="font-body text-on-surface-variant mb-10">Generating 3D model with spatial depth and anatomical precision.</p>
        
        <div className="relative w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mb-4">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-tertiary rounded-full shadow-[0_0_15px_rgba(18,74,240,0.4)]"
            style={{ width: `${progress}%` }}
          ></motion.div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-label uppercase tracking-widest text-on-surface-variant/60">
          <span>Neural Analysis</span>
          <span className="text-primary font-bold">{progress}% Complete</span>
        </div>
      </div>
    </motion.div>
  );
};

const ResultView = ({ onRegenerate }: { onRegenerate: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-8 pb-12"
    >
      <div className="w-full text-center md:text-left">
        <h1 className="font-headline font-extrabold text-5xl md:text-7xl tracking-tighter text-on-surface leading-none mb-4">
          Generation <span className="text-primary">#842</span>
        </h1>
        <p className="font-label uppercase tracking-widest text-xs text-on-surface-variant font-semibold">
          Spatial Synthesis • Ultra High Fidelity • Ready for Export
        </p>
      </div>

      <div className="relative w-full aspect-[4/5] md:aspect-[16/9] flex items-center justify-center bg-surface-container-low/30 rounded-xl overflow-hidden shadow-[0_40px_100px_rgba(18,74,240,0.08)] group">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <img 
            className="w-full h-full object-cover grayscale" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO9tuwlCkK9PpO7lDH-RHZHKmVZAJo-LlV6VQ2t5e7xk2j2o5-gcmtx0SByxzTSNtHEvr7F3vfgzt4fUsfyCLUkEcS2MGNjlVtr5aSgepgGJya67Qj-zVEm8lRAtWjl8uK7tqrzBIy-QVLmowqHx51o7f0sTmC48UZ59Jep4-8TA_pUwEH84coU2F9QuYocNCqwT6_8Kh5Zb8P3_qFOnoQzNhelxe74kZSh_xH2OIstTfcewvzeyxDiHOZZj7fIUrhewR7UAS0amAU"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <motion.img 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-[85%] w-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbP6rmhFS5A8sFSHDIpEW2q_75FzJl4P1s56auvmg0A_4_L3fXqRq3A7RLq1MLXDi0s_rWwrl_OWtqC29Fuf-1grnCmHwwiF_dwVv5bNp7Kt9xGftgigjo0klcf1YJrMvxTUmdXd7mJH5ikVVmJGA1jMqFLiMBVlOKoPNyLbAgFEtCybZk7hLsdT5j43H2UrFwI5ARjW6VPZm4YcpgbtJdEkKlai9InDwF4GZG-Ymypg2pQLfdlq2qnj1znZpwSCKk4zr9niAEDA7B"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2">
          <button className="w-16 h-16 rounded-full border border-primary/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-primary active:scale-90 transition-transform cursor-pointer">
            <RefreshCw className="w-8 h-8" />
          </button>
          <span className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant/60">Orbit View</span>
        </div>
      </div>

      <div className="flex justify-center gap-3 p-2 bg-surface-container-lowest/40 backdrop-blur-xl rounded-full border border-outline-variant/10 shadow-lg">
        {['Cyberpunk', 'Minimalist', 'Surrealism', 'Anatome'].map((style) => (
          <button 
            key={style}
            className={cn(
              "px-5 py-2.5 rounded-full font-label text-xs font-medium tracking-tight transition-all",
              style === 'Cyberpunk' ? "bg-gradient-to-br from-primary to-tertiary text-on-primary font-bold shadow-md" : "bg-white/60 hover:bg-white/90 text-on-surface"
            )}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-[2.5rem] p-4 flex flex-wrap items-center justify-between gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/40">
        <button 
          onClick={onRegenerate}
          className="flex items-center gap-2 px-6 py-4 rounded-xl hover:bg-primary-container/30 text-primary transition-all active:scale-95"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="font-label font-bold text-sm tracking-tight">Regenerate</span>
        </button>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-all active:scale-95">
            <Share2 className="w-5 h-5" />
            <span className="font-label font-bold text-sm tracking-tight">Share</span>
          </button>
          <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-sm tracking-tight shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CollectionView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">My Collection</h2>
        <p className="text-on-surface-variant text-lg">Your curated universe of digital identities and spatial figures.</p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-outline" />
          </div>
          <input 
            className="w-full pl-14 pr-6 py-4 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-on-surface-variant/60 shadow-sm" 
            placeholder="Search your figures..." 
            type="text"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-4 bg-surface-container-lowest glass-card rounded-lg text-primary font-semibold shadow-sm hover:shadow-md transition-all active:scale-95">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button className="p-4 bg-surface-container-lowest glass-card rounded-lg text-on-surface shadow-sm hover:shadow-md transition-all active:scale-95">
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {COLLECTION.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(18,74,240,0.03)] hover:shadow-[0_20px_50px_rgba(18,74,240,0.08)] transition-all duration-500 border border-white/40">
              <img 
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700" 
                src={item.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-primary border border-white/50">
                  {item.style}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-headline font-bold text-on-surface">{item.name}</h3>
                <p className="text-[12px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Created {item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ProfileView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-12"
    >
      <section className="flex flex-col items-center text-center space-y-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-tertiary rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary/30 to-tertiary/30">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-surface shadow-xl">
              <img 
                alt="Large Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPx6YF3U1e4qJcmMvw4hlQFpOgT_M6n48uIYsBsx5N9EjyrxTcbKxOyp03P3jPX4WYHfNhWHAY9Oahr2XiRW7hEnk2PvBW8fYaZrBZpAbOATWstylSZkYMiq-S1WV7xzpZ-yhj9uolIrS2yku5M4M76tDaMo4CUZL2f0aK2RGBqw4uAYfWNO_mnFwimDcAwVPGKDAAsdQPueuylpRcPt6FUCfjkTr9PjkVpzLyqDqaS8bl6oYY4MViOhEmt23jq8EdQsep4GcyYpdC"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Alex River</h2>
          <p className="font-label text-on-surface-variant text-sm uppercase tracking-widest mt-1">Creator ID: 8829-AF</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest p-6 rounded-lg ghost-border shadow-sm flex flex-col justify-between h-32">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Total Generations</span>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-4xl font-bold text-primary">128</span>
            <Award className="w-6 h-6 text-primary-dim fill-primary/10" />
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-lg ghost-border shadow-sm flex flex-col justify-between h-32">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Tokens Remaining</span>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-4xl font-bold text-on-surface">2.4k</span>
            <Tally3 className="w-6 h-6 text-on-surface-variant rotate-90" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-headline text-lg font-bold px-2">Workspace Settings</h3>
        <div className="glass-card rounded-lg ghost-border overflow-hidden">
          {[
            { icon: Zap, title: 'Export Quality', sub: 'Current: Ultra HD (4K)', color: 'bg-primary-container/30 text-primary' },
            { icon: Box, title: 'Default Format (.glb)', sub: 'Optimized for WebAR', color: 'bg-tertiary-container/30 text-tertiary' },
            { icon: CreditCard, title: 'Subscription Plan', sub: 'Creator Monthly', color: 'bg-surface-variant text-on-surface-variant' },
          ].map((item, i) => (
            <React.Fragment key={item.title}>
              <div className="flex items-center justify-between p-5 hover:bg-white/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", item.color)}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-on-surface">{item.title}</p>
                    <p className="text-xs text-on-surface-variant">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant" />
              </div>
              {i < 2 && <div className="h-[1px] mx-5 bg-outline-variant/10"></div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="relative group overflow-hidden rounded-lg p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dim to-tertiary"></div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-tertiary-container/30 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-headline text-2xl font-extrabold text-white mb-2">Upgrade to Pro</h4>
            <p className="text-on-primary/80 text-sm max-w-[280px]">Unlock unlimited high-fidelity renders, commercial licensing, and priority cloud processing.</p>
          </div>
          <button className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95">
            Go Unlimited
          </button>
        </div>
      </section>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');

  const renderView = () => {
    switch (view) {
      case 'home': return <HomeView onGenerate={() => setView('processing')} />;
      case 'processing': return <ProcessingView onComplete={() => setView('result')} />;
      case 'result': return <ResultView onRegenerate={() => setView('home')} />;
      case 'collection': return <CollectionView />;
      case 'profile': return <ProfileView />;
      default: return <HomeView onGenerate={() => setView('processing')} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Ethereal Spots */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary-container/20 rounded-full blur-[100px]"></div>
      </div>

      <TopBar />

      <main className={cn(
        "pt-24 pb-32 px-6 max-w-7xl mx-auto",
        view === 'processing' || view === 'result' ? "spatial-gradient min-h-screen flex items-center justify-center pt-16" : ""
      )}>
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <BottomNav currentView={view} setView={setView} />
    </div>
  );
}
