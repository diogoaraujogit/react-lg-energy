import {useState, useEffect} from "react";
import { useMediaPredicate } from "react-media-hook";

// Função que monitora a largura atual do dispositivo onde
// a aplicação está sendo exibida e retorna um valor em 
// porcentagem para ajuste de font-size do html

// Hook
export default function useWindowSize() {
  const isClient = typeof window === 'object';
  const smallerThan480 = useMediaPredicate("(max-width: 480px)");

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return smallerThan480? windowSize.width*62.5/375 : windowSize.width*62.5/1440;
}