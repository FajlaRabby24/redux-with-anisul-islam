import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const App = () => {
  return (
    <div className="flex flex-col items-center ">
      <BookForm />
      <BookList />
    </div>
  );
};

export default App;
