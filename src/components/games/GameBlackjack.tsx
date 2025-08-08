import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface GameBlackjackProps {
  userBalance: number;
  setUserBalance: (value: number | ((prev: number) => number)) => void;
  gameResult: string;
  setGameResult: (result: string) => void;
}

export default function GameBlackjack({ userBalance, setUserBalance, gameResult, setGameResult }: GameBlackjackProps) {
  const [currentBet, setCurrentBet] = useState(100);
  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'finished'>('betting');

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
}