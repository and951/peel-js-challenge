import { AMOUNT_PER_FETCH } from '@constants/';
export default (index) =>
  Math.floor(index / AMOUNT_PER_FETCH) * AMOUNT_PER_FETCH;
