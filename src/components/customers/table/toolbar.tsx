import { useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
// UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './viewOption';
import { DataTableFacetedFilter } from './facetedFilter';
// Utils
import useDebounce from '@/hooks/useDebounceValue';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearch, searchValue, setSearchValue] = useDebounce<string>(
    searchParams.get('name') ?? '',
    500
  );

  useEffect(() => {
    let params: Record<string, string> = Object.fromEntries(
      searchParams.entries()
    );
    if (debouncedSearch) {
      params = { ...params, name: debouncedSearch };
    } else {
      delete params.name;
    }
    setSearchParams(params);
  }, [debouncedSearch]);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter customers...'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
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
        {searchParams.size > 0 && (
          <Button
            variant='ghost'
            onClick={() => setSearchParams(undefined)}
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
