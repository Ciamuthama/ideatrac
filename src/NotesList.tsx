import { Button, Col, Form, Row, Stack } from "react-bootstrap";
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
        <Form>
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label column sm={3}>Title</Form.Label>
                        <Form.Control type='text'/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='tag'>
                                <Form.Label>Tags</Form.Label>
                                <CreatableReactSelect
                                    onCreateOption={label => {
                                        const newTag = { id: uuidV4(), label }
                                        onAddTag(newTag)
                                        setSelectedTag(prev=>[...prev, newTag])
                                    }}
                                    value={selectedTag.map(tag => {
                                        return { label: tag.label, value: tag.id }
                                    })}
                                    options={availableTags.map(tag => { return { label: tag.label, value: tag.id}})}
                                    onChange={tag => {
                                        setSelectedTag(tag.map(tag => {
                                            return { label: tag.label, id: tag.value }
                                        }))
                                    }} isMulti />
                            </Form.Group>
                </Col>
            </Row>
        </Form>
    </>);
}

export default NotesList;