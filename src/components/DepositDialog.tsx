import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface DepositDialogProps {
  userBalance: number;
  depositFunds: (amount: number, method: string) => void;
  children: React.ReactNode;
}

export default function DepositDialog({ depositFunds, children }: DepositDialogProps) {
  const paymentMethods = [
    { name: "Банковская карта", icon: "CreditCard", fee: "0%", time: "Мгновенно", popular: true },
    { name: "СБП", icon: "Smartphone", fee: "0%", time: "Мгновенно", popular: true },
    { name: "QIWI", icon: "Wallet", fee: "1%", time: "5 минут", popular: false },
    { name: "WebMoney", icon: "Globe", fee: "2%", time: "10 минут", popular: false },
    { name: "Криптовалюта", icon: "Bitcoin", fee: "0.5%", time: "30 минут", popular: false },
    { name: "Мобильный платеж", icon: "Phone", fee: "3%", time: "Мгновенно", popular: false }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
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
  );
}