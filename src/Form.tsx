import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableReactSelect from "react-select/creatable"
import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useRef, useState } from 'react'
import { NoteData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"

type NoteDataProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({ onSubmit,onAddTag,availableTags, title="", body="" ,tags=[], }: NoteDataProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTag, setSelectedTag] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            body: bodyRef.current!.value,
            tags: selectedTag
        })
        navigate('..')
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row >
                        <Col>
                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control ref={titleRef} required defaultValue={title} />
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
                    <Form.Group controlId='body' className='my-5'>
                        <Form.Label>Body</Form.Label>
                        <Form.Control ref={bodyRef} required as="textarea" rows={15} defaultValue={body}/>
                    </Form.Group>
                </Stack>
                <Stack direction='horizontal' gap={2} className='justify-content-end '>
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                        <Button type="button" variant="secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Form>
        </>
    )
}


