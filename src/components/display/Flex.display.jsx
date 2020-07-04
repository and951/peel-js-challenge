// ========================================================================================
/*                                                                                      *
 * ATOM: FLEX                                                                            *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';

// * Styles
import styled from '@emotion/styled';
import { variant } from 'styled-system';

// * Display/UI
import Base from './Base.display';

const FlexBase = styled(Base)(variant({ scale: 'layouts' }));

const Flex = React.forwardRef((props, ref) => (
  <FlexBase as='div' display='flex' data-display='Flex' {...props} ref={ref} />
));

export default Flex;
