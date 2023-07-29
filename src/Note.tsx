import { Badge, Col, Row, Stack } from "react-bootstrap";
import { useNotes } from "./Details";

export function Note() {
    const note = useNotes()

    return (
        <Row className="align-item-center mb-4">
            <Col>
                <h1>{note.title}</h1>
                {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.tags.map(tag => (
                            <Badge className='text-truncate' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
            </Col>
        </Row>
    )
}