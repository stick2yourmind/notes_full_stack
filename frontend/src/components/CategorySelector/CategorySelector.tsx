
import { useEffect, useState } from 'react';
import { CategorySelectorProps } from './CategorySelector.types';
import { Category } from '@/data/types';
import { categoryService } from '@/services/category.service';

export default function CategorySelector({callback}:CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category[]>([]);

  const toggleSelected = (clickedCategory:Category) => {
    const previousSelected = [...selected];
    const isPreviousSelected = previousSelected?.some(category => 
      category.id === clickedCategory.id
    );
    const newSelected = isPreviousSelected 
      ? previousSelected.filter( category => category.id !== clickedCategory.id)
      : [...selected, clickedCategory];
    callback(newSelected);
    setSelected(newSelected);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const response = categoryService.get<Category[]>({config:{signal: abortController.signal}});
      const data =  await response;
      setCategories(data || []);
    };
    fetchData();
  
    return () => {
      abortController.abort();
    };
  }, []);
  

  return (
    <ul className="flex gap-1 flex-wrap">
      {
        categories && categories?.length 
          ?  categories.map((category) =>
            <button 
              type="button"
              className={
                selected.some( item => item.id === category.id)
                  ? 'p-1 bg-teal-600 rounded'
                  : 'p-1 bg-gray-400 rounded'
              }
              key={category.id} 
              onClick={()=>toggleSelected(category)}
            >
              <li>{category.title}</li>
            </button>
          )
          : ''
      }
    </ul>
  );
}
