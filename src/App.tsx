import { EntityCard } from "./components/EntityCard"
import { EntityForm } from "./components/EntityForm"
import { useEffect } from "react"
import { useHorsesStore } from "./store/useHorseStore"
import "./App.css"

export default function App() {
    const { horses, isLoading, error, getHorses, removeHorse } = useHorsesStore()

    useEffect(() => {
        getHorses()
    }, [])

    const horsesCount = horses?.length ?? 0

    if (isLoading && horses.length === 0) {
        return (
            <div className="layout">
                <header className="top">
                    <h1>Мои лошадки</h1>
                </header>
                <main>
                    <p className="hint">Загрузка…</p>
                </main>
            </div>
        )
    }

    return (
        <div className="layout">
            <header className="top">
                <h1>Мои лошадки</h1>
                <span className="pill">{horsesCount}</span>
            </header>
            <aside>
                <EntityForm />
            </aside>
            <main>
                {error && <p className="error">Ошибка: {error}</p>}
                {!isLoading && horsesCount === 0 && !error && (
                    <p className="hint">Добавьте первую лошадь</p>
                )}
                <div className="grid">
                    {horses?.map((horse) => (
                        <EntityCard
                            key={horse.documentId}
                            {...horse}
                            onDelete={removeHorse}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}