// src/store/journalStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type JournalEntry = {
    id: string;
    name: string;
    dateTime: string;
    count: number;
};

interface JournalStore {
    entries: JournalEntry[];
    addEntry: (name: string, dateTime: string, count: number) => void;
}

export const useJournalStore = create<JournalStore>()(
    persist(
        (set) => ({
            entries: [],
            addEntry: (name: string, dateTime: string, count: number) =>
                set((state: JournalStore) => ({
                    entries: [
                        ...state.entries,
                        {
                            id: crypto.randomUUID(),
                            name,
                            dateTime,
                            count,
                        },
                    ].sort((a, b) => b.id.localeCompare(a.id)), // новые сверху
                })),
        }),
        {
            name: "meme-journal",
        }
    )
);