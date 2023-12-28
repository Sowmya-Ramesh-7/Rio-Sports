import './Footer.css'

export default function Footer(){
    return (
        <footer>
            <div class="f-info">
                <div class="f-info-brand">Follow us on &nbsp;&nbsp;</div>
                <div class="f-info-socials">
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-twitter"></i>
                </div>
                <div class="f-info-brand"><i class="far fa-copyright"></i> 2023 Rio Sports. All rights reserved.</div>
                <div class="f-info-links">
                    <a href="/privacy">Privacy </a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="/terms">Terms & Conditions</a>
                </div>
            </div>
        </footer>
    );

}