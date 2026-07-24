import { useState, useEffect, useCallback, useRef } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function useRecentSearches(key: string, max = 5) {
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(`search_${key}`) || "[]");
    } catch {
      return [];
    }
  });

  const add = useCallback(
    (term: string) => {
      if (!term.trim()) return;
      setRecent((prev) => {
        const next = [term, ...prev.filter((t) => t !== term)].slice(0, max);
        localStorage.setItem(`search_${key}`, JSON.stringify(next));
        return next;
      });
    },
    [key, max]
  );

  const remove = useCallback(
    (term: string) => {
      setRecent((prev) => {
        const next = prev.filter((t) => t !== term);
        localStorage.setItem(`search_${key}`, JSON.stringify(next));
        return next;
      });
    },
    [key]
  );

  const clear = useCallback(() => {
    setRecent([]);
    localStorage.removeItem(`search_${key}`);
  }, [key]);

  return { recent, add, remove, clear };
}

export function useSearchWithRecent(key: string, delay = 300) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, delay);
  const { recent, add, remove, clear } = useRecentSearches(key);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(() => {
    if (query.trim()) {
      add(query);
      setShowRecent(false);
    }
  }, [query, add]);

  return {
    query,
    setQuery,
    debounced,
    recent,
    add,
    remove,
    clear,
    showRecent,
    setShowRecent,
    submit,
    inputRef,
  };
}
