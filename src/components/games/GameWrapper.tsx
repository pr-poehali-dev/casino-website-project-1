import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import GameSlots from "@/components/games/GameSlots";
import GameRoulette from "@/components/games/GameRoulette";
import GameBlackjack from "@/components/games/GameBlackjack";

interface GameWrapperProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
  gameResult: string;
  setGameResult: React.Dispatch<React.SetStateAction<string>>;
}

export default function GameWrapper({ 
  activeSection, 
  setActiveSection, 
  userBalance, 
  setUserBalance, 
  gameResult, 
  setGameResult 
}: GameWrapperProps) {
  const renderGameSection = (gameType: string) => {
    switch(gameType) {
      case 'slots':
        return <GameSlots userBalance={userBalance} setUserBalance={setUserBalance} gameResult={gameResult} setGameResult={setGameResult} />;
      case 'roulette':
        return <GameRoulette userBalance={userBalance} setUserBalance={setUserBalance} gameResult={gameResult} setGameResult={setGameResult} />;
      case 'blackjack':
        return <GameBlackjack userBalance={userBalance} setUserBalance={setUserBalance} gameResult={gameResult} setGameResult={setGameResult} />;
      default:
        return null;
    }
  };

  if (!['slots', 'roulette', 'blackjack'].includes(activeSection)) {
    return null;
  }

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