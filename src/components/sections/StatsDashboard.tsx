import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface GameStats {
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  totalEarnings: number;
}

interface StatsDashboardProps {
  gameStats: GameStats;
  setActiveSection: (section: string) => void;
}

export default function StatsDashboard({ gameStats, setActiveSection }: StatsDashboardProps) {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="modern-card floating-animation">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold gradient-text">
              {gameStats.totalGames}
            </CardTitle>
            <CardDescription>Всего игр</CardDescription>
          </CardHeader>
          <CardContent>
            <Icon name="Gamepad2" className="text-muted-foreground" size={24} />
          </CardContent>
        </Card>

        <Card className="modern-card floating-animation" style={{animationDelay: '0.1s'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-400">
              {gameStats.wins}
            </CardTitle>
            <CardDescription>Побед</CardDescription>
          </CardHeader>
          <CardContent>
            <Icon name="Trophy" className="text-green-400" size={24} />
          </CardContent>
        </Card>

        <Card className="modern-card floating-animation" style={{animationDelay: '0.2s'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold gradient-text">
              {gameStats.winRate}%
            </CardTitle>
            <CardDescription>Процент побед</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={gameStats.winRate} className="w-full" />
          </CardContent>
        </Card>

        <Card className="modern-card floating-animation" style={{animationDelay: '0.3s'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold gradient-text">
              ₽{gameStats.totalEarnings.toLocaleString()}
            </CardTitle>
            <CardDescription>Общий выигрыш</CardDescription>
          </CardHeader>
          <CardContent>
            <Icon name="Coins" className="text-orange-400" size={24} />
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold gradient-text">Рекомендуемые игры</h3>
          <Button variant="outline" onClick={() => setActiveSection('games')} className="interactive-button">
            <Icon name="Grid3X3" className="mr-2" size={16} />
            Все игры
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="modern-card cursor-pointer floating-animation" onClick={() => setActiveSection('slots')}>
            <CardHeader>
              <div className="text-4xl mb-2">🎰</div>
              <CardTitle className="text-lg">Слот-машины</CardTitle>
              <CardDescription>Крутите барабаны и выигрывайте!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full luxury-gradient interactive-button">
                <Icon name="Play" className="mr-2" size={16} />
                Играть
              </Button>
            </CardContent>
          </Card>

          <Card className="modern-card cursor-pointer floating-animation" style={{animationDelay: '0.1s'}} onClick={() => setActiveSection('roulette')}>
            <CardHeader>
              <div className="text-4xl mb-2">🎲</div>
              <CardTitle className="text-lg">Рулетка</CardTitle>
              <CardDescription>Делайте ставки и испытайте удачу!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full luxury-gradient interactive-button">
                <Icon name="Play" className="mr-2" size={16} />
                Играть
              </Button>
            </CardContent>
          </Card>

          <Card className="modern-card cursor-pointer floating-animation" style={{animationDelay: '0.2s'}} onClick={() => setActiveSection('blackjack')}>
            <CardHeader>
              <div className="text-4xl mb-2">🂡</div>
              <CardTitle className="text-lg">Блэкджек</CardTitle>
              <CardDescription>Наберите 21 и обыграйте дилера!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full luxury-gradient interactive-button">
                <Icon name="Play" className="mr-2" size={16} />
                Играть
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="glass-effect rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Быстрые действия</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-16 luxury-gradient flex-col interactive-button" onClick={() => setActiveSection('slots')}>
            <Icon name="Shuffle" size={24} />
            <span className="text-sm mt-1">Слоты</span>
          </Button>
          <Button className="h-16 bg-secondary hover:bg-secondary/90 flex-col interactive-button" onClick={() => setActiveSection('roulette')}>
            <Icon name="CircleDot" size={24} />
            <span className="text-sm mt-1">Рулетка</span>
          </Button>
          <Button className="h-16 bg-accent hover:bg-accent/90 flex-col interactive-button" onClick={() => setActiveSection('blackjack')}>
            <Icon name="Spade" size={24} />
            <span className="text-sm mt-1">Блэкджек</span>
          </Button>
          <Button className="h-16 bg-muted hover:bg-muted/90 text-foreground flex-col interactive-button" onClick={() => setActiveSection('bonuses')}>
            <Icon name="Gift" size={24} />
            <span className="text-sm mt-1">Бонусы</span>
          </Button>
        </div>
      </section>
    </>
  );
}