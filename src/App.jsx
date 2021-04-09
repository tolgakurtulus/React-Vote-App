import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import FormVal from "./components/FormVal";
import VoteList from "./components/VoteList";
import SubmitLink from "./components/SubmitLink";
import ReturnForm from "./components/ReturnForm";
import ReactPaginate from "react-paginate";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  const [inputText, setInputText] = useState("");
  const [inputLink, setInputLink] = useState("");
  const [activePage, setActivePage] = useState("1");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(todos.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  // Use Effect Only Once App Start  ( "[]" this is provide)
  useEffect(() => {
    getLocalTodos();
  }, []);

  // Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
    voteSort();
  }, [todos, status]);

  useEffect(() => {
    filterHandlerTest();
  }, [activePage]);


  const voteSort = () => {
    setFilteredTodos(todos.sort((a,b) => b.score - a.score));
  }

  const statusHandlerActive = (e) => {
    setActivePage(e.target.dataset.val)
  }

  const filterHandler = () => {
    switch (status) {
      case "all":
        setFilteredTodos(todos.sort((a,b) => b.score > a.score ? 1 : -1));
        break;
      case "atoz":
        setFilteredTodos(todos.sort((a,b) => a.text < b.text ? 1 : -1));
        break;
      case "ztoa":
        setFilteredTodos(todos.sort((a,b) => b.text < a.text ? 1 : -1));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  
  const filterHandlerTest = () => {
    setFilteredTodos(todos.filter((todo) => todo.completed === true));
  }

  // Save to Local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Get to Local
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App c-app">
      <header>
        <h1>Vote App</h1>
      </header>
      <Router>
          <Switch>
            <Route path="/form">
              <ReturnForm />
              <FormVal 
                inputText={inputText} 
                inputLink={inputLink} 
                todos={todos} 
                setTodos={setTodos} 
                setInputText={setInputText} 
                setInputLink={setInputLink} 
                setStatus={setStatus} 
              />
            </Route>
            <Route path="/">
              <SubmitLink />
              <VoteList 
                filteredTodos={filteredTodos} 
                setTodos={setTodos} 
                todos={todos} 
                pagesVisited={pagesVisited} 
                usersPerPage={usersPerPage} 
              />
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
