import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

export default function Index() {
  const gameStats = {
    totalGames: 1247,
    wins: 832,
    losses: 415,
    winRate: 66.7,
    totalEarnings: 45230
  };

  const achievements = [
    { title: "Первая победа", completed: true, icon: "Trophy" },
    { title: "100 игр", completed: true, icon: "Target" },
    { title: "Лаки страйк", completed: false, icon: "Zap" },
    { title: "Высокий роллер", completed: false, icon: "Crown" }
  ];

  const games = [
    { name: "Слот \"Сокровища фараона\"", type: "Слоты", popularity: 95, image: "🎰" },
    { name: "Европейская рулетка", type: "Рулетка", popularity: 88, image: "🎲" },
    { name: "Техасский Холдем", type: "Покер", popularity: 92, image: "♠️" },
    { name: "Блэкджек Классик", type: "Карты", popularity: 85, image: "🂡" }
  ];

  const bonuses = [
    { title: "Приветственный бонус", amount: "200%", description: "До 50,000₽ на первый депозит" },
    { title: "Фриспины", amount: "50", description: "Бесплатные вращения на новых слотах" },
    { title: "Кэшбэк", amount: "15%", description: "Возврат с каждой игры" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold casino-gradient bg-clip-text text-transparent">
                CASINO ROYAL
              </h1>
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <Icon name="Home" className="mr-2" size={16} />
                  Главная
                </Button>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <Icon name="Gamepad2" className="mr-2" size={16} />
                  Игры
                </Button>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <Icon name="Gift" className="mr-2" size={16} />
                  Бонусы
                </Button>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <Icon name="User" className="mr-2" size={16} />
                  Профиль
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="casino-glow">
                <Icon name="Coins" className="mr-1" size={14} />
                125,670₽
              </Badge>
              <Button size="sm" className="casino-gradient">
                <Icon name="Plus" className="mr-1" size={14} />
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12 rounded-2xl casino-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
              Добро пожаловать в Casino Royal
            </h2>
            <p className="text-lg md:text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Премиум игровой опыт с лучшими играми, щедрыми бонусами и мгновенными выплатами
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90">
                <Icon name="Play" className="mr-2" size={18} />
                Начать играть
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                <Icon name="Gift" className="mr-2" size={18} />
                Получить бонус
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="game-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">
                {gameStats.totalGames}
              </CardTitle>
              <CardDescription>Всего игр</CardDescription>
            </CardHeader>
            <CardContent>
              <Icon name="Gamepad2" className="text-muted-foreground" size={24} />
            </CardContent>
          </Card>

          <Card className="game-card">
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

          <Card className="game-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-secondary">
                {gameStats.winRate}%
              </CardTitle>
              <CardDescription>Процент побед</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={gameStats.winRate} className="w-full" />
            </CardContent>
          </Card>

          <Card className="game-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">
                ₽{gameStats.totalEarnings.toLocaleString()}
              </CardTitle>
              <CardDescription>Общий выигрыш</CardDescription>
            </CardHeader>
            <CardContent>
              <Icon name="Coins" className="text-primary" size={24} />
            </CardContent>
          </Card>
        </section>

        {/* Games Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Популярные игры</h3>
            <Button variant="outline">
              <Icon name="Grid3X3" className="mr-2" size={16} />
              Все игры
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <Card key={index} className="game-card cursor-pointer">
                <CardHeader>
                  <div className="text-4xl mb-2">{game.image}</div>
                  <CardTitle className="text-lg">{game.name}</CardTitle>
                  <CardDescription>{game.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Популярность</span>
                    <span className="text-sm font-semibold">{game.popularity}%</span>
                  </div>
                  <Progress value={game.popularity} className="mb-3" />
                  <Button className="w-full casino-gradient">
                    <Icon name="Play" className="mr-2" size={16} />
                    Играть
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bonuses Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Активные бонусы</h3>
            <Button variant="outline">
              <Icon name="Gift" className="mr-2" size={16} />
              Все бонусы
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonuses.map((bonus, index) => (
              <Card key={index} className="game-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{bonus.title}</CardTitle>
                    <Badge variant="secondary" className="casino-glow text-lg px-3 py-1">
                      {bonus.amount}
                    </Badge>
                  </div>
                  <CardDescription>{bonus.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Icon name="Gift" className="mr-2" size={16} />
                    Активировать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Достижения</h3>
            <Button variant="outline">
              <Icon name="Award" className="mr-2" size={16} />
              Все достижения
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`game-card ${achievement.completed ? 'casino-glow' : 'opacity-50'}`}>
                <CardHeader className="text-center">
                  <div className={`text-3xl mb-2 ${achievement.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                    <Icon name={achievement.icon as any} size={32} className="mx-auto" />
                  </div>
                  <CardTitle className={`text-lg ${achievement.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {achievement.completed ? (
                    <Badge className="casino-gradient">
                      <Icon name="Check" className="mr-1" size={14} />
                      Получено
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Icon name="Lock" className="mr-1" size={14} />
                      Заблокировано
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Быстрые действия</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 casino-gradient flex-col">
              <Icon name="Shuffle" size={24} />
              <span className="text-sm mt-1">Слоты</span>
            </Button>
            <Button className="h-16 bg-secondary hover:bg-secondary/90 flex-col">
              <Icon name="CircleDot" size={24} />
              <span className="text-sm mt-1">Рулетка</span>
            </Button>
            <Button className="h-16 bg-accent hover:bg-accent/90 flex-col">
              <Icon name="Spade" size={24} />
              <span className="text-sm mt-1">Покер</span>
            </Button>
            <Button className="h-16 bg-muted hover:bg-muted/90 text-foreground flex-col">
              <Icon name="CreditCard" size={24} />
              <span className="text-sm mt-1">Блэкджек</span>
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <h4 className="text-xl font-bold casino-gradient bg-clip-text text-transparent mb-4">
              CASINO ROYAL
            </h4>
            <p className="text-sm">
              © 2024 Casino Royal. Играйте ответственно. Только 18+
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="ghost" size="sm">
                <Icon name="Shield" className="mr-2" size={14} />
                Лицензия
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="HelpCircle" className="mr-2" size={14} />
                Поддержка
              </Button>
              <Button variant="ghost" size="sm">
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