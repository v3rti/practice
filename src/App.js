import { useState } from "react";

function SearchBar({filterText, isStockOnly, onFilterTextChange, onStockOnlyChange}){



  return(
    <>
      <form>
        <input onChange={(e) => onFilterTextChange(e.target.value)} value={filterText} type="text" />
        <div>
          <input onChange={(e) => onStockOnlyChange(e.target.checked)} checked={isStockOnly} type="checkbox" id="stock"/>
          <label htmlFor="stock">Only show products in stock</label>
        </div>
      </form>
    </>
  )
}

function ProductTable({filterText, isStockOnly, products}) {

  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (isStockOnly && !product.stocked) {
      return;
    }

    if(product.category !== lastCategory){
      rows.push(<ProductCategoryRow key={product.category} category={product.category} />)
    }

    rows.push(<ProductRow key={product.name} product={product} />)
    lastCategory = product.category;
  })

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

function ProductCategoryRow({category}) {
  return(
    <tr><th colSpan={2}>{category}</th></tr>
  )
}


function ProductRow({product} ){
  return(
    <tr>
      <td className={!product.stocked ? "nostock" : ""}>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  )
}


function FilterableProductTable(){

  const data = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];

  const [filterText, setFilterText] = useState('')
  const [isStockOnly, setIsStockOnly] = useState(false);

  return(
    <div className="centered">
      <SearchBar filterText={filterText} isStockOnly={isStockOnly} onFilterTextChange={setFilterText} onStockOnlyChange={setIsStockOnly}/>
      <ProductTable products={data} filterText={filterText} isStockOnly={isStockOnly}/>
    </div>
  )
}

export default function App(){
  return(
    <FilterableProductTable />
  )
}
