import {
  faArrowUp,
  faLink,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export const iconDefinitions: Record<string, IconDefinition> = {
  arrowUp: faArrowUp,
  arrowLeft: faArrowLeft,
  link: faLink,
};

export enum icons {
  arrowUp = 'arrowUp',
  arrowLeft = 'arrowLeft',
  link = 'link',
}
