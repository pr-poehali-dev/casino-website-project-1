import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Bonus {
  title: string;
  amount: string;
  description: string;
  active: boolean;
  expires: string;
}

interface BonusesSectionProps {
  bonuses: Bonus[];
  activateBonus: (bonusTitle: string) => void;
}

export default function BonusesSection({ bonuses, activateBonus }: BonusesSectionProps) {
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
}