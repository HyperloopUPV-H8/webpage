import InstagramIcon from '../../assets/icons/instagram.svg';
import XIcon from '../../assets/icons/x.svg';
import YoutubeIcon from '../../assets/icons/youtube.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import LocationIcon from '../../assets/icons/location.svg';
import MailIcon from '../../assets/icons/mail.svg';
import CopyrightIcon from '../../assets/icons/copyright.svg';
import style from './style.module.scss';

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.copyright_section}>
                <div className={style.copyright}>
                    <div className={style.copyright_icon}>
                        <img src={CopyrightIcon} alt="Copyright" />
                        <p>2015 - 2025 Hyperloop UPV</p>
                    </div>
                    <p>All rights reserved</p>
                </div>
            </div>
            {/* .footer__section__copyright */}

            <div className={style.section_social}>
                <div className={style.social_bar}>
                    <a
                        href="https://www.instagram.com/hyperloopupv/"
                        target="_blank"
                    >
                        <img src={InstagramIcon} alt="HyperloopUPV Instagram" />
                    </a>
                    <a href="https://twitter.com/hyperloopupv" target="_blank">
                        <img src={XIcon} alt="HyperloopUPV X" />
                    </a>
                    <a
                        href="https://www.youtube.com/@HyperloopUPVYT"
                        target="_blank"
                    >
                        <img src={YoutubeIcon} alt="HyperloopUPV Youtube" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/hyperloopupv"
                        target="_blank"
                    >
                        <img src={LinkedinIcon} alt="HyperloopUPV Linkedin" />
                    </a>
                </div>
                <p>@hyperloopupv</p>
                <div></div>
            </div>
            {/* .footer__section__social */}

            <div className={style.section_contact}>
                <div className={style.contact_info}>
                    <div className={style.contact_element}>
                        <img src={LocationIcon} alt="" />
                        <a
                            href="https://maps.app.goo.gl/12CRFBQjLB83gmVt7"
                            target="_blank"
                        >
                            Camí de Vera, S/N, Edificio 8N, UPV
                        </a>
                    </div>
                    <div className={style['contact_element']}>
                        <img src={MailIcon} alt="" />
                        <a
                            href="mailto:partners@hyperloopupv.com"
                            target="_blank"
                        >
                            partners@hyperloopupv.com
                        </a>
                    </div>
                </div>
            </div>
            {/* .footer__section__contact */}
        </footer>
    );
}
