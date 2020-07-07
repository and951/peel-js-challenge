// ========================================================================================
/*                                                                                      *
 * ATOM: ICON                                                                     *
 *                                                                                      */
// ========================================================================================
// * Lib
import React from 'react';
import IcoMoon from 'react-icomoon';

// * Util
import IconSet from './selection.json';

const IconAtom = React.memo(({ ...props }) => {
  return <IcoMoon iconSet={IconSet} {...props} />;
});

export default IconAtom;
