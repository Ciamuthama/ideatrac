import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableReactSelect from "react-select/creatable"
import {Link} from "react-router-dom"
import { FormEvent, useRef } from 'react'
import { NoteData } from "./App"

type NoteDataProps={
    onSubmit: (data: NoteData)=> void
}

export function NoteForm({onSubmit}: NoteDataProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    function handleSubmit(e: FormEvent) {
        e.preventDefault() 
        
        onSubmit({
            title: titleRef.current!.value,
            body: bodyRef.current!.value,
            tag:[]
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row >
                        <Col>
                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control ref={titleRef} required/>
                        </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='title'>
                                <Form.Label>Tags</Form.Label>
                                <CreatableReactSelect isMulti />
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId='body' className='my-5'>
                                <Form.Label>Body</Form.Label>
                                <Form.Control ref={bodyRef} required as="textarea" rows={15}/>
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


