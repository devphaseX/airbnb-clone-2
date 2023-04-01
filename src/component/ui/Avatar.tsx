import Image from 'next/image';

interface AvatarProps {
  src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => (
  <div>
    <Image
      src={src ?? '/images/placeholder.jpg'}
      alt="avatar"
      className="rounded-full"
      height={30}
      width={30}
    />
  </div>
);
export { Avatar };
