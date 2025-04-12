import { faEdit, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faArrowUp,
  faBookOpen,
  faLink,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

export const iconDefinitions: Record<string, IconDefinition> = {
  arrowUp: faArrowUp,
  arrowLeft: faArrowLeft,
  link: faLink,
  lesson: faBookOpen,
  magnifyingGlass: faMagnifyingGlass,
  edit: faEdit,
};

export enum icons {
  arrowUp = 'arrowUp',
  arrowLeft = 'arrowLeft',
  link = 'link',
  lesson = 'lesson',
  magnifyingGlass = 'magnifyingGlass',
  edit = 'edit',
}
