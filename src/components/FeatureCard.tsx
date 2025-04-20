
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  className?: string;
}

const FeatureCard = ({ title, description, icon, link, className }: FeatureCardProps) => {
  return (
    <Link to={link} className={cn(
      "pet-card p-6 flex flex-col items-center text-center transition-all hover:translate-y-[-5px]",
      className
    )}>
      <div className="w-16 h-16 bg-pet/10 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

export default FeatureCard;
