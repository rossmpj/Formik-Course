import React from "react";
import Select from "react-select";

class DropList extends React.Component {
    handlechange = (value) => {
        this.props.onChange("topics", value)
    }
    handleBlur = () => {
        this.props.onBlur("topics", true)
    }
    render() {
        return (
            <Select
                value={this.props.value}
                onChange={this.handlechange}
                onBlur={this.handleBlur}
                options={this.props.options}
                isMulti={true}
            />
        )
    }
}

export default DropList;