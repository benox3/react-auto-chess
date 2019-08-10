import React from 'react';
import './App.css';
import Board from './components/Board';
import { BoardProvider } from './components/Board/components/BoardContext';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CustomDragLayer from './components/CustomDragLayer';

export default function App() {
	return (
		<div className="App">
			<DndProvider backend={HTML5Backend}>
				<CustomDragLayer />
				<BoardProvider>
					<Board />
				</BoardProvider>
			</DndProvider>
		</div>
	);
}
