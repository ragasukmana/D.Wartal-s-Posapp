import React from 'react'
import {
    Button, Modal, Form, Dropdown
} from 'semantic-ui-react'


function Editaccount(props) {
    return (
        <Modal size={props.size} open={props.open} onClose={props.closeedit}>
            <Modal.Header >Edit Account</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <div style={{ textAlign: 'center' }}>
                            <img src={props.data.URLimage ? props.data.URLimage : !props.data.pictures ? 
                            require('../public/assets/Images/defaultphoto.png') : process.env.REACT_APP_HOST + '/' + props.data.pictures}
                                style={{ height: 180, width: 180, borderRadius: 180 }} alt='upload images' />
                        </div>
                        <label>Profile pictures</label>
                        <input type='file' name='filename' onChange={(event) => props.handleImageUpdate(event)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username'
                            defaultValue={props.data.username}
                            onChange={(event) => props.handleUpdateUsername(event.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type='password'
                            onChange={(event) => props.handlePasswordUpdate(event.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Name Account</label>
                        <input placeholder='Name account'
                            defaultValue={props.data.name}
                            onChange={(event) => props.handleNameEdit(event.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Role</label>
                        <Dropdown placeholder='Role' search selection
                            options={props.roleOptions}
                            onChange={(event, { value }) => props.handleRoleUpdate(value)} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={props.closeedit}>Cancel</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Submit'
                    onClick={(event) => props.handleUpdateSubmit(event, props.data.id_user)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default Editaccount