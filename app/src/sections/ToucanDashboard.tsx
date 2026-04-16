import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Ruler, Utensils, Heart, Info, Feather, Globe, Volume2, Square } from 'lucide-react';

export function ToucanDashboard() {
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lang, setLang] = useState<'en' | 'ml'>('en');
  const [playing, setPlaying] = useState(false);

  const toggleLang = (selected: 'en' | 'ml') => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    setPlaying(false);
    setLang(selected);
  };

  const playVoice = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
      audio.onended = () => setPlaying(false);
    }
  };

  const birdDetails = {
    name: 'Channel-billed Toucan',
    scientificName: 'Ramphastos vitellinus',
    origin: 'Brazil',
    lifespan: '20 years',
    length: '48-58 cm',
    weight: '300-400g',
    diet: 'Fruits, insects, small reptiles',
    habitat: 'Tropical rainforests',
    description: 'Known for its enormous, colorful bill. Native to the Amazon rainforest.',
    funFacts: [
      'Bill can reach up to 20cm',
      'Bill helps regulate temperature',
      'Live in groups of 12 birds'
    ]
  };

  return (
    <div className="min-h-screen bg-[#0d3b1e] flex items-center justify-center p-3">
      <div className="w-full max-w-[400px] bg-[#0a2e17] rounded-[24px] overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-4 border-[#1a5c2e]">

        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#d4a017] via-[#e85d4e] to-[#d4a017] z-50" />

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-8 h-8 z-40">
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <path d="M5 20 Q10 5 20 10 Q30 5 35 20 Q30 35 20 30 Q10 35 5 20" fill="#e85d4e" />
            <circle cx="20" cy="20" r="5" fill="#f4d03f" />
          </svg>
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 z-40">
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <path d="M5 20 Q10 5 20 10 Q30 5 35 20 Q30 35 20 30 Q10 35 5 20" fill="#3498db" />
            <circle cx="20" cy="20" r="5" fill="#f4d03f" />
          </svg>
        </div>

        {/* Channel ID badge */}
        {id && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 bg-[#0a2e17]/80 border border-[#d4a017]/50 px-3 py-0.5 rounded-full">
            <span className="text-[10px] text-[#d4a017] font-mono">{id}</span>
          </div>
        )}

        {/* Hero video */}
        <div className="relative h-[38vh] bg-white overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-full z-10">
            <svg viewBox="0 0 80 200" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0 0 Q40 50 20 100 Q40 150 0 200 L0 0" fill="#1a5c2e" />
              <path d="M10 20 Q50 60 30 100 Q50 140 10 180" fill="none" stroke="#d4a017" strokeWidth="2" />
              <circle cx="25" cy="50" r="4" fill="#e85d4e" />
              <circle cx="20" cy="100" r="3" fill="#f4d03f" />
              <circle cx="25" cy="150" r="4" fill="#e85d4e" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-20 h-full z-10">
            <svg viewBox="0 0 80 200" className="w-full h-full" preserveAspectRatio="none">
              <path d="M80 0 Q40 50 60 100 Q40 150 80 200 L80 0" fill="#1a5c2e" />
              <path d="M70 20 Q30 60 50 100 Q30 140 70 180" fill="none" stroke="#d4a017" strokeWidth="2" />
              <circle cx="55" cy="50" r="4" fill="#3498db" />
              <circle cx="60" cy="100" r="3" fill="#f4d03f" />
              <circle cx="55" cy="150" r="4" fill="#3498db" />
            </svg>
          </div>
          <video
            ref={videoRef}
            src="/toucan.mp4"
            className="w-full h-full object-cover relative z-20"
            playsInline
            muted
            autoPlay
            loop
          />
          <div className="absolute bottom-0 left-0 right-0 z-30">
            <svg viewBox="0 0 400 40" className="w-full h-10" preserveAspectRatio="none">
              <path d="M0 40 Q50 10 100 30 Q150 50 200 20 Q250 0 300 25 Q350 45 400 15 L400 40 L0 40" fill="#0a2e17" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative bg-[#0a2e17] px-4 pb-5">

          {/* Voice section */}
          <div className="flex flex-col items-center gap-2 pt-3 mb-2">
            <div className="flex items-center bg-[#1a5c2e] border-2 border-[#d4a017]/50 rounded-full p-0.5">
              <button
                onClick={() => toggleLang('en')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-[#d4a017] text-[#0a2e17]' : 'text-[#7fb069] hover:text-white'}`}
              >English</button>
              <button
                onClick={() => toggleLang('ml')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'ml' ? 'bg-[#d4a017] text-[#0a2e17]' : 'text-[#7fb069] hover:text-white'}`}
              >മലയാളം</button>
            </div>
            <button
              onClick={playVoice}
              className={`flex items-center gap-2 ${playing ? 'bg-[#e85d4e] hover:bg-[#f06b5a]' : 'bg-[#d4a017] hover:bg-[#e8b520]'} active:scale-95 transition-all px-5 py-2.5 rounded-full shadow-lg`}
            >
              {playing ? <Square className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-[#0a2e17]" />}
              <span className={`text-xs font-bold ${playing ? 'text-white' : 'text-[#0a2e17]'}`}>
                {playing ? 'Stop' : 'Hear the Toucan'}
              </span>
            </button>
            <audio ref={audioRef} src={lang === 'en' ? '/voice1.mpeg' : '/voice2.mpeg'} />
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
              <div className="w-2 h-2 bg-[#e85d4e] rounded-full" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
            </div>
            <h1 className="text-xl font-bold text-[#f4d03f] tracking-wide" style={{ fontFamily: 'serif' }}>{birdDetails.name}</h1>
            <p className="text-xs text-[#7fb069] italic mt-0.5">{birdDetails.scientificName}</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3b1e] border-2 border-[#d4a017] rounded-xl p-3 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-[#d4a017]/20 flex items-center justify-center border border-[#d4a017]">
                  <MapPin className="w-3.5 h-3.5 text-[#f4d03f]" />
                </div>
                <span className="text-[9px] font-bold text-[#7fb069] uppercase tracking-wider">Origin</span>
              </div>
              <p className="text-sm font-bold text-white pl-9">{birdDetails.origin}</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3b1e] border-2 border-[#e85d4e] rounded-xl p-3 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-[#e85d4e]/20 flex items-center justify-center border border-[#e85d4e]">
                  <Heart className="w-3.5 h-3.5 text-[#e85d4e]" />
                </div>
                <span className="text-[9px] font-bold text-[#7fb069] uppercase tracking-wider">Lifespan</span>
              </div>
              <p className="text-sm font-bold text-white pl-9">{birdDetails.lifespan}</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3b1e] border-2 border-[#3498db] rounded-xl p-3 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-[#3498db]/20 flex items-center justify-center border border-[#3498db]">
                  <Ruler className="w-3.5 h-3.5 text-[#3498db]" />
                </div>
                <span className="text-[9px] font-bold text-[#7fb069] uppercase tracking-wider">Length</span>
              </div>
              <p className="text-sm font-bold text-white pl-9">{birdDetails.length}</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3b1e] border-2 border-[#7fb069] rounded-xl p-3 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-[#7fb069]/20 flex items-center justify-center border border-[#7fb069]">
                  <Utensils className="w-3.5 h-3.5 text-[#7fb069]" />
                </div>
                <span className="text-[9px] font-bold text-[#7fb069] uppercase tracking-wider">Diet</span>
              </div>
              <p className="text-[10px] font-bold text-white pl-9 leading-tight">{birdDetails.diet}</p>
            </div>
          </div>

          {/* About */}
          <div className="bg-[#1a5c2e] border-2 border-[#d4a017]/50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-[#d4a017] flex items-center justify-center">
                <Info className="w-3 h-3 text-[#0a2e17]" />
              </div>
              <span className="text-xs font-bold text-[#f4d03f]">About</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed pl-8">{birdDetails.description}</p>
          </div>

          {/* Fun Facts */}
          <div className="bg-gradient-to-br from-[#e85d4e]/20 to-[#d4a017]/20 border-2 border-[#e85d4e] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-[#e85d4e] flex items-center justify-center">
                <Feather className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-[#f4d03f]">Fun Facts</span>
            </div>
            <ul className="space-y-2">
              {birdDetails.funFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-[#d4a017] text-[#0a2e17] text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs text-white/90 pt-0.5">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Habitat */}
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center gap-2 bg-[#1a5c2e] border-2 border-[#7fb069] px-4 py-2 rounded-full">
              <Globe className="w-3.5 h-3.5 text-[#7fb069]" />
              <span className="text-xs font-bold text-[#f4d03f]">{birdDetails.habitat}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-3 border-t border-[#1a5c2e]">
            <div className="flex items-center justify-center gap-4">
              <div className="w-2 h-2 bg-[#e85d4e] rounded-full" />
              <p className="text-[10px] text-[#7fb069]">Petstation Wildlife</p>
              <div className="w-2 h-2 bg-[#3498db] rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#d4a017] via-[#e85d4e] to-[#d4a017] z-50" />
      </div>
    </div>
  );
}
