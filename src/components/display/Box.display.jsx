// ========================================================================================
/*                                                                                      *
 * ATOM: BOX                                                                            *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';

// * Display/UI
import Base from './Base.display';

const Box = React.forwardRef((props, ref) => <Base as='div' data-display='Box' {...props} ref={ref} />);

export default Box;
