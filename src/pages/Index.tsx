import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [userBalance, setUserBalance] = useState(125670);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const [currentBet, setCurrentBet] = useState(100);
  
  // Slot Game State
  const [slotSymbols, setSlotSymbols] = useState(['🍒', '🍋', '🍊']);
  const [slotSpinning, setSlotSpinning] = useState(false);
  
  // Roulette State
  const [rouletteNumber, setRouletteNumber] = useState(0);
  const [rouletteSpinning, setRouletteSpinning] = useState(false);
  const [rouletteBet, setRouletteBet] = useState({ type: 'number', value: 7 });

  // BlackJack State
  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'finished'>('betting');

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

  const paymentMethods = [
    { name: "Банковская карта", icon: "CreditCard", fee: "0%", time: "Мгновенно", popular: true },
    { name: "СБП", icon: "Smartphone", fee: "0%", time: "Мгновенно", popular: true },
    { name: "QIWI", icon: "Wallet", fee: "1%", time: "5 минут", popular: false },
    { name: "WebMoney", icon: "Globe", fee: "2%", time: "10 минут", popular: false },
    { name: "Криптовалюта", icon: "Bitcoin", fee: "0.5%", time: "30 минут", popular: false },
    { name: "Мобильный платеж", icon: "Phone", fee: "3%", time: "Мгновенно", popular: false }
  ];

  // Slot Machine Logic
  const playSlotMachine = () => {
    if (userBalance < currentBet) {
      setGameResult('Недостаточно средств!');
      return;
    }

    setSlotSpinning(true);
    setUserBalance(prev => prev - currentBet);
    
    // Spinning animation
    const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '🍀', '🔔'];
    let spinCount = 0;
    const maxSpins = 20;
    
    const spinInterval = setInterval(() => {
      setSlotSymbols([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      
      spinCount++;
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        
        // Final result
        const finalSymbols = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        setSlotSymbols(finalSymbols);
        
        // Check win conditions
        let winAmount = 0;
        if (finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2]) {
          // Three of a kind
          if (finalSymbols[0] === '💎') winAmount = currentBet * 50;
          else if (finalSymbols[0] === '⭐') winAmount = currentBet * 25;
          else if (finalSymbols[0] === '🔔') winAmount = currentBet * 15;
          else winAmount = currentBet * 10;
        } else if (finalSymbols[0] === finalSymbols[1] || finalSymbols[1] === finalSymbols[2]) {
          // Two of a kind
          winAmount = currentBet * 2;
        }
        
        if (winAmount > 0) {
          setUserBalance(prev => prev + winAmount);
          setGameResult(`Выигрыш: ${winAmount}₽! 🎉`);
        } else {
          setGameResult('Не повезло, попробуйте еще раз!');
        }
        
        setSlotSpinning(false);
      }
    }, 100);
  };

  // Roulette Logic
  const playRoulette = () => {
    if (userBalance < currentBet) {
      setGameResult('Недостаточно средств!');
      return;
    }

    setRouletteSpinning(true);
    setUserBalance(prev => prev - currentBet);
    
    setTimeout(() => {
      const result = Math.floor(Math.random() * 37); // 0-36
      setRouletteNumber(result);
      
      let winAmount = 0;
      if (rouletteBet.type === 'number' && result === rouletteBet.value) {
        winAmount = currentBet * 35;
      } else if (rouletteBet.type === 'red' && result > 0 && [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(result)) {
        winAmount = currentBet * 2;
      } else if (rouletteBet.type === 'black' && result > 0 && ![1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(result)) {
        winAmount = currentBet * 2;
      } else if (rouletteBet.type === 'even' && result > 0 && result % 2 === 0) {
        winAmount = currentBet * 2;
      } else if (rouletteBet.type === 'odd' && result > 0 && result % 2 === 1) {
        winAmount = currentBet * 2;
      }
      
      if (winAmount > 0) {
        setUserBalance(prev => prev + winAmount);
        setGameResult(`Выпало ${result}! Выигрыш: ${winAmount}₽! 🎉`);
      } else {
        setGameResult(`Выпало ${result}. Не повезло!`);
      }
      
      setRouletteSpinning(false);
    }, 2000);
  };

  // BlackJack Logic
  const getCardValue = (card: number) => Math.min(card, 10);
  const getHandValue = (cards: number[]) => cards.reduce((sum, card) => sum + getCardValue(card), 0);

  const startBlackJack = () => {
    if (userBalance < currentBet) {
      setGameResult('Недостаточно средств!');
      return;
    }

    setUserBalance(prev => prev - currentBet);
    const newPlayerCards = [Math.ceil(Math.random() * 13), Math.ceil(Math.random() * 13)];
    const newDealerCards = [Math.ceil(Math.random() * 13)];
    
    setPlayerCards(newPlayerCards);
    setDealerCards(newDealerCards);
    setGameState('playing');
    setGameResult('');
  };

  const hitCard = () => {
    const newCard = Math.ceil(Math.random() * 13);
    const newCards = [...playerCards, newCard];
    setPlayerCards(newCards);
    
    if (getHandValue(newCards) > 21) {
      setGameResult('Перебор! Вы проиграли.');
      setGameState('finished');
    }
  };

  const stand = () => {
    let dealerHand = [...dealerCards];
    
    // Dealer draws cards
    while (getHandValue(dealerHand) < 17) {
      dealerHand.push(Math.ceil(Math.random() * 13));
    }
    
    setDealerCards(dealerHand);
    
    const playerValue = getHandValue(playerCards);
    const dealerValue = getHandValue(dealerHand);
    
    if (dealerValue > 21) {
      setUserBalance(prev => prev + currentBet * 2);
      setGameResult(`Дилер перебрал! Выигрыш: ${currentBet * 2}₽! 🎉`);
    } else if (playerValue > dealerValue) {
      setUserBalance(prev => prev + currentBet * 2);
      setGameResult(`Вы выиграли! Выигрыш: ${currentBet * 2}₽! 🎉`);
    } else if (playerValue === dealerValue) {
      setUserBalance(prev => prev + currentBet);
      setGameResult('Ничья! Ставка возвращена.');
    } else {
      setGameResult('Дилер выиграл!');
    }
    
    setGameState('finished');
  };

  const depositFunds = (amount: number, method: string) => {
    setUserBalance(prev => prev + amount);
    setGameResult(`Баланс пополнен на ${amount}₽ через ${method}!`);
  };

  const activateBonus = (bonusTitle: string) => {
    const bonusAmounts: { [key: string]: number } = {
      "Приветственный бонус": 10000,
      "Фриспины": 2500,
      "Кэшбэк": 1500
    };
    
    const amount = bonusAmounts[bonusTitle] || 1000;
    setUserBalance(prev => prev + amount);
    setGameResult(`Бонус "${bonusTitle}" активирован! +${amount}₽`);
  };

  const renderGameSection = (gameType: string) => {
    switch(gameType) {
      case 'slots':
        return (
          <div className="space-y-6">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-center">🎰 Слот-машина</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center space-x-4 text-6xl p-8 bg-muted/20 rounded-xl">
                  {slotSymbols.map((symbol, index) => (
                    <div key={index} className={`${slotSpinning ? 'animate-bounce' : ''}`}>
                      {symbol}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Ставка:</Label>
                  <Select value={currentBet.toString()} onValueChange={(value) => setCurrentBet(Number(value))}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10₽</SelectItem>
                      <SelectItem value="50">50₽</SelectItem>
                      <SelectItem value="100">100₽</SelectItem>
                      <SelectItem value="500">500₽</SelectItem>
                      <SelectItem value="1000">1000₽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full luxury-gradient" 
                  onClick={playSlotMachine}
                  disabled={slotSpinning}
                >
                  {slotSpinning ? 'Вращение...' : `Крутить (${currentBet}₽)`}
                </Button>
                
                {gameResult && (
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    {gameResult}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'roulette':
        return (
          <div className="space-y-6">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-center">🎲 Рулетка</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-6xl mb-4 ${rouletteSpinning ? 'animate-spin' : ''}`}>
                    🎯
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {rouletteSpinning ? '???' : rouletteNumber}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Тип ставки:</Label>
                    <Select value={rouletteBet.type} onValueChange={(value) => setRouletteBet({...rouletteBet, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="number">Число (35:1)</SelectItem>
                        <SelectItem value="red">Красное (2:1)</SelectItem>
                        <SelectItem value="black">Черное (2:1)</SelectItem>
                        <SelectItem value="even">Четное (2:1)</SelectItem>
                        <SelectItem value="odd">Нечетное (2:1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Ставка:</Label>
                    <Select value={currentBet.toString()} onValueChange={(value) => setCurrentBet(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25₽</SelectItem>
                        <SelectItem value="100">100₽</SelectItem>
                        <SelectItem value="500">500₽</SelectItem>
                        <SelectItem value="1000">1000₽</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {rouletteBet.type === 'number' && (
                  <div>
                    <Label>Выберите число (0-36):</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="36" 
                      value={rouletteBet.value} 
                      onChange={(e) => setRouletteBet({...rouletteBet, value: Number(e.target.value)})}
                    />
                  </div>
                )}
                
                <Button 
                  className="w-full luxury-gradient" 
                  onClick={playRoulette}
                  disabled={rouletteSpinning}
                >
                  {rouletteSpinning ? 'Вращение...' : `Крутить рулетку (${currentBet}₽)`}
                </Button>
                
                {gameResult && (
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    {gameResult}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'blackjack':
        return (
          <div className="space-y-6">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-center">🂡 Блэкджек</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gameState === 'betting' ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Ставка:</Label>
                      <Select value={currentBet.toString()} onValueChange={(value) => setCurrentBet(Number(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20₽</SelectItem>
                          <SelectItem value="100">100₽</SelectItem>
                          <SelectItem value="500">500₽</SelectItem>
                          <SelectItem value="1000">1000₽</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full luxury-gradient" onClick={startBlackJack}>
                      Начать игру ({currentBet}₽)
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <h4 className="font-semibold mb-2">Ваши карты ({getHandValue(playerCards)})</h4>
                        <div className="space-x-2">
                          {playerCards.map((card, index) => (
                            <Badge key={index} variant="outline" className="text-lg p-2">
                              {card > 10 ? ['J','Q','K'][card-11] : card}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h4 className="font-semibold mb-2">Дилер ({getHandValue(dealerCards)})</h4>
                        <div className="space-x-2">
                          {dealerCards.map((card, index) => (
                            <Badge key={index} variant="outline" className="text-lg p-2">
                              {card > 10 ? ['J','Q','K'][card-11] : card}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {gameState === 'playing' && (
                      <div className="flex space-x-2">
                        <Button onClick={hitCard} className="flex-1">
                          Взять карту
                        </Button>
                        <Button onClick={stand} variant="outline" className="flex-1">
                          Остановиться
                        </Button>
                      </div>
                    )}
                    
                    {gameState === 'finished' && (
                      <Button 
                        className="w-full luxury-gradient" 
                        onClick={() => {
                          setGameState('betting');
                          setPlayerCards([]);
                          setDealerCards([]);
                          setGameResult('');
                        }}
                      >
                        Новая игра
                      </Button>
                    )}
                  </div>
                )}
                
                {gameResult && (
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    {gameResult}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSection = () => {
    // Check if we're in a specific game
    if (['slots', 'roulette', 'blackjack'].includes(activeSection)) {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setActiveSection('games')} className="interactive-button">
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад к играм
            </Button>
            <h2 className="text-3xl font-bold gradient-text">
              {activeSection === 'slots' ? 'Слот-машины' : 
               activeSection === 'roulette' ? 'Рулетка' :
               activeSection === 'blackjack' ? 'Блэкджек' : ''}
            </h2>
          </div>
          {renderGameSection(activeSection)}
        </div>
      );
    }

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

            {/* Quick Actions */}
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
                  className={`text-foreground hover:text-primary interactive-button ${['games', 'slots', 'roulette', 'blackjack'].includes(activeSection) ? 'text-purple-400' : ''}`}
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
                <DialogContent className="glass-effect max-w-md">
                  <DialogHeader>
                    <DialogTitle className="gradient-text">Пополнение баланса</DialogTitle>
                    <DialogDescription>
                      Выберите способ пополнения и сумму
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="quick" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="quick">Быстро</TabsTrigger>
                      <TabsTrigger value="methods">Способы</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="quick" className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Button onClick={() => depositFunds(1000, "Быстрое пополнение")} className="interactive-button" variant="outline">
                          +1,000₽
                        </Button>
                        <Button onClick={() => depositFunds(5000, "Быстрое пополнение")} className="interactive-button" variant="outline">
                          +5,000₽
                        </Button>
                        <Button onClick={() => depositFunds(10000, "Быстрое пополнение")} className="luxury-gradient interactive-button">
                          +10,000₽
                        </Button>
                        <Button onClick={() => depositFunds(25000, "Быстрое пополнение")} className="luxury-gradient interactive-button">
                          +25,000₽
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label>Произвольная сумма</Label>
                        <div className="flex space-x-2">
                          <Input placeholder="Введите сумму" type="number" className="flex-1" />
                          <Button className="luxury-gradient">Пополнить</Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="methods" className="space-y-4">
                      <div className="space-y-3">
                        {paymentMethods.map((method, index) => (
                          <Card key={index} className={`p-4 cursor-pointer transition-all hover:bg-muted/20 ${method.popular ? 'border-purple-500/50' : ''}`} 
                                onClick={() => depositFunds(5000, method.name)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Icon name={method.icon as any} size={20} />
                                <div>
                                  <div className="font-medium flex items-center space-x-2">
                                    <span>{method.name}</span>
                                    {method.popular && <Badge className="luxury-gradient text-xs">Популярно</Badge>}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Комиссия: {method.fee} • {method.time}
                                  </div>
                                </div>
                              </div>
                              <Icon name="ChevronRight" size={16} />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
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
        )}

        {/* Dynamic Content */}
        {renderSection()}
        
        {/* Game Result Notification */}
        {gameResult && activeSection === 'home' && (
          <div className="fixed bottom-4 right-4 z-50">
            <Card className="modern-card luxury-glow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Bell" size={16} />
                  <span className="text-sm">{gameResult}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
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
                Поддержка 24/7
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