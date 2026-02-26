import { useState, useEffect } from 'react';
import { DEFAULT_ABOUT, CATEGORIES } from './data.js';

export function useStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return initialValue;
      const parsed = JSON.parse(stored);

      // ── Migration: old about_data had no categories field ──────────
      if (key === 'about_data') {
        if (!parsed.categories || parsed.categories.length === 0) {
          // Prefer skills if they look like category names, otherwise use defaults
          const hasMeaningfulSkills = parsed.skills && parsed.skills.length > 0;
          parsed.categories = hasMeaningfulSkills ? parsed.skills : DEFAULT_ABOUT.categories;
        }
        // Ensure contact always exists
        if (!parsed.contact) parsed.contact = DEFAULT_ABOUT.contact;
      }

      return parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);

  return [value, setValue];
}
