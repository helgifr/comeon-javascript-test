import React, { Component } from 'react';

import api from '../../api';

import Loading from '../../components/loading';
import User from '../../components/user';
import Categories from '../../components/categories';
import GamesList from '../../components/games-list';
import Search from '../../components/search';

import { getLocalStore, escapeRegExp } from '../../util';

class Games extends Component {
  state = {
    loading: true,
    filterGames: '',
    categoryFilter: 0,
    searchFilter: '',
  };

  componentDidMount() {
    this.fetchGamesAndCategories();
  }

  async fetchGamesAndCategories() {
    const gamesUrl = '/games';
    const categoriesUrl = '/categories';
    try {
      // Retrieve games and categories at the same time
      const [gamesResult, categoriesResult] = await Promise.all([
        api.get(gamesUrl),
        api.get(categoriesUrl)
      ]);
      const { result: games } = gamesResult;
      const { result: categories } = categoriesResult;

      this.setState({
        loading: false,
        games,
        categories,
      });
    } catch (error) {
      console.error('Error fetching games', error);
      this.setState({
        error,
        loading: false,
      });
    }
  }

  handleSearch = e => {
    const { value: searchFilter } = e.target;
    this.setState({ searchFilter });
  }

  handleCategories = categoryFilter => {
    this.setState({ categoryFilter });
  }

  render() {
    const {
      loading,
      games,
      categories,
      searchFilter,
      categoryFilter,
    } = this.state;

    const user = getLocalStore('player');

    if (loading) return (<Loading />);

    // filter games based on search and category
    const nameFilter = new RegExp(escapeRegExp(searchFilter), 'ig');
    const filteredGames = games
      .filter(({ name, categoryIds }) =>
        name.match(nameFilter) && categoryIds.includes(categoryFilter)
      )

    return (
      <div className="casino">
        <div className="ui grid centered">
          <User user={user} />
          <Search handleSearch={this.handleSearch} />
        </div>
        <div className="ui grid">
          <div className="twelve wide column">
            <h3 className="ui dividing header">Games</h3>
            <div className="ui relaxed divided game items links">
              <GamesList games={filteredGames} />
            </div>
          </div>
          <div className="four wide column">
            <h3 className="ui dividing header">Categories</h3>
            <div className="ui selection animated list category items">
              <Categories
                clicked={categoryFilter}
                categories={categories}
                changeCategories={this.handleCategories}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Games;