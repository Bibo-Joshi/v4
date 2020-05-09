import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { IconLoader } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins } from '@styles';
const { colors } = theme;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.darkNavy};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;
const StyledLogo = styled.div`
  width: max-content;
  max-width: 5000px;
  transition: ${theme.transition};
  opacity: ${props => (props.isMounted ? 1 : 0)};
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    fill: none;
    user-select: none;
    #A1 {
      opacity: 0;
    }
    #A2 {
      opacity: 0;
    }
    #A3 {
      opacity: 0;
    }
    #A4 {
      opacity: 0;
    }
    #A5 {
      opacity: 0;
    }
    #B1 {
      opacity: 0;
    }
    #B2 {
      opacity: 0;
    }
    #B3 {
      opacity: 0;
    }
    #B4 {
      opacity: 0;
    }
    #B5 {
      opacity: 0;
    }
    #B6 {
      opacity: 0;
    }
    #B7 {
      opacity: 0;
    }
    #B8 {
      opacity: 0;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '#logo path',
        delay: 300,
        duration: 1000,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #A1, #logo #A2, #logo #A3, #logo #A4, #logo #A5',
        duration: 500,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo #B1, #logo #B2, #logo #B3, #logo #B4, #logo #B5, #logo #B6, #logo #B7, #logo #B8',
        duration: 500,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo',
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledContainer className="loader">
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <StyledLogo isMounted={isMounted}>
        <IconLoader />
      </StyledLogo>
    </StyledContainer>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
