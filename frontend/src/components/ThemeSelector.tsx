import { Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';

const ThemeSelector = () => {
  const {theme,setTheme} = useThemeStore();

  
  const themes = [
    { name: 'light', label: 'Light', color: '#ffffff' },
    { name: 'dark', label: 'Dark', color: '#1d232a' },
    { name: 'cupcake', label: 'Cupcake', color: '#fae8ff' },
    { name: 'cyberpunk', label: 'Cyberpunk', color: '#ffee00' },
    { name: 'valentine', label: 'Valentine', color: '#ffc0cb' },
    { name: 'aqua', label: 'Aqua', color: '#09ecf3' },
  ];

 

  return (
    <div className="dropdown dropdown-end">
     
     
    </div>
  );
};

export default ThemeSelector;
