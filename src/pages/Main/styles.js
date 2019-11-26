import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Circle = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #7159c1;

  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin-top: 8px;
    color: #fff;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  div.contact {
    display: flex;
    flex-direction: row;
    padding-bottom: 0px;
  }

  h3 {
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
    margin-left: 0px;
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

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 8px 0;
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

export const Contacts = styled.div`
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

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    span {
      margin-left: 10px;
      color: #7159c1;
      font-size: 16px;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
`;
