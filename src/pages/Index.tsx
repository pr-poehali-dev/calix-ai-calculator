import { useState } from 'react';
import Layout from '@/components/Layout';
import HomePage from '@/components/HomePage';
import CalculatorPage from '@/components/CalculatorPage';
import AiSolverPage from '@/components/AiSolverPage';
import ProfilePage from '@/components/ProfilePage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; hasPremix: boolean } | null>(null);
  const [energy, setEnergy] = useState(1000);

  const handleLogin = (email: string, password: string) => {
    setUser({ name: 'User', email, hasPremix: false });
    setIsLoggedIn(true);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setUser({ name, email, hasPremix: false });
    setIsLoggedIn(true);
    setEnergy(1000);
  };

  const handleActivatePremix = () => {
    if (user) {
      setUser({ ...user, hasPremix: true });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setEnergy(1000);
  };

  const handleEnergyChange = (newEnergy: number) => {
    setEnergy(newEnergy);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'calculator':
        return <CalculatorPage />;
      case 'ai':
        return (
          <AiSolverPage
            energy={energy}
            hasPremix={user?.hasPremix || false}
            onEnergyChange={handleEnergyChange}
            isLoggedIn={isLoggedIn}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            user={user}
            energy={energy}
            isLoggedIn={isLoggedIn}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      isLoggedIn={isLoggedIn}
      user={user}
      energy={energy}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onActivatePremix={handleActivatePremix}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
};

export default Index;