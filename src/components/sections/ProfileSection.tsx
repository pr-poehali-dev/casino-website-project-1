import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Achievement {
  title: string;
  completed: boolean;
  icon: string;
  reward: number;
}

interface GameStats {
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  totalEarnings: number;
}

interface ProfileSectionProps {
  gameStats: GameStats;
  achievements: Achievement[];
}

export default function ProfileSection({ gameStats, achievements }: ProfileSectionProps) {
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
}