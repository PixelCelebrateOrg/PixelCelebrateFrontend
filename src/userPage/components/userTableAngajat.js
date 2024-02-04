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
        Header: 'Email',
        accessor: 'Email',
    }
];

const filters = [
    {
        accessor: 'Email',
    },
];

class UserTableAngajat extends React.Component {

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

export default UserTableAngajat;