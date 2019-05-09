import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Repository, ButtonContainer, ButtonRefresh, ButtonRemove,
} from './styles';

const CompareList = ({ repositories, refreshRepository, removeRepository }) => (
  <Container>
    {repositories
      && repositories.map(repository => (
        <Repository key={repository.id}>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <strong>{repository.name}</strong>
            <small>{repository.owner.login}</small>
          </header>

          <ul>
            <li>
              {repository.stargazers_count} <small>stars</small>
            </li>
            <li>
              {repository.forks_count} <small>forks</small>
            </li>
            <li>
              {repository.open_issues_count} <small>issues</small>
            </li>
            <li>
              {repository.lastCommit} <small>last commit</small>
            </li>
          </ul>
          <ButtonContainer>
            <ButtonRefresh type="button" onClick={() => refreshRepository(repository.id)}>
              <i className="fa fa-retweet" />
              Atualizar
            </ButtonRefresh>

            <ButtonRemove type="button" onClick={() => removeRepository(repository.id)}>
              <i className="fa fa-trash" />
              Remover
            </ButtonRemove>
          </ButtonContainer>
        </Repository>
      ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
  refreshRepository: PropTypes.func.isRequired,
  removeRepository: PropTypes.func.isRequired,
};

export default CompareList;
