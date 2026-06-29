import React, { useEffect, useState } from 'react'
import axios from "axios"
import { addProducts, removeProducts } from '../Store/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select';
import Cards from './Cards';
const Dashboard = () => {
  const product = useSelector((store) => store.products.value)
  const [page, setPage] = useState(1)
  const [priceFilter, setpriceFilter] = useState(null)
  const [category, setCategory] = useState(null)
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(null);
  const Options = [
    { value: "htol", label: "High to Low" },
    { value: "ltoh", label: "Low to High" }
  ]
  const categoryOptions = [
    { value: "all", label: "All" },
    { value: "dairy", label: "Dairy" },
    { value: "groceries", label: "Groceries" },
    { value: "grains", label: "Grains" },
    { value: "beverages", label: "beverages" },
    { value: "electronics", label: "Electronics" }
  ]
  const dispatch = useDispatch()
  const fetchProduct = async () => {
    try {
      const isSearch = debouncedSearch?.trim() || null;
      const isCategory = category?.value === "all" ? null : category?.value;

      let url = `http://localhost:7777/store/get-product?page=${page}&limit=10&price=${priceFilter?.value}`;

      if (isSearch) {
        url += `&search=${encodeURIComponent(isSearch)}`;
      }

      if (isCategory) {
        url += `&category=${encodeURIComponent(isCategory)}`;
      }
      const res = await axios.get(url, { withCredentials: true })
      dispatch(removeProducts())
      dispatch(addProducts(res.data.data))
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchProduct();
  }, [page, priceFilter, debouncedSearch, category]);
  return (
    <>
      <div className='w-full flex justify-end gap-4 items-center p-5'>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-24 md:w-auto"
        />
        <Select
          options={Options}
          value={priceFilter}
          onChange={setpriceFilter}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1f2937",
              borderColor: "#4b5563",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1f2937",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor:
                state.isFocused || state.isSelected ? "#374151" : "#1f2937",
              color: "#fff",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#fff",
            }),
            input: (base) => ({
              ...base,
              color: "#fff",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#9ca3af",
            }),
          }}
        />
        <Select
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1f2937",
              borderColor: "#4b5563",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1f2937",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor:
                state.isFocused || state.isSelected ? "#374151" : "#1f2937",
              color: "#fff",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#fff",
            }),
            input: (base) => ({
              ...base,
              color: "#fff",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#9ca3af",
            }),
          }}
        />
      </div>
      <Cards product={product}/>
      <div className='flex items-center w-full justify-center'>
        <button className='px-5 py-1 bg-blue-600 rounded-lg text-white' onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}>Back</button>
        <p className='text-xl'>{page}</p>
        <button className='px-5 py-1 bg-blue-600 rounded-lg text-white' onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </>
  )
}

export default Dashboard
