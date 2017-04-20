import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

import {
  SearchBox,
  TermQuery,
  FilteredQuery,
  BoolShould,
  InitialLoader,
  RefinementListFilter,
  Hits,
  NoHits,
  HitsStats,
  HitItemProps,
  MatchQuery,
  SortingSelector,
  SearchkitComponent,
  SelectedFilters,
  MenuFilter,
  HierarchicalMenuFilter,
  NumericRefinementListFilter,
  Pagination,
  ResetFilters,
  SearchkitManager,
  SearchkitProvider,
  TagFilterList
} from "searchkit";

const host = "http://demo.searchkit.co/api/movies"
const sk = new SearchkitManager(host, {

});

sk.addDefaultQuery((query) => {
  return query.addQuery(FilteredQuery({
    filter: BoolShould([
      TermQuery("title", "red")
    ])
  }));
});

class MovieHit extends React.Component {

  render() {
    const result = this.props.result;
    console.log(this.props.result);
    let url = "http://www.imdb.com/title/" + result._source.imdbId
    return (
      <div className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item")) + ' li-img'}>
        <img className={this.props.bemBlocks.item("poster")} src={this.props.result._source.poster} />
        <div className={this.props.bemBlocks.item("title")} dangerouslySetInnerHTML={{ __html: _.get(this.props.result, "highlight.title", this.props.result._source.title) }}></div>
      </div>
    )
  }

}

class Application extends React.Component {
  render() {
    const Searchbox = SearchBox;
    console.log({ sk });
    return (<div>

      <SearchkitProvider searchkit={sk}>
        <div className="search">
          <div className="search__query">
            <Searchbox searchOnChange={true} prefixQueryFields={["actors^1", "type^2", "languages", "title^10"]} />
          </div>
          <div>
          </div>
          <div className="search__results">
            <Hits hitsPerPage={15} mod="sk-hits-grid" sourceFilter={["title", "poster", "imbdId", "writers"]} itemComponent={MovieHit} />
          </div>
          <div>
            <Pagination showNumbers={true} />
          </div>
        </div>
      </SearchkitProvider>

    </div>);
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));