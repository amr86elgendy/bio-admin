import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './viewOption';

import { DataTableFacetedFilter } from './facetedFilter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter customers...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('blocked') && (
          <DataTableFacetedFilter
            column={table.getColumn('blocked')}
            title='blocked'
            options={[
              {
                label: 'blocked',
                value: 'blocked',
              },
              {
                label: 'un-blocked',
                value: 'un-blocked',
              },
            ]}
          />
        )}
        {/* {table.getColumn('itemForm') && (
          <DataTableFacetedFilter
            column={table.getColumn('itemForm')}
            title='Dosage Form'
            options={DOSAGE_FORMS.map((company) => ({
              label: company,
              value: company,
            }))}
          />
        )} */}
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
