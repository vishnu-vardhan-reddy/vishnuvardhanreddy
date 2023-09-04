import React, { useState, useEffect, useMemo } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const Work = () => {
  const [works, setWorks] = useState([]);
  // const [filterWork, setFilterWork] = useState([]);
  // const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTabletOrMobile = useMediaQuery({ query: '(min-width: 1100px)' });

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data.reverse());
      // setFilterWork(data);
      setAnimateCard([{ y: 0, opacity: 1 }]);
    });
  }, []);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  // const handleWorkFilter = (item) => {
  //   setActiveFilter(item);
  //   setAnimateCard([{ y: 100, opacity: 0 }]);

  //   setTimeout(() => {
  //     setAnimateCard([{ y: 0, opacity: 1 }]);

  //     if (item === 'All') {
  //       setFilterWork(works);
  //     } else {
  //       setFilterWork(works.filter((work) => work.tags.includes(item)));
  //     }
  //   }, 500);
  // };

  return (
    <>
      <h2 className='head-text'>
        My Creative <span>Portfolio</span> Section
      </h2>

      {/* <div className='app__work-filter'>
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) =>
          (
            <div
              key={index}
              onClick={() =>
                handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            >
              {item}
            </div>
          ))}
      </div> */}
      {isTabletOrMobile ? (
        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className='app__work-portfolio'
        >
          {works.map((work) =>
            (
              <WorkItem work={work} key={work._id} />
            ))}
        </motion.div>
      ) : (
        works.length && (
          <div className='app__testimonial-row app__flex'>
            <div
              className='app__flex app__testimonial-btn'
              onClick={() => {
                handleClick(
                  currentIndex === 0 ? works.length - 1 : currentIndex - 1
                );
              }}
            >
              <HiChevronLeft />
            </div>
            <MobileWorkItem works={works} currentIndex={currentIndex} />
            <div
              className='app__flex app__testimonial-btn'
              onClick={() => {
                handleClick(
                  currentIndex === works.length - 1 ? 0 : currentIndex + 1
                );
              }}
            >
              <HiChevronRight />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg'
);

const WorkItem = ({ work }) =>
  (
    <div className='app__work-item '>
      <div className='app__work-img app__flex'>
        <img src={urlFor(work.imgUrl)} alt={work.name} />

        <motion.div
          whileHover={{ opacity: [0, 1] }}
          transition={{
            duration: 0.25,
            ease: 'easeInOut',
            staggerChildren: 0.5
          }}
          className='app__work-hover app__flex'
        >
          <a href={work.projectLink} target='_blank' rel='noreferrer'>
            <motion.div
              whileInView={{ scale: [0, 1] }}
              whileHover={{ scale: [1, 0.9] }}
              transition={{ duration: 0.25 }}
              className='app__flex'
            >
              <AiFillEye />
            </motion.div>
          </a>
          <a href={work.codeLink} target='_blank' rel='noreferrer'>
            <motion.div
              whileInView={{ scale: [0, 1] }}
              whileHover={{ scale: [1, 0.9] }}
              transition={{ duration: 0.25 }}
              className='app__flex'
            >
              <AiFillGithub />
            </motion.div>
          </a>
        </motion.div>
      </div>

      <div className='app__work-content app__flex'>
        <h4 className='bold-text'>{work.title}</h4>
        <p className='p-text' style={{ marginTop: 10 }}>
          {work.description}
        </p>

        <div className='app__work-tag app__flex'>
          <p className='p-text'>{work.tags[0]}</p>
        </div>
      </div>
    </div>
  );

const MobileWorkItem = ({ works, currentIndex }) => {
  const work = useMemo(() =>
    works[currentIndex], [currentIndex]);
  return (
    <>
      <WorkItem work={work} />
    </>
  );
};
