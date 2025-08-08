import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

interface WithdrawDialogProps {
  depositedBalance: number;
  winningsBalance: number;
  withdrawFunds: (amount: number, method: string) => void;
  children: React.ReactNode;
}

export default function WithdrawDialog({ depositedBalance, winningsBalance, withdrawFunds, children }: WithdrawDialogProps) {
  const withdrawMethods = [
    { name: "Банковская карта", icon: "CreditCard", fee: "2%", time: "1-3 дня", popular: true },
    { name: "СБП", icon: "Smartphone", fee: "1%", time: "Мгновенно", popular: true },
    { name: "QIWI", icon: "Wallet", fee: "3%", time: "30 минут", popular: false },
    { name: "WebMoney", icon: "Globe", fee: "4%", time: "1 час", popular: false },
    { name: "Криптовалюта", icon: "Bitcoin", fee: "1.5%", time: "1-2 часа", popular: false }
  ];

  const availableForWithdraw = depositedBalance;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-effect max-w-md">
        <DialogHeader>
          <DialogTitle className="gradient-text">Вывод средств</DialogTitle>
          <DialogDescription>
            К выводу доступны только пополненные средства
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Balance Information */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <div className="text-sm text-muted-foreground">Пополнено</div>
              <div className="text-lg font-bold text-green-400">₽{depositedBalance.toLocaleString()}</div>
              <div className="text-xs text-green-400">Доступно к выводу</div>
            </Card>
            <Card className="p-3">
              <div className="text-sm text-muted-foreground">Выиграно</div>
              <div className="text-lg font-bold text-orange-400">₽{winningsBalance.toLocaleString()}</div>
              <div className="text-xs text-orange-400">Только для игры</div>
            </Card>
          </div>

          {availableForWithdraw > 0 ? (
            <Tabs defaultValue="quick" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="quick">Быстро</TabsTrigger>
                <TabsTrigger value="methods">Способы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quick" className="space-y-4">
                <Alert>
                  <Icon name="AlertCircle" className="h-4 w-4" />
                  <AlertDescription>
                    Комиссия за вывод: 1-4% в зависимости от способа
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => withdrawFunds(Math.min(1000, availableForWithdraw), "Быстрый вывод")} 
                    className="interactive-button" 
                    variant="outline"
                    disabled={availableForWithdraw < 1000}
                  >
                    ₽1,000
                  </Button>
                  <Button 
                    onClick={() => withdrawFunds(Math.min(5000, availableForWithdraw), "Быстрый вывод")} 
                    className="interactive-button" 
                    variant="outline"
                    disabled={availableForWithdraw < 5000}
                  >
                    ₽5,000
                  </Button>
                  <Button 
                    onClick={() => withdrawFunds(Math.min(10000, availableForWithdraw), "Быстрый вывод")} 
                    className="luxury-gradient interactive-button"
                    disabled={availableForWithdraw < 10000}
                  >
                    ₽10,000
                  </Button>
                  <Button 
                    onClick={() => withdrawFunds(availableForWithdraw, "Полный вывод")} 
                    className="luxury-gradient interactive-button"
                  >
                    Всё
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Произвольная сумма (макс. ₽{availableForWithdraw.toLocaleString()})</Label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Введите сумму" 
                      type="number" 
                      className="flex-1"
                      max={availableForWithdraw}
                    />
                    <Button className="luxury-gradient">Вывести</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="methods" className="space-y-4">
                <div className="space-y-3">
                  {withdrawMethods.map((method, index) => (
                    <Card key={index} className={`p-4 cursor-pointer transition-all hover:bg-muted/20 ${method.popular ? 'border-purple-500/50' : ''}`} 
                          onClick={() => withdrawFunds(availableForWithdraw, method.name)}>
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
          ) : (
            <Alert>
              <Icon name="AlertTriangle" className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div>У вас нет средств, доступных для вывода.</div>
                  <div className="text-sm">
                    <strong>Правила вывода:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Выводятся только пополненные средства</li>
                      <li>Выигрыши остаются на счете для игры</li>
                      <li>Минимум для вывода: ₽100</li>
                    </ul>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}