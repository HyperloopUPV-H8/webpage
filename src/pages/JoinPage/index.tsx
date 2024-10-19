import style from './style.module.scss';

export default function PartnersPage() {
    return (
        <>
            <div
                className={`${style['partners__section']} ${style['section-1']}`}
            >
                <div id={style['partners__dossier']}>
                    <div className={style['partners__dossier__background']}>
                        <h1 className={style['partners__dossier__title']}>
                            ¡Te estamos esperando!
                        </h1>
                        <p>
                            En HyperloopUPV abrimos todos los años las puertas a
                            nuevos miembros. Si tienes ganas de desarrollar el
                            transporte del futuro con nosotros y trabajar en un
                            proyecto único e innovador no dudes en apuntarte
                            usando el link de abajo.
                        </p>
                        <p>
                            <b>
                                Buscamos perfiles de todas las disciplinas,
                                tanto enfocados en la ingeniería
                                (Electromagnetismo, Sistemas Mecánicos,
                                Electrónica, Programación...) como en la parte
                                de operaciones (Redes Sociales, Diseño Gráfico,
                                Patrocinadores, Gestión Económica...)
                            </b>
                        </p>
                        <a
                            id={style['partners__dossier_button']}
                            href="https://forms.gle/CiXoQVeug2RKVx7p6"
                        >
                            Formulario de Inscripción
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
