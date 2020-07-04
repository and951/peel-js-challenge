// ========================================================================================
/*                                                                                      *
 * ATOM: HEADING                                                                            *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';

// * Display/UI
import Base from './Base.display';

const Heading = React.forwardRef((props, ref) => <Base data-display='Heading' {...props} ref={ref} />);

export default Heading;
