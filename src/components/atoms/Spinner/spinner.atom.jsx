
// ========================================================================================
/*                                                                                      *
 * ATOM: SPINNER                                                                        *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';
import PropTypes from 'prop-types';

// * Styles
import theme from '@styles/theme';
import SpinnerStyles from './spinner.styles'
// * Display/UI
import { Box } from '@display/'
import {Icon} from '@atoms/'



const Spinner = ({
}) => (
  <Box
  css={SpinnerStyles}
  >
   <Icon
              className='loaderIcon'
              color={theme.colors.black}
              icon='spinner'
              size={15}
            />
  </Box>
);

const propTypes = {
  size: PropTypes.number,
  animationDuration: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  size: 150,
  color: '#fff',
  animationDuration: 2000,
  className: '',
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;