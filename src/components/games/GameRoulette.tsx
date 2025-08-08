import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface GameRouletteProps {
  userBalance: number;
  setUserBalance: (value: number | ((prev: number) => number)) => void;
  gameResult: string;
  setGameResult: (result: string) => void;
}

export default function GameRoulette({ userBalance, setUserBalance, gameResult, setGameResult }: GameRouletteProps) {
  const [currentBet, setCurrentBet] = useState(100);
  const [rouletteNumber, setRouletteNumber] = useState(0);
  const [rouletteSpinning, setRouletteSpinning] = useState(false);
  const [rouletteBet, setRouletteBet] = useState({ type: 'number', value: 7 });

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
}