import { CardMain } from './Card';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';

const Card = CardMain;
Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;