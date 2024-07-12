import { useState, useEffect } from 'react';

export interface CustomSwitchProps {
    checked: boolean;
    onChange: () => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  );
};

const ThemeToggle = () => {
  const [isRickAndMortyTheme, setIsRickAndMortyTheme] = useState(false);

  useEffect(() => {
    if (isRickAndMortyTheme) {
      document.body.classList.add('rick-and-morty-theme');
    } else {
      document.body.classList.remove('rick-and-morty-theme');
    }
  }, [isRickAndMortyTheme]);

  const toggleTheme = () => {
    setIsRickAndMortyTheme(prev => !prev);
  };

  return (
    <div className="theme-toggle">
      <CustomSwitch checked={isRickAndMortyTheme} onChange={toggleTheme} />
      <span>{isRickAndMortyTheme ? 'Rick and Morty' : '"Normal"'} Theme</span>
    </div>
  );
};

export default ThemeToggle;