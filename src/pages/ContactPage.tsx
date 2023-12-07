
export const ContactPage = () => {
  return (
    <div className="contact__section">

      <div className="contact__title">
        <h1>Contacto</h1>
      </div>

      <div className="contact__background">
        <div className="contact__form__container">
          <form action="#" className="form">
            <div className="form__input">
              <label htmlFor="name">Nombre y Apellidos</label>
              <input type="text" name="name" id="name"/>
            </div>
            <div className="form__input">
              <label htmlFor="subject">Asunto</label>
              <input type="text" name="subject" id="subject"/>
            </div>
            <div className="form__input">
              <label htmlFor="message">Mensaje</label>
              <textarea name="message" id="message"></textarea>
            </div>
            <div className="form__submit__container">
              <input type="submit" className="form__submit"/>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
