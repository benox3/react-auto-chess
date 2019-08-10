import { COLUMNS } from '../../../constants';
import { CellArea } from '../components/BoardContext';

export default function(y: number, area: CellArea) {
  if (area === CellArea.DECK) return true;
  return y > COLUMNS / 2 - 1;
}
