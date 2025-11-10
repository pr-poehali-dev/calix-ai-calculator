import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: 'Brain',
      title: 'ИИ-решатель',
      description: 'Решайте задачи любой сложности с помощью продвинутого искусственного интеллекта',
      action: () => onNavigate('ai'),
    },
    {
      icon: 'Calculator',
      title: 'Калькулятор',
      description: 'Быстрые вычисления и расчёты прямо в браузере',
      action: () => onNavigate('calculator'),
    },
    {
      icon: 'Zap',
      title: 'Система энергии',
      description: '1000 единиц энергии для решения задач или безлимит с PremiX',
      action: () => {},
    },
    {
      icon: 'Gift',
      title: 'PremiX подписка',
      description: 'Бесплатная подписка с безграничными возможностями',
      action: () => {},
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl md:text-7xl font-bold gradient-text">
          Решайте задачи с CaliX
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Мощная платформа для решения математических задач, вычислений и работы с искусственным интеллектом
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button
            onClick={() => onNavigate('ai')}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8"
          >
            <Icon name="Brain" size={24} className="mr-2" />
            Начать с ИИ
          </Button>
          <Button
            onClick={() => onNavigate('calculator')}
            size="lg"
            variant="outline"
            className="border-purple-500/50 hover:bg-purple-500/10 text-lg px-8"
          >
            <Icon name="Calculator" size={24} className="mr-2" />
            Калькулятор
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="glass-effect border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer hover:scale-105 group"
            onClick={feature.action}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <Icon name={feature.icon as any} size={28} className="text-white" />
              </div>
              <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="glass-effect rounded-2xl p-8 md:p-12 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Что такое <span className="gradient-text">PremiX</span>?
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          PremiX — это бесплатная премиум-подписка, которая дает вам неограниченный доступ ко всем функциям платформы. 
          Безлимитная энергия, приоритетная обработка запросов и многое другое!
        </p>
        <div className="grid md:grid-cols-3 gap-6 pt-6">
          <div className="space-y-2">
            <div className="text-4xl font-bold gradient-text">∞</div>
            <p className="text-white font-semibold">Безлимитная энергия</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold gradient-text">24/7</div>
            <p className="text-white font-semibold">Круглосуточный доступ</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold gradient-text">0₽</div>
            <p className="text-white font-semibold">Полностью бесплатно</p>
          </div>
        </div>
      </section>
    </div>
  );
}
