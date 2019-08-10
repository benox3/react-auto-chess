import { COLUMNS } from '../../../constants';

export default function(y: number) {
  return y > COLUMNS / 2 - 1;
}
