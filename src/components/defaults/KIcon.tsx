import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { iconDefinitions } from '@constants';

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
