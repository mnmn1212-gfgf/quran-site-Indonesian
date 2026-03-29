import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#7C83F6";
const ACCENT_SOFT = "#EEF0FF";
const ACCENT_ROSE = "#7C83F6";
const BG_DEEP = "#090F2B";
const BG_PANEL = "#090F2B";
const CTA_DARK = "#151C48";
const GOLD = "#CFAF6A";

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,#090F2B_0%,#121A45_45%,#27337A_100%)]";

const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,#0B1234_0%,#121A45_55%,#1B255F_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.18, 0.42, 0.18],
  scale: [1, 1.04, 1],
  transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
};

const shimmer = {
  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  "border border-[rgba(238,240,255,0.08)] bg-[rgba(255,255,255,0.04)] md:backdrop-blur-2xl backdrop-blur-md shadow-[0_16px_50px_rgba(0,0,0,0.30)]";
const softCard =
  "rounded-[2rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(255,255,255,0.03)] md:backdrop-blur-2xl backdrop-blur-md shadow-[0_18px_55px_rgba(0,0,0,0.38)]";
const gradientOuterCard = `rounded-[2rem] border border-[rgba(238,240,255,0.10)] ${OUTER_GRADIENT} md:backdrop-blur-2xl backdrop-blur-md shadow-[0_16px_50px_rgba(0,0,0,0.30)]`;
const footerHighlightCard = `
${INNER_GRADIENT}
rounded-[1.8rem]
border border-[rgba(238,240,255,0.08)]
bg-[rgba(255,255,255,0.02)]
shadow-[0_8px_30px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.04)]
`;

const navItems = [
  { label: "Tentang", href: "#about" },
  { label: "Fitur", href: "#features" },
  { label: "Karya Kami", href: "#portfolio" },
  { label: "Mitra", href: "#partners" },
  { label: "Kontak", href: "#contact" },
];

const stats = [
  { value: "+100", label: "Bahasa global yang dituju" },
  { value: "24/7", label: "Siaran berkelanjutan" },
  { value: "114", label: "Surah lengkap" },
  { value: "Premium", label: "Kualitas audio-visual premium" },
];

const heroCards = [
  { value: "114", label: "Sourates" },
  { value: "30", label: "Ajza’" },
  { value: "Elegan", label: "Konten AV" },
];

const heroBadges = [
  { icon: Sparkles, title: "Cahaya dan keindahan Al-Qur’an" },
  { icon: Globe, title: "Pesan universal" },
];

const identityCards = [
  {
    icon: Users,
    title: "Siapa Kami",
    text: "Sana adalah inisiatif berbasis wakaf yang didedikasikan untuk menyampaikan makna Al-Qur’an Al-Karim kepada dunia melalui kanal audio dan visual yang berkelas. Kami memadukan keindahan tilawah dengan ketepatan terjemahan untuk menghadirkan pengalaman spiritual yang mulia, mendekatkan firman Allah ke hati manusia dalam berbagai bahasa utama dunia.",
  },
  {
    icon: Eye,
    title: "Visi",
    text: "Menjadi rujukan internasional dalam penyebaran makna Al-Qur’an Al-Karim kepada setiap orang dalam bahasanya sendiri, melalui pendekatan modern yang memadukan keunggulan, keanggunan, dan inovasi teknologi.",
  },
  {
    icon: Target,
    title: "Misi",
    text: "Menyajikan konten Al-Qur’an audio-visual yang diterjemahkan, jelas, dan mudah diakses, agar firman Allah dikenal dengan kedalaman, keindahan, dan dampak bagi masyarakat di seluruh dunia.",
  },
];

const features = [
  {
    icon: Languages,
    title: "Terjemahan multibahasa",
    desc: "Makna Al-Qur’an Al-Karim disajikan dengan tepat dan jelas dalam berbagai bahasa masyarakat dunia, dengan tetap menjaga pesan yang dimaksud.",
  },
  {
    icon: Headphones,
    title: "Pengalaman audio-visual yang imersif",
    desc: "Perpaduan harmonis antara tilawah yang menyentuh dan teks terjemahan dalam suasana yang layak bagi keagungan Al-Qur’an.",
  },
  {
    icon: Globe,
    title: "Jangkauan internasional berkelanjutan",
    desc: "Kehadiran digital dan satelit yang dirancang untuk menjangkau audiens di seluruh benua, kapan saja.",
  },
  {
    icon: HeartHandshake,
    title: "Wakaf untuk Allah",
    desc: "Proyek dakwah global di mana setiap dukungan, partisipasi, dan manfaat menjadi bagian dari amal jariyah yang berkelanjutan.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "Kanal satelit dan radio",
    desc: "Kanal audio dan visual yang menyiarkan makna Al-Qur’an Al-Karim dalam berbagai bahasa masyarakat, melampaui batas negara.",
  },
  {
    icon: MonitorPlay,
    title: "Media sosial dan situs web",
    desc: "Kehadiran digital yang elegan dan dinamis, memudahkan konten Al-Qur’an untuk diakses, dipelajari, dan dibagikan.",
  },
  {
    icon: Layers3,
    title: "Aplikasi dan media digital",
    desc: "Pengalaman yang fleksibel dan modern, disesuaikan dengan penggunaan masa kini di berbagai perangkat dan platform.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "Lembaga Islam dan otoritas ulama",
    desc: "Mitra yang berkontribusi pada terjemahan makna Al-Qur’an yang telah diverifikasi, menjamin keaslian, ketepatan, dan kekuatan ilmiah.",
  },
  {
    icon: Mic2,
    title: "Qari ternama",
    desc: "Suara-suara yang khusyuk dan menyentuh, memberi proyek ini nuansa spiritual yang kuat dan mendalam.",
  },
  {
    icon: Headphones,
    title: "Studio audio dan mitra teknis",
    desc: "Para ahli yang memastikan rekaman berkualitas tinggi dan pengolahan audio-visual yang profesional.",
  },
  {
    icon: Users,
    title: "Produser dan relawan",
    desc: "Kontributor berdedikasi yang turut berpartisipasi dalam perancangan, pengembangan, dan penyebaran konten ke seluruh dunia.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "Jangkauan global",
    desc: "Pesan Al-Qur’an Al-Karim menjangkau rumah-rumah di seluruh dunia dalam bahasa yang berbicara langsung ke hati manusia.",
  },
  {
    icon: Languages,
    title: "Terjemahan tepercaya",
    desc: "Terjemahan makna Al-Qur’an dikerjakan di bawah pengawasan ulama agar ketepatan dan kedalamannya tetap terjaga.",
  },
  {
    icon: Headphones,
    title: "Pengalaman terpadu",
    desc: "Perpaduan antara tilawah yang khusyuk dan terjemahan visual menciptakan pengalaman spiritual yang mulus, mulia, dan mudah diakses.",
  },
  {
    icon: Send,
    title: "Pesan yang berkelanjutan",
    desc: "Proyek ini membantu memperkenalkan firman Allah melalui bahasa visual modern yang mampu menjangkau beragam kalangan.",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(238,240,255,0.16)] bg-[rgba(255,255,255,0.08)] px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_12px_26px_rgba(0,0,0,0.22)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: GOLD }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(238,240,255,0.12)] bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.24)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: GOLD }}
    >
      <Icon
        className="h-5 w-5 shrink-0 sm:h-7 sm:w-7"
        style={{ color: GOLD }}
      />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT + mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [
    HALF_BARS,
    MAX_BAR_HEIGHT,
    MIN_BAR_HEIGHT,
    idleBars,
    isPlaying,
    isMobile,
  ]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.45rem] border border-[rgba(238,240,255,0.12)] bg-[rgba(16,22,58,0.76)] p-3 sm:p-4 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-[rgba(238,240,255,0.12)] bg-black/20 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-[#1F2A6B] via-[#7C83F6] to-[#EEF0FF] opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.12)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isPlaying ? "Jeda" : "Putar"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: GOLD }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: GOLD }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.12)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Mundur"
        >
          <SkipBack className="h-4 w-4" style={{ color: GOLD }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.12)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Putar ulang"
        >
          <RotateCcw className="h-4 w-4" style={{ color: GOLD }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.12)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Maju"
        >
          <SkipForward className="h-4 w-4" style={{ color: GOLD }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.12)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Volume"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: GOLD }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#1F2A6B] via-[#7C83F6] to-[#EEF0FF]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -8, scale: 1.012 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-[rgba(238,240,255,0.08)] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[rgba(238,240,255,0.08)] bg-gradient-to-l from-white/[0.03] to-white/[0.08] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(124,131,246,0.10)]">
            <Icon className="h-5 w-5" style={{ color: GOLD }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.58)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -8, scale: 1.012 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-[rgba(238,240,255,0.08)] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[rgba(238,240,255,0.08)] bg-gradient-to-l from-white/[0.03] to-white/[0.08] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(124,131,246,0.10)]">
            <Icon className="h-5 w-5" style={{ color: GOLD }} />
          </div>
          <div
            className={`rounded-2xl border border-[rgba(238,240,255,0.08)] bg-white/[0.04] px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.58)] px-4 py-4 text-white/82 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -8, scale: 1.012 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-[rgba(238,240,255,0.08)] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[rgba(238,240,255,0.08)] bg-gradient-to-l from-white/[0.03] to-white/[0.08] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(124,131,246,0.10)]">
            <Icon className="h-5 w-5" style={{ color: GOLD }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.58)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({
  video,
  index,
  isMobile,
  activeVideoId,
  setActiveVideoId,
}) {
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const onLoadedMetadata = () => setDuration(element.duration || 0);
    const onLoadedData = () => setIsReady(true);
    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);
    const onPlay = () => {
      setIsPlaying(true);
      setActiveVideoId(index);
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (activeVideoId === index) {
        setActiveVideoId(null);
      }
    };

    element.addEventListener("loadedmetadata", onLoadedMetadata);
    element.addEventListener("loadeddata", onLoadedData);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);

    return () => {
      element.removeEventListener("loadedmetadata", onLoadedMetadata);
      element.removeEventListener("loadeddata", onLoadedData);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
    };
  }, [activeVideoId, index, setActiveVideoId]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    if (activeVideoId !== null && activeVideoId !== index && !element.paused) {
      element.pause();
    }
  }, [activeVideoId, index]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = () => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      setActiveVideoId(index);
      element.play().catch(() => {});
    } else {
      element.pause();
      if (activeVideoId === index) {
        setActiveVideoId(null);
      }
    }
  };

  const replayVideo = () => {
    const element = videoRef.current;
    if (!element) return;

    setActiveVideoId(index);
    element.currentTime = 0;
    element.play().catch(() => {});
  };

  const handleSeek = (e) => {
    const element = videoRef.current;
    if (!element) return;

    const next = Number(e.target.value);
    element.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) return;

    const next = !element.muted;
    element.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -8, scale: 1.012 }}
      className={`${softCard} p-3 sm:p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-[rgba(238,240,255,0.10)] bg-black/30">
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="auto"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/12 transition hover:bg-black/10"
            aria-label="Putar video"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,255,255,0.22)] bg-white/10 backdrop-blur-md shadow-[0_0_32px_rgba(124,131,246,0.22)] sm:h-18 sm:w-18">
              <Play className="ml-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-[rgba(238,240,255,0.10)] bg-black/35 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "Ketuk untuk memutar" : "Memuat video"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-[rgba(238,240,255,0.10)] bg-[rgba(18,24,66,0.58)] p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.10)] bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Matikan atau aktifkan suara"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: GOLD }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.10)] bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Putar ulang"
          >
            <RotateCcw className="h-4 w-4" style={{ color: GOLD }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.10)] bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "Jeda" : "Putar"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: GOLD }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: GOLD }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#1F2A6B] via-[#7C83F6] to-[#EEF0FF]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const isMobile = useIsMobile();

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
      >
        <motion.div
          animate={shimmer}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,131,246,0.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(124,131,246,0.18),transparent_20%),radial-gradient(circle_at_20%_75%,rgba(41,55,140,0.22),transparent_28%),linear-gradient(180deg,#070B20_0%,#10163A_34%,#182056_68%,#1F2A6B_100%)] bg-[length:140%_140%]"
        />

        <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(238,240,255,0.22)_0_2px,transparent_2px),radial-gradient(circle_at_80%_30%,rgba(238,240,255,0.18)_0_2px,transparent_2px),radial-gradient(circle_at_40%_70%,rgba(124,131,246,0.18)_0_2px,transparent_2px)] bg-[size:120px_120px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <div className="h-full w-full bg-[linear-gradient(45deg,transparent_42%,rgba(238,240,255,0.12)_49%,transparent_56%),linear-gradient(-45deg,transparent_42%,rgba(124,131,246,0.10)_49%,transparent_56%)] bg-[size:90px_90px]" />
        </div>

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[rgba(124,131,246,0.14)] blur-3xl"
              animate={pulseGlow}
            />
            <motion.div
              className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[rgba(124,131,246,0.10)] blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.05]">
              <div className="h-full w-full bg-[linear-gradient(rgba(238,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(238,240,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.6rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
              style={{ backgroundColor: BG_PANEL }}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[rgba(238,240,255,0.18)] bg-white/10 shadow-[0_0_24px_rgba(124,131,246,0.12)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="Logo kanal Al-Qur’an Sana"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-[0.18em] text-white/90 uppercase sm:text-xl">
                  Sana Quranic Channels
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-[rgba(238,240,255,0.08)] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[rgba(124,131,246,0.30)] hover:bg-white/[0.08] hover:text-[#EEF0FF]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-white/[0.04] md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div
                className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}
                style={{ backgroundColor: BG_PANEL }}
              >
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-[rgba(238,240,255,0.08)] bg-white/[0.04] px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.03fr_0.97fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(124,131,246,0.18)] bg-white/[0.06] px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: GOLD }}
              >
                <Stars className="h-4 w-4" style={{ color: GOLD }} />
                <span>Tanda spiritual yang dirancang dengan elegan</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.12] sm:text-5xl lg:text-7xl"
              >
                <span className="block bg-[linear-gradient(90deg,#FFFFFF_0%,#EEF0FF_42%,#7C83F6_100%)] bg-clip-text text-transparent">
                  Kanal Al-Qur’an Sana
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8 lg:text-xl"
              >
                Sebuah platform audio-visual yang didedikasikan untuk menyebarkan makna Al-Qur’an Al-Karim secara elegan dalam berbagai bahasa dunia, sebagai wakaf tulus untuk melayani risalah Ilahi.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_10px_28px_rgba(0,0,0,0.26)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    background: "linear-gradient(135deg,#151C48 0%, #1F2A6B 100%)",
                    borderColor: "rgba(124,131,246,0.28)",
                    color: ACCENT_SOFT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: GOLD }}
                  />
                  Jelajahi platform
                </a>

                <a
                  href="https://www.youtube.com/@SANAindo"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[rgba(238,240,255,0.12)] bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[rgba(124,131,246,0.24)] hover:bg-white/[0.10] sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" style={{ color: GOLD }} />
                  Kunjungi channel kami
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-[rgba(238,240,255,0.08)] bg-white/[0.06] p-3 text-center backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.20)] sm:p-4"
                  >
                    <div
                      className="text-xl font-black sm:text-2xl"
                      style={{ color: GOLD }}
                    >
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/68 sm:text-sm">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={
                  isMobile
                    ? {}
                    : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative mx-auto max-w-2xl rounded-[2rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(11,18,52,0.88)] p-3 sm:p-4 shadow-[0_18px_55px_rgba(0,0,0,0.38)] md:backdrop-blur-2xl backdrop-blur-md"
              >
                <div className="rounded-[1.75rem] border border-[rgba(238,240,255,0.08)] bg-[linear-gradient(180deg,rgba(14,20,52,0.96)_0%,rgba(17,25,66,0.92)_55%,rgba(22,31,79,0.9)_100%)] p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45 sm:text-sm">
                        Bahasa saat ini
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                        Al-Qur'an dalam bahasa Indonesia
                      </h3>
                    </div>

                    <div className="w-fit rounded-2xl border border-[rgba(207,175,106,0.22)] bg-[rgba(207,175,106,0.08)] px-4 py-2 text-xs sm:text-sm text-white/90">
                      Siaran langsung
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(10,16,45,0.82)] p-4 sm:mt-8 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones
                        className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0"
                        style={{ color: GOLD }}
                      />
                      <span>
                        Écoutez la récitation avec une présentation visuelle raffinée des
                        sens du Coran
                      </span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{
                              width: [`${w - 14}%`, `${w}%`, `${w - 8}%`],
                            }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-gradient-to-r from-[#16205A] via-[#27337A] to-[#7C83F6]"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="flex min-h-[108px] flex-col items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.72)] px-2 py-3 sm:min-h-[120px] sm:p-4"
                        >
                          <div
                            className="text-[13px] font-bold leading-tight sm:text-lg"
                            style={{ color: GOLD }}
                          >
                            {item.value}
                          </div>
                          <div className="mt-2 text-[10px] leading-4 text-white/65 sm:text-xs sm:leading-5">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.5rem] border border-[rgba(238,240,255,0.08)] bg-white/[0.06] px-5 py-4 text-center backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.18)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-white/[0.04] sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" style={{ color: GOLD }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge
                icon={BookOpen}
                text="Identitas Qurani global"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge
                icon={Building2}
                text="Pelaksanaan dan pengawasan"
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,131,246,0.08),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(245,230,200,0.06),transparent_32%)]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className="rounded-[1.8rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(15,22,58,0.44)] p-4 sm:p-6">
                    <div className="h-full rounded-2xl border border-[rgba(238,240,255,0.08)] bg-white/[0.04] p-4 sm:p-5">
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        Kemitraan eksekutif yang tepercaya
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        Proyek{" "}
                        <span className="font-bold text-white">
                          Kanal Al-Qur’an Sana
                        </span>{" "}
                        dilaksanakan oleh{" "}
                        <span
                          className="font-bold"
                          style={{ color: GOLD }}
                        >
                          Saudi Jordanian Satellite Broadcasting Company (JASCO)
                        </span>{" "}
                        di Amman, Yordania, dengan keahlian yang diakui dalam produksi media dan penyiaran profesional.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(15,22,58,0.72)] p-4 sm:p-6">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-white/[0.04] p-4 sm:p-5">
                      <div className="text-sm uppercase tracking-[0.18em] text-white/55">
                        Situs resmi
                      </div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">
                        Jasco Media City
                      </div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-[rgba(124,131,246,0.24)] bg-[rgba(124,131,246,0.10)] px-5 py-3 text-sm text-[#EEF0FF] transition hover:bg-[rgba(124,131,246,0.16)] sm:text-base"
                      >
                        Kunjungi situs Jasco
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "Fitur de la plateforme")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Sana... sebuah pesan untuk seluruh alam semesta
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Platform Qurani kontemporer yang memadukan ketelitian ilmiah, kehalusan visual, dan teknologi modern untuk menyebarkan makna Al-Qur’an Al-Karim.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "Kanal siaran dan jangkauan")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Saluran kehadiran yang beragam
              </h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "Karya Kami")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Contoh karya kami
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Tilawah Al-Qur’an yang indah disertai terjemahan makna yang elegan, dirancang untuk menyentuh hati di seluruh dunia.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                  activeVideoId={activeVideoId}
                  setActiveVideoId={setActiveVideoId}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "Dampak proyek")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Dampak dan jangkauan proyek
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Proyek internasional yang membuat makna Al-Qur’an Al-Karim lebih dekat, lebih mudah dipahami, dan lebih hadir di rumah-rumah di seluruh dunia.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "Mitra du succès")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Keberhasilan yang ditopang kolaborasi
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Proyek s’est développé grâce à une coopération harmonieuse
                entre institutions savantes, experts médias, équipes techniques
                et bénévoles engagés.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(238,240,255,0.10)] bg-white/[0.06] px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_12px_26px_rgba(0,0,0,0.18)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: GOLD }}
                >
                  <Sparkles
                    className="h-5 w-5 shrink-0"
                    style={{ color: GOLD }}
                  />
                  <span>Kontakez-nous</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  Sana adalah pesan dakwah global. Kami menyambut pertanyaan, saran, dan peluang kemitraan Anda dengan jelas, penuh hormat, dan profesional.
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className="rounded-[2rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(15,22,58,0.68)] p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-[rgba(238,240,255,0.08)] bg-white/[0.04] p-4 sm:p-5">
                    <div className="mb-4 text-xl font-bold sm:text-2xl">
                      Terhubung dengan kami
                    </div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-white/[0.04] px-4 py-3 text-sm sm:text-base">
                        Tim kami akan dengan senang hati merespons Anda secepat mungkin.
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[rgba(124,131,246,0.24)] bg-[rgba(124,131,246,0.10)] px-4 py-3 text-center text-sm font-semibold text-[#EEF0FF] transition hover:bg-[rgba(124,131,246,0.16)] sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: GOLD }} />
                        Kirim email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div
              className="rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 border border-[rgba(238,240,255,0.08)] bg-[linear-gradient(135deg,#0B1234_0%,#121A45_55%,#1B255F_100%)] shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div className={`${footerHighlightCard} p-4 text-center sm:p-6`}>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(238,240,255,0.12)] bg-white/[0.08] shadow-[0_0_24px_rgba(124,131,246,0.12)] backdrop-blur-md sm:h-24 sm:w-24">
                    <img
                      src={sanaLogo}
                      alt="Logo Sana"
                      className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-[rgba(238,240,255,0.08)] bg-white/[0.05] px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                      Kanal Al-Qur’an Sana
                    </span>
                  </div>

                  <div
                    className="mt-4 text-2xl font-black sm:text-3xl"
                    style={{ color: GOLD }}
                  >
                    Sana... sebuah pesan untuk seluruh alam semesta
                  </div>

                  <p className="mx-auto mt-4 max-w-xl rounded-[1.4rem] border border-[rgba(124,131,246,0.16)] bg-[rgba(18,24,66,0.72)] px-4 py-4 text-sm leading-7 text-white/90 sm:px-5 sm:text-base sm:leading-8">
                    Kanal audio dan visual yang didedikasikan untuk terjemahan makna Al-Qur’an dalam berbagai bahasa dunia, dengan identitas yang elegan, setia, dan sangat menginspirasi.
                  </p>
                </div>

                <div
                  className={`${footerHighlightCard} p-5 sm:p-6 flex flex-col items-center justify-center text-center`}
                >
                  <div className="mb-6 flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.12)] bg-white/[0.08] shadow-[0_0_18px_rgba(124,131,246,0.10)]">
                      <MessageCircle
                        className="h-6 w-6"
                        style={{ color: GOLD }}
                      />
                    </div>
                    <div className="text-xl font-bold text-white sm:text-2xl">
                      Kontak kami
                    </div>
                  </div>

                  <div className="w-full space-y-4 text-white/72">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex items-center justify-center gap-3 break-all rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.6)] px-4 py-3 text-sm transition hover:bg-white/[0.08] sm:text-base"
                    >
                      <Mail
                        className="h-5 w-5 shrink-0"
                        style={{ color: GOLD }}
                      />
                      <span className="text-center">snachannel159@gmail.com</span>
                    </a>

                    <div className="flex items-center justify-center gap-3 rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.6)] px-4 py-3 text-sm sm:text-base">
                      <MapPin
                        className="h-5 w-5 shrink-0"
                        style={{ color: GOLD }}
                      />
                      <span className="text-center">Amman - Yordania</span>
                    </div>
                  </div>

                  <div className="mt-5 w-full rounded-[1.4rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.6)] p-4">
                    <a
                      href="https://www.facebook.com/share/18HTkpGDKc/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.6)] py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/[0.08]"
                    >
                      <Globe className="h-5 w-5" style={{ color: GOLD }} />
                      Ikuti kami di Facebook
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      Mulai perjalanan Qurani Anda sekarang
                    </p>
                  </div>
                </div>

                <div
                  className={`${footerHighlightCard} p-5 backdrop-blur-md sm:p-6 flex flex-col items-center justify-center text-center`}
                >
                  <div className="mb-6 flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.12)] bg-white/[0.08] shadow-[0_0_18px_rgba(124,131,246,0.10)]">
                      <Link2 className="h-6 w-6" style={{ color: GOLD }} />
                    </div>
                    <div className="text-xl font-bold text-white sm:text-2xl">
                      Tautan aplikasi
                    </div>
                  </div>

                  <div className="w-full rounded-[1.4rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.6)] p-4">
                    <p className="mb-4 text-center text-sm leading-7 text-white/65">
                      Unduh aplikasi resmi untuk mengikuti konten Qurani dengan lancar dan elegan di platform favorit Anda.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.6)] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                      >
                        <div className="flex flex-col items-center justify-center gap-3 text-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(124,131,246,0.10)] text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            Google Play
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.6)] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                      >
                        <div className="flex flex-col items-center justify-center gap-3 text-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(238,240,255,0.08)] bg-[rgba(124,131,246,0.10)] text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            App Store
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 rounded-[1.4rem] border border-[rgba(238,240,255,0.08)] bg-[rgba(18,24,66,0.6)] p-4">
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: GOLD }}>★</span> Rating 4,9
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: GOLD }}>🌍</span> 100+ negara
                        </span>
                      </div>

                      <a
                        href="https://www.youtube.com/@SANAindo"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(124,131,246,0.24)] bg-[rgba(124,131,246,0.10)] py-3 text-sm font-bold text-[#EEF0FF] transition hover:scale-[1.01] hover:bg-[rgba(124,131,246,0.16)]"
                      >
                        <Sparkles className="h-4 w-4" />
                        Mulai sekarang
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[rgba(238,240,255,0.08)] pt-5 text-center text-xs text-white/55 sm:text-sm">
                Tous droits réservés © Kanal Al-Qur’an Sana.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
