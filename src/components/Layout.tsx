import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  user: { name: string; email: string; hasPremix: boolean } | null;
  energy: number;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  onActivatePremix: () => void;
  onLogout: () => void;
}

export default function Layout({ 
  children, 
  currentPage, 
  onNavigate,
  isLoggedIn,
  user,
  energy,
  onLogin,
  onRegister,
  onActivatePremix,
  onLogout
}: LayoutProps) {
  const { toast } = useToast();

  const handleLogin = (email: string, password: string) => {
    onLogin(email, password);
    toast({ title: 'Вход выполнен!', description: 'Добро пожаловать в CaliX' });
  };

  const handleRegister = (name: string, email: string, password: string) => {
    onRegister(name, email, password);
    toast({ title: 'Регистрация успешна!', description: 'Ваш аккаунт создан' });
  };

  const handleActivatePremix = () => {
    onActivatePremix();
    toast({
      title: '🎉 PremiX активирован!',
      description: 'Теперь у вас безлимитная энергия!',
    });
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'calculator', label: 'Калькулятор', icon: 'Calculator' },
    { id: 'ai', label: 'ИИ-решатель', icon: 'Brain' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">CaliX</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {isLoggedIn && user && (
                <div className="hidden md:flex items-center gap-3 px-4 py-2 glass-effect rounded-lg">
                  <Icon name="Zap" size={18} className="text-yellow-400" />
                  <span className="font-semibold text-white">
                    {user.hasPremix ? '∞' : energy}
                  </span>
                </div>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 hover:scale-110 transition-transform animate-pulse-glow"
                  >
                    <Icon name="Gift" size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a1a] border-purple-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-2xl gradient-text">Бесплатный PremiX!</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-gray-300">
                      Активируйте PremiX и получите:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-green-400" />
                        Безлимитная энергия
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-green-400" />
                        Неограниченные вопросы ИИ
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-green-400" />
                        Приоритетная поддержка
                      </li>
                    </ul>
                    <Button
                      onClick={handleActivatePremix}
                      disabled={!isLoggedIn || user?.hasPremix}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {!isLoggedIn
                        ? 'Войдите, чтобы активировать'
                        : user?.hasPremix
                        ? 'PremiX уже активирован'
                        : 'Активировать PremiX'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {!isLoggedIn ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1a1a1a] border-purple-500/30">
                    <Tabs defaultValue="login">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4">
                        <DialogHeader>
                          <DialogTitle>Вход в CaliX</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email" type="email" placeholder="your@email.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="login-password">Пароль</Label>
                            <Input id="login-password" type="password" />
                          </div>
                          <Button
                            onClick={() => handleLogin('user@example.com', 'password')}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                          >
                            Войти
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4">
                        <DialogHeader>
                          <DialogTitle>Создать аккаунт</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="register-name">Имя</Label>
                            <Input id="register-name" placeholder="Ваше имя" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-email">Email</Label>
                            <Input id="register-email" type="email" placeholder="your@email.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-password">Пароль</Label>
                            <Input id="register-password" type="password" />
                          </div>
                          <Button
                            onClick={() => handleRegister('User', 'user@example.com', 'password')}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                          >
                            Зарегистрироваться
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    onLogout();
                    toast({ title: 'Выход выполнен' });
                  }}
                  className="border-purple-500/50 hover:bg-purple-500/10"
                >
                  <Icon name="LogOut" size={18} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 py-2">
        <nav className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                currentPage === item.id ? 'text-purple-400' : 'text-gray-400'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}