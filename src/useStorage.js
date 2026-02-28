/**
 * useStorage — Supabase-backed hook.
 * Initial value is always null — nothing renders until DB responds.
 */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase.js';

async function fetchProfile() {
  const { data, error } = await supabase
    .from('site_profile')
    .select('value')
    .eq('key', 'about')
    .single();
  if (error || !data) return null;
  return data.value;
}

async function saveProfile(value) {
  const { error } = await supabase
    .from('site_profile')
    .upsert({ key: 'about', value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) throw error;
}

async function fetchPortfolio() {
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data || []).map(row => ({ ...row, tags: row.tags || [] }));
}

export function useStorage(key) {
  const [value, setValue]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = key === 'about_data' ? await fetchProfile() : await fetchPortfolio();
        setValue(data);
      } catch (e) {
        console.error(`useStorage load error [${key}]:`, e);
        setValue(key === 'portfolio_items' ? [] : null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const setValueAndSave = useCallback(async (newVal) => {
    const resolved = typeof newVal === 'function' ? newVal(value) : newVal;
    setValue(resolved);
    if (key === 'about_data') {
      try { await saveProfile(resolved); }
      catch (e) { console.error('save profile error:', e); }
    }
  }, [key, value]);

  return [value, setValueAndSave, loading];
}

// ─── Portfolio API helpers ────────────────────────────────────────────────────

export async function apiAddPortfolioItem(item) {
  const { data: maxRow } = await supabase
    .from('portfolio_items')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle();

  const sortOrder = maxRow ? maxRow.sort_order + 1 : 0;

  const { error } = await supabase.from('portfolio_items').insert({
    id:         item.id,
    title:      item.title,
    category:   item.category,
    type:       item.type || 'image',
    src:        item.src,
    tags:       item.tags || [],
    sort_order: sortOrder,
  });
  if (error) throw error;
  return fetchPortfolio();
}

export async function apiRemovePortfolioItem(id) {
  const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
  if (error) throw error;
  return fetchPortfolio();
}

export async function apiReorderPortfolio(items) {
  await Promise.all(
    items.map((item, i) =>
      supabase.from('portfolio_items').update({ sort_order: i }).eq('id', item.id)
    )
  );
  return fetchPortfolio();
}
