// ========================================================================================
/*                                                                                      *
 * ATOM: TEXT                                                                            *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';

// * Styles
import styled from '@emotion/styled';
import { variant } from 'styled-system';

// * Display/UI
import Base from './Base.display';

const StyledText = styled(Base)(variant({ scale: 'text' }));

const Text = React.forwardRef((props, ref) => <StyledText as='p' data-display='Text' {...props} ref={ref} />);

export default Text;
