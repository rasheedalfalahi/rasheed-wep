import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLenis } from '../lib/lenis';
import ShortcutHelp from './ShortcutHelp';

export default function ShortcutManager() {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    let keys: string[] = [];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      // Special handling for Esc to close help modal
      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false);
        return;
      }

      keys.push(e.key.toLowerCase());
      if (keys.length > 2) keys.shift();

      const combo = keys.join('');

      // Help Modal
      if (e.key === '?' || combo === '??') {
        setShowHelp(prev => !prev);
      }

      // Navigation combos
      const lenis = getLenis();
      if (combo === 'gh') {
        navigate('/');
        lenis?.scrollTo(0);
      }
      if (combo === 'gp') {
        navigate('/projects');
        lenis?.scrollTo(0);
      }
      if (combo === 'gc') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          lenis?.scrollTo(contactSection);
        }
      }

      // Single keys
      if (e.key === 'Home') {
        e.preventDefault();
        lenis?.scrollTo(0);
      }
    };

    const handleKeyUp = () => {
      setTimeout(() => { keys = []; }, 500); 
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [navigate, showHelp]);

  return <ShortcutHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />;
}
