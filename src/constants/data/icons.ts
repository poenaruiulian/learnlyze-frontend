import { faArrowUp, faLink } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export const iconDefinitions: Record<string, IconDefinition> = {
  arrowUp: faArrowUp,
  link: faLink,
};

export enum icons {
  arrowUp = 'arrowUp',
  link = 'link',
}
