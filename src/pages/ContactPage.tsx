import { Toaster } from "react-hot-toast"
import { ContactForm } from "../components"

export const ContactPage = () => {

  return (

    <div className="contact__section">

      <div><Toaster /></div>

      <div className="contact__title">
        <h1>Contacto</h1>
      </div>

      <div className="contact__background">
        <section className="contact__form__container">
          <ContactForm />
        </section>
      </div>

    </div>
  )
}
