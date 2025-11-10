import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AiSolverPageProps {
  energy?: number;
  hasPremix?: boolean;
  onEnergyChange?: (newEnergy: number) => void;
  isLoggedIn?: boolean;
}

export default function AiSolverPage({ 
  energy = 1000, 
  hasPremix = false, 
  onEnergyChange = () => {}, 
  isLoggedIn = false 
}: AiSolverPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Привет! Я ИИ-помощник CaliX. Задай мне любой вопрос или задачу, и я помогу тебе с решением!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    if (!isLoggedIn) {
      toast({
        title: 'Требуется авторизация',
        description: 'Войдите в аккаунт, чтобы использовать ИИ-решатель',
        variant: 'destructive',
      });
      return;
    }

    if (!hasPremix && energy < 10) {
      toast({
        title: 'Недостаточно энергии',
        description: 'Активируйте PremiX для безлимитного доступа',
        variant: 'destructive',
      });
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    if (!hasPremix) {
      onEnergyChange(energy - 10);
    }

    try {
      const response = await fetch('https://functions.poehali.dev/91f717e7-36c7-4658-90ab-193a67a57805', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при обращении к ИИ');
      }

      const aiResponse: Message = {
        role: 'ai',
        content: data.answer,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'ai',
        content: `Извините, произошла ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      if (!hasPremix) {
        onEnergyChange(energy + 10);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const energyPercentage = hasPremix ? 100 : (energy / 1000) * 100;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      <Card className="glass-effect border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl gradient-text">ИИ-решатель задач</CardTitle>
            <div className="flex items-center gap-3 px-4 py-2 glass-effect rounded-lg">
              <Icon name="Zap" size={20} className="text-yellow-400" />
              <span className="font-bold text-white">
                {hasPremix ? '∞' : energy}
              </span>
            </div>
          </div>
          {!hasPremix && (
            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Энергия</span>
                <span>{energy} / 1000</span>
              </div>
              <Progress value={energyPercentage} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'ai' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Brain" size={20} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'glass-effect text-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={20} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Icon name="Brain" size={20} className="text-white" />
                  </div>
                  <div className="glass-effect rounded-2xl px-4 py-3">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-3 mt-6">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Задайте вопрос или опишите задачу..."
              className="resize-none bg-white/5 border-purple-500/30 focus:border-purple-500/50"
              rows={3}
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-auto px-6"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center">
            {hasPremix
              ? '✨ У вас безлимитная энергия с PremiX'
              : `Каждый вопрос требует 10 энергии. Осталось ${Math.floor(energy / 10)} вопросов.`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}