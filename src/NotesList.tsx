import { Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotesList() {
    return (<>
        <Row>
            <Col>
            <h1>Notes</h1>
            </Col>
            <Col xs='auto'>
                <Stack gap={2} direction="horizontal">
                    <Link to='/create'>
                        <Button variant="primary">Create</Button>
                    </Link>
                    <Button variant="secondary">Edit</Button>
                </Stack>
            </Col>
        </Row>
    </>);
}

export default NotesList;