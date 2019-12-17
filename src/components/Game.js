import React, { Component } from 'react'
import Card from './Cards';
import CardsView from './CardsView';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.cardClicked = this.cardClicked.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.memoryCards = new MemoryCards();
      }
    
      componentWillMount() {
        this.startGame();
      }
    
      startGame() {
        this.memoryCards.generateCardSet();
        this.setState({
          turn : 1,
          pairsFound : 0,
          numClicksWithinTurn : 0,
          firstId : undefined,
          secondId : undefined
        });
      }
    
      getCardViews() {
        let cardViews = [];
        let onClick = this.cardClicked;
        this.memoryCards.cards.forEach(c => {
          let cardView = <CardView key={c.id} 
              id={c.id} 
              image={c.image}
              imageUp = {c.imageUp}
              matched = {c.matched} 
              onClick={onClick}/>;
              cardViews.push(cardView);
        });
        return cardViews;
      }
    
      clearCards(id1,id2) {
        if (this.state.numClicksWithinTurn !== 2) {
          return;
        }
        this.memoryCards.flipCard(this.state.firstId, false);
        this.memoryCards.flipCard(this.state.secondId, false);

        this.setState({
          firstId: undefined,
          secondId: undefined,
          numClicksWithinTurn: 0,
          turnNo : this.state.turnNo+1
        });
      }
    
      cardClicked(id,image) {

        if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn === 2) {
          if (this.state.numClicksWithinTurn === 2) {
            clearTimeout(this.timeout);
            this.clearCards(this.state.firstId, this.state.secondId);        
          }
          this.memoryCards.flipCard(id, true);
          this.setState({
            firstId : id,
            numClicksWithinTurn : 1
          });
        } else if (this.state.numClicksWithinTurn === 1) {
          this.memoryCards.flipCard(id, true);
          this.setState({
            secondId : id,
            numClicksWithinTurn : 2
          });
    
          if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
            this.memoryCards.setCardAsMatched(this.state.firstId, true);
            this.memoryCards.setCardAsMatched(id, true);
            this.setState({
              pairsFound: this.state.pairsFound+1,
              firstId: undefined,
              secondId: undefined,
              turnNo : this.state.turnNo+1,
              numClicksWithinTurn: 0
            });
    
          } else {
            this.timeout = setTimeout(() => { 
              this.clearCards(this.state.firstId, this.state.secondId);
            },5000); 
          }
        }
      }
    
      playAgain() {
        this.initGame();
      }

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
