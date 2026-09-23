import {
  Bot,
  Camera,
  Gamepad2,
  Gift,
  Image as ImageIcon,
  MessageCircle,
  MessagesSquare,
  ScanFace,
  ShieldAlert,
  Smartphone,
  Users,
  WandSparkles,
} from 'lucide-react';
import type { ScenarioVisualId } from '../data/lifeScenarios';

const visualMap: Record<
  ScenarioVisualId,
  {
    gradient: string;
    glow: string;
    primary: JSX.Element;
    secondary: JSX.Element;
    badge?: string;
  }
> = {
  gaming: {
    gradient: 'from-[#2563EB] via-[#4F46E5] to-[#7C3AED]',
    glow: 'bg-cyan-300/40',
    primary: <Gamepad2 size={42} />,
    secondary: <Smartphone size={28} />,
    badge: '@?',
  },
  viral: {
    gradient: 'from-[#0EA5E9] via-[#06B6D4] to-[#14B8A6]',
    glow: 'bg-lime-300/40',
    primary: <Smartphone size={42} />,
    secondary: <ShieldAlert size={28} />,
    badge: '#viral',
  },
  homework: {
    gradient: 'from-[#7C3AED] via-[#6366F1] to-[#2563EB]',
    glow: 'bg-fuchsia-300/35',
    primary: <Bot size={42} />,
    secondary: <WandSparkles size={28} />,
    badge: 'AI',
  },
  deepfake: {
    gradient: 'from-[#9333EA] via-[#7C3AED] to-[#0EA5E9]',
    glow: 'bg-cyan-300/35',
    primary: <ScanFace size={42} />,
    secondary: <Camera size={28} />,
    badge: 'FAKE?',
  },
  groupPhoto: {
    gradient: 'from-[#F97316] via-[#EC4899] to-[#8B5CF6]',
    glow: 'bg-yellow-300/35',
    primary: <ImageIcon size={42} />,
    secondary: <MessagesSquare size={28} />,
    badge: 'story?',
  },
  exclude: {
    gradient: 'from-[#84CC16] via-[#22C55E] to-[#14B8A6]',
    glow: 'bg-yellow-200/40',
    primary: <Users size={42} />,
    secondary: <MessageCircle size={28} />,
    badge: 'group',
  },
  fakeProfile: {
    gradient: 'from-[#2563EB] via-[#0EA5E9] to-[#06B6D4]',
    glow: 'bg-violet-300/35',
    primary: <Smartphone size={42} />,
    secondary: <ScanFace size={28} />,
    badge: 'new acct',
  },
  screenshot: {
    gradient: 'from-[#EC4899] via-[#8B5CF6] to-[#6366F1]',
    glow: 'bg-pink-200/35',
    primary: <MessagesSquare size={42} />,
    secondary: <ImageIcon size={28} />,
    badge: 'screenshot',
  },
  aiAdvice: {
    gradient: 'from-[#4F46E5] via-[#7C3AED] to-[#C026D3]',
    glow: 'bg-cyan-200/30',
    primary: <Bot size={42} />,
    secondary: <MessageCircle size={28} />,
    badge: 'advice?',
  },
  rewardScam: {
    gradient: 'from-[#0EA5E9] via-[#2563EB] to-[#4F46E5]',
    glow: 'bg-lime-300/35',
    primary: <Gift size={42} />,
    secondary: <ShieldAlert size={28} />,
    badge: 'FREE!',
  },
};

export const ScenarioVisual = ({
  visual,
  compact = false,
}: {
  visual: ScenarioVisualId;
  compact?: boolean;
}) => {
  const item = visualMap[visual];

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} text-white ${
        compact ? 'h-32' : 'h-44 md:h-52'
      }`}
    >
      <div className={`absolute -top-10 -right-8 w-32 h-32 rounded-full blur-2xl ${item.glow}`} />
      <div className="absolute -bottom-10 -left-8 w-36 h-36 rounded-full bg-white/10 blur-xl" />

      <div className="absolute top-4 right-4 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-extrabold tracking-wide">
        {item.badge}
      </div>

      <div className="absolute left-5 bottom-5 flex items-end gap-3">
        <div className="w-16 h-16 rounded-2xl bg-white/18 border border-white/20 backdrop-blur flex items-center justify-center shadow-lg">
          {item.primary}
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#D9FF57] text-[#17233C] flex items-center justify-center shadow-lg rotate-[-6deg]">
          {item.secondary}
        </div>
      </div>

      <div className="absolute top-5 left-5 flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white/90" />
        <span className="w-2 h-2 rounded-full bg-white/55" />
        <span className="w-2 h-2 rounded-full bg-white/30" />
      </div>
    </div>
  );
};
