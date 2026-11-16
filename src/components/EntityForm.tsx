import { useState, type FormEvent } from "react"
import {  BREED, breed_labels, GENDER,  gender_labels, SPECIALIZATION, specialization_labels, type Breed, type Gender, type Specialization } from "../util"
import { useHorsesStore } from "../store/useHorseStore"
import type { IHorseInput } from "../types"

const initialForm: IHorseInput = {
    name: "",
    DOB: "",
    owner: "",
    suit: "",
    height: 0,
    training: false,
    specialization: "ShowJumping" as Specialization,
    breed: "Crossbreed" as Breed,
    gender: "Mare" as Gender,
}

export function EntityForm() {
    const [form, setForm] = useState<IHorseInput>(initialForm)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const addHorse = useHorsesStore((state)=> state.addHorse)

    const onChange = <K extends keyof  IHorseInput>(key: K, value:  IHorseInput[K]) => {
        setForm((o) => ({ ...o, [key]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)
        try {
            await addHorse(form)
            setForm(initialForm)
        } catch (error: any) {
            setError(error.response?.data?.error?.nessage ?? "Не удалось создать лошадку...")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Добавить лошадь</h2>
            {error && <p className="error"> {error}</p>}
            <label className="field">
                 Кличка
                <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                />
            </label>

             <label className="field">
                Порода
                <select
                    value={form.breed ?? "Crossbreed"}
                    onChange={(e) => onChange("breed", e.target.value as Breed)}
                >
                    {BREED.map((b) => (
                        <option key={b} value={b}>
                            {breed_labels[b]}
                        </option>
                    ))}
                </select>
            </label>

             <label className="field">
                Пол
                <select
                    value={form.gender ?? "Mare"}
                    onChange={(e) => onChange("gender", e.target.value as Gender)}
                >
                    {GENDER.map((g) => (
                        <option key={g} value={g}>
                            {gender_labels[g]}
                        </option>
                    ))}
                </select>
            </label>

             <label className="field">
                Специализация
                <select
                    value={form.specialization ?? "ShowJumping"}
                    onChange={(e) => onChange("specialization", e.target.value as Specialization)}
                >
                    {SPECIALIZATION.map((s) => (
                        <option key={s} value={s}>
                            {specialization_labels[s]}
                        </option>
                    ))}
                </select>
            </label>

            <label className="field">
                Дата рождения
                <input
                    type="date"
                    value={form.DOB ?? ""}
                    onChange={(e) => onChange("DOB", e.target.value)}
                />
            </label>

            <label className="field">
                Владелец
                <input
                    type="text"
                    value={form.owner ?? ""}
                    onChange={(e) => onChange("owner", e.target.value)}
                />
            </label>

            <label className="field">
                Масть
                <input
                    type="text"
                    value={form.suit ?? ""}
                    onChange={(e) => onChange("suit", e.target.value)}
                />
            </label>

             <label className="field">
                Рост, см
                <input
                    type="number"
                    min={0}
                    step={1}
                    value={form.height ?? 0}
                    onChange={(e) => onChange("height", Number(e.target.value))}
                />
            </label>

            <label className="check">
                <input
                    type="checkbox"
                    checked={form.training ?? false}
                    onChange={(e) => onChange("training", e.target.checked)}
                />
                Обучена
            </label>

            <button className="btn" disabled={isLoading}>
                {isLoading ? "Сохраняем…" : "Добавить"}
            </button>
        </form>
    )
}