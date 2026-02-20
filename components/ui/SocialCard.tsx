import React from 'react';
import styled from 'styled-components';
import { personalInfo } from '../../data';
import { Facebook, Github, Instagram, Twitter } from 'lucide-react';

const SocialCard = () => {
  return (
    <StyledWrapper>
      <div className="parent cursor-target">
        <div className="card">
          <div className="logo">
            <span className="circle circle1" />
            <span className="circle circle2" />
            <span className="circle circle3" />
            <span className="circle circle4" />
            <span className="circle circle5">
              {/* Icono central de "Red" */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="21.17" x2="12" y1="8" y2="8" />
                <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
                <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
              </svg>
            </span>
          </div>
          <div className="glass" />
          <div className="content">
            <span className="title">Mis Redes</span>
            <span className="text">Conectemos en mis plataformas sociales</span>
          </div>
          <div className="bottom">
            <div className="social-buttons-container">

              {/* Instagram */}
              <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="social-button social-button1" aria-label="Instagram">
                <Instagram size={20} className="svg-icon" />
              </a>

              {/* Facebook */}
              <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer" className="social-button social-button2" aria-label="Facebook">
                <Facebook size={20} className="svg-icon" />
              </a>

              {/* GitHub */}
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-button social-button3" aria-label="GitHub">
                <Github size={20} className="svg-icon" />
              </a>

              {/* Twitter / X */}
              <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="social-button social-button4" aria-label="Twitter / X">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="svg-icon"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>

            </div>

            {/* View More Button (Decorativo o funcional) */}
            <div className="view-more">
              <span className="view-more-button">Social</span>
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Adaptación de colores al tema Blue / Slate */
  
  .parent {
    width: 290px; /* Ancho original */
    height: 300px;
    perspective: 1000px;
  }

  /* Fondo de la tarjeta: Tono oscuro Slate/Blue */
  .card {
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); /* slate-800 to slate-900 */
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: rgba(0, 0, 0, 0) 40px 50px 25px -40px, rgba(0, 0, 0, 0.2) 0px 25px 25px -5px;
  }

  .glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    border-radius: 55px;
    border-top-right-radius: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.15) 100%);
    /* -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px); */
    transform: translate3d(0px, 0px, 25px);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s ease-in-out;
  }

  .content {
    padding: 100px 60px 0px 30px;
    transform: translate3d(0, 0, 26px);
  }

  .content .title {
    display: block;
    color: #3b82f6; /* primary-500 (Blue) */
    font-weight: 900;
    font-size: 20px;
  }

  .content .text {
    display: block;
    color: #94a3b8; /* slate-400 */
    font-size: 15px;
    margin-top: 20px;
  }

  .bottom {
    padding: 10px 12px;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translate3d(0, 0, 26px);
  }

  .bottom .view-more {
    display: flex;
    align-items: center;
    width: 30%;
    justify-content: flex-end;
    transition: all 0.2s ease-in-out;
  }

  .bottom .view-more:hover {
    transform: translate3d(0, 0, 10px);
  }

  .bottom .view-more .view-more-button {
    background: none;
    border: none;
    color: #3b82f6; /* primary-500 */
    font-weight: bolder;
    font-size: 12px;
  }

  .bottom .view-more .svg {
    fill: none;
    stroke: #3b82f6;
    stroke-width: 3px;
    max-height: 15px;
  }

  .bottom .social-buttons-container {
    display: flex;
    gap: 10px;
    transform-style: preserve-3d;
  }

  .bottom .social-buttons-container .social-button {
    width: 34px;
    aspect-ratio: 1;
    padding: 7px;
    background: rgba(30, 41, 59, 0.8); /* slate-800 */
    border-radius: 50%;
    border: none;
    display: grid;
    place-content: center;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 7px 5px -5px;
    cursor: pointer;
    text-decoration: none;
    color: white;
  }

  .bottom .social-buttons-container .social-button:first-child {
    transition: transform 0.2s ease-in-out 0.4s, box-shadow 0.2s ease-in-out 0.4s;
  }

  .bottom .social-buttons-container .social-button:nth-child(2) {
    transition: transform 0.2s ease-in-out 0.6s, box-shadow 0.2s ease-in-out 0.6s;
  }

  .bottom .social-buttons-container .social-button:nth-child(3) {
    transition: transform 0.2s ease-in-out 0.8s, box-shadow 0.2s ease-in-out 0.8s;
  }

  .bottom .social-buttons-container .social-button:nth-child(4) {
    transition: transform 0.2s ease-in-out 1.0s, box-shadow 0.2s ease-in-out 1.0s;
  }

  /* SVG Icons Logic */
  .bottom .social-buttons-container .social-button .svg-icon {
    stroke-width: 2px;
  }

  .bottom .social-buttons-container .social-button:hover {
    background: #3b82f6; /* primary-500 */
    transform: scale(1.1);
  }

  .bottom .social-buttons-container .social-button:hover .svg-icon {
    /* lucide icons use stroke, not fill usually, but can be adjusted */
    color: white;
  }

  .bottom .social-buttons-container .social-button:active {
    background: #2563eb; /* primary-600 */
  }

  .logo {
    position: absolute;
    right: 0;
    top: 0;
    transform-style: preserve-3d;
  }

  .logo .circle {
    display: block;
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 0;
    right: 0;
    box-shadow: rgba(0, 0, 0, 0.2) -10px 10px 20px 0px;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background: rgba(59, 130, 246, 0.2); /* primary-500 with opacity */
    transition: all 0.5s ease-in-out;
  }

  .logo .circle1 {
    width: 170px;
    transform: translate3d(0, 0, 20px);
    top: 8px;
    right: 8px;
  }

  .logo .circle2 {
    width: 140px;
    transform: translate3d(0, 0, 40px);
    top: 10px;
    right: 10px;
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    transition-delay: 0.4s;
  }

  .logo .circle3 {
    width: 110px;
    transform: translate3d(0, 0, 60px);
    top: 17px;
    right: 17px;
    transition-delay: 0.8s;
  }

  .logo .circle4 {
    width: 80px;
    transform: translate3d(0, 0, 80px);
    top: 23px;
    right: 23px;
    transition-delay: 1.2s;
  }

  .logo .circle5 {
    width: 50px;
    transform: translate3d(0, 0, 100px);
    top: 30px;
    right: 30px;
    display: grid;
    place-content: center;
    transition-delay: 1.6s;
  }

  .logo .circle5 .svg {
    width: 24px;
    stroke: white;
  }

  .parent:hover .card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow: rgba(0, 0, 0, 0.3) 30px 50px 25px -40px, rgba(0, 0, 0, 0.1) 0px 25px 30px 0px;
  }

  .parent:hover .card .bottom .social-buttons-container .social-button {
    transform: translate3d(0, 0, 50px);
    box-shadow: rgba(0, 0, 0, 0.2) -5px 20px 10px 0px;
  }

  .parent:hover .card .logo .circle2 {
    transform: translate3d(0, 0, 60px);
  }

  .parent:hover .card .logo .circle3 {
    transform: translate3d(0, 0, 80px);
  }

  .parent:hover .card .logo .circle4 {
    transform: translate3d(0, 0, 100px);
  }

  .parent:hover .card .logo .circle5 {
    transform: translate3d(0, 0, 120px);
  }`;

export default SocialCard;
