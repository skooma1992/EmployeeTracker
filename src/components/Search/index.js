import React from "react";
import API from "../../utils/API"
import SearchBar from "../SearchBar/index"
import "./styles.css"

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            users: [],
            filteredUsers: []
        }

    }

    filterList = (event) => {
        //let items = this.state.users;
        console.log(event.target.value);
        const filter = event.target.value;
        const filteredList = this.state.users.filter(item => {
            let values = Object.values(item)
                .join("")
                .toLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        this.setState({ filteredUsers: filteredList });


    }

    
    sortName = (event) => {
        var byName = this.state.filteredUsers.slice(0);
        
        byName.sort(function (a, b, key=(event.target.innerText).toLowerCase()) {
            var x = a.name[key];
            var y = b.name[key];
            console.log(event.target.innerText)
            console.log(x, y)
            return x < y ? -1 : x > y ? 1 : 0;
        });

        this.setState({ filteredUsers: byName })
    }

    componentDidMount() {
        API.getUsers()
            .then(newData => this.setState({ loading: false, users: newData.data.results, filteredUsers: newData.data.results }))
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        return (

            <div>
                <SearchBar onChange={this.filterList} />
                <div className="personList">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th onClick={this.sortName}>First</th>
                                <th onClick={this.sortName}>Last</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>DOB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filteredUsers.map(person => (
                                <tr>
                                    <td><img src={person.picture.thumbnail} alt={person.name.first}/></td>
                                    <td>{person.name.first}</td>
                                    <td>{person.name.last}</td>
                                    <td>{person.phone.toString()}</td>
                                    <td>{person.email}</td>
                                    <td>{person.dob.date.substring(0, person.dob.date.length - 14).toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default Search