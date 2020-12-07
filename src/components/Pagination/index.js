import React from 'react';
import { MemoryRouter, Route, useParams, useLocation } from 'react-router';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export function PaginationLink({total, setSearchSelected}) {


  return (
    <MemoryRouter initialEntries={['/notifications']} initialIndex={0}>
      <Route>
        {({ location }) => {
          const query = new URLSearchParams(location.search);
          const page = parseInt(query.get('page') || '1', 10);
          console.log(location)
          console.log(query)
          setSearchSelected(page)
          return (
            <Pagination
              page={page}
              count={total}
              size="large"
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/notifications${item.page === 1 ? '' : `?page=${item.page}`}`}

                  {...item}
                />
              )}
            />
          );
        }}
      </Route>
    </MemoryRouter>
  );
}


export default PaginationLink;
