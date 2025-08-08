import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
}

export default function HeroSection({ setActiveSection }: HeroSectionProps) {
  return (
    <section className="text-center py-16 rounded-3xl luxury-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 floating-animation">
          Добро пожаловать в LuxuryCardClub
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Играйте в настоящие игры с реальными выигрышами и мгновенными выплатами
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90 interactive-button" onClick={() => setActiveSection('games')}>
            <Icon name="Play" className="mr-2" size={18} />
            Начать играть
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 interactive-button" onClick={() => setActiveSection('bonuses')}>
            <Icon name="Gift" className="mr-2" size={18} />
            Получить бонус
          </Button>
        </div>
      </div>
    </section>
  );
}