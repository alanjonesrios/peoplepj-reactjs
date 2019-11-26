import React, { Component } from 'react';

import { FaUserFriends, FaPlus, FaSpinner, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import api from '../../services/api';
import {
  Form,
  SubmitButton,
  List,
  AddContactButton,
  RemoveContactButton,
  Contacts,
  Circle,
} from './styles';

import Container from '../../components/Container';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPerson: '',
      newContact: '',
      newContactType: 'Phone',
      people: [],
      newContacts: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    api.get(`/people`).then(response => {
      this.setState({
        people: response.data,
        loading: false,
      });
    });
  }

  handleInputChange = e => {
    this.setState({ newPerson: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newContacts, newPerson, people } = this.state;

    if (newContacts.length < 1 || newPerson.length < 1) return;

    this.setState({ loading: true });

    await api
      .post(`/people`, {
        Name: newPerson,
      })
      .then(async result => {
        if (result) {
          const sendContacts = newContacts;
          sendContacts.forEach((contact, index) => {
            sendContacts[index].personId = result.data.personId;
          });

          if (sendContacts[0].personId)
            await api.post(`/contact`, [...sendContacts]);
        }

        this.setState({
          people: [...people, result.data],
          newPerson: '',
          newContacts: [],
          loading: false,
        });
      });
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

  handleSelection = e => {
    this.setState({ newContactType: e.target.innerText });
  };

  render() {
    const {
      newPerson,
      people,
      loading,
      newContacts,
      newContact,
      newContactType,
    } = this.state;

    return (
      <Container>
        <h1>
          <FaUserFriends />
          People
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Name... e.g John Wayne"
            value={newPerson}
            onChange={this.handleInputChange}
          />

          {newContacts.map((contact, index) => {
            return (
              <div key={index} className="contact">
                <h3>{contact.type}</h3>
                <input
                  type="text"
                  placeholder="..."
                  value={contact.value}
                  onChange={() => this.handleInputChange()}
                />
                <RemoveContactButton
                  onClick={() => {
                    const contacts = newContacts;
                    contacts.splice(index, 1);

                    this.setState({
                      newContacts: contacts,
                    });
                  }}
                >
                  <FaMinus color="#fff" size={14} />
                </RemoveContactButton>
              </div>
            );
          })}
          <Contacts>
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
              type={newContactType === 'Email' ? 'text' : 'number'}
              placeholder="..."
              value={newContact}
              onChange={e => this.setState({ newContact: e.target.value })}
            />

            <AddContactButton onClick={() => this.handleAddContact()}>
              <FaPlus color="#fff" size={14} />
            </AddContactButton>
          </Contacts>

          <SubmitButton
            loading={
              loading || newPerson.length < 1 || newContacts.length < 1 ? 1 : 0
            }
          >
            {loading ? <FaSpinner color="#fff" size={35} /> : <h1>Create</h1>}
          </SubmitButton>
        </Form>

        <List>
          {people
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(person => (
              <li key={person.personId}>
                <div>
                  <Circle>
                    <h2>{person.name[0]}</h2>
                  </Circle>
                  <span>{person.name}</span>
                </div>
                <Link to={`/Contacts/${person.personId}`}>Contacts</Link>
              </li>
            ))}
        </List>
      </Container>
    );
  }
}
