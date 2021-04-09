import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Alert } from "react-bootstrap";



const FormVal = ({ setInputText, setInputLink, todos, setTodos, inputText, inputLink, setStatus }) => {

    const [validated, setValidated] = useState(false);  
    // const [valAlert, setvalAlert] = useState(false);  

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    }

    const inputLinkHandler = (e) => {
        setInputLink(e.target.value)
    }

    const submitTodoHandler = (e) => {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      // setvalAlert(true);

      e.preventDefault();
      setTodos([
          ...todos,
          { text: inputText, link: inputLink, completed: false, id: Math.random() * 100, score: 0, index: 0 },
      ]);
      setInputText("");
    }

    return (
          <Form noValidate validated={validated}>
          {/* <Alert className={`alertInfo ${valAlert}`} variant="success">
            <Alert.Heading>{inputText}</Alert.Heading>
          </Alert> */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label className="text-light">Link Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Link Name"
                value={inputText}
                onChange={inputTextHandler}
                />
              <Form.Control.Feedback>Success !</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label className="text-light">Link Url</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Link Url"
                value={inputLink}
                onChange={inputLinkHandler}
                />
              <Form.Control.Feedback>Success !</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* <Button className="btn btn-dark" type="submit">Add Link</Button> */}
          <Button onClick={submitTodoHandler} className="btn btn-dark" type="button">Add Link</Button>
        </Form>


    )
}

export default FormVal;