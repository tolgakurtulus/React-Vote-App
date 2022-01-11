import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import FormVal from "./components/FormVal";
import VoteList from "./components/VoteList";
import SubmitLink from "./components/SubmitLink";
import ReturnForm from "./components/ReturnForm";
import ReactPaginate from "react-paginate";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputLink, setInputLink] = useState("");
  const [activePage, setActivePage] = useState("1");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [paginationEmptyControlVal, setpaginationEmptyControlVal] = useState("false");
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(todos.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
    voteSort();
    paginationEmptyControl();
  }, [todos, status]);

  useEffect(() => {
    filterHandlerTest();
  }, [activePage]);

  const voteSort = () => {
    setFilteredTodos(todos.sort((a, b) => b.score - a.score));
  };

  const filterHandler = () => {
    switch (status) {
      case "all":
        setFilteredTodos(todos.sort((a, b) => (b.score > a.score ? 1 : -1)));
        break;
      case "atoz":
        setFilteredTodos(todos.sort((a, b) => (a.text < b.text ? 1 : -1)));
        break;
      case "ztoa":
        setFilteredTodos(todos.sort((a, b) => (b.text < a.text ? 1 : -1)));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const filterHandlerTest = () => {
    setFilteredTodos(todos.filter((todo) => todo.completed === true));
  };

  // Save to Local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Get to Local
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  const paginationEmptyControl = () => {
    if (todos.length !== 0) {
      setpaginationEmptyControlVal("true");
    } else {
      setpaginationEmptyControlVal("false", todos);
    }
  };

  return (
    <div className="App c-app">
      <header>
        <h1>Vote App 1</h1>
      </header>
      <Router>
        <Switch>
          <Route exact path="/form">
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
          <Route exact path="/">
            <SubmitLink />
            <VoteList
              filteredTodos={filteredTodos}
              setTodos={setTodos}
              todos={todos}
              pagesVisited={pagesVisited}
              usersPerPage={usersPerPage}
            />
            <ReactPaginate
              // className={}
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={`paginationBttns ${paginationEmptyControlVal}`}
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
