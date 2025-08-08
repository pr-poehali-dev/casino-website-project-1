import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import DepositDialog from "@/components/DepositDialog";
import WithdrawDialog from "@/components/WithdrawDialog";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userBalance: number;
  depositedBalance: number;
  winningsBalance: number;
  depositFunds: (amount: number, method: string) => void;
  withdrawFunds: (amount: number, method: string) => void;
}

export default function Header({ activeSection, setActiveSection, userBalance, depositedBalance, winningsBalance, depositFunds, withdrawFunds }: HeaderProps) {
  return (
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
            <DepositDialog userBalance={userBalance} depositFunds={depositFunds}>
              <Button size="sm" className="luxury-gradient interactive-button">
                <Icon name="Plus" className="mr-1" size={14} />
                Пополнить
              </Button>
            </DepositDialog>
            <WithdrawDialog depositedBalance={depositedBalance} winningsBalance={winningsBalance} withdrawFunds={withdrawFunds}>
              <Button size="sm" variant="outline" className="interactive-button">
                <Icon name="Minus" className="mr-1" size={14} />
                Вывести
              </Button>
            </WithdrawDialog>
          </div>
        </div>
      </div>
    </header>
  );
}