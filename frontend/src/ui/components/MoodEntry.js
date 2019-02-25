import React, { Component } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import MoodFace from './MoodFace';

const Entry = styled.li`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;
    justify-items: baseline;
    border-bottom: 1px solid #fafafa;
    padding: 5px;
    margin: 5px;
    color: #9a9a9a;
`;

const Row = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-evenly;
    justify-items: baseline;
`;

const ExpanderRow = styled(Row)`
    padding-top: 5px;
    flex-direction: column;
    display: ${props => props.expanded ? 'flex' : 'none' }; 
`;

const Col = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 33%;
`;

const ToggleCol = styled(Col)`
    justify-content: flex-end;
    flex-shrink: 1;
    flex-grow: 0;
    flex-basis: 0;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    margin-bottom: 5px;
    margin-left: -4px;
`;

const Tag = styled.div`
    background-color: #ff8a66;
    border-radius: 8px;
    padding: 6px;
    margin: 4px;
    font-size: 0.9em;
    color: #fff;
`;

const Quote = styled.div`
    border-left: 3px solid #cacaca;
    padding: 3px;
`;

const Toggle = styled.button`
    background-color: transparent;
    border: 0;
    color: #9a9a9a;
`;

const FormattedDate = (props) => {
    const locale = navigator.locale;
    const day = props.date.toLocaleDateString(locale, { day: 'numeric' });
    const month = props.date.toLocaleDateString(locale, { month: 'short' });

    return (
        <div>
            <div>
                {day}
            </div>
            <div style={{
                textTransform: 'uppercase',
                fontSize: '0.7em'
            }}>
                {month}
            </div>
        </div>
    );
}

const FormattedTime = (props) => {
    return (
        <React.Fragment>
            { props.date.getHours() + ':' + props.date.getMinutes() }
        </React.Fragment>
    );
}

class MoodEntry extends Component {
    state = {
        expanded: false
    };

    handleExpand = () => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    }

    render(){
        return (
            <Entry>
                <Row>
                    <Col>
                        <FormattedDate date={this.props.createdAt} />
                    </Col>
                    <Col>
                        <FormattedTime date={this.props.createdAt} />
                    </Col>
                    <Col>
                        <MoodFace style={{fontSize: '1.5em', margin: '0px' }} mood={this.props.mood} />
                    </Col>
                    <ToggleCol>
                        <Toggle type='button' onClick={this.handleExpand}>
                            {(this.state.expanded) ? <FaChevronUp/> : <FaChevronDown/>}
                        </Toggle>
                    </ToggleCol>
                </Row>
                <ExpanderRow ref={this.expanderRef} expanded={this.state.expanded} >
                    <Tags>
                        {this.props.feelings.map(feeling => (
                            <Tag key={feeling}>
                                {feeling}
                            </Tag>
                        ))}
                    </Tags>
                    {this.props.comment && 
                    <Quote>
                        {this.props.comment}
                    </Quote>
                    }
                </ExpanderRow>
            </Entry>
        );
    }
}

export default MoodEntry;