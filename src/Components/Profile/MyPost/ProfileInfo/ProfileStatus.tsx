import React, {ChangeEvent} from "react";

type PropsType = {
    status: string,
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean,
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        console.log("Result: " + this);
        this.setState({
            editMode: true
        });
        console.log("Result: " + this);
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    };
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value});
    };

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        console.log("Updated!")
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onClick={this.activateEditMode}>{this.state.status}</span>
                </div>}
                {this.state.editMode &&
                < div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>}
            </div>
        );
    }

}

export default ProfileStatus;
