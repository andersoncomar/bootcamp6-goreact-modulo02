import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n -1) {
        background: #f5f5f5;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px 20px;
`;

export const ButtonRefresh = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50px;
  color: #fff;
  background: #5dccf0;
  i {
    margin-right: 5px;
  }

  &:hover {
    background: #518abb;
  }
`;

export const ButtonRemove = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50px;
  color: #fff;
  background: #f95e5e;
  i {
    margin-right: 5px;
  }

  &:hover {
    background: #e83535;
  }
`;
