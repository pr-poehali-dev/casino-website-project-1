import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useState } from "react";

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [userBalance, setUserBalance] = useState(125670);

  const gameStats = {
    totalGames: 1247,
    wins: 832,
    losses: 415,
    winRate: 66.7,
    totalEarnings: 45230
  };

  const achievements = [
    { title: "Первая победа", completed: true, icon: "Trophy", reward: 500 },
    { title: "100 игр", completed: true, icon: "Target", reward: 1000 },
    { title: "Лаки страйк", completed: false, icon: "Zap", reward: 2500 },
    { title: "Высокий роллер", completed: false, icon: "Crown", reward: 5000 }
  ];

  const games = [
    { name: "Слот \"Сокровища фараона\"", type: "Слоты", popularity: 95, minBet: 10, maxWin: 50000, image: "🎰" },
    { name: "Европейская рулетка", type: "Рулетка", popularity: 88, minBet: 25, maxWin: 35000, image: "🎲" },
    { name: "Техасский Холдем", type: "Покер", popularity: 92, minBet: 50, maxWin: 100000, image: "♠️" },
    { name: "Блэкджек Классик", type: "Карты", popularity: 85, minBet: 20, maxWin: 25000, image: "🂡" }
  ];

  const bonuses = [
    { title: "Приветственный бонус", amount: "200%", description: "До 50,000₽ на первый депозит", active: true, expires: "3 дня" },
    { title: "Фриспины", amount: "50", description: "Бесплатные вращения на новых слотах", active: true, expires: "1 день" },
    { title: "Кэшбэк", amount: "15%", description: "Возврат с каждой игры", active: false, expires: "Постоянно" }
  ];

  const playGame = (gameName: string) => {
    alert(`Запуск игры: ${gameName}\n\nВ полной версии здесь откроется игровой интерфейс!`);
  };

  const depositFunds = (amount: number) => {
    setUserBalance(prev => prev + amount);
    alert(`Баланс пополнен на ${amount}₽!\nНовый баланс: ${userBalance + amount}₽`);
  };

  const activateBonus = (bonusTitle: string) => {
    alert(`Бонус "${bonusTitle}" активирован!\n\nВы получили дополнительные средства на счет.`);
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Профиль игрока</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Игровая статистика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Всего игр:</span>
                    <Badge variant="secondary">{gameStats.totalGames}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Побед:</span>
                    <Badge className="bg-green-600">{gameStats.wins}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Процент побед:</span>
                    <Badge variant="outline">{gameStats.winRate}%</Badge>
                  </div>
                  <div className="luxury-border"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Общий выигрыш:</span>
                    <span className="gradient-text">₽{gameStats.totalEarnings.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Достижения</CardTitle>
                  <CardDescription>Выполнено: {achievements.filter(a => a.completed).length} из {achievements.length}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-xl ${achievement.completed ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-muted/50'}`}>
                        <div className="flex items-center space-x-3">
                          <Icon name={achievement.icon as any} size={20} className={achievement.completed ? 'text-purple-400' : 'text-muted-foreground'} />
                          <span className={achievement.completed ? 'text-foreground' : 'text-muted-foreground'}>{achievement.title}</span>
                        </div>
                        <Badge className={achievement.completed ? 'luxury-gradient' : 'bg-muted'}>
                          +{achievement.reward}₽
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'games':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Каталог игр</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Все игры</TabsTrigger>
                <TabsTrigger value="slots">Слоты</TabsTrigger>
                <TabsTrigger value="table">Настольные</TabsTrigger>
                <TabsTrigger value="card">Карточные</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {games.map((game, index) => (
                    <Card key={index} className="modern-card cursor-pointer floating-animation" style={{animationDelay: `${index * 0.1}s`}}>
                      <CardHeader>
                        <div className="text-4xl mb-2">{game.image}</div>
                        <CardTitle className="text-lg">{game.name}</CardTitle>
                        <CardDescription>{game.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Мин. ставка:</span>
                            <span className="font-semibold">₽{game.minBet}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Макс. выигрыш:</span>
                            <span className="gradient-text font-semibold">₽{game.maxWin.toLocaleString()}</span>
                          </div>
                          <Progress value={game.popularity} className="h-2" />
                          <Button 
                            className="w-full luxury-gradient interactive-button" 
                            onClick={() => playGame(game.name)}
                          >
                            <Icon name="Play" className="mr-2" size={16} />
                            Играть
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'bonuses':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Бонусы и акции</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bonuses.map((bonus, index) => (
                <Card key={index} className={`modern-card ${bonus.active ? 'pulse-glow' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{bonus.title}</CardTitle>
                      <Badge variant={bonus.active ? "default" : "secondary"} className={bonus.active ? "luxury-gradient" : ""}>
                        {bonus.amount}
                      </Badge>
                    </div>
                    <CardDescription>{bonus.description}</CardDescription>
                    <div className="text-xs text-muted-foreground">
                      Срок: {bonus.expires}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className={`w-full ${bonus.active ? 'luxury-gradient' : ''} interactive-button`}
                      variant={bonus.active ? "default" : "outline"}
                      disabled={!bonus.active}
                      onClick={() => activateBonus(bonus.title)}
                    >
                      <Icon name="Gift" className="mr-2" size={16} />
                      {bonus.active ? 'Активировать' : 'Недоступен'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <>
            {/* Stats Dashboard */}
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

            {/* Featured Games */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text">Рекомендуемые игры</h3>
                <Button variant="outline" onClick={() => setActiveSection('games')} className="interactive-button">
                  <Icon name="Grid3X3" className="mr-2" size={16} />
                  Все игры
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {games.slice(0, 4).map((game, index) => (
                  <Card key={index} className="modern-card cursor-pointer floating-animation" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardHeader>
                      <div className="text-4xl mb-2">{game.image}</div>
                      <CardTitle className="text-lg">{game.name}</CardTitle>
                      <CardDescription>{game.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Популярность</span>
                        <span className="text-sm font-semibold gradient-text">{game.popularity}%</span>
                      </div>
                      <Progress value={game.popularity} className="mb-3" />
                      <Button className="w-full luxury-gradient interactive-button" onClick={() => playGame(game.name)}>
                        <Icon name="Play" className="mr-2" size={16} />
                        Играть
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Быстрые действия</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-16 luxury-gradient flex-col interactive-button" onClick={() => playGame("Случайный слот")}>
                  <Icon name="Shuffle" size={24} />
                  <span className="text-sm mt-1">Слоты</span>
                </Button>
                <Button className="h-16 bg-secondary hover:bg-secondary/90 flex-col interactive-button" onClick={() => playGame("Рулетка")}>
                  <Icon name="CircleDot" size={24} />
                  <span className="text-sm mt-1">Рулетка</span>
                </Button>
                <Button className="h-16 bg-accent hover:bg-accent/90 flex-col interactive-button" onClick={() => playGame("Покер")}>
                  <Icon name="Spade" size={24} />
                  <span className="text-sm mt-1">Покер</span>
                </Button>
                <Button className="h-16 bg-muted hover:bg-muted/90 text-foreground flex-col interactive-button" onClick={() => playGame("Блэкджек")}>
                  <Icon name="CreditCard" size={24} />
                  <span className="text-sm mt-1">Блэкджек</span>
                </Button>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Header */}
      <header className="border-b border-border glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => setActiveSection('home')}>
                LUXURYCARDCLUB
              </h1>
              <nav className="hidden md:flex space-x-6">
                <Button 
                  variant="ghost" 
                  className={`text-foreground hover:text-primary interactive-button ${activeSection === 'home' ? 'text-purple-400' : ''}`}
                  onClick={() => setActiveSection('home')}
                >
                  <Icon name="Home" className="mr-2" size={16} />
                  Главная
                </Button>
                <Button 
                  variant="ghost" 
                  className={`text-foreground hover:text-primary interactive-button ${activeSection === 'games' ? 'text-purple-400' : ''}`}
                  onClick={() => setActiveSection('games')}
                >
                  <Icon name="Gamepad2" className="mr-2" size={16} />
                  Игры
                </Button>
                <Button 
                  variant="ghost" 
                  className={`text-foreground hover:text-primary interactive-button ${activeSection === 'bonuses' ? 'text-purple-400' : ''}`}
                  onClick={() => setActiveSection('bonuses')}
                >
                  <Icon name="Gift" className="mr-2" size={16} />
                  Бонусы
                </Button>
                <Button 
                  variant="ghost" 
                  className={`text-foreground hover:text-primary interactive-button ${activeSection === 'profile' ? 'text-purple-400' : ''}`}
                  onClick={() => setActiveSection('profile')}
                >
                  <Icon name="User" className="mr-2" size={16} />
                  Профиль
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="luxury-glow text-lg px-4 py-2">
                <Icon name="Coins" className="mr-2" size={16} />
                ₽{userBalance.toLocaleString()}
              </Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="luxury-gradient interactive-button">
                    <Icon name="Plus" className="mr-1" size={14} />
                    Пополнить
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-effect">
                  <DialogHeader>
                    <DialogTitle className="gradient-text">Пополнение баланса</DialogTitle>
                    <DialogDescription>
                      Выберите сумму для пополнения вашего игрового счета
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <Button onClick={() => depositFunds(1000)} className="interactive-button" variant="outline">
                      +1,000₽
                    </Button>
                    <Button onClick={() => depositFunds(5000)} className="interactive-button" variant="outline">
                      +5,000₽
                    </Button>
                    <Button onClick={() => depositFunds(10000)} className="luxury-gradient interactive-button">
                      +10,000₽
                    </Button>
                    <Button onClick={() => depositFunds(25000)} className="luxury-gradient interactive-button">
                      +25,000₽
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section - Only show on home */}
        {activeSection === 'home' && (
          <section className="text-center py-16 rounded-3xl luxury-gradient relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 floating-animation">
                Добро пожаловать в LuxuryCardClub
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Премиум игровой опыт с современным дизайном, лучшими играми и мгновенными выплатами
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
        )}

        {/* Dynamic Content */}
        {renderSection()}
      </div>

      {/* Footer */}
      <footer className="glass-effect border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <h4 className="text-xl font-bold gradient-text mb-4">
              LUXURYCARDCLUB
            </h4>
            <p className="text-sm">
              © 2024 LuxuryCardClub. Играйте ответственно. Только 18+
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="ghost" size="sm" className="interactive-button">
                <Icon name="Shield" className="mr-2" size={14} />
                Лицензия
              </Button>
              <Button variant="ghost" size="sm" className="interactive-button">
                <Icon name="HelpCircle" className="mr-2" size={14} />
                Поддержка
              </Button>
              <Button variant="ghost" size="sm" className="interactive-button">
                <Icon name="FileText" className="mr-2" size={14} />
                Правила
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}