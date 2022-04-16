import React, { useEffect, useState } from 'react';
import {Container, Button, Table} from 'react-bootstrap';
import { Buffer } from 'buffer';
import { transactions } from 'near-api-js';

const Vote = props => {

    const [prompt, changePrompt] = useState("");
    const [options, changeOptions] = useState([]);
    const [votes, changeVotes] = useState([]);
    const [optionUrls, changeOptionUrls] = useState();
    const [allowVoting, shouldAllowVoting] = useState(true);

    const recordVote = async (_prompt, _selected) => {
        await window.contract.account.signAndSendTransaction({
            receiverId: window.contract.contractId,
            actions: [
                transactions.functionCall(
                    "addVote",
                    Buffer.from(JSON.stringify({prompt: _prompt, name: _selected})),
                    10000000000000,
                    "0"
                ),
                transactions.functionCall(
                    "recordUser",
                    Buffer.from(JSON.stringify({prompt: _prompt, user: window.accountId})),
                    10000000000000,
                    "0"
                ),
            ]
        });
    };

    useEffect(() => {
        let params = new URLSearchParams(document.location.search);

        const getOptions = async (pr) => {
            let _options = await window.contract.getCandidates({prompt: pr});
            let _votes = await window.contract.getVotes({prompt: pr});
            return {options: _options, votes: _votes}
        };

        if (params.get('prompt') != '') {
            changePrompt(params.get('prompt'));

            getOptions(params.get('prompt'))
            .then(_options => {
                changeOptions(_options.options);
                changeVotes(_options.votes);
            })
            .then(async () => {
                let voted = await window.contract.hasVoted({prompt: params.get('prompt'), user: window.accountId});
                shouldAllowVoting(!voted);
            });

        }
    }, [changePrompt, changeOptions, shouldAllowVoting, changeVotes]);

    return (
        <Container>
            <Container className="my-sm-5">
                <p className="lead">{prompt}</p> 
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Optiune</th>
                        <th>Descriere</th>
                        <th>Voturi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            options.map((option, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{option}</td>
                                        <td>{ (allowVoting && window.accountId != '') ?
                                            <Button onClick={()=>{
                                                shouldAllowVoting(false);
                                                let votes_tmp = votes;
                                                votes_tmp[index]++;
                                                changeVotes(votes_tmp);
                                                recordVote(prompt, option);
                                            }} >Voteaza</Button>
                                            :
                                            votes[index]
                                            }</td>
                                    </tr>
                                );
                            })
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default Vote;