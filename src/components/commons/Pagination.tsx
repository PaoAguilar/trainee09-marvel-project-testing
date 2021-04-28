import React from 'react';
import NextImg from '../../img/next.png';
import PrevImg from '../../img/prev.png';

import '../../styles/pagination.scss';

const Pagination = ({
  total,
  currentPage,
  paginate,
}: {
  total: number;
  currentPage: number;
  paginate: (p: number) => void;
}) => {
  return (
    <div className="pagination">
      <div>
        <div className="pagination__images">
          <img
            src={PrevImg}
            alt="Previous"
            onClick={() => {
              if (currentPage > 1) {
                paginate(currentPage - 1);
              }
            }}
          />
        </div>
      </div>
      <div className="pagination__number">
        <h3>{currentPage}</h3>
      </div>
      <div>
        <div className="pagination__images">
          <img
            src={NextImg}
            alt="Next"
            onClick={() => {
              if (currentPage > 0 && currentPage < total) {
                paginate(currentPage + 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
