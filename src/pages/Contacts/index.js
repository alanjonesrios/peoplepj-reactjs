import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPlus, FaSpinner, FaMinus } from 'react-icons/fa';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import api from '../../services/api';

import Container from '../../components/Container';

import {
  Loading,
  Circle,
  PersonField,
  Form,
  SubmitButton,
  AddContactButton,
  RemoveContactButton,
  AddContactsField,
  DeleteButton,
} from './styles';

export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: '',
      newPerson: '',
      loading: false,
      newContact: '',
      newContactType: 'Phone',
      newContacts: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const { personId } = match.params;

    this.setState({
      loading: true,
    });

    const response = await api.get(`/people/${personId}`);

    this.setState({
      person: response.data,
      newPerson: response.data.name,
      newContacts: response.data.contacts,
      loading: false,
    });
  }

  handleInputChange = e => {
    this.setState({ newPerson: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newContacts, newPerson, person } = this.state;

    if (person.name.length < 1) return;

    this.setState({ loading: true });

    const sendContacts = newContacts;
    sendContacts.forEach((contact, index) => {
      sendContacts[index].personId = person.personId;
    });

    await api.put(`/contact/${person.personId}`, [...sendContacts]);

    const result = await api.put(`/people/${person.personId}`, {
      name: newPerson,
    });

    this.setState({
      person: result.data,
      newContacts: result.data.contacts,
      loading: false,
    });
  };

  handleRemoveContact = async (contact, index) => {
    const { newContacts } = this.state;

    const contacts = newContacts;
    contacts.splice(index, 1);

    this.setState({
      newContacts: contacts,
    });

    await api.delete(`/contact/${contact.contactId}`);
  };

  handleAddContact = () => {
    const { newContacts, newContact, newContactType } = this.state;

    if (newContact.length < 1 || newContactType.length < 0) return;

    this.setState({
      newContacts: [
        ...newContacts,
        { value: newContact, type: newContactType },
      ],
      newContact: '',
      newContactType: 'Phone',
    });
  };

  handleDeletePerson = async () => {
    const { person } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });
    await api.delete(`/people/${person.personId}`);

    this.setState({ loading: false });

    history.push('/');
  };

  handleSelection = e => {
    this.setState({ newContactType: e.target.innerText });
  };

  render() {
    const {
      person,
      loading,
      newPerson,
      newContacts,
      newContactType,
      newContact,
    } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <div className="link">
            <Link to="/">Return to previous page</Link>
          </div>
          <PersonField className="contact">
            <Circle>
              <h3>{person && person.name[0]}</h3>
            </Circle>
            <input
              type="text"
              placeholder={newPerson}
              value={newPerson}
              onChange={this.handleInputChange}
            />
          </PersonField>

          {newContacts.map((contact, index) => {
            return (
              <div key={index} className="contact">
                <h1>{contact.type}</h1>
                <input
                  type="text"
                  placeholder="..."
                  value={contact.value}
                  onChange={() => this.handleInputChange()}
                />
                {!loading && (
                  <RemoveContactButton
                    onClick={() => {
                      this.handleRemoveContact(contact, index);
                    }}
                  >
                    <FaMinus color="#fff" size={14} />
                  </RemoveContactButton>
                )}
              </div>
            );
          })}

          <h2> ADD NEW CONTACT </h2>

          <AddContactsField>
            <DropdownButton
              title={newContactType}
              size="md"
              variant="s"
              onClick={e => this.handleSelection(e)}
            >
              <Dropdown.Item eventKey="1">Phone</Dropdown.Item>
              <Dropdown.Item eventKey="2">Email</Dropdown.Item>
              <Dropdown.Item eventKey="3">Whatsapp</Dropdown.Item>
            </DropdownButton>
            <input
              type="text"
              placeholder="..."
              value={newContact}
              onChange={e => this.setState({ newContact: e.target.value })}
            />

            {!loading && (
              <AddContactButton onClick={() => this.handleAddContact()}>
                <FaPlus color="#fff" size={14} />
              </AddContactButton>
            )}
          </AddContactsField>

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? <FaSpinner color="#fff" size={35} /> : <h1>Save</h1>}
          </SubmitButton>

          <DeleteButton
            onClick={() => this.handleDeletePerson()}
            loading={loading ? 1 : 0}
          >
            {loading ? <FaSpinner color="#fff" size={35} /> : <h1>Delete</h1>}
          </DeleteButton>
        </Form>
      </Container>
    );
  }
}

Contacts.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      personId: propTypes.string,
    }),
  }).isRequired,
};
