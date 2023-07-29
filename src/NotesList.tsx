import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import {  Tag } from "./App";

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}

function NotesList({ availableTags,notes }: NoteListProps) {
    const [selectedTag, setSelectedTag] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
 
    const filteredNotes = useMemo(() => { 
        return notes.filter(note => {
            return ((title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
                //loop through each tag an make sure it return true the check if our notes has the tags we are looping through 
                (selectedTag.length === 0 || selectedTag.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))))
        })
    }, [title, selectedTag ,notes]) 
    
    return (<>
        <Row className="align-items-center mb-4">
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
                        <Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='tag'>
                        <Form.Label>Tags</Form.Label>
                        <ReactSelect
                            value={selectedTag.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            options={availableTags.map(tag => { return { label: tag.label, value: tag.id } })}
                            onChange={tag => {
                                setSelectedTag(tag.map(tag => {
                                    return { label: tag.label, id: tag.value }
                                }))
                            }} isMulti />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filteredNotes.map( note=>(
                <Col key={note.id}>
                    <NoteCard id={ note.id} title={note.title}  tags={note.tags} />
                </Col>
            ))}
        </Row>
    </>);
}
export default NotesList

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return <>hello</>
}