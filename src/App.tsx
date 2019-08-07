import React from 'react';
import './App.css';
import Board from './components/Board';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}
