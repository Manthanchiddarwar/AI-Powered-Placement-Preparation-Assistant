import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export const useRealtimeUpdates = (
  table: string,
  onInsert?: (payload: any) => void,
  onUpdate?: (payload: any) => void,
  onDelete?: (payload: any) => void
) => {
  useEffect(() => {
    const channel: RealtimeChannel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: table
        },
        (payload) => {
          if (onInsert) {
            onInsert(payload.new);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: table
        },
        (payload) => {
          if (onUpdate) {
            onUpdate(payload.new);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: table
        },
        (payload) => {
          if (onDelete) {
            onDelete(payload.old);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, onInsert, onUpdate, onDelete]);
};

export const useLeaderboardUpdates = (callback: (entry: any) => void) => {
  useRealtimeUpdates('leaderboard', undefined, callback, undefined);
};

export const useSubmissionUpdates = (callback: (submission: any) => void) => {
  useRealtimeUpdates('submissions', callback, undefined, undefined);
};

export const useProgressUpdates = (callback: (progress: any) => void) => {
  useRealtimeUpdates('user_progress', undefined, callback, undefined);
};
