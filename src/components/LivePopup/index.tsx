import style from "./style.module.scss"

interface PopupProps {
    onClose: () => void;
    twitchChannelName: string;
}

export function LivePopUp({ onClose, twitchChannelName }: PopupProps) {
    return (
        <div className={style.overlay}>
            <div className={style.popup}>
                <h2>¡Estamos en directo!</h2>
                <p>
                    Haz clic en el botón para unirte a nuestro directo en
                    Twitch.
                </p>

                <iframe
                    src={`https://player.twitch.tv/?channel=${twitchChannelName}&parent=${window.location.hostname}`}
                    height="400">
                </iframe>

                <div className={style.buttons}>
                    <button
                        className={`${style.button} ${style.buttonPrimary}`}
                        onClick={() => window.open(`https://www.twitch.tv/${twitchChannelName}`, "_blank")}
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
}
