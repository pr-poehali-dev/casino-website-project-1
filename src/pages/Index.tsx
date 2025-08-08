import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";

// Import layout components
import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/HeroSection";
import Footer from "@/components/layout/Footer";

// Import section components
import StatsDashboard from "@/components/sections/StatsDashboard";
import ProfileSection from "@/components/sections/ProfileSection";
import GamesSection from "@/components/sections/GamesSection";
import BonusesSection from "@/components/sections/BonusesSection";

// Import game components
import GameWrapper from "@/components/games/GameWrapper";
import DepositDialog from "@/components/DepositDialog";

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [depositedBalance, setDepositedBalance] = useState(25670); // Только пополненные средства
  const [winningsBalance, setWinningsBalance] = useState(100000); // Только выигрыши
  const [gameResult, setGameResult] = useState('');
  
  // Общий баланс для отображения
  const userBalance = depositedBalance + winningsBalance;

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

  const bonuses = [
    { title: "Приветственный бонус", amount: "200%", description: "До 50,000₽ на первый депозит", active: true, expires: "3 дня" },
    { title: "Фриспины", amount: "50", description: "Бесплатные вращения на новых слотах", active: true, expires: "1 день" },
    { title: "Кэшбэк", amount: "15%", description: "Возврат с каждой игры", active: false, expires: "Постоянно" }
  ];

  const depositFunds = (amount: number, method: string) => {
    setDepositedBalance(prev => prev + amount);
    setGameResult(`Баланс пополнен на ${amount}₽ через ${method}!`);
  };

  const withdrawFunds = (amount: number, method: string) => {
    if (amount <= depositedBalance) {
      setDepositedBalance(prev => prev - amount);
      setGameResult(`Выведено ${amount}₽ через ${method}. Средства поступят в течение указанного времени.`);
      // Здесь владелец получает эти средства на свой счет
    }
  };

  const activateBonus = (bonusTitle: string) => {
    const bonusAmounts: { [key: string]: number } = {
      "Приветственный бонус": 10000,
      "Фриспины": 2500,
      "Кэшбэк": 1500
    };
    
    const amount = bonusAmounts[bonusTitle] || 1000;
    setWinningsBalance(prev => prev + amount); // Бонусы как выигрыши - не выводятся
    setGameResult(`Бонус "${bonusTitle}" активирован! +${amount}₽`);
  };

  const renderSection = () => {
    // Check if we're in a specific game
    if (['slots', 'roulette', 'blackjack'].includes(activeSection)) {
      return (
        <GameWrapper 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          userBalance={userBalance}
          setUserBalance={(newBalance: number) => {
            // При выигрыше - добавляем к выигрышам, при проигрыше - тратим общий баланс пропорционально
            const difference = newBalance - userBalance;
            if (difference > 0) {
              // Выигрыш - добавляем к выигрышам
              setWinningsBalance(prev => prev + difference);
            } else {
              // Проигрыш - тратим сначала выигрыши, потом депозит
              const loss = Math.abs(difference);
              if (winningsBalance >= loss) {
                setWinningsBalance(prev => prev - loss);
              } else {
                const remainingLoss = loss - winningsBalance;
                setWinningsBalance(0);
                setDepositedBalance(prev => Math.max(0, prev - remainingLoss));
              }
            }
          }}
          gameResult={gameResult}
          setGameResult={setGameResult}
        />
      );
    }

    switch(activeSection) {
      case 'profile':
        return (
          <ProfileSection 
            gameStats={gameStats}
            achievements={achievements}
          />
        );

      case 'games':
        return (
          <GamesSection setActiveSection={setActiveSection} />
        );

      case 'bonuses':
        return (
          <BonusesSection 
            bonuses={bonuses}
            activateBonus={activateBonus}
          />
        );

      default:
        return (
          <StatsDashboard 
            gameStats={gameStats}
            setActiveSection={setActiveSection}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userBalance={userBalance}
        depositedBalance={depositedBalance}
        winningsBalance={winningsBalance}
        depositFunds={depositFunds}
        withdrawFunds={withdrawFunds}
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section - Only show on home */}
        {activeSection === 'home' && (
          <HeroSection setActiveSection={setActiveSection} />
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

      <Footer />
    </div>
  );
}