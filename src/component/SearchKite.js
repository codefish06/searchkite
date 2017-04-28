import * as React from "react";
import * as _ from "lodash";
import {
    SearchBox,
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
    PageSizeSelector,
    Select, Toggle, TagCloud,
    ResetFilters,
    SearchkitManager,
    SearchkitProvider,
    TagFilterList
} from "searchkit";

import "./../css/index.css";

const host = "http://localhost:9200/";
const sk = new SearchkitManager(host, {});

// Movie datasource for testing phase
const host2 = "http://demo.searchkit.co/api/movies";
const testSk = new SearchkitManager(host2, {});

const RefinementOption = (props) => (
    <div className={props.bemBlocks.option().state({selected: props.selected}).mix(props.bemBlocks.container("item"))}
         onClick={props.onClick}>
        <div className={props.bemBlocks.option("text")}>{props.label}</div>
        <div className={props.bemBlocks.option("count")}>{props.count}</div>
    </div>
)

class MovieHit extends React.Component {
    render() {
        const result = this.props.result;
        console.log(result);
        let url = "http://www.imdb.com/title/" + result._id
        let imahe = null;

        if (result._source.poster) {
            imahe = <img className="li-img" src={result._source.poster}/>
        } else {
            imahe = <div>No Image.</div>
        }
        return (
            <div className="li-box">
                <a href={url}>
                    {imahe}
                    <div className="li-title"
                         dangerouslySetInnerHTML={{__html: _.get(this.props.result, "highlight.title", this.props.result._source.title)}}></div>
                </a>
            </div>
        )
    }

}

export default class SearchKite extends React.Component {
    render() {
        const Searchbox = SearchBox;
        console.log('Fetch Data', {testSk});
        return (<div>
            <SearchkitProvider searchkit={testSk}>
                <div className="search">
                    <div className="search__query">
                        <Searchbox 
                        autoFocus={true} 
                        searchOnChange={true} 
                        queryOptions={{analyzer: "standard"}}
                        prefixQueryFields={["title^10"]}/>
                    </div>
                    <div className="hit-stats"><HitsStats/></div>
                    <div className="search-cloud">
                        <RefinementListFilter
                            field="type.raw"
                            id="type"
                            operator="OR"
                            itemComponent={RefinementOption}
                            listComponent={Toggle}
                        />
                    </div>
                    <div className="search__results">
                        <Hits hitsPerPage={12} mod="sk-hits-grid"
                              sourceFilter={["title", "poster", "imbdId", "writers"]} itemComponent={MovieHit}/>
                    </div>
                    <div>
                        <Pagination showNumbers={true}/>
                    </div>
                </div>
            </SearchkitProvider>

        </div>);

    }
}
