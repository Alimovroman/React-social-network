import { useState } from 'react';
import classes from './Paginator.module.css';
import React from 'react';

const Paginator = ({ findUsers: { pageSize, currentPage }, totalItemsCount, onSetPage, portionSize = 10 }) => {

  let pageUsers = Math.ceil(totalItemsCount / pageSize);
  let pagesData = [];
  for (let i = 1; i <= pageUsers; i++) {
    pagesData.push(i);
  };

  const [portionNumberPage, setPortionNumberPage] = useState(1)
  let portionCount = Math.ceil(pageUsers / portionSize);
  //  То как делал Димыч
  let leftPortionPageNumber = (portionNumberPage - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumberPage * portionSize;
  return (
    <div>
      {portionNumberPage === 1
        ? null
        : <button onClick={() => setPortionNumberPage(portionNumberPage - 1)}>&larr;</button>}
      {pagesData.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((pages) => {
          return <button key={pages} onClick={() => onSetPage(pages)}
          className={currentPage === pages ? classes.selectedPage : classes.buttonPage}>
            {pages}
          </button>
        })
      }
      {portionNumberPage === portionCount
        ? null
        : <button onClick={() => setPortionNumberPage(portionNumberPage + 1)}>&rarr;</button>}
    </div>
  )
};

export default Paginator;