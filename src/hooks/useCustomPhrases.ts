import { useState, useCallback } from 'react';

const DEFAULT_STORAGE_KEY = 'writing-tips-custom';

interface CustomData {
  phrases: Record<string, string[]>; // sectionKey -> phrases
  connectors: Array<{ fn: string; items: string }>;
}

function load(key: string): CustomData {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { phrases: {}, connectors: [] };
}

function save(key: string, data: CustomData) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function useCustomPhrases(storageKey: string = DEFAULT_STORAGE_KEY) {
  const [data, setData] = useState<CustomData>(() => load(storageKey));

  const addPhrase = useCallback((sectionKey: string, phrase: string) => {
    setData(prev => {
      const next = {
        ...prev,
        phrases: {
          ...prev.phrases,
          [sectionKey]: [...(prev.phrases[sectionKey] || []), phrase],
        },
      };
      save(storageKey, next);
      return next;
    });
  }, []);

  const removePhrase = useCallback((sectionKey: string, index: number) => {
    setData(prev => {
      const arr = [...(prev.phrases[sectionKey] || [])];
      arr.splice(index, 1);
      const next = {
        ...prev,
        phrases: { ...prev.phrases, [sectionKey]: arr },
      };
      save(storageKey, next);
      return next;
    });
  }, []);

  const addConnector = useCallback((fn: string, items: string) => {
    setData(prev => {
      const next = {
        ...prev,
        connectors: [...prev.connectors, { fn, items }],
      };
      save(storageKey, next);
      return next;
    });
  }, []);

  const removeConnector = useCallback((index: number) => {
    setData(prev => {
      const arr = [...prev.connectors];
      arr.splice(index, 1);
      const next = { ...prev, connectors: arr };
      save(storageKey, next);
      return next;
    });
  }, []);

  return {
    customPhrases: data.phrases,
    customConnectors: data.connectors,
    addPhrase,
    removePhrase,
    addConnector,
    removeConnector,
  };
}
