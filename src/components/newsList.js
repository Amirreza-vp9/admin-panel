import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../dataProvider";
import "../styles/newsList.css";
import * as TiIcons from "react-icons/ti";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

String.prototype.toPersianDigits = function () {
  let digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return this.replace(/[0-9]/g, function (w) {
    return digits[+w];
  });
};

const NewsList = () => {
  const { data } = useContext(DataContext);
  const { menuIsOpen } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  let today = new Date().toLocaleDateString("fa-IR");

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const pages = data.news.length;

  return (
    <div className={menuIsOpen ? "news-table-b" : "news-table-m"}>
      <div className="news-table">
        <div className={menuIsOpen ? "navbar-b" : "navbar"}>
          <div className="date">{today}</div>
          <h2>لیست اخبار</h2>
        </div>
        <div className="all-table">
          <button
            className="addNewsBtn"
            onClick={() => navigate("/home/addNews")}
          >
            افزودن خبر
          </button>
          <div className="table">
            <div className="section">
              <div className="title">
                <div>Id</div>
                <TiIcons.TiFilter className="icon" />
              </div>
              <div>
                <div>
                  {data.news[currentPage].map((item) => {
                    return (
                      <div className="element" key={item.id}>
                        {item.id.toString().toPersianDigits()}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">
                <div>عنوان</div>
                <TiIcons.TiFilter className="icon" />
              </div>
              <div>
                <div>
                  {data.news[currentPage].map((item) => {
                    return (
                      <div className="element" key={item.id}>
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title">
                <div>آدرس</div>
                <TiIcons.TiFilter className="icon" />
              </div>
              <div>
                {data.news[currentPage].map((item) => {
                  return (
                    <div className="element" key={item.id}>
                      {item.address}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="paginate"
          />
        </div>
      </div>
    </div>
  );
};
export default NewsList;
