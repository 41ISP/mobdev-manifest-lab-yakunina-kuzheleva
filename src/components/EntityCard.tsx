import { API_URL } from "../api"
import type { Horse } from "../types"
import { breed_labels, gender_labels, specialization_labels } from "../util"

interface IHorseCardProps extends Horse {
    onDelete: (documentId: string) => void
}

export function EntityCard({
    name,
    documentId,
    DOB,
    height,
    breed,
    training,
    fotochka,
    owner,
    suit,
    gender,
    specialization,
    onDelete,
}: IHorseCardProps) {
    const imageUrl =
        fotochka && fotochka.length > 0 ? `${API_URL}${fotochka[0].url}` : null

    return (
        <article className="card">
            <div className="card__cover">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={fotochka![0].alternativeText ?? name}
                    />
                ) : (
                    <span>{name.charAt(0).toUpperCase()}</span>
                )}
                {height != null && <b className="card__badge">{height} см</b>}
            </div>
            <div className="card__body">
                <h3>{name}</h3>
                {suit && <p className="card__desc">Масть: {suit}</p>}
                <p className="card__meta">
                    Порода: {breed_labels[breed]} · Пол: {gender_labels[gender]}
                </p>
                {DOB && (
                    <p className="card__meta">
                        Дата рождения:{" "}
                        {new Date(DOB).toLocaleDateString("ru-RU")}
                    </p>
                )}
                {owner && <p className="card__meta">Владелец: {owner}</p>}
                {training != null && (
                    <p className="card__meta">
                        Обучена: {training ? "Да" : "Нет"}
                    </p>
                )}
                {specialization && (
                    <p className="card__meta">
                        Специализация: {specialization_labels[specialization]}
                    </p>
                )}
            </div>
            <footer className="card__footer">
                <strong>{name}</strong>
                <button
                    className="link-btn"
                    onClick={() => onDelete(documentId)}
                >
                    Удалить
                </button>
            </footer>
        </article>
    )
}