import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './viewOption';

import { DataTableFacetedFilter } from './facetedFilter';
import { X } from 'lucide-react';
import { APP_COMPANIES, DOSAGE_FORMS } from '@/constants';
import { useGetCategories } from '@/apis/categories';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

    const categoriesQuery = useGetCategories();

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter products...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('company') && (
          <DataTableFacetedFilter
            column={table.getColumn('company')}
            title='Company'
            options={APP_COMPANIES.map((company) => ({
              label: company,
              value: company,
            }))}
          />
        )}
        {table.getColumn('itemForm') && (
          <DataTableFacetedFilter
            column={table.getColumn('itemForm')}
            title='Dosage Form'
            options={DOSAGE_FORMS.map((company) => ({
              label: company,
              value: company,
            }))}
          />
        )}
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title='Category'
            options={categoriesQuery.data?.map((cat) => ({
              label: cat.name,
              value: cat._id,
            })) ?? []}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <X className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
