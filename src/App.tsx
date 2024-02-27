import { useMemo, useState } from 'react';
import "./App.css";
import ExpenseForm from "./components/expenseForm";
import TableFilter from "./components/tableFilter";

interface datas {
  description: string;
  amount: Number;
  category: string;
}

function App() {
  const [data, setFormSubmissions] = useState<datas[]>([]);

  const dataHandler = (data: datas) => {
    setFormSubmissions((prevSubmissions) => [...prevSubmissions, data]);
  };
  const onDelete = (index: number) => {
    setFormSubmissions((prevSubmissions) => [
      ...prevSubmissions.slice(0, index),
      ...prevSubmissions.slice(index + 1),
    ]);
  };

  const categoriesD = useMemo(() => {
    const allCategories = data.map((item) => item.category);
    return Array.from(new Set(allCategories));
  }, [data]);

  return (
    <>
      <ExpenseForm onSubmit={dataHandler} />

      <TableFilter value={data} onDelete={onDelete} categories={categoriesD} />
    </>
  );
}

export default App;
