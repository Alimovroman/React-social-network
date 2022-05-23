import classes from './Paginator.module.css';

const Paginator = ({findUsers: {totalUsersCount, pageSize, currentPage}, onSetPage}) => {
  let pageUsers = Math.ceil(totalUsersCount / pageSize);
  let pagesData = [];
  for (let i = 1; i <= pageUsers; i++) {
    pagesData.push(i);
  }

  return (
    <div>
      {pagesData.map(p =>
      (<button key={p} onClick={() => onSetPage(p)}
        className={currentPage === p ? classes.selectedPage : classes.buttonPage}>
        {p}
      </button>))}
    </div>
  )
};

export default Paginator;