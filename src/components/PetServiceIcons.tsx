
import { Cat, Dog, Bird, Rabbit, Mouse } from 'lucide-react';

interface PetServiceIconProps {
  petType: 'dog' | 'cat' | 'bird' | 'rabbit' | 'mouse';
  size?: number;
  className?: string;
}

export const PetServiceIcon = ({ petType, size = 24, className = '' }: PetServiceIconProps) => {
  const iconProps = {
    size,
    className: `text-pet ${className}`,
  };

  switch (petType) {
    case 'dog':
      return <Dog {...iconProps} />;
    case 'cat':
      return <Cat {...iconProps} />;
    case 'bird':
      return <Bird {...iconProps} />;
    case 'rabbit':
      return <Rabbit {...iconProps} />;
    case 'mouse':
      return <Mouse {...iconProps} />;
    default:
      return <Dog {...iconProps} />;
  }
};

export default PetServiceIcon;
