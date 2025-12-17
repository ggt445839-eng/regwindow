// src/components/MemeSendModal.tsx
"use client";

import { useState } from "react";
import { useJournalStore } from "@/store/journalStore";

import Name from "@/components/regform/forms/magazine-form/Name";
import Email from "@/components/regform/forms/magazine-form/Email";
import DateField from "@/components/regform/forms/magazine-form/DateField";
import Quantity from "@/components/regform/forms/magazine-form/Quantity";
import Tosend from "@/components/regform/forms/buttons/Tosend";
import Cancellation from "@/components/regform/forms/buttons/Cancellation";
import Error from "@/components/regform/forms/magazine-form/Error";
import List from "@/components/regform/forms/magazine-form/List";
import JournalSkeleton from "@/components/regform/forms/magazine-form/JournalSkeleton";

type ModalState = "editing" | "pending" | "success" | "error";

interface FormData {
    name: string;
    email: string;
    date: string;
    quantity: string;
}

const initialData: FormData = {
    name: "",
    email: "",
    date: "",
    quantity: "",
};

export default function MemeSendModal() {
    const [state, setState] = useState<ModalState>("editing");
    const [data, setData] = useState<FormData>(initialData);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const { addEntry } = useJournalStore();

    const formatDateTime = (isoString: string): string => {
        if (!isoString) return "Дата неизвестна";
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return "Дата неизвестна";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}.${month}.${year}, ${hours}:${minutes}`;
    };

    const handleSubmit = async () => {
        setState("pending");

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const count = Number(data.quantity);
        if (!data.name.trim() || isNaN(count) || count <= 0) {
            setState("error");
            setErrorMsg("Заполните ФИО и количество");
            return;
        }

        if (Math.random() < 0.3) {
            setState("error");
            setErrorMsg("Ошибка загрузки данных");
            return;
        }

        addEntry(data.name.trim(), formatDateTime(data.date), count);
        setState("success");
    };

    const handleReset = () => {
        setState("editing");
        setData(initialData);
        setErrorMsg("");
    };

    const getTitle = (): string => {
        switch (state) {
            case "editing": return "Состояние загрузки данных";
            case "pending": return "Состояние отправки данных";
            case "success": return "Данные получены";
            case "error": return "Состояние ошибки загрузки";
        }
    };

    const isEditable = state === "editing";

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <div className="form-card">
                <h2 className="text-center mb-8 text-lg text-placeholder">
                    {getTitle()}
                </h2>

                <div className="form">
                    <Name
                        id="name"
                        label="ФИО:"
                        type="text"
                        value={data.name}
                        onChange={(v) => setData((prev) => ({ ...prev, name: v }))}
                        showCheck={data.name.length > 2}
                        disabled={!isEditable}
                    />
                    <Email
                        id="email"
                        label="Эл. почта:"
                        type="email"
                        placeholder={isEditable ? "Введите эл. почту" : ""}
                        value={data.email}
                        onChange={(v) => setData((prev) => ({ ...prev, email: v }))}
                        showCheck={data.email.includes("@")}
                        disabled={!isEditable}
                    />
                    <DateField
                        id="date"
                        label="Дата/время:"
                        type="datetime-local"
                        value={data.date}
                        onChange={(v) => setData((prev) => ({ ...prev, date: v }))}
                        showCheck={!!data.date}
                        disabled={!isEditable}
                    />
                    <Quantity
                        id="quantity"
                        label="Количество:"
                        type="number"
                        value={data.quantity}
                        onChange={(v) => setData((prev) => ({ ...prev, quantity: v }))}
                        showCheck={Number(data.quantity) > 0}
                        disabled={!isEditable}
                    />
                </div>

                <div className="buttons">
                    <Cancellation onCancel={handleReset} disabled={state === "pending"} />
                    <Tosend
                        onSubmit={state === "pending" ? () => {} : isEditable ? handleSubmit : handleReset}
                        text={state === "pending" ? "Идёт отправка" : isEditable ? "Отправить" : state === "error" ? "Попробовать снова" : "Отправить ещё"}
                        disabled={state === "pending"}
                    />
                </div>

                <div className="magazine-container">
                    <h3 className="magazine-title">Журнал просмотра мемов</h3>

                    {state === "pending" ? (
                        <JournalSkeleton />
                    ) : state === "error" ? (
                        <Error message={errorMsg} />
                    ) : (
                        <List />
                    )}
                </div>
            </div>
        </div>
    );
}