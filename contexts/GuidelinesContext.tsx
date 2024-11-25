import { createContext, useContext, useState } from 'react';

interface GuidelinesContextType {
  isGuidelinesDismissed: boolean;
  dismissGuidelines: () => void;
}

const GuidelinesContext = createContext<GuidelinesContextType | undefined>(undefined);

export function GuidelinesProvider({ children }: { children: React.ReactNode }) {
  const [isGuidelinesDismissed, setIsGuidelinesDismissed] = useState(false);

  const dismissGuidelines = () => {
    setIsGuidelinesDismissed(true);
  };

  return (
    <GuidelinesContext.Provider value={{ isGuidelinesDismissed, dismissGuidelines }}>
      {children}
    </GuidelinesContext.Provider>
  );
}

export function useGuidelines() {
  const context = useContext(GuidelinesContext);
  if (context === undefined) {
    throw new Error('useGuidelines must be used within a GuidelinesProvider');
  }
  return context;
}
