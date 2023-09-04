import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AnimatedCursor from 'react-animated-cursor';
import { About, Footer, Header, Skills, Testimonial, Work } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <div className='app'>
      <motion.div className='progress-bar' style={{ scaleX }} />
      <AnimatedCursor
        innerSize={15}
        outerSize={15}
        color='255, 255 ,255'
        outerAlpha={0.4}
        innerScale={0.7}
        outerScale={5}
      />
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
