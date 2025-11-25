import { useState, useEffect } from "react";

import Name from "./Name";
import Email from "./Email";
import DateField from "./DateField";
import Quantity from "./Quantity";

import ButtonTwo from "../buttons/Buttontwo.tsx";

const Form = () => {
    const [name, setName] = useState(() => localStorage.getItem("name") || "");
    const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
    const [date, setDate] = useState(() => localStorage.getItem("date") || "");
    const [quantity, setQuantity] = useState(() => localStorage.getItem("quantity") || "");

    // === Синхронизация с localStorage ===
    useEffect(() => localStorage.setItem("name", name), [name]);
    useEffect(() => localStorage.setItem("email", email), [email]);
    useEffect(() => localStorage.setItem("date", date), [date]);
    useEffect(() => localStorage.setItem("quantity", quantity), [quantity]);

    // === КНОПКА ОТМЕНИТЬ ===
    const handleCancel = () => {
        setName("");
        setEmail("");
        setDate("");
        setQuantity("");

        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("date");
        localStorage.removeItem("quantity");
    };

    const handleSubmit = async () => {
        const payload = { name, email, date, quantity };

        try {
            const response = await fetch("/api/endpoint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Ошибка при отправке");

            alert("Форма успешно отправлена!");
        } catch (error) {
            alert("Ошибка отправки! Проверьте подключение.");
            console.error(error);
        }
    };

    return (
        <div className="form">

            <Name
                id="name"
                label="Ф.И.О:"
                type="text"
                placeholder="Введите Ф.И.О"
                value={name}
                onChange={setName}
                showCheck={name.length > 2}
            />

            <Email
                id="email"
                label="Эл. почта:"
                type="email"
                placeholder="Введите вашу почту"
                value={email}
                onChange={setEmail}
                showCheck={email.includes("@")}
            />

            <DateField
                id="date"
                label="Дата/время:"
                type="datetime-local"
                placeholder="Укажите дату"
                value={date}
                onChange={setDate}
                showCheck={!!date}
            />

            <Quantity
                id="quantity"
                label="Количество:"
                type="number"
                placeholder="Введите количество"
                value={quantity}
                onChange={setQuantity}
                showCheck={Number(quantity) > 0}
            />

            <ButtonTwo
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />

        </div>
    );
};

export default Form;
