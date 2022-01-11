import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const Vote = ({ text, link, score, todo, todos, setTodos }) => {
  let [count, setCount] = useState(score);
  const [isShown, setIsShown] = useState("false");
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    increase();
    decrease();
  }, []);

  const increase = () => {
    setCount((count = count + 1));
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            score: count,
          };
        }
        return item;
      })
    );
  };

  const decrease = () => {
    setCount((count = count - 1));
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            score: count,
          };
        }
        return item;
      })
    );
  };

  const onCountEdit = (event) => {
    let countContent = Number(event.target.textContent);
    if (Number.isNaN(countContent)) setCount(Math.floor(Math.random() * 10));
    else setCount(countContent);
  };

  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  return (
    <div
      className="container"
      onMouseEnter={() => setIsShown("true")}
      onMouseLeave={() => setIsShown("false")}
    >
      <div className="box row">
        <div className="box-left col-4">
          <h2>
            <span className="count" contenteditable="true" onBlur={onCountEdit}>
              {score}
            </span>{" "}
            Points
          </h2>
        </div>
        <div className="box-right col-8">
          <button
            onClick={handleShow}
            className={`trash-btn btn btn-danger close-button ${isShown}`}
          >
            <i className="fas fa-trash"></i>
          </button>
          <div className="box-title">
            <p>{text}</p>
          </div>
          <div className="box-link">
            <p>{link}</p>
          </div>
          <div className="box-vote">
            <div className="count-wrapper">
              <button
                type="button"
                className="btn btn-danger"
                onClick={decrease}
              >
                ↓ Down Vote
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={increase}
              >
                ↑ Up Vote
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to remove ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteHandler}>
            Ok
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Vote;
