import React, { useRef, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Buffer } from 'buffer';
import { transactions } from 'near-api-js';

const NewPoll = props => {
    const [numberOfOptions, changeNumberOfOptions] = useState(2);

    const promptRef = useRef();

    const savePoll = async (_options) => {

        let param1 = {prompt: promptRef.current.value}
        let param2 = {
            prompt: promptRef.current.value,
            candidates: _options
        };

        await window.contract.account.signAndSendTransaction({
            receiverId: window.contract.contractId,
            actions: [
                transactions.functionCall(
                    "addToPromptArray",
                    Buffer.from(JSON.stringify(param1)),
                    10000000000000,
                    "0"
                ),
                transactions.functionCall(
                    "setCandidates",
                    Buffer.from(JSON.stringify(param2)),
                    10000000000000,
                    "0"
                ),
            ]
        });
    };

    return (
        <Container className="d-flex justify-content-center">
            <Form style={{
                position: 'absolute',
                top: '50vh',
                translate: '0 -50%'
            }} className="col-8">
                <h2 className="title my-sm-3">Adauga o propunere noua</h2>
                <Form.Group>
                    <Form.Label>Propunere</Form.Label>
                    <Form.Control ref={promptRef} placeholder="Textul propunerii" required/>
                </Form.Group>
                <hr/>
                <h5 className="secondary">Optiuni</h5>
                <Form.Group>
                    <Form.Label>Numar de optiuni</Form.Label>
                    <Form.Control placeholder='Numarul de optiuni' onChange={(e) => {
                        let num = parseInt(e.target.value);
                        if (!isNaN(num)) {
                            changeNumberOfOptions(Math.max(num, 2));
                        }
                    }}/>
                </Form.Group>
                <hr/>
                {
                    [...Array(numberOfOptions)].map((_, i) => {
                        return (
                            <Form.Group key={i}>
                                <Form.Label>Descrie optiunea</Form.Label>
                                <Form.Control id={i + "_option_text"} className="option-input" placeholder='Textul optiunii' required/>
                            </Form.Group>
                        );
                    })
                }
                <br/>
                <Button onClick={async () => {
                    const optionInputs = document.querySelectorAll('.option-input');
                    let _options = Array(numberOfOptions);
                    optionInputs.forEach((optionInput, index) => {
                        _options[index] = optionInput.value;
                    });
                    await savePoll(_options)
                }}>Salveaza</Button>
            </Form>
        </Container>
    );
};

export default NewPoll;