import React from 'react';
import './Footer.css'

import logoFacebook from '../../../assets/images/logofacebook.png';
import logoEmail from '../../../assets/images/logoemail.png';
import license from '../../../assets/images/license.png';
import logoIfspCampinas from '../../../assets/images/logoifspcampinas.png';
import logoNeaes from '../../../assets/images/logoneaes.png';

const footer = () => {
    return (
        <footer className="Footer">
            <div className="Bloco">
                <p><strong>Realização</strong></p>
                <div class="Itens">
                    <a href="#">
                    <img className="NeaesLogo" src={logoNeaes} alt='Logo do NEAES'/>
                    </a>
                    <a href='http://www.cmp.ifsp.edu.br' >
                        <img className="IfspLogo" src={logoIfspCampinas} alt='Logo do IFSP Campinas'/>
                    </a>
                </div>
            </div>
            <div className="Bloco">
                <p><strong>Cooperativa Cooperflora</strong></p>
                 <img src={license} alt='Tipo de Licenciamento.'/>
            </div>
            <div className="Bloco">
                <p><strong>Contato</strong></p>
                <a href='https://www.facebook.com/Cooperflora1/' target="_blank" rel="noopener noreferrer">
                    <img className="FacebookLogo" src={logoFacebook} alt='Logo do Facebook'/>
                </a>
                <a href='mailto:contatocooperflora@gmail.com'>
                    <img className="EmailLogo" src={logoEmail} alt='Logo do Email'/>
                </a>
            </div>
        </footer>
    );
}

export default footer;