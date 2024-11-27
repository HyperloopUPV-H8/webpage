import style from "./style.module.scss"

interface PopupProps {
    onClose: () => void; // Función para cerrar el popup
    twitchChannelUrl: string; // URL del canal de Twitch
}

export function LivePopUp({ onClose, twitchChannelUrl }: PopupProps) {
    return (
        <div className={style.overlay}>
            <div className={style.popup}>
                <h2>¡Estamos en directo!</h2>
                <p>
                    Haz clic en el botón para unirte a nuestro directo en
                    Twitch.
                </p>
                <div className={style.buttons}>
                    <button
                        className={`${style.button} ${style.buttonPrimary}`}
                        onClick={() => window.open(twitchChannelUrl, "_blank")}
                    >
                        Ir al directo
                    </button>
                    <button className={style.buttonClose} onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
