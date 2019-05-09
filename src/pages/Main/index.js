import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import {
  getLocalRepositories,
  setLocalRepository,
  setLocalRepositories,
} from '../../services/local';

import CompareList from '../../components/CompareList';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositoryError: false,
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const repositories = await getLocalRepositories();

      this.setState({ repositories });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleRepositoryInput = (e) => {
    this.setState({ repositoryInput: e.target.value });
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    const { repositories, repositoryInput } = this.state;

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: [...repositories, repository],
      });

      setLocalRepositories(repository);
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRefreshRepository = async (id) => {
    const { repositories } = this.state;

    const repositoryCache = repositories.find(repo => repo.id === id);

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryCache.full_name}`);
      const listRepositories = repositories.filter(repo => repo.id !== id);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositories: [...listRepositories, repository],
      });

      setLocalRepository(repositories);
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRemoveRepository = async (id) => {
    const { repositories } = this.state;

    this.setState({ loading: true });

    try {
      const listRepositories = repositories.filter(repository => repository.id !== id);

      this.setState({ repositories: listRepositories });

      setLocalRepository(listRepositories);
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      loading, repositories, repositoryInput, repositoryError,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={this.handleRepositoryInput}
          />

          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          refreshRepository={this.handleRefreshRepository}
          removeRepository={this.handleRemoveRepository}
        />
      </Container>
    );
  }
}
