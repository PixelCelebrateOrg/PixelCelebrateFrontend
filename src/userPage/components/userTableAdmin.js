import React from "react";
import Table from "../../commons/tables/table";

//header + accessor
const columns = [
    {
        Header: 'FirstName',
        accessor: 'FirstName',
    },
    {
        Header: 'LastName',
        accessor: 'LastName',
    },
    {
        Header: 'Username',
        accessor: 'Username',
    },
    {
        Header: 'Password',
        accessor: 'Password',
    },
    {
        Header: 'DateOfBirth',
        accessor: 'DateOfBirth',
    },
    {
        Header: 'Email',
        accessor: 'Email',
    },
    {
        Header: 'Role',
        accessor: 'Role',
    }
];

const filters = [
    {
        accessor: 'Email',
    },
];

class UserTableAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default UserTableAdmin;