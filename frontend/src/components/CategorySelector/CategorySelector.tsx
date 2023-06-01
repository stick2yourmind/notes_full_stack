
import { Fragment, useEffect, useState } from 'react';
import { CategorySelectorProps } from './CategorySelector.types';
import { Category, Note } from '@/data/types';
import { categoryService } from '@/services/category.service';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

export default function CategorySelector({callback, selectedCategories}:CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Note['categories']>(selectedCategories);
  
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const resData = categoryService.get<Category[]>({config:{signal: abortController.signal}});
      const data =  await resData;
      return data;
    };
    fetchData()
      .then(data => setCategories(data || []))
      .catch(()=> abortController.abort());
  
    return () => {
      abortController.abort();
    };
  }, []);

  const handleChangeCategory = (categoryArray:number[]) => {
    setSelectedCategory(categoryArray);
    callback(categoryArray);
    
  };
  

  return (
    <div className="top-16 w-72 text-black border-2">
      <Listbox value={selectedCategory} onChange={handleChangeCategory} multiple>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">Category</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories && categories?.length 
                ?  categories.map((category) =>(
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                      }`
                    }
                    value={category.id}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {category.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))
                : ''
              }
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
