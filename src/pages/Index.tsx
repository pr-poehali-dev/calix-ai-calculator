import { useState } from 'react';
import Layout from '@/components/Layout';
import HomePage from '@/components/HomePage';
import CalculatorPage from '@/components/CalculatorPage';
import AiSolverPage from '@/components/AiSolverPage';
import ProfilePage from '@/components/ProfilePage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'calculator':
        return <CalculatorPage />;
      case 'ai':
        return <AiSolverPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default Index;