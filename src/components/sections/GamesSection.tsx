import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface GamesSectionProps {
  setActiveSection: (section: string) => void;
}

export default function GamesSection({ setActiveSection }: GamesSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold gradient-text">Каталог игр</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="modern-card cursor-pointer floating-animation" onClick={() => setActiveSection('slots')}>
          <CardHeader>
            <div className="text-4xl mb-2">🎰</div>
            <CardTitle className="text-lg">Слот-машины</CardTitle>
            <CardDescription>Классические и современные слоты</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full luxury-gradient interactive-button">
              <Icon name="Play" className="mr-2" size={16} />
              Играть
            </Button>
          </CardContent>
        </Card>

        <Card className="modern-card cursor-pointer floating-animation" onClick={() => setActiveSection('roulette')}>
          <CardHeader>
            <div className="text-4xl mb-2">🎲</div>
            <CardTitle className="text-lg">Рулетка</CardTitle>
            <CardDescription>Европейская рулетка</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full luxury-gradient interactive-button">
              <Icon name="Play" className="mr-2" size={16} />
              Играть
            </Button>
          </CardContent>
        </Card>

        <Card className="modern-card cursor-pointer floating-animation" onClick={() => setActiveSection('blackjack')}>
          <CardHeader>
            <div className="text-4xl mb-2">🂡</div>
            <CardTitle className="text-lg">Блэкджек</CardTitle>
            <CardDescription>Классический блэкджек</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full luxury-gradient interactive-button">
              <Icon name="Play" className="mr-2" size={16} />
              Играть
            </Button>
          </CardContent>
        </Card>

        <Card className="modern-card cursor-pointer floating-animation opacity-50">
          <CardHeader>
            <div className="text-4xl mb-2">♠️</div>
            <CardTitle className="text-lg">Покер</CardTitle>
            <CardDescription>Скоро доступен</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" disabled>
              Скоро
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}