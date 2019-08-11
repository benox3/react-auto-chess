import { ROWS } from '../../../constants';
import { CellArea } from '../components/BoardContext';

export default function(x: number, area: CellArea) {
  if (area === CellArea.DECK) return true;
  return x > ROWS / 2 - 1;
}
