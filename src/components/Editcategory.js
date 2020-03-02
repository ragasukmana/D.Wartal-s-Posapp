import React from 'react'
import {
    Button, Modal, Form
} from 'semantic-ui-react'


function Editcategory(props) {    
    return (
        <Modal size={props.size} open={props.open} onClose={props.closeedit}>
            <Modal.Header >Edit Menu</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name menu'
                        defaultValue={props.data.name}
                        onChange={(event) => props.handleUpdateName(event.target.value)}
                            />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={props.closeedit}>No</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Submit'
                    onClick={(event) => props.handleSubmitUpdate(event, props.data.id)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default Editcategory