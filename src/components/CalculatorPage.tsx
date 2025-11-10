import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleEquals = () => {
    try {
      const fullEquation = equation + display;
      const result = eval(fullEquation.replace(/×/g, '*').replace(/÷/g, '/'));
      setDisplay(String(result));
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Ошибка');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setIsNewNumber(false);
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const buttons = [
    { label: 'C', action: handleClear, className: 'bg-red-500/20 hover:bg-red-500/30 text-red-400' },
    { label: '←', action: handleBackspace, className: 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400' },
    { label: '%', action: () => handleOperator('%'), className: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400' },
    { label: '÷', action: () => handleOperator('÷'), className: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400' },
    
    { label: '7', action: () => handleNumber('7'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '8', action: () => handleNumber('8'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '9', action: () => handleNumber('9'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '×', action: () => handleOperator('×'), className: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400' },
    
    { label: '4', action: () => handleNumber('4'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '5', action: () => handleNumber('5'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '6', action: () => handleNumber('6'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '-', action: () => handleOperator('-'), className: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400' },
    
    { label: '1', action: () => handleNumber('1'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '2', action: () => handleNumber('2'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '3', action: () => handleNumber('3'), className: 'bg-white/5 hover:bg-white/10' },
    { label: '+', action: () => handleOperator('+'), className: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400' },
    
    { label: '0', action: () => handleNumber('0'), className: 'bg-white/5 hover:bg-white/10 col-span-2' },
    { label: '.', action: handleDecimal, className: 'bg-white/5 hover:bg-white/10' },
    { label: '=', action: handleEquals, className: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' },
  ];

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <Card className="glass-effect border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text text-center">Калькулятор</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-black/30 rounded-lg p-6 space-y-2">
            {equation && (
              <div className="text-sm text-gray-400 text-right min-h-6">{equation}</div>
            )}
            <div className="text-4xl font-bold text-white text-right break-all">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, index) => (
              <Button
                key={index}
                onClick={btn.action}
                className={`h-16 text-xl font-semibold ${btn.className} ${
                  btn.label === '0' ? 'col-span-2' : ''
                }`}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
