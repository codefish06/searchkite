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

import "./css/index.css";

const host = "http://demo.searchkit.co/api/movies"
const sk = new SearchkitManager(host, {

});

const RefinementOption = (props) => (
  <div className={props.bemBlocks.option().state({selected:props.selected}).mix(props.bemBlocks.container("item"))} onClick={props.onClick}>
    <div className={props.bemBlocks.option("text")}>{props.label}</div>
    <div className={props.bemBlocks.option("count")}>{props.count}</div>
  </div>
)
// sk.addDefaultQuery((query) => {
//   return query.addQuery(FilteredQuery({
//     filter: BoolShould([
//       TermQuery("title", "red")
//     ])
//   }));
// });

class MovieHit extends React.Component {

  render() {
    const result = this.props.result;
    console.log(this.props.result);
    let url = "http://www.imdb.com/title/" + result._source.imdbId
    return (
      <div className="li-box">
        <img className="li-img" src={this.props.result._source.poster} />
        <div className="li-title" dangerouslySetInnerHTML={{ __html: _.get(this.props.result, "highlight.title", this.props.result._source.title) }}></div>
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
            <SelectedFilters/>
          </div>
          <div>
            <RefinementListFilter
              field="type.raw"
              title="Type"
              id="type"
              operator="OR"/>
          </div>
          <div className="search__results">
            <Hits hitsPerPage={10} mod="sk-hits-grid" sourceFilter={["title", "poster", "imbdId", "writers"]} itemComponent={MovieHit} />
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