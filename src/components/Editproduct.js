import React from 'react'
import {
    Button, Modal, Form, Dropdown
} from 'semantic-ui-react'


function Editproduct(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.closeedit}>
            <Modal.Header >Edit Menu</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name menu'
                            defaultValue={props.data.name_product}
                            onChange={(event) => props.handleNameUpdate(event.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <textarea
                            onChange={(event) => props.handleEditDescription(event.target.value)}
                            placeholder='Input here description'>{props.data.description}</textarea>
                    </Form.Field>
                    <Form.Field>
                        <div style={{ textAlign: 'center' }}>
                            <img src={props.data.imageURL ? props.data.imageURL : process.env.REACT_APP_HOST + '/' + props.data.image}
                                style={{ height: 180, width: 220 }} alt='img' />
                        </div>
                        <label>Images</label>
                        <input type="file" name="filename"
                            onChange={(event) => props.handleImageUpdate(event)}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <Dropdown placeholder='Category' search selection
                            options={props.categoryOption}
                            defaultValue={props.selected}
                            onChange={(event, { value }) => props.handleCategoryUpdate(value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input placeholder='Price'
                            defaultValue={props.data.price}
                            onChange={(event) => props.handlePriceUpdate(event.target.value)}
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
                    onClick={(event) => props.handleUpdated(event, props.data.id)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default Editproduct