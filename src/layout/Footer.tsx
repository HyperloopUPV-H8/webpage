
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section__copyright">
        <div className="footer__copyright">
          <div className="footer__copyright__copy">
            <img src="src/assets/icons/copyright.svg" alt="Copyright" />
            <p>2015 - 2023 Hyperloop UPV</p>
          </div>
          <p>All rights reserved</p>
        </div>
      </div>{/* .footer__section__copyright */}

      <div className="footer__section__social">
        <div className="social__bar">
          <a href="https://www.instagram.com/hyperloopupv/">
            <img src="src/assets/icons/instagram.svg" alt="HyperloopUPV Instagram" />
          </a>
          <a href="https://twitter.com/hyperloopupv">
            <img src="src/assets/icons/x.svg" alt="HyperloopUPV X" />
          </a>
          <a href="https://www.youtube.com/@HyperloopUPVYT">
            <img src="src/assets/icons/youtube.svg" alt="HyperloopUPV Youtube" />
          </a>
          <a href="https://www.linkedin.com/company/hyperloopupv">
            <img src="src/assets/icons/linkedin.svg" alt="HyperloopUPV Linkedin" />
          </a>
        </div>
        <p>@hyperloopupv</p>
        <div></div>
      </div>{/* .footer__section__social */}

      <div className="footer__section__contact">
        <div className="contact__info">
          <div className="contact__element">
            <img src="src/assets/icons/location.svg" alt="" />
            <a href="#">Av. Dels Tarongers, 6</a>
          </div>
          <div className="contact__element">
            <img src="src/assets/icons/mail.svg" alt="" />
            <a href="#">hyperloopupv@gmail.com</a>
          </div>
          <div className="contact__element">
            <img src="src/assets/icons/telephone.svg" alt="" />
            <a href="#">123456789</a>
          </div>
        </div>
      </div>{/* .footer__section__contact */}
    </footer>
  )
}
