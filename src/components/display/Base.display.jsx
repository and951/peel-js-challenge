/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';

import {
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  textStyle,
  colorStyle,
  buttonStyle,
  width,
} from 'styled-system';

const StyledBase = styled('div', { shouldForwardProp })(
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  textStyle,
  colorStyle,
  buttonStyle,
  width
);

const Base = React.forwardRef((props, ref) => <StyledBase {...props} ref={ref} />);

export default Base;
