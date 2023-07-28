import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";

type NoteListProps = {
    availableTags: Tag[]
}
function NotesList({ availableTags }: NoteListProps) {
    const [selectedTag, setSelectedTag] = useState<Tag[]>([])
    const [title, setTitle] = useState("")

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
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={title} onChange={e=>setTitle(e.target.value)}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='tag'>
                                <Form.Label>Tags</Form.Label>
                                <ReactSelect
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