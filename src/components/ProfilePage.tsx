import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProfilePageProps {
  user?: { name: string; email: string; hasPremix: boolean } | null;
  energy?: number;
  isLoggedIn?: boolean;
}

export default function ProfilePage({ 
  user = null, 
  energy = 1000, 
  isLoggedIn = false 
}: ProfilePageProps) {
  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card className="glass-effect border-purple-500/30 text-center py-12">
          <CardContent className="space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
              <Icon name="UserX" size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Войдите в аккаунт</h2>
            <p className="text-gray-400">
              Авторизуйтесь, чтобы получить доступ к вашему профилю
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      icon: 'Zap',
      label: 'Энергия',
      value: user.hasPremix ? '∞' : String(energy),
      color: 'text-yellow-400',
      description: user.hasPremix ? 'Безлимитная' : `${energy} из 1000`,
    },
    {
      icon: 'Brain',
      label: 'Вопросов доступно',
      value: user.hasPremix ? '∞' : String(Math.floor(energy / 10)),
      color: 'text-purple-400',
      description: user.hasPremix ? 'Безлимит' : 'По 10 энергии за вопрос',
    },
    {
      icon: 'Gift',
      label: 'PremiX статус',
      value: user.hasPremix ? 'Активен' : 'Не активен',
      color: user.hasPremix ? 'text-green-400' : 'text-gray-400',
      description: user.hasPremix ? 'Все функции разблокированы' : 'Активируйте для безлимита',
    },
  ];

  const energyPercentage = user.hasPremix ? 100 : (energy / 1000) * 100;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      <Card className="glass-effect border-purple-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  {user.name}
                  {user.hasPremix && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">
                      <Icon name="Crown" size={14} className="mr-1" />
                      PremiX
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-gray-400 mt-1">{user.email}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {!user.hasPremix && (
        <Card className="glass-effect border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <CardHeader>
            <CardTitle className="text-xl text-white">Энергия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Текущий уровень</span>
              <span className="font-semibold">{energy} / 1000</span>
            </div>
            <Progress value={energyPercentage} className="h-3" />
            <p className="text-xs text-gray-400">
              Каждый вопрос ИИ стоит 10 энергии. Активируйте PremiX для безлимита!
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-effect border-purple-500/30 hover:border-purple-500/50 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Icon name={stat.icon as any} size={24} className={stat.color} />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm font-medium text-gray-300">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-effect border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-xl text-white">Возможности платформы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { icon: 'Calculator', label: 'Калькулятор', available: true },
              { icon: 'Brain', label: 'ИИ-решатель задач', available: true },
              { icon: 'Zap', label: 'Система энергии', available: true },
              { icon: 'Gift', label: 'Бесплатный PremiX', available: user.hasPremix },
              { icon: 'Crown', label: 'Приоритетная поддержка', available: user.hasPremix },
              { icon: 'Infinity', label: 'Безлимитные запросы', available: user.hasPremix },
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <Icon name={feature.icon as any} size={20} className="text-purple-400" />
                  <span className="text-gray-300">{feature.label}</span>
                </div>
                {feature.available ? (
                  <Icon name="Check" size={20} className="text-green-400" />
                ) : (
                  <Icon name="Lock" size={20} className="text-gray-600" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}