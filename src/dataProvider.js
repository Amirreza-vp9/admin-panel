import React, { useState, createContext, useEffect } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [data, setData] = useState({
    news: [
      [
        {
          id: 1,
          name: "رزرو هتل آنکارا",
          address: "ankara",
        },
        {
          id: 2,
          name: "رزرو هتل کرمان",
          address: "kerman",
        },
        {
          id: 3,
          name: "رزرو هتل کیش",
          address: "kish",
        },
        {
          id: 4,
          name: "رزرو هتل استانبول",
          address: "istanbul",
        },
      ],
      [
        {
          id: 5,
          name: "رزرو هتل مشهد",
          address: "mashhad",
        },
        {
          id: 6,
          name: "رزرو هتل تهران",
          address: "tehran",
        },
        {
          id: 7,
          name: "رزرو هتل ازمیر",
          address: "izmir",
        },
      ],
    ],
    currentUser: null,
  });

  useEffect(() => {
    if (data) return localStorage.setItem("database", JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData, menuIsOpen, setMenuIsOpen }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
