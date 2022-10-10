import { useQuery } from "@tanstack/react-query";
import { IRestaurant } from "common/types/restaurant.type";
import Layout from "components/Layout/Layout";
import RestaurantList from "components/RestaurantsList/RestaurantList";
import SearchRestaurantsList from "components/RestaurantsList/SearchRestaurantsList";
import CloseSolid from "components/UI/Icons/CloseSolid";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import { getAllRestaurantsByName } from "proxy/fetches/fetchRestaurant";
import React, {
  ChangeEvent,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";

const SearchPage: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const { data: resturantsList } = useQuery<IRestaurant[]>(
    [`restaurantsListWithName${searchText}`],
    () => getAllRestaurantsByName(searchText)
  );

  const handleClickClear = () => {
    setInputValue("");
    inputRef.current.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateSearchtext = useCallback(
    debounce((str: string) => {
      setSearchText(str);
    }, 700),
    []
  );

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleUpdateSearchtext(e.target.value);
  };

  return (
    <Layout title="Search">
      <div className="w-full h-36 sm:h-44 lg:h-56 bg-gradient-to-r from-[#e9701f] to-[#f5af19] rounded-xl my-6 mb-20 sm:mb-28 relative ">
        <div className="h-full flex justify-center items-center px-3">
          <p className="font-bold text-lg sm:text-2xl lg:text-3xl text-center -mt-4 sm:-mt-8 max-w-lg text-gray-100">
            Find the restaurant of <br /> your choice
          </p>
        </div>

        <div className="w-full px-4 absolute -bottom-[28px] sm:-bottom-[32px] lg:-bottom-[40px] flex justify-center">
          <div className="bg-white rounded-xl w-[400px] sm:w-[500px] lg:w-[600px] h-14 lg:h-20 shadow-xl shadow-gray-300 flex justify-between">
            <div className="flex w-full">
              <input
                value={inputValue}
                onChange={handleOnChangeInput}
                ref={inputRef}
                type="text"
                placeholder="Search for restaurants"
                className="rounded-xl w-full pl-4 sm:pl-10 text-base"
              />
            </div>
            <div
              onClick={handleClickClear}
              className="flex items-center justify-center w-24 border-l-[1px] b-[#ECF6FA] cursor-pointer"
            >
              <CloseSolid className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <SearchRestaurantsList data={resturantsList} />
      </div>
    </Layout>
  );
};

export default SearchPage;
