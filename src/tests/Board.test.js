import { render, unmountComponentAtNode } from 'react-dom';
import { jest } from '@jest/globals';
import ReactTestUtils from 'react-dom/test-utils';
import { Board } from '../components/Board';



let container = null;
// テストのベースになるDOMを生成
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

// テスト後のDOMを削除
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const value = 'test';
const squares = [];
for (let i=0; i<9; i++) {
  squares.push(value + i);
}
const mockFunc = jest.fn();
const props = {
  squares,
  onClick: mockFunc
}

describe('Board', () => {
  describe('Board', () => {
    it("Boardを生成", () => {    
      
      render(Board(props), container);

      // 第1階層のdivが生成されている
      const div = container.firstChild;
      expect(div.tagName).toBe('DIV');

      // <div class = 'board-row'> が３つ生成されている
      const boardRows = div.getElementsByClassName('board-row'); 
      expect(boardRows.length).toBe(3);
      for (let boardRow of boardRows) {
        expect(boardRow.tagName).toBe('DIV');

      }

      // <div class = 'board-row'>にSquareが3つずつ生成されている
      let counter = 0;
      for(let boardRow of boardRows) {
        expect(boardRow.childNodes.length).toBe(3);
        for(let square of boardRow.childNodes) {
          expect(square.getAttribute('class')).toBe('square');
          expect(square.textContent).toBe('test' + counter);
          ReactTestUtils.Simulate.click(square);
          counter++;
        }
      }
      expect(mockFunc).toHaveBeenCalledTimes(9);
    });
  });
});