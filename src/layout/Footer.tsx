import InstagramIcon from '../assets/icons/instagram.svg';
import XIcon from '../assets/icons/x.svg';
import YoutubeIcon from '../assets/icons/youtube.svg';
import LinkedinIcon from '../assets/icons/linkedin.svg';
import LocationIcon from '../assets/icons/location.svg';
import MailIcon from '../assets/icons/mail.svg';
import CopyrightIcon from '../assets/icons/copyright.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section__copyright">
        <div className="footer__copyright">
          <div className="footer__copyright__copy">
            <img src={CopyrightIcon} alt="Copyright" />
            <p>2015 - 2023 Hyperloop UPV</p>
          </div>
          <p>All rights reserved</p>
        </div>
      </div>{/* .footer__section__copyright */}

      <div className="footer__section__social">
        <div className="social__bar">
          <a href="https://www.instagram.com/hyperloopupv/" target='_blank'>
            <img src={InstagramIcon} alt="HyperloopUPV Instagram" />
          </a>
          <a href="https://twitter.com/hyperloopupv" target='_blank'>
            <img src={XIcon} alt="HyperloopUPV X" />
          </a>
          <a href="https://www.youtube.com/@HyperloopUPVYT" target='_blank'>
            <img src={YoutubeIcon} alt="HyperloopUPV Youtube" />
          </a>
          <a href="https://www.linkedin.com/company/hyperloopupv" target='_blank'>
            <img src={LinkedinIcon} alt="HyperloopUPV Linkedin" />
          </a>
        </div>
        <p>@hyperloopupv</p>
        <div></div>
      </div>{/* .footer__section__social */}

      <div className="footer__section__contact">
        <div className="contact__info">
          <div className="contact__element">
            <img src={LocationIcon} alt="" />
            <a href="https://maps.app.goo.gl/12CRFBQjLB83gmVt7" target='_blank'>Camí de Vera, S/N, Edificio 8N, UPV</a>
          </div>
          <div className="contact__element">
            <img src={MailIcon} alt="" />
            <a href="mailto:partners@hyperloopupv.com" target='_blank'>partners@hyperloopupv.com</a>
          </div>
        </div>
      </div>{/* .footer__section__contact */}
    </footer>
  )
}
