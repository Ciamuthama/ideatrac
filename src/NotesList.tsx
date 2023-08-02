import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
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
    onDeleteTags:(id:string)=>void
    onUpdateTags: (id: string, label:string)=>void
}

type EditTagsModalProp={
    show: boolean
    availableTags: Tag[]
    handleClose: () => void
    onDeleteTags:(id:string)=>void
    onUpdateTags: (id: string,label: string)=> void
}

function NotesList({ availableTags,notes, onUpdateTags,  onDeleteTags }: NoteListProps) {
    const [selectedTag, setSelectedTag] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
 
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
                <h1>IdeaTrac</h1>
            </Col>
            <Col xs='auto'>
                <Stack gap={2} direction="horizontal">
                    <Link to='/create'>
                        <Button variant=" btn btn-primary">Create</Button>
                    </Link>
                    <Button  onClick={()=> setEditTagsModalIsOpen(true)} variant="btn btn-secondary">Edit Tags</Button>
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
                <Col key={note.id} >
                    <NoteCard id={ note.id} title={note.title}  tags={note.tags} />
                </Col>
            ))}
        </Row>
        <EditTagsModal onUpdateTags={onUpdateTags} onDeleteTags={onDeleteTags} show={ editTagsModalIsOpen} handleClose={()=> setEditTagsModalIsOpen(false)} availableTags={availableTags} />
    </>);
}
export default NotesList

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-3">{ title}</span>
                    {tags.length > 0 && (
                        <Stack gap={3} direction="horizontal" className="justify-context-center flex-wrap">
                            {tags.map(tag => (
                                <Badge className='text-truncate p-2 fs-9 lh-sm' bg='dark' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    )
}

export function EditTagsModal({availableTags, handleClose, show, onDeleteTags,onUpdateTags}: EditTagsModalProp) {
    return (
        <>
        <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Stack gap={2}>
                            {availableTags.map(tag => (
                                <Row key={tag.id}>
                                    <Col>
                                    <Form.Control type="text" value={tag.label} onChange={e=> onUpdateTags(tag.id, e.target.value)}/>
                                    </Col>
                                    <Col xs='auto'>
                                        <Button onClick={()=>onDeleteTags(tag.id)} variant="danger">
                                            &times;
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Stack>
                    </Form>
                </Modal.Body>
        </Modal>
        </>
    )
}
