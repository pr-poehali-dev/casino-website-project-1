import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface GameSlotsProps {
  userBalance: number;
  setUserBalance: (value: number | ((prev: number) => number)) => void;
  gameResult: string;
  setGameResult: (result: string) => void;
}

export default function GameSlots({ userBalance, setUserBalance, gameResult, setGameResult }: GameSlotsProps) {
  const [currentBet, setCurrentBet] = useState(100);
  const [slotSymbols, setSlotSymbols] = useState(['🍒', '🍋', '🍊']);
  const [slotSpinning, setSlotSpinning] = useState(false);

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
}