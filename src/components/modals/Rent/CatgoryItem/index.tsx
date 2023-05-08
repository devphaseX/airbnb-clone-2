import { CategoryItemData, ItemCategory } from '@/data/category/data';

interface CategoryItemProps extends CategoryItemData {
  onClick: (type: ItemCategory) => void;
  label: ItemCategory;
  selected?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => (
  <div
    className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
  `}
    onClick={() => onClick(label)}
  >
    <div>
      <Icon size={30} />
    </div>
    <div className="font-semibold">
      <p>{label}</p>
    </div>
  </div>
);

export { CategoryItem };
