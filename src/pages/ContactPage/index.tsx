import { Toaster } from 'react-hot-toast';
import style from './style.module.scss';
import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
    return (
        <div className={style['contact__section']}>
            <div>
                <Toaster />
            </div>

            <div className={style['contact__title']}>
                <h1>Contacto</h1>
            </div>

            <div className={style['contact__background']}>
                <section className={style['contact__form__container']}>
                    <ContactForm
                        to={[
                            'direction@hyperloopupv.com',
                            'partners@hyperloopupv.com',
                        ]}
                        from="webpage@hyperloopupv.com"
                    />
                </section>
            </div>
        </div>
    );
}
