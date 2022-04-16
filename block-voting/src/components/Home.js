import React, { useState, useEffect } from 'react';
import {Table, Container, Button} from 'react-bootstrap';

const Home = props => {

    const [proposalList, changeProposals] = useState([]);

    useEffect(() => {
        const getPrompts = async () => {
            return await window.contract.getAllPrompts();
        };
        getPrompts().then( ps => changeProposals(ps) );
    }, [changeProposals]);

    return (
        <Container>
            <Container className="my-sm-5">
                <p className="lead">Mai jos gasiti propunerile curente si un link catre pagina in care puteti vota optiunea pe care o considerati potrivita.</p> 
            </Container>
            <Container>
                <Table hover striped bordered responsive>
                    <thead>
                        <tr>
                            <th width="100">Decizie</th>
                            <th>Propunere</th>
                            <th width="100">Voteaza</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            proposalList.map((element, index) => {
                                return(<tr key={index}>
                                    <td width="100" className="align-middle">{index+1}</td>
                                    <td className="align-middle">{element}</td>
                                    <td width="100">
                                        <Container className="d-flex justify-content-center align-items-center">
                                            <Button variant="link" onClick={() => {
                                                window.location.replace(window.location.href + `vote?prompt=${encodeURIComponent(element)}`);
                                            }}>Voteaza</Button>
                                        </Container>
                                    </td>
                                </tr>);
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
};

export default Home;