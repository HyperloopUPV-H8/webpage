import InstagramIcon from '../assets/icons/instagram.svg';
import XIcon from '../assets/icons/x.svg';
import YoutubeIcon from '../assets/icons/youtube.svg';
import LinkedinIcon from '../assets/icons/linkedin.svg';
import LocationIcon from '../assets/icons/location.svg';
import MailIcon from '../assets/icons/mail.svg';
import TelephoneIcon from '../assets/icons/telephone.svg';
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
          <a href="https://www.instagram.com/hyperloopupv/">
            <img src={InstagramIcon} alt="HyperloopUPV Instagram" />
          </a>
          <a href="https://twitter.com/hyperloopupv">
            <img src={XIcon} alt="HyperloopUPV X" />
          </a>
          <a href="https://www.youtube.com/@HyperloopUPVYT">
            <img src={YoutubeIcon} alt="HyperloopUPV Youtube" />
          </a>
          <a href="https://www.linkedin.com/company/hyperloopupv">
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
            <a href="#">Av. Dels Tarongers, 6</a>
          </div>
          <div className="contact__element">
            <img src={MailIcon} alt="" />
            <a href="#">hyperloopupv@gmail.com</a>
          </div>
          <div className="contact__element">
            <img src={TelephoneIcon} alt="" />
            <a href="#">123456789</a>
          </div>
        </div>
      </div>{/* .footer__section__contact */}
    </footer>
  )
}
