// ========================================================================================
/*                                                                                      *
 * ATOM: CONTAINER                                                                     *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';
import PropTypes from 'prop-types';

// * Display/UI
import { Box } from '@display';

const Container = (props) => {
  const containerStyles = {
    maxWidth: {
      s: '767px',
      m: '960px',
      l: '1400px',
    },
    mx: 'auto',
  };
  const { children } = props;
  return (
    <Box {...props} {...containerStyles}>
      {children}
    </Box>
  );
};

Container.propTypes = {
  children: PropTypes.element,
};

Container.defaultProps = {
  children: <></>,
};

export default Container;
