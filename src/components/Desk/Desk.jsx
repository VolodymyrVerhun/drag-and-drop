import React, { useState } from 'react';
import style from './Desk.module.css';

export default function Desk() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'to do',
      items: [
        { id: 1, title: 'do 1' },
        { id: 2, title: 'do 2' },
        { id: 3, title: 'do 3' },
      ],
    },
    {
      id: 2,
      title: 'will do',
      items: [
        { id: 4, title: 'do 4' },
        { id: 5, title: 'do 5' },
        { id: 6, title: 'do 6' },
      ],
    },
    {
      id: 3,
      title: 'done',
      items: [
        { id: 7, title: 'do 7' },
        { id: 8, title: 'do 8' },
        { id: 9, title: 'do 9' },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragStartHandler(e, item, board) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dragOverHandler(e) {
    e.preventDefault();

    e.target.style.boxShadow = '0 9px 9px gray';
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dropHandler(e, board, item) {
    // e.preventDefault();

    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map(b => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    e.target.style.boxShadow = 'none';
  }
  function dropCardHandler(e, board) {
    // board.items.push(currentItem);
    // const currentIndex = currentBoard.items.indexOf(currentItem);
    // currentBoard.items.splice(currentIndex, 1);
    // setBoards(
    //   boards.map(b => {
    //     if (b.id === board.id) {
    //       return board;
    //     }
    //     if (b.id === currentBoard.id) {
    //       return currentBoard;
    //     }
    //     return b;
    //   })
    // );

    const currentId = board.items.map(item => item.id);
    if (!currentId.includes(currentItem.id)) {
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);
      setBoards(
        boards.map(b => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );

      e.target.style.boxShadow = 'none';
    }
  }
  return (
    <div className={style.desk}>
      {boards.map(board => (
        <div
          className={style.board}
          onDragOver={e => dragOverHandler(e)}
          onDrop={e => dropCardHandler(e, board)}
          key={board.id}
        >
          <h3>{board.title}</h3>
          {board.items.map(item => (
            <div
              className={style.task}
              key={item.id}
              onDragStart={e => dragStartHandler(e, item, board)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragEnd={e => dragEndHandler(e)}
              onDragOver={e => dragOverHandler(e)}
              onDrop={e => dropHandler(e, board, item)}
              draggable={true}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
