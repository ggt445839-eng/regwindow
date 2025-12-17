import { useJournalStore } from "@/store/journalStore";

const declensionMeme = (count: number): string => {
    if (count === 1) return "мем";
    if (count >= 2 && count <= 4) return "мема";
    return "мемов";
};

export default function List() {
    const { entries } = useJournalStore();

    if (entries.length === 0) {
        return <p className="magazine-empty">Журнал пуст</p>;
    }

    return (
        <div className="space-y-8 mt-8">
            {entries
                .slice()
                .sort((a, b) => b.id.localeCompare(a.id)) // новые сверху
                .map((entry) => (
                    <div key={entry.id}>
                        <p className="magazine-name">{entry.name || "Без имени"}</p>
                        <p className="magazine-meta">
                            {entry.dateTime || "Дата неизвестна"} {entry.count ?? 0} {declensionMeme(entry.count ?? 0)}
                        </p>
                        <hr className="magazine-divider" />
                    </div>
                ))}
        </div>
    );
}