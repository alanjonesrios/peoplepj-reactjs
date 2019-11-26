import styled, { keyframes, css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Circle = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: #7159c1;

  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    margin-top: 5px;
    color: #fff;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const PersonField = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Form = styled.form`
  margin-top: 0px;
  display: flex;
  flex-direction: column;

  div.link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }

  div.contact {
    display: flex;
    flex-direction: row;
    padding-bottom: 0px;
  }

  h2 {
    display: flex;
    margin-top: 16px;
    font-size: 14px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    color: #7159c1;
    font-family: Arial, Helvetica, sans-serif;
  }

  h1 {
    font-size: 16px;
    display: flex;
    width: 85px;
    padding-right: 25px;
    padding-left: 12px;
    justify-content: center;
    align-items: center;
  }

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-top: 5px;
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

export const DeleteButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.loading,
}))`
  background: #c15959;
  border: 0;
  padding: 8px 0px;
  margin-top: 8px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    padding-top: 5px;
    color: #fff;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 8px 0;
  border-radius: 4px;

  display: flex;
  margin-top: 8px;
  justify-content: center;
  align-items: center;

  h1 {
    padding-top: 5px;
    color: #fff;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const AddContactsField = styled.div`
  display: flex;
  flex-direction: row;
`;
export const RemoveContactButton = styled.button.attrs({
  type: 'button',
})`
  background: #c15959;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  margin-bottom: 15px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddContactButton = styled.button.attrs({
  type: 'button',
})`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  margin-bottom: 15px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
