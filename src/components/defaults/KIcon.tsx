import { iconDefinitions } from '@constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

type KIconProps = {
  size?: number;
  color?: string;
  icon: keyof typeof iconDefinitions;
};
export const KIcon = ({ ...props }: KIconProps) => (
  <FontAwesomeIcon
    icon={iconDefinitions[props.icon]}
    size={props.size}
    color={props.color}
  />
);
