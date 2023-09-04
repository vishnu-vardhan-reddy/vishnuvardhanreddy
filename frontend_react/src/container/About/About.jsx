import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useMediaQuery } from 'react-responsive';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTabletOrMobile = useMediaQuery({ query: '(min-width: 1100px)' });

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='about'>
      <h2 className='head-text'>
        Roles <span>&</span> Responsibilties
      </h2>

      <div className='app__profiles'>
        {isTabletOrMobile
          ? abouts.map((about, index) =>
            (
              <AboutItem key={about.title + index} about={about} />
            ))
          : abouts.length && (
          <div className='app__testimonial-row app__flex'>
            <div
              className='app__flex app__testimonial-btn'
              onClick={() => {
                handleClick(
                  currentIndex === 0 ? abouts.length - 1 : currentIndex - 1
                );
              }}
            >
              <HiChevronLeft />
            </div>
            <MobileAboutItem abouts={abouts} currentIndex={currentIndex} />
            <div
              className='app__flex app__testimonial-btn'
              onClick={() => {
                handleClick(
                  currentIndex === abouts.length - 1 ? 0 : currentIndex + 1
                );
              }}
            >
              <HiChevronRight />
            </div>
          </div>
          )}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg'
);

const AboutItem = ({ about }) =>
  (
    <motion.div
      whileInView={{ opacity: 0.5 }}
      whileHover={{ scale: 1.02, opacity: 1 }}
      transition={{ duration: 0.5, type: 'tween' }}
      className='app__profile-item'
    >
      <img src={urlFor(about.imgUrl)} alt={about.title} />
      <h2 className='bold-text' style={{ marginTop: 20 }}>
        {about.title}
      </h2>
      <p className='p-text' style={{ marginTop: 10 }}>
        {about.description}
      </p>
    </motion.div>
  );

const MobileAboutItem = ({ abouts, currentIndex }) => {
  const about = useMemo(() =>
    abouts[currentIndex], [currentIndex]);
  return (
    <>
      <AboutItem about={about} />
    </>
  );
};
