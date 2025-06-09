import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import IF_SIX_WAS_NINE from '../../assets/IF SIX WAS NINE.jpg';
import JADED_LONDON from '../../assets/JADED LONDON.jpg';
import RICK_OWENS from '../../assets/RICK OWENS.jpg';
import TORNADO_MART from '../../assets/TORNADO MART.jpg';
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";

export const Home = () => {
    useEffect(() => {
        AOS.init({ once: true, duration: 700, offset: 80 });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
        >
            <div className='Animation_home'>
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'We sell pants for Creative people',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'We sell pants for Street Fashionistas',
                        1000,
                        'We sell pants for Innovator-aesthetes',
                        1000,
                        'We sell pants for Nonconformists',
                        1000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                    repeat={Infinity}
                />
            </div>

            <main>
                <div className="column1">
                    <div className="column1-group1-home">
                        <div className="img-wrapper" data-aos="fade-up">
                            <img src={IF_SIX_WAS_NINE} alt="" />
                        </div>
                        <div className="column1-group1-home-title" data-aos="fade-up" data-aos-delay="100">
                            <p>Fashion Jeans</p>
                            <Link to="/catalog"><h1>IF SIX WAS NINE</h1></Link>
                        </div>
                        <div className="column1-group1-home-description" data-aos="fade-up" data-aos-delay="200">
                            <div className="h4">Бунтарский дух в каждой детали: штаны с психоделическими принтами и смелым кроем.</div>
                        </div>
                    </div>
                </div>

                <div className='column2'>
                    <div className="column2-group2-home">
                        <div className="img-wrapper" data-aos="fade-up">
                            <img src={JADED_LONDON} alt="" />
                        </div>
                        <div className="column2-group2-home-title" data-aos="fade-up" data-aos-delay="100">
                            <p>Fashion Jeans</p>
                            <Link to="/catalog"><h1>JADED LONDON</h1></Link>
                        </div>
                        <div className="column2-group2-home-description" data-aos="fade-up" data-aos-delay="200">
                            <div className="h4">Дерзкий уличный шик: штаны с разрушенными деталями, гранж-принтами и провокационным кроем.</div>
                        </div>
                    </div>
                    <div className="column2-group3-home">
                        <div className="img-wrapper" data-aos="fade-up">
                            <img src={TORNADO_MART} alt="" />
                        </div>
                        <div className="column2-group3-home-title" data-aos="fade-up" data-aos-delay="100">
                            <p>Fashion Jeans</p>
                            <Link to="/catalog"><h1>TORNADO MART</h1></Link>
                        </div>
                        <div className="column2-group3-home-description" data-aos="fade-up" data-aos-delay="200">
                            <div className="h4">Неудержимая энергия стиля: штаны с урбан-принтами и динамичным кроем.</div>
                        </div>
                    </div>
                </div>

                <div className="column3">
                    <div className="column3-group4-home">
                        <div className="img-wrapper" data-aos="fade-up">
                            <img src={RICK_OWENS} alt="" />
                        </div>
                        <div className="column3-group4-home-title" data-aos="fade-up" data-aos-delay="100">
                            <p>Fashion Jeans</p>
                            <Link to="/catalog"><h1>RICK OWENS</h1></Link>
                        </div>
                        <div className="column3-group4-home-description" data-aos="fade-up" data-aos-delay="200">
                            <div className="h4">Авангардный минимализм в каждой строчке: штаны с гротескным кроем, деконструкцией и скульптурными силуэтами.</div>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}
