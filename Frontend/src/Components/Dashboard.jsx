import React, { useEffect, useState } from 'react'
import axios from "axios"
import { addProducts, removeProducts } from '../Store/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-black min-h-screen">
        {product?.map((product) => (
          <div
            key={product._id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:border-blue-500 transition-all duration-300"
          >
            <img
              src={product.images}
              alt={product.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold text-white">
                {product.name}
              </h2>

              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="bg-zinc-800 text-green-400 px-3 py-1 rounded-full text-xs capitalize">
                  {product.category}
                </span>

                <span className="text-2xl font-bold text-green-500">
                  ₹{product.price}
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-3">
                Stock: {product.quantity}
              </p>

              <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center w-full justify-center'>
        <button className='px-5 py-1 bg-blue-600 rounded-lg text-white' onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}>Back</button>
        <p className='text-xl'>{page}</p>
        <button className='px-5 py-1 bg-blue-600 rounded-lg text-white' onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </>
  )
}

export default Dashboard
