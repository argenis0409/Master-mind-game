import React, { Component } from 'react'
import Card from './Cards';
import CardsView from './CardsView';

export default class Game extends Component {
    render() {
        return (
            <div>
                <h1>Game here</h1>
                <Card />
                <CardsView />
            </div>
        )
    }
}
